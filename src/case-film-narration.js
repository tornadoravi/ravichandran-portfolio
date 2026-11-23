export const solutionNarration = {
  powertable: [
    'First, give tasks, dates, time entries, and resources clear roles. The planner can understand what each table contributes before interpreting the schedule.',
    'Next, configure Gantt beside the plan. Timeline, milestone, dependency, color, and label settings have separate jobs, so a planner can find the relevant control without losing context.',
    'Then, review resources in their own planning context. View settings and conditional rules remain separate, so assignment data, layout, and rule meaning do not become one mixed-up task.'
  ],
  mapping: [
    'First, identify task fields and their dates. Mapping gives each source column a planning role. A useful timeline depends on those meanings, not just familiar column names.',
    'Next, connect time entries using Task I D and logged hours. The shared identifier explains which task the effort belongs to, making the relationship visible rather than assumed.',
    'Then, define resource roles and review the dependent cost mapping. Resource and Cost have focused tabs, so separate data responsibilities remain understandable.'
  ],
  baselines: [
    'First, select the current plan and a saved reference. This exploration limits comparison to two selections in total, keeping the timeline readable instead of stacking many references.',
    'Next, read the current plan alongside the visually distinct reference. Shared timeline context makes the difference explainable against a visible plan, rather than memory.',
    'Then, manage saved baselines in a separate surface. Administration should not interrupt comparison. These exploration screens do not establish a baseline creation flow.'
  ],
  backlog: [
    'First, use the empty backlog as a starting point for adding work. An explained next action is more useful than a blank panel, especially when a task does not have dates yet.',
    'Next, review task rows and their actions beside the schedule. The backlog remains connected to the planning context instead of becoming a separate, unexplained list.',
    'Then, check the pending indicator. An edit that has not been persisted must look different from saved work. The supplied design screens do not verify database persistence.'
  ],
  ganttPanel: [
    'First, choose the setting category: Timeline, Milestone, Dependency, Color, or Label. Each tab has a clear purpose, so the planner does not have to search one long list.',
    'Next, use the focused controls in that tab. Scheduling behavior stays separate from appearance, making the meaning of each configuration choice easier to understand.',
    'Then, relate the controls to the adjacent plan. Keeping the schedule in sight preserves context. These design states do not establish a working live preview.'
  ],
  formatting: [
    'First, define the condition. Schedule hours greater than zero identifies scheduled work. It does not establish overload, so the rule must not imply a capacity problem.',
    'Next, choose the targets. What matches the condition and which parts of the view are affected are separate decisions. Neither should be hidden inside the color choice.',
    'Then, choose the appearance. Condition, scope, and style together explain the visual signal. The supplied evidence stops at rule editing, not an applied timeline result.'
  ],
  resourcePanel: [
    'First, choose Timeline, Milestone, Color, or Label. These four tabs group resource settings by purpose, helping the planner locate the relevant configuration area.',
    'Next, set the detail for that area. Resource layout settings stay separate from the conditional rule editor, so a view choice is not confused with a data-driven condition.',
    'Then, relate the setting to the adjacent resource view. This keeps assignments in context without claiming verified live updates, capacity accuracy, or measured productivity gains.'
  ],
  crosstab: [
    'First, choose a row dimension. It determines one part of the reading structure, helping an analyst understand why the same dataset can be organized in different ways.',
    'Next, choose a column dimension. Columns add a second perspective on the data. Rows and columns are complementary layout choices, not interchangeable labels.',
    'Then, relate the measure to those dimensions. Measures supply the values within the structure. This is a contribution-level explanation, not a fabricated final interface or measured outcome.'
  ],
  analyticsSuite: [
    'First, discover a visual through a known chart or an analytical question. Chart Wizard brings these starting points into shared configuration, rather than separate setup systems.',
    'Next, shape the report with the feature that fits the task. Metric patterns, timelines, and layouts serve different needs, so the product story explains each contribution separately.',
    'Then, explain the insight near the report through annotation and presentation. The audience needs context, not only a chart. Chart Wizard and reusable metric-template delivery are confirmed; other feature states keep their own scope.'
  ],
  wizard: [
    'First, discover a chart. Browse Chart families when you know the visual, or start with Function when you know the analytical question. Both routes lead toward the same configuration workflow.',
    'Next, customize styling and visibility. Keeping appearance choices together helps the author focus on presentation without facing every analytical control at once.',
    'Then, use Advanced for analytical settings and sorting. Both discovery routes share this configuration, while Favorites stay in discovery. Different starting needs do not require duplicate settings systems.'
  ],
  storyboard: [
    'First, choose a template, custom layout, or blank report. The starting route reflects how much structure the author needs, instead of forcing everyone into one setup.',
    'Next, establish the layout for that route. Understanding the structure before arranging content connects report creation with composition.',
    'Then, continue into the authoring canvas. The chosen starting structure stays connected to editing. Supplied screens explain the journey but do not verify every interaction.'
  ],
  gantt: [
    'First, choose Gantt within Analytics Plus for Power B I. The timeline begins in the chart-selection workflow, not the separate Power Table product in Microsoft Fabric.',
    'Next, assign task, start-date, and end-date fields. Clear column roles explain what the schedule will represent before the author interprets the timeline.',
    'Then, read the timeline in relation to the mapped fields. The design connects source data with schedule context. These states do not establish measured scheduling accuracy.'
  ],
  presentation: [
    'First, mark the relevant chart observation. An annotation connects the explanation to a specific point, so the audience knows which part of the report is being discussed.',
    'Next, explain the meaning through a comment and its formatting. Keeping the explanation beside the observation helps the chart communicate a point rather than expecting the data to explain itself.',
    'Then, guide attention in the presentation context. Observation, explanation, and audience focus stay connected. The screens do not establish improved audience understanding in actual use.'
  ],
  kpi: [
    'First, choose a simple metric pattern or a variance arrangement. Different starting structures serve different reading tasks, so the author does not have to begin every card from scratch.',
    'Next, shape the card using authoring controls. Selecting a pattern and adapting the actual card remain separate decisions. Reuse does not replace the choices that make a metric meaningful.',
    'Then, find and organize reusable templates in the library. Browsing presets and managing them have distinct responsibilities. Template delivery is confirmed, but setup-time savings are not measured.'
  ]
};

