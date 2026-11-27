export const caseNarratives = {
  powertable: {
    purpose: 'PowerTable helps teams organize business data, plan tasks over time, and review who is assigned to the work inside Microsoft Fabric.',
    problem: 'A project plan needs more than dates: planners must connect the work, the people doing it, and the hours recorded against it. Those relationships are hard to interpret when data setup and view settings feel disconnected.',
    role: 'Complete Gantt and Resource Gantt UX/UI ownership; Cross-tab contribution.',
    decision: 'I connected task, time-entry and resource mapping with contextual Gantt/resource settings, keeping each data role explicit instead of flattening everything into one configuration flow.',
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
    purpose: 'Column Mapping connects source data to a planning view by identifying task names, dates, logged hours, people, and costs.',
    problem: 'A table of business data does not explain which column is a task identifier, a date, or a record of effort. Planners need to assign those roles and connect related tables before the schedule can have a clear meaning.',
    role: 'End-to-end Gantt and resource mapping UX/UI.',
    decision: 'I split mapping into Task, Time Entries, Resource and Cost tabs, and exposed table IDs and dependencies. This used more label space, but made relationships inspectable before planners configured the timeline.',
    audience: 'Project and resource planners',
    goal: "Make each column's purpose and each table relationship understandable before configuration.",
    steps: [
      ['Define the role', 'Separate Task, Time Entries, Resource, and Cost mapping.'],
      ['Expose the relationship', 'Show which Task ID connects logged hours to a task.'],
      ['Explain the dependency', 'Resource mapping enables Standard Cost and Usage Cost.']
    ]
  },
  baselines: {
    purpose: 'A baseline is a saved schedule used as a reference; this exploration compares it with the current plan to explain timing differences.',
    problem: 'When a schedule changes, looking only at the latest dates hides how it differs from an earlier plan. Planners need a recognizable reference without crowding the timeline with too many comparisons.',
    role: 'Gantt comparison UX/UI exploration; not a confirmed release.',
    decision: 'I proposed two comparison selections on one timeline and a separate surface for saved-baseline management, trading unlimited comparison for a more focused reference.',
    audience: 'Project planners',
    goal: 'Keep a saved reference legible beside the current plan.',
    steps: [
      ['Choose the comparison', 'Limit the view to two comparison selections in total.'],
      ['Read one timeline', 'Keep the current plan and reference visually distinct.'],
      ['Manage separately', 'Separate saved-baseline management from timeline comparison.']
    ]
  },
  backlog: {
    purpose: 'A backlog holds tasks that do not yet have scheduled dates, so planners can capture and manage future work beside the timeline.',
    problem: 'Not every task is ready to receive dates. Planners still need a clear place to add and manage that work, and they need to know whether a change is only pending or has been saved.',
    role: 'End-to-end Gantt backlog UX/UI.',
    decision: 'I designed empty, populated and pending-change states as one sequence, making the next action and unsaved status explicit instead of presenting the backlog as a static task list.',
    audience: 'Project planners',
    goal: 'Give unscheduled work a clear starting point and an honest change state.',
    steps: [
      ['Explain the empty state', 'Make the add-task action visible before a list exists.'],
      ['Keep the list usable', 'Keep task rows and their actions beside the schedule.'],
      ['Distinguish pending changes', 'Do not make an unsaved change look persisted.']
    ]
  },
  ganttPanel: {
    purpose: 'The Gantt side panel configures a task timeline: its working calendar, key dates, task relationships, colors, and labels.',
    problem: 'Working hours, milestone symbols, task dependencies, and labels serve different purposes. A single undifferentiated settings list would make it hard to find the relevant control while keeping the schedule in view.',
    role: 'End-to-end Gantt configuration UX/UI.',
    decision: 'I grouped controls into Timeline, Milestone, Dependency, Color and Label tabs beside the schedule, accepting one tab choice to avoid a single crowded settings surface.',
    audience: 'Project planners',
    goal: 'Let planners adjust timeline settings without losing the plan.',
    steps: [
      ['Keep the timeline visible', 'Use a contextual side panel instead of leaving the view.'],
      ['Group by purpose', 'Separate Timeline, Milestone, Dependency, Color, and Label.'],
      ['Keep settings focused', 'Give each tab a distinct configuration job.']
    ]
  },
  formatting: {
    purpose: 'Conditional formatting changes how work is highlighted when its data matches a rule, such as having scheduled hours greater than zero.',
    problem: 'A highlighted assignment is useful only when its meaning is clear. Resource planners need to understand which data matches a rule, what it affects, and how the match will look without confusing scheduled work with overload.',
    role: 'End-to-end resource Gantt rule-editor UX/UI.',
    decision: 'I separated condition, target scope and visual style, so a rule could explain what qualifies before showing how it should look. Scheduled hours greater than zero means scheduled work, not overload.',
    audience: 'Resource planners',
    goal: 'Make the condition, its targets, and its visual treatment distinct decisions.',
    steps: [
      ['Define the condition', 'Schedule hours greater than zero identifies scheduled work, not overload.'],
      ['Choose the scope', 'Keep Targets separate from the appearance settings.'],
      ['Set the style', 'Show the rule editor without inventing an after-Apply result.']
    ]
  },
  resourcePanel: {
    purpose: 'The Resource side panel configures a people-and-assignments timeline, including working capacity, milestone symbols, bar colors, and labels.',
    problem: 'Resource planners need to adjust working time and the appearance of assignments without mixing those view settings with data-driven formatting rules. Task bars and grouped summaries also need distinct controls.',
    role: 'End-to-end resource Gantt configuration UX/UI.',
    decision: 'I kept four focused configuration tabs beside assignments and put conditional formatting in a separate editor, distinguishing changes to the view from rules applied to its data.',
    audience: 'Resource planners',
    goal: 'Keep resource-specific configuration clear and separate from conditional rules.',
    steps: [
      ['Retain the resource context', 'Keep resource settings beside the planning view.'],
      ['Separate four settings', 'Organize Timeline, Milestone, Color, and Label.'],
      ['Keep rules distinct', 'Conditional formatting has its own editing surface.']
    ]
  },
  crosstab: {
    purpose: 'Cross-tab groups business data by two sets of categories, such as products down the rows and months across columns, with values and totals between them.',
    problem: 'Individual records can obscure the business question. An analyst needs to choose which categories organize the rows and columns, and which numerical values are summarized, to create a useful view.',
    role: 'Cross-tab layout and data configuration contribution.',
    decision: 'I focused my contribution on how row dimensions, column dimensions and measures connect to the summary layout, making the configuration-to-view relationship explicit.',
    audience: 'Analysts organizing business data',
    goal: 'Explain how rows, columns, and measures relate to a summary-and-detail view.',
    steps: [
      ['Name the dimensions', 'Distinguish row and column configuration.'],
      ['Connect the measures', 'Make the configuration-to-view relationship explicit.'],
      ['Bound the contribution', 'Explain the concept without fabricating a final interface.']
    ]
  },
  analyticsSuite: {
    purpose: 'Analytics+ helps Power BI authors turn business data into charts, headline metric cards, composed reports, and presentations.',
    problem: 'An author may know the business question but not the right chart, layout, or way to explain the result. Discovery, report composition, and presentation need to connect without treating them as one undifferentiated task.',
    role: 'End-to-end Analytics+ UX/UI; selected features presented here.',
    decision: 'I organized the experience around choosing a visual, building a report and explaining an insight, so each stage had a clear job within one connected authoring flow.',
    audience: 'Power BI report authors',
    scenario: 'An author moves from choosing a visual to shaping and presenting a report.',
    goal: 'Give discovery, authoring, and presentation a connected product story.',
    choices: [['One assumed authoring task', 'Separate discovery, layout, and presentation'], ['A feature catalogue', 'Selected decisions from end-to-end product work']],
    steps: [
      ['Find a starting point', 'Chart Wizard connects chart-first and function-first discovery.'],
      ['Shape the report', 'Gantt, Storyboard, and KPI patterns support distinct authoring tasks.'],
      ['Explain the insight', 'Annotations and presentation keep the explanation in context.']
    ]
  },
  wizard: {
    purpose: 'Chart Wizard helps report authors choose a visual by chart type or by the question they want to answer, then configure its appearance and analysis.',
    problem: 'A large chart catalogue assumes authors know what to look for. Some know a chart name; others only know they need to compare values or show a trend. Both need a route to the same configuration workflow.',
    role: 'End-to-end Chart Wizard UX/UI, handoff, and implementation review.',
    decision: 'I gave authors chart-first and function-first discovery, then brought both into shared Customize and Advanced stages. The extra entry choice supports different starting points without duplicating configuration.',
    audience: 'Power BI report authors',
    goal: 'Support both a known chart choice and an analytical question without duplicating configuration.',
    steps: [
      ['Discover', 'Browse a chart family or start from an analytical function.'],
      ['Customize', 'Shape the chosen visual before advanced configuration.'],
      ['Configure', 'Converge on shared configuration; keep Favorites inside discovery.']
    ]
  },
  storyboard: {
    purpose: 'Storyboard is the report-building workspace where authors arrange charts, metric cards, and tables, starting from a template, custom layout, or blank canvas.',
    problem: 'Authors do not all need the same starting point: some want a ready-made report structure, while others need control over the arrangement. A mandatory template or empty canvas would make one group do unnecessary setup.',
    role: 'Complete Storyboard UX/UI ownership, handoff, and implementation review.',
    decision: 'I preserved template, custom-layout and blank-report starting points, then connected them to the authoring canvas instead of forcing every author through the same amount of setup.',
    audience: 'Power BI report authors',
    goal: 'Connect different report starting points to a coherent authoring canvas.',
    steps: [
      ['Choose a starting point', 'Support template, custom-layout, and blank-report routes.'],
      ['Set the structure', 'Establish the layout before composing the report.'],
      ['Author in context', 'Keep the editing canvas connected to the chosen structure.']
    ]
  },
  gantt: {
    purpose: 'Analytics+ Gantt turns task names and dates into horizontal bars on a timeline, helping Power BI report readers understand when work is planned.',
    problem: 'A task table is not yet a schedule. Authors need to understand which fields define the task and its dates, then see how those choices relate to the timeline rather than guessing from the finished chart.',
    role: 'Complete Analytics+ Gantt UX/UI ownership, handoff, and implementation review.',
    decision: 'I connected chart selection and explicit task/start/end-date mapping to the timeline, showing how source fields acquire scheduling meaning rather than presenting only a finished chart.',
    audience: 'Power BI report authors',
    goal: 'Connect chart selection and task/date mapping to a readable schedule.',
    steps: [
      ['Choose Gantt', 'Start from the Analytics+ chart-selection context.'],
      ['Map the fields', 'Give task, start date, and end date distinct meanings.'],
      ['Read the timeline', 'Connect the mapped roles to their schedule context.']
    ]
  },
  presentation: {
    purpose: 'Annotations attach an explanation to a chart observation, while presentation controls help an author guide an audience through the report.',
    problem: 'A chart can show a pattern without explaining why it matters. Presenters need to connect a specific observation to a readable note and direct audience attention without separating the explanation from its data.',
    role: 'Feature UX/UI, handoff, and implementation review.',
    decision: 'I kept annotations, explanation and presentation controls in the report context, so the intended observation could stay connected to its data rather than becoming a detached note.',
    audience: 'Report authors and presenters',
    goal: "Keep an observation, its explanation, and the audience's focus connected.",
    steps: [
      ['Mark the observation', 'Associate an annotation with the chart context.'],
      ['Explain the insight', 'Keep comments and formatting beside the report.'],
      ['Guide attention', 'Use the presentation context to support the explanation.']
    ]
  },
  kpi: {
    purpose: 'KPI presets are reusable layouts for headline business metrics; Simple shows the value, while Variance adds comparisons such as a difference from a target.',
    problem: 'Repeatedly arranging a value, label, comparison, and icon creates avoidable design work and inconsistent reading order. Authors need recognizable starting patterns for both a standalone metric and a comparison-led card.',
    role: 'Reusable KPI template design and delivery.',
    decision: 'I separated Simple and Variance presets by reading task, giving standalone metrics and comparison-led cards distinct reusable structures instead of treating every KPI as the same layout.',
    audience: 'Power BI report authors',
    goal: 'Provide reusable KPI starting points for standalone metrics and comparisons.',
    steps: [
      ['Choose the pattern', 'Separate simple cards from variance arrangements.'],
      ['Compare variance patterns', 'Show alternate comparison arrangements in the Variance tab.'],
      ['Design for reuse', 'Connect the shipped templates to the original pattern sheet.']
    ]
  }
};

