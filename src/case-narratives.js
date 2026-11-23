export const caseNarratives = {
  powertable: {
    purpose: 'Plan tasks, track time, and review resource assignments in Microsoft Fabric.',
    role: 'End-to-end Gantt and resource UX/UI; Cross-tab contribution.',
    audience: 'Project and resource planners',
    scenario: 'A planner needs task timing, logged effort, and resource assignments to make sense together.',
    goal: 'Connect the planning views without hiding the meaning of the underlying data.',
    choices: [['Disconnected planning context', 'Connect task, time, and resource roles'], ['Unclear ownership', 'Separate end-to-end work from contributions']],
    steps: [
      ['Give the data meaning', 'Map task identity, dates, time entries, resources, and costs.'],
      ['Keep planning in context', 'Bring Gantt and resource settings beside their planning views.'],
      ['Keep scope explicit', 'Distinguish Cross-tab contributions and planning explorations.']
    ]
  },
  mapping: {
    purpose: 'Tell the planning view which columns mean tasks, time, resources, and costs.',
    role: 'End-to-end Gantt and resource mapping UX/UI.',
    audience: 'Project and resource planners',
    goal: "Make each column's purpose and each table relationship understandable before configuration.",
    steps: [
      ['Define the role', 'Separate Task, Time Entries, Resource, and Cost mapping.'],
      ['Expose the relationship', 'Show which Task ID connects logged hours to a task.'],
      ['Explain the dependency', 'Resource mapping enables Standard Cost and Usage Cost.']
    ]
  },
  baselines: {
    purpose: 'Compare the current schedule with a saved reference.',
    role: 'Gantt comparison UX/UI exploration; not a confirmed release.',
    audience: 'Project planners',
    goal: 'Keep a saved reference legible beside the current plan.',
    steps: [
      ['Choose the comparison', 'Limit the view to two comparison selections in total.'],
      ['Read one timeline', 'Keep the current plan and reference visually distinct.'],
      ['Manage separately', 'Separate saved-baseline management from timeline comparison.']
    ]
  },
  backlog: {
    purpose: 'Keep unscheduled tasks beside the plan, with clear pending-change states.',
    role: 'End-to-end Gantt backlog UX/UI.',
    audience: 'Project planners',
    goal: 'Give unscheduled work a clear starting point and an honest change state.',
    steps: [
      ['Explain the empty state', 'Make the add-task action visible before a list exists.'],
      ['Keep the list usable', 'Keep task rows and their actions beside the schedule.'],
      ['Distinguish pending changes', 'Do not make an unsaved change look persisted.']
    ]
  },
  ganttPanel: {
    purpose: 'Adjust timeline, milestone, dependency, color, and label settings beside the plan.',
    role: 'End-to-end Gantt configuration UX/UI.',
    audience: 'Project planners',
    goal: 'Let planners adjust timeline settings without losing the plan.',
    steps: [
      ['Keep the timeline visible', 'Use a contextual side panel instead of leaving the view.'],
      ['Group by purpose', 'Separate Timeline, Milestone, Dependency, Color, and Label.'],
      ['Keep settings focused', 'Give each tab a distinct configuration job.']
    ]
  },
  formatting: {
    purpose: 'Define a resource rule through its condition, targets, and appearance.',
    role: 'End-to-end resource Gantt rule-editor UX/UI.',
    audience: 'Resource planners',
    goal: 'Make the condition, its targets, and its visual treatment distinct decisions.',
    steps: [
      ['Define the condition', 'Schedule hours greater than zero identifies scheduled work, not overload.'],
      ['Choose the scope', 'Keep Targets separate from the appearance settings.'],
      ['Set the style', 'Show the rule editor without inventing an after-Apply result.']
    ]
  },
  resourcePanel: {
    purpose: 'Adjust resource timeline, milestone, color, and label settings in one panel.',
    role: 'End-to-end resource Gantt configuration UX/UI.',
    audience: 'Resource planners',
    goal: 'Keep resource-specific configuration clear and separate from conditional rules.',
    steps: [
      ['Retain the resource context', 'Keep resource settings beside the planning view.'],
      ['Separate four settings', 'Organize Timeline, Milestone, Color, and Label.'],
      ['Keep rules distinct', 'Conditional formatting has its own editing surface.']
    ]
  },
  crosstab: {
    purpose: 'Organize measures by rows and columns for summary and detail.',
    role: 'Cross-tab layout and data configuration contribution.',
    audience: 'Analysts organizing business data',
    goal: 'Explain how rows, columns, and measures relate to a summary-and-detail view.',
    steps: [
      ['Name the dimensions', 'Distinguish row and column configuration.'],
      ['Connect the measures', 'Make the configuration-to-view relationship explicit.'],
      ['Bound the contribution', 'Explain the concept without fabricating a final interface.']
    ]
  },
  analyticsSuite: {
    purpose: 'Create charts, KPI cards, reports, and presentations inside Power BI.',
    role: 'End-to-end Chart Wizard UX/UI; reusable KPI templates; feature-specific contributions.',
    audience: 'Power BI report authors',
    scenario: 'An author moves from choosing a visual to shaping and presenting a report.',
    goal: 'Give discovery, authoring, and presentation a connected product story.',
    choices: [['One assumed authoring task', 'Separate discovery, layout, and presentation'], ['Every state presented as shipped', 'Identify the two confirmed deliveries']],
    steps: [
      ['Find a starting point', 'Chart Wizard connects chart-first and function-first discovery.'],
      ['Shape the report', 'Gantt, Storyboard, and KPI patterns support distinct authoring tasks.'],
      ['Explain the insight', 'Annotations and presentation keep the explanation in context.']
    ]
  },
  wizard: {
    purpose: 'Find a chart by its family or analytical purpose, then configure it.',
    role: 'End-to-end Chart Wizard UX/UI, handoff, and implementation review.',
    audience: 'Power BI report authors',
    goal: 'Support both a known chart choice and an analytical question without duplicating configuration.',
    steps: [
      ['Discover', 'Browse a chart family or start from an analytical function.'],
      ['Customize', 'Shape the chosen visual before advanced configuration.'],
      ['Configure', 'Converge on shared configuration; keep Favorites inside discovery.']
    ]
  },
  storyboard: {
    purpose: 'Start a report from a template, custom layout, or blank canvas.',
    role: 'Feature UX/UI, handoff, and implementation review.',
    audience: 'Power BI report authors',
    goal: 'Connect different report starting points to a coherent authoring canvas.',
    steps: [
      ['Choose a starting point', 'Support template, custom-layout, and blank-report routes.'],
      ['Set the structure', 'Establish the layout before composing the report.'],
      ['Author in context', 'Keep the editing canvas connected to the chosen structure.']
    ]
  },
  gantt: {
    purpose: 'Turn task and date fields into a timeline in Power BI.',
    role: 'Feature UX/UI, handoff, and implementation review.',
    audience: 'Power BI report authors',
    goal: 'Connect chart selection and task/date mapping to a readable schedule.',
    steps: [
      ['Choose Gantt', 'Start from the Analytics+ chart-selection context.'],
      ['Map the fields', 'Give task, start date, and end date distinct meanings.'],
      ['Read the timeline', 'Connect the mapped roles to their schedule context.']
    ]
  },
  presentation: {
    purpose: 'Explain chart observations with annotations, comments, and presentation controls.',
    role: 'Feature UX/UI, handoff, and implementation review.',
    audience: 'Report authors and presenters',
    goal: "Keep an observation, its explanation, and the audience's focus connected.",
    steps: [
      ['Mark the observation', 'Associate an annotation with the chart context.'],
      ['Explain the insight', 'Keep comments and formatting beside the report.'],
      ['Guide attention', 'Use the presentation context to support the explanation.']
    ]
  },
  kpi: {
    purpose: 'Build consistent metric cards from reusable simple and variance patterns.',
    role: 'Reusable KPI template design and delivery.',
    audience: 'Power BI report authors',
    goal: 'Provide reusable KPI starting points while keeping authoring and library management distinct.',
    steps: [
      ['Choose the pattern', 'Separate simple cards from variance arrangements.'],
      ['Shape the card', 'Keep preset choice distinct from authoring controls.'],
      ['Reuse the template', 'Connect the confirmed template delivery to library evidence.']
    ]
  }
};
