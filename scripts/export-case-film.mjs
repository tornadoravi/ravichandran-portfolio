import { writeFile } from 'node:fs/promises';
import recorded from '../src/case-audio.json' with { type: 'json' };
import { solutionNarration, standaloneNarration } from '../src/case-film-narration.js';
import { solutionSteps } from '../src/case-solutions.js';

const destination = process.argv[2];
if (!destination) throw new Error('Supply an absolute output path for the recording plan.');
const ids = ['context', 'problem', 'solution-1', 'solution-2', 'solution-3', 'evidence', 'scope'];
const cases = {};
for (const [caseId, solutions] of Object.entries(solutionNarration)) {
  const previous = recorded.cases[caseId];
  if (previous?.length !== 5 || solutions.length !== solutionSteps[caseId]?.length) {
    throw new Error(`Incomplete walkthrough content: ${caseId}`);
  }
  const clips = [previous[0], previous[1], ...solutions.map(text => ({ text })), previous[3], previous[4]];
  cases[caseId] = clips.map((clip, index) => ({
    id: ids[index], text: clip.text, ...(clip.file ? { existingFile: clip.file } : {})
  }));
}
for (const [caseId, scripts] of Object.entries(standaloneNarration)) {
  if (scripts.length !== ids.length || solutionSteps[caseId]?.length !== 3) throw new Error(`Incomplete standalone walkthrough: ${caseId}`);
  cases[caseId] = scripts.map((text, index) => ({ id: ids[index], text }));
}
await writeFile(destination, `${JSON.stringify({ profile: recorded.profile, cases }, null, 2)}\n`);
console.log(`Prepared ${Object.keys(cases).length} seven-scene walkthroughs; existing narration will be preserved.`);