export const spatialNarration = [
  'This is Analytics Plus, explored beyond the screen. Three concept frames carry a familiar application workflow into a spatial setting. They are not a shipped Vision Pro product or validated interaction.',
  'The design question is how to keep entry and report viewing recognizable in a spatial environment. Familiar structure is an orientation hypothesis, not proof of comfort, readability, or accessibility.',
  'First, launch from the proposed app launcher in the room-like environment. This frame introduces a recognizable starting point without claiming tested gaze, gesture, or physical interaction behavior.',
  'Next, enter Analytics Plus in a floating window. Keeping the familiar application identity connects the entry experience to the spatial proposal. Whether that continuity helps users still needs validation.',
  'Then, view the report frame with charts and a table. The familiar destination carries into the proposal, but readable text, comfortable placement, accessibility, and interaction are not established by an image.',
  'The evidence is three authored concept frames: launch, entry, and report. You can inspect the original sequence. These are visual proposals, not footage or working spatial interactions.',
  'This remains a concept exploration. Gaze, gestures, comfort, accessibility, and spatial controls need real testing. There is no Vision Pro release or measured user benefit claimed here.'
];

export const standaloneNarration = {
  spatial: spatialNarration,
  bikecare: [
    'BikeCare is an Indian two-wheeler UX and UI concept. Motorcycles, scooters, mopeds and electric vehicles have separate care needs. Riders and local workshop teams connect approval, records, reminders and recovery. This is a design prototype, not a production app.',
    'The starting observation is local servicing, forgotten care and missing resale records. GarageMate, Hero and Royal Enfield already document relevant features. Public-source desk research guides this design; interviews and usability results are not invented.',
    'First, approve the service. The advisor records the complaint, intake and itemised estimate. The rider approves this version before mechanic work. Additional parts require fresh approval. Brand-style job cards do not imply manufacturer integration.',
    'Next, carry care forward. Work, billing and rider review stay separate. Optional feedback follows confirmation; only requested follow-up creates a complaint. Confirmed history supports supplied reminders and private resale. Unknown intervals stay blank.',
    'Then, connect parts and rides. Supplier review is not proof of every part genuine. Check fit and manufacturer evidence. Public, club and company motorcycle rides need organiser review. Exact meetup details remain private; joining is not a safety guarantee.',
    'Explore vehicle and EV setup, access recovery, workshop handovers, care, shopping, motorcycle rides and support. Switch the custom light and dark themes. The case names its scenario coverage and limits. Every account, transaction and trip is fictional.',
    'The business case is useful care beyond one visit: clearer workshop handovers, maintenance cues, resale records, relevant parts and motorcycle communities. Adoption, repeat purchases and resale gains are hypotheses. No business or primary-research results are claimed.'
  ]
};
