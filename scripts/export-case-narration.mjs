import { writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { caseNarratives } from '../src/case-narratives.js';
import { createCaseNarration } from '../src/case-narration.js';

if (!process.argv[2]) throw new Error('Supply an output JSON path for the recording plan.');
const renderer = await createServer({
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, watch: null, hmr: false }, appType: 'custom'
});
try {
  const { caseSummaries } = await renderer.ssrLoadModule('/src/CaseReview.jsx');
  const cases = Object.fromEntries(Object.keys(caseNarratives).map(caseId => [
    caseId,
    createCaseNarration({
      caseId,
      problem: caseSummaries[caseId][0][1],
      hasScreen: caseId !== 'crosstab',
      official: ['powertable', 'analyticsSuite'].includes(caseId)
    })
  ]));
  await writeFile(process.argv[2], JSON.stringify({ profile: 'energetic', cases }, null, 2) + '\n');
  const scripts = Object.values(cases).flat();
  console.log(`${Object.keys(cases).length} cases, ${scripts.length} steps, ${new Set(scripts).size} unique recordings.`);
} finally {
  await renderer.close();
}
