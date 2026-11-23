import { caseFeatureEvidence } from './case-feature-evidence.js';
import { bikecareScreens } from './bikecare-story.js';
import { codScreens } from './cod-shield-story.js';

function screen(file, width, height, label, caption = `Original design screen / ${label}.`) {
  return { src: `/assets/${file}.png`, width, height, label, alt: label, caption };
}

const feature = Object.fromEntries(Object.entries(caseFeatureEvidence).map(([id, evidence]) =>
  [id, { ...evidence, caption: `Original design screen / ${evidence.label}.` }]));

const taskMapping = screen('fabric-gantt-configuration', 1912, 1038, 'Task and date mapping in the Gantt workspace');
const resourceMapping = screen('fabric-mapping-resource', 780, 588, 'Resource field mapping');
const dependency = screen('fabric-gantt-config-dependency', 602, 823, 'Gantt dependency settings');
const ganttLabels = screen('fabric-gantt-config-label', 602, 823, 'Gantt label settings');
const resourceColor = screen('fabric-resource-config-data-color', 604, 825, 'Resource color settings');
const resourceLabels = screen('fabric-resource-config-label', 604, 825, 'Resource label settings');
const storyboardEditor = screen('storyboard-editor', 1390, 782, 'Storyboard report authoring canvas');
const presentationControls = screen('presentation-screen-06', 1707, 830, 'Report presentation toolbar and guidance');

export const solutionScreens = {
  powertable: [feature.mapping, feature.ganttPanel, feature.resourcePanel],
  mapping: [taskMapping, feature.mapping, resourceMapping],
  baselines: [
    { ...feature.baselines, caption: 'Original exploration / Selecting a current plan and one baseline. Not a shipped feature.' },
    screen('fabric-baseline-timeline', 918, 692, 'Current plan and baseline timeline comparison',
      'Original exploration / A visually distinct comparison reference. Not a shipped feature.'),
    screen('fabric-baseline-manager', 350, 360, 'Separate baseline management panel',
      'Original exploration / Baseline administration, not evidence of working creation or persistence.')
  ],
  backlog: [
    screen('fabric-backlog-empty', 350, 550, 'Backlog empty state and add-task action'),
    feature.backlog,
    screen('fabric-backlog-pending', 500, 40, 'Pending changes indicator',
      'Original toolbar detail / Pending changes, not proof of a saved result.')
  ],
  ganttPanel: [feature.ganttPanel, dependency, ganttLabels],
  formatting: ['Condition: Schedule Hours greater than zero', 'Targets: scope selectors', 'Style: appearance controls'].map(label =>
    ({ ...feature.formatting, caption: `Same original editor state / ${label}. No after-Apply result is supplied.` })),
  resourcePanel: [feature.resourcePanel, resourceColor, resourceLabels],
  analyticsSuite: [feature.wizard, storyboardEditor, presentationControls],
  wizard: [
    feature.wizard,
    screen('wizard-customize', 540, 370, 'Chart Wizard Customize controls'),
    screen('wizard-advanced', 540, 370, 'Chart Wizard Advanced configuration')
  ],
  storyboard: [
    feature.storyboard,
    screen('custom-layout', 1350, 759, 'Custom report layout and element controls'),
    storyboardEditor
  ],
  gantt: [
    screen('gantt-entry', 440, 355, 'Gantt selection in Analytics+'),
    feature.gantt,
    screen('gantt-timeline', 1406, 786, 'Analytics+ Gantt timeline')
  ],
  presentation: [
    screen('presentation-screen-07', 1707, 830, 'Annotation callout pointing to a monthly chart observation'),
    screen('presentation-screen-03', 1707, 830, 'Presentation text formatting and template style controls'),
    presentationControls
  ],
  kpi: [
    feature.kpi,
    screen('kpi-variance', 2000, 1046, 'Variance KPI patterns beside the report canvas'),
    screen('kpi-preset-library', 1996, 211, 'Reusable KPI pattern design sheet',
      'Original design sheet / Reusable patterns, not a working library interface.')
  ],
  spatial: [
    screen('analytics-spatial-launch', 275, 156, 'Spatial launcher concept'),
    screen('analytics-spatial-entry', 280, 156, 'Analytics+ spatial entry concept'),
    screen('analytics-spatial-report', 276, 156, 'Spatial report concept')
  ].map(evidence => ({ ...evidence, caption: 'Original concept frame / Unvalidated spatial exploration. Supplied resolution is retained.' })),
  bikecare: ['jobcard', 'review', 'shop'].map(id => bikecareScreens.find(item => item.id === id)),
  codShield: ['report', 'pending', 'active'].map(id => codScreens.find(item => item.id === id))
};

export const solutionOverviewScreens = {
  ...feature,
  ...Object.fromEntries(Object.entries(solutionScreens).filter(([id]) => !feature[id]).map(([id, screens]) => [id, screens[0]])),
  baselines: solutionScreens.baselines[0],
  formatting: { ...feature.formatting, caption: 'Original rule editor / Schedule Hours > 0 indicates scheduled work. No after-Apply result is supplied.' }
};
