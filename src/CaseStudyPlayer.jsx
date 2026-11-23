import React, { useMemo } from 'react';
import CaseFilmPlayer from './CaseFilmPlayer.jsx';
import CaseFilmScene from './CaseFilmScene.jsx';
import { createCaseNarration } from './case-narration.js';
import { solutionNarration, standaloneNarration } from './case-film-narration.js';
import { caseSolutions, solutionSteps } from './case-solutions.js';
import { solutionScreens } from './case-solution-evidence.js';
import filmAudio from './case-film-audio.json';

export { default as WalkthroughButton } from './WalkthroughButton.jsx';

const sections = [
  { label: 'Context', start: 0, end: 0 },
  { label: 'Problem', start: 1, end: 1 },
  { label: 'Solution', start: 2, end: 4 },
  { label: 'Evidence', start: 5, end: 5 },
  { label: 'Scope', start: 6, end: 6 }
];
const ids = ['context', 'problem', 'solution-1', 'solution-2', 'solution-3', 'evidence', 'scope'];

export default function CaseStudyPlayer({
  ref, caseId, name, narrative, facts, screen, evidenceNote, showTrigger = true, concept = false
}) {
  const scenes = useMemo(() => {
    const solution = caseSolutions[caseId];
    const steps = solutionSteps[caseId];
    if (!solution || !steps) throw new Error(`Unknown walkthrough solution: ${caseId}`);
    const official = Boolean(screen?.src.includes('official'));
    const original = standaloneNarration[caseId] ? null : createCaseNarration({
      caseId, problem: facts[0][1], hasScreen: Boolean(screen), official
    });
    const scripts = standaloneNarration[caseId] ||
      [original[0], original[1], ...solutionNarration[caseId], original[3], original[4]];
    const disclosure = caseId === 'bikecare' ? 'Mobile product concept / simulated roles and records'
      : concept ? 'Concept exploration / not validated interaction'
      : 'Illustrated design explanation / not a product recording';
    const content = [
      { label: 'Context', heading: name, stage: 'challenge', copy: narrative.purpose,
        note: `Designed for ${narrative.audience}. My role: ${narrative.role}` },
      { label: 'Problem', heading: facts[0][0], stage: 'challenge', copy: facts[0][1], note: solution.reason },
      ...steps.map((step, index) => ({
        label: step.title, heading: step.title, solutionIndex: index, steps, value: solution.value,
        screen: solutionScreens[caseId]?.[index],
        disclosure: solutionScreens[caseId]?.[index]
          ? concept ? 'Original concept screen / not validated interaction'
            : caseId === 'baselines' ? 'Original exploration screen / not a shipped feature'
              : 'Original design screen / not a product recording'
          : disclosure,
        beats: [step.action, step.response, step.why]
      })),
      { label: 'Evidence', heading: screen ? 'Inspect the evidence.' : 'A clearly scoped contribution.',
        stage: 'design', screen,
        disclosure: concept ? caseId === 'bikecare' ? 'Original mobile concept screen / local working demo in the case' : 'Original concept frames / not working interaction'
          : official ? 'Official product context / Lumel'
            : screen ? 'Original design state / not proof of every interaction' : disclosure,
        copy: solution.evidence },
      { label: caseId === 'bikecare' ? 'Business case' : 'Scope', heading: facts[2][0], stage: 'evidence', copy: facts[2][1],
        note: evidenceNote === facts[2][1] ? undefined : evidenceNote,
        evidence: [facts[2][1], evidenceNote].includes(solution.evidence) ? undefined : solution.evidence,
        decisions: narrative.steps }
    ];
    return content.map((scene, index) => ({
      caseId, kind: 'case', disclosure, ...scene, id: ids[index], narration: scripts[index],
      beats: scene.beats || [scene.copy, scene.note || solution.value, solution.evidence]
    }));
  }, [caseId, name, narrative, facts, screen, evidenceNote, concept]);
  const caseSections = caseId === 'bikecare' ? sections.map(section => section.label === 'Scope' ? { ...section, label: 'Business case' } : section) : sections;
  return <CaseFilmPlayer ref={ref} scenes={scenes} sections={caseSections} clips={filmAudio.cases[caseId]}
    steps={solutionSteps[caseId]} Scene={CaseFilmScene} voiceLabel={filmAudio.label}
    title={name} showTrigger={showTrigger}
    description="Recorded narration and original evidence. Each case keeps its own scope."
    hint="Animated walkthrough with recorded narration, captions, and three selectable solution steps." />;
}