export const caseHighlights = {
  bikecare: {
    problem: 'Local servicing leaves riders remembering care dates and piecing together service history.',
    role: 'Independent UX/UI concept, desk research and clickable prototype.',
    decision: 'I connected approved work, rider-confirmed records and service reminders.',
    evidence: 'Original screens and simulated handovers; adoption and rider outcomes remain untested.'
  },
  codShield: {
    problem: 'Repeated unwanted deliveries leave residents refusing parcels after dispatch.',
    role: 'Independent service design, recipient flows and safety safeguards.',
    decision: 'I proposed one verified case per app, with consent, expiry and appeal.',
    evidence: 'Eleven concept screens and a simulation; no active protection or user testing.'
  },
  spatial: {
    problem: 'A floating report still needs a recognizable path from launch to reading.',
    role: 'Analytics+ spatial visual exploration.',
    decision: 'I retained familiar launcher, entry and report frames.',
    evidence: 'Three original frames; spatial interactions and usability remain unvalidated.'
  },
  powertable: {
    problem: 'Task timing, logged effort and resource assignments need connected but distinct meanings.',
    role: 'Complete Gantt and Resource Gantt UX/UI ownership; Cross-tab contribution.',
    decision: 'I connected mapping and contextual settings while preserving each data role.',
    evidence: 'Gantt/resource design work; baseline and earned-value work remain explorations.'
  },
  analyticsSuite: {
    problem: 'Chart discovery, report building and presentation serve different author needs.',
    role: 'End-to-end Analytics+ UX/UI; selected features shown.',
    decision: 'I connected discovery, authoring and presentation without treating them as one task.',
    evidence: 'Chart Wizard and reusable KPI templates shipped; other work remains separately evidenced.'
  },
  mapping: {
    purpose: 'Connect task, time-entry, resource and cost data to planning views.',
    problem: 'Source columns need explicit planning roles and visible table relationships.',
    role: 'End-to-end Gantt and resource mapping UX/UI.',
    decision: 'I separated four mapping domains and exposed their IDs and dependencies.',
    evidence: 'Five design states; setup-error reduction was not measured.',
    screen: 'Time-entry mapping: I designed how logged hours connect to the tasks they belong to.'
  },
  baselines: {
    purpose: 'Compare the current schedule with a saved reference.',
    problem: 'Changing dates hide how the current plan differs from its reference.',
    role: 'Gantt comparison UX/UI exploration.',
    decision: 'I limited comparison to two selections and separated baseline management.',
    evidence: 'Selection, timeline and management states; exploration, not a confirmed release.',
    screen: 'Saved-plan comparison: I explored showing the current schedule beside an earlier saved version.'
  },
  backlog: {
    purpose: 'Keep tasks without dates beside the schedule.',
    problem: 'Unscheduled tasks need a home; pending edits must not look saved.',
    role: 'End-to-end Gantt backlog UX/UI.',
    decision: 'I connected empty, task-list and pending-change states.',
    evidence: 'Original design states; production persistence is unverified.',
    screen: 'Backlog tasks: I designed an editable list for work without scheduled dates.'
  },
  ganttPanel: {
    purpose: 'Adjust timeline settings without leaving the plan.',
    problem: 'Many settings need clear groups without obscuring the schedule.',
    role: 'End-to-end Gantt configuration UX/UI.',
    decision: 'I grouped controls into five focused tabs beside the schedule.',
    evidence: 'Five tab states; live-preview behavior is unverified.',
    screen: 'Schedule settings: I grouped working days, daily hours and holidays in one panel.'
  },
  formatting: {
    purpose: 'Highlight resource work using an explicit data rule.',
    problem: 'A highlight means little when its condition or targets are unclear.',
    role: 'End-to-end resource rule-editor UX/UI.',
    decision: 'I separated the condition, target scope and visual style.',
    evidence: 'Original rule editor; an after-Apply result is not shown.',
    screen: 'Highlight rules: I separated conditions, targets and styles; scheduled work is not overload.'
  },
  resourcePanel: {
    purpose: 'Adjust working time and assignment appearance in the resource view.',
    problem: 'View settings and conditional rules serve different planning tasks.',
    role: 'End-to-end resource Gantt configuration UX/UI.',
    decision: 'I separated four configuration tabs from the conditional-rule editor.',
    evidence: 'Four supplied tab states document the configuration design.',
    screen: 'Resource settings: I grouped working hours and appearance controls beside team assignments.'
  },
  crosstab: {
    purpose: 'Summarize business values across row and column categories.',
    problem: 'Raw records need a meaningful layout before they reveal useful comparisons.',
    role: 'Cross-tab layout and data-configuration contribution.',
    decision: 'I made the relationship between dimensions, measures and layout explicit.',
    evidence: 'Contribution notes and a concept diagram; no dedicated interface supplied.',
    screen: 'Summary layout: I connected categories and values into a comparison.'
  },
  wizard: {
    purpose: 'Find a chart by name or by the question it answers.',
    problem: 'Some authors know a chart; others only know their analytical question.',
    role: 'End-to-end Chart Wizard UX/UI, handoff and implementation review.',
    decision: 'I joined chart-first and function-first discovery into shared configuration.',
    evidence: 'Chart Wizard shipped; customer-impact measurements are not available.',
    screen: 'Chart selection: I combined chart types and recommendations so authors can choose a visual.'
  },
  storyboard: {
    purpose: 'Start a report from a template, layout or blank canvas.',
    problem: 'A mandatory starting route assumes every author needs the same setup.',
    role: 'Complete Storyboard UX/UI ownership, handoff and implementation review.',
    decision: 'I connected different starting points to one authoring canvas.',
    evidence: 'Six product screens document report creation and template states.',
    screen: 'Report starting points: I offered templates, custom layouts and a blank-canvas option.'
  },
  gantt: {
    purpose: 'Turn task names and dates into a schedule in Power BI.',
    problem: 'A table becomes a schedule only when task and date roles are explicit.',
    role: 'Complete Analytics+ Gantt UX/UI ownership, handoff and implementation review.',
    decision: 'I connected chart selection, task/date mapping and the timeline.',
    evidence: 'Three supplied crops; scheduling accuracy was not measured.',
    screen: 'Timeline mapping: I showed which task dates belong in the schedule.'
  },
  presentation: {
    purpose: 'Explain chart observations and guide attention within the report.',
    problem: 'A visible chart pattern does not explain why it matters.',
    role: 'Annotations and presentation UX/UI, handoff and implementation review.',
    decision: 'I connected chart annotations, explanation and in-report presentation controls.',
    evidence: 'Nine original design screens; release and audience outcomes are unverified.',
    screen: 'Report presentation: I placed the start-presenting action beside the report notes.'
  },
  kpi: {
    purpose: 'Start a headline metric card from a reusable pattern.',
    problem: 'Blank-card setup repeatedly asks authors to arrange values and comparisons.',
    role: 'Reusable KPI template design and delivery.',
    decision: 'I separated Simple and Variance presets by reading task.',
    evidence: 'Reusable KPI templates shipped; setup-time savings were not measured.',
    screen: 'Metric card layouts: I designed reusable starting patterns for headline business numbers.'
  }
};
