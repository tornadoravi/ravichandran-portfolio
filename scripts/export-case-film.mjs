import { writeFile } from 'node:fs/promises';
import recorded from '../src/case-film-audio.json' with { type: 'json' };
import { createServer } from 'vite';
import { createCaseNarration } from '../src/case-narration.js';
import { solutionNarration, standaloneNarration } from '../src/case-film-narration.js';
import { solutionSteps } from '../src/case-solutions.js';

const destination = process.argv[2];
if (!destination) throw new Error('Supply an absolute output path for the recording plan.');
const ids = ['context', 'problem', 'solution-1', 'solution-2', 'solution-3', 'evidence', 'scope'];
const cases = {};
const renderer = await createServer({
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, watch: null, hmr: false }, appType: 'custom'
});
try {
  const { caseSummaries } = await renderer.ssrLoadModule('/src/CaseReview.jsx');
  for (const [caseId, solutions] of Object.entries(solutionNarration)) {
    if (solutions.length !== solutionSteps[caseId]?.length) throw new Error(`Incomplete walkthrough content: ${caseId}`);
    const original = createCaseNarration({
      caseId, problem: caseSummaries[caseId][0][1],
      hasScreen: caseId !== 'crosstab', official: ['powertable', 'analyticsSuite'].includes(caseId)
    });
    const scripts = [original[0], original[1], ...solutions, original[3], original[4]];
    cases[caseId] = scripts.map((text, index) => {
      const previous = recorded.cases[caseId]?.find(clip => clip.id === ids[index] && clip.text === text);
      return { id: ids[index], text, ...(previous ? { existingFile: previous.file } : {}) };
    });
  }
} finally {
  await renderer.close();
}
for (const [caseId, scripts] of Object.entries(standaloneNarration)) {
  if (scripts.length !== ids.length || solutionSteps[caseId]?.length !== 3) throw new Error(`Incomplete standalone walkthrough: ${caseId}`);
  cases[caseId] = scripts.map((text, index) => {
    const previous = recorded.cases[caseId]?.find(clip => clip.id === ids[index] && clip.text === text);
    return { id: ids[index], text, ...(previous ? { existingFile: previous.file } : {}) };
  });
}
await writeFile(destination, `${JSON.stringify({ profile: recorded.profile, cases }, null, 2)}\n`);
console.log(`Prepared ${Object.keys(cases).length} seven-scene walkthroughs; existing narration will be preserved.`);
