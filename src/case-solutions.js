export const caseSolutions = {
  powertable: {
    idea: 'Connect the meaning of task, time, and resource data before asking a planner to configure the views.',
    example: 'A planner needs to understand both the schedule and the people assigned to it. Task mapping identifies the work; time entries connect logged effort through Task ID; resource settings keep assignments in their own planning context.',
    approach: 'Use focused data-role mapping and contextual Gantt/resource configuration rather than treating every column and setting as interchangeable.',
    reason: 'A connected workflow still needs clear boundaries. Task timing, logged effort, and resource settings answer different questions.',
    value: 'Help planners understand what each view represents and make configuration decisions without losing the planning context.',
    evidence: 'My scope is end-to-end Gantt and resource UX/UI, plus Cross-tab contribution. Baseline and resource earned-value ideas remain explorations; this is not whole-product ownership.'
  },
  mapping: {
    idea: 'Give every source column a defined job so the planning view can represent tasks, logged effort, resources, and costs correctly.',
    example: 'A planner wants logged hours attached to the right task. They identify task data first, then select the time-entry table, Task ID, and logged-hours column. The shared ID explains which task those hours belong to.',
    approach: 'Separate Task, Time Entries, Resource, and Cost into focused tabs. Make table relationships and resource-dependent cost roles explicit instead of relying on column names alone.',
    reason: 'More labels take space, but expose relationships that would otherwise be easy to misunderstand. Focused tabs avoid one crowded mapping surface.',
    value: 'Help planners understand the data connection before configuration, rather than troubleshooting a timeline built from the wrong column roles.',
    evidence: 'Five supplied configuration states support the UX/UI explanation and handoff scope. They are not a recording of successful mapping or proof of reduced setup errors.'
  },
  baselines: {
    idea: 'Keep a saved schedule reference beside the current plan, without mixing comparison with baseline administration.',
    example: 'A planner wants to understand how the current schedule differs from an earlier reference. They select the comparison, read the two visually distinct timelines together, and use a separate manager when administering saved baselines.',
    approach: 'Limit comparison to two selections in total. Keep the reference legible on the same timeline, while separating saved-baseline management from the comparison task.',
    reason: 'Unbounded comparisons make the timeline harder to interpret. Separating management keeps administrative actions from interrupting the reading task.',
    value: 'Help planners explain schedule differences against an identifiable reference instead of remembering what an earlier plan looked like.',
    evidence: 'This remains a UX/UI exploration. Supplied selection, timeline, and management states do not establish a baseline-creation flow, shipped behavior, or measured planning improvement.'
  },
  backlog: {
    idea: 'Give work without dates a clear place to start, and make pending changes visibly different from saved work.',
    example: 'A planner has a task that is not ready for scheduling. The empty backlog points to adding work; the populated list makes task actions available beside the schedule. A pending indicator distinguishes a change that has not yet been persisted.',
    approach: 'Design the empty state, usable task list, and pending-change state as connected parts of the same workflow, not unrelated screens.',
    reason: 'An empty panel should explain the next action. A populated panel must also communicate the status of changes, not just display rows.',
    value: 'Help planners capture unscheduled work and understand its change state without mistaking an in-progress edit for a saved task.',
    evidence: 'Two supplied states explain the interface decisions. Database persistence and the complete scheduling interaction are not verified by these design screens.'
  },
  ganttPanel: {
    idea: 'Let planners find a specific timeline setting without leaving the plan or searching one long configuration surface.',
    example: 'A planner wants to change how task dependencies are represented. They use the Dependency tab beside the schedule rather than searching through colors and labels. Appearance settings remain available in their own tabs.',
    approach: 'Use a contextual side panel with five focused areas: Timeline, Milestone, Dependency, Color, and Label. Separate scheduling behavior from visual appearance.',
    reason: 'Tabs add a navigation choice, but make the purpose of each setting clearer. The adjacent planning context explains what the controls relate to.',
    value: 'Help planners locate the setting relevant to their task while keeping the schedule available as context.',
    evidence: 'Five supplied tab states support the configuration design. They do not prove live preview, runtime behavior, or faster configuration in customer use.'
  },
  formatting: {
    idea: 'Treat a formatting rule as three decisions: which data matches, which targets it affects, and how the match should look.',
    example: 'A resource planner wants scheduled work to stand out. They define Schedule hours greater than zero, choose the targets, then set the appearance. Positive scheduled hours identify scheduled work; they do not establish overload.',
    approach: 'Keep condition, scope, and style distinct within the resource rule editor. Explain the meaning of the condition before presenting its visual treatment.',
    reason: 'A color is only useful when its meaning and scope are clear. Separating these choices avoids implying that every highlighted assignment is a capacity problem.',
    value: 'Help planners express a meaningful visual rule and understand exactly what the rule is intended to highlight.',
    evidence: 'The supplied evidence is one rule-editing state. An applied timeline result, improved capacity decisions, and measured usability gains are not established.'
  },
  resourcePanel: {
    idea: 'Organize resource-view settings around their purpose, while keeping conditional rules in a separate editing surface.',
    example: 'A resource planner wants to adjust the timeline or labels without leaving the assignments context. They find the relevant setting in Timeline, Milestone, Color, or Label rather than mixing layout choices with conditional-rule logic.',
    approach: 'Provide four focused configuration tabs beside the resource view. Keep this panel distinct from the resource conditional-formatting editor.',
    reason: 'Resource configuration and rule authoring have different jobs. Combining them would make it harder to understand whether a control changes the view or defines a condition.',
    value: 'Help resource planners make focused configuration choices without confusing visual layout settings with data-driven rules.',
    evidence: 'Four supplied tab states support the configuration explanation. They are not proof of runtime updates, capacity accuracy, or measured productivity gains.'
  },
  crosstab: {
    idea: 'Explain how row dimensions, column dimensions, and measures turn the same dataset into different summary-and-detail views.',
    example: 'An analyst wants to organize a measure by two business dimensions. Choosing which dimension belongs on rows and which belongs on columns changes the reading structure, while the measure remains the quantity being summarized.',
    approach: 'Make the configuration-to-view relationship understandable: dimensions organize the layout, and measures provide the values read within it.',
    reason: 'A structural explanation is more useful than an invented interface. It shows what the configuration means while keeping the contribution boundary honest.',
    value: 'Help analysts understand how layout choices affect the perspective on their data, rather than treating rows and columns as arbitrary settings.',
    evidence: 'This is a contribution-level concept explanation, not end-to-end product ownership. Dedicated design screens and measured customer outcomes were not supplied.'
  },
  analyticsSuite: {
    idea: 'Support the author from finding a useful visual to shaping a report and explaining its meaning.',
    example: 'A report author may start with an analytical question rather than a chart name. Chart Wizard provides discovery; KPI patterns offer reusable metric starting points; layout and presentation contributions address how the report is composed and explained.',
    approach: 'Keep discovery, authoring, and presentation connected, but give each feature a clear task and a separately documented contribution.',
    reason: 'Choosing a chart, arranging content, and explaining an insight are not the same job. A single product story should not erase their different workflows or evidence boundaries.',
    value: 'Help authors see a coherent path from an analytical need to a report that communicates, rather than a disconnected catalogue of features.',
    evidence: 'Chart Wizard and reusable KPI-template delivery are confirmed. Other feature states remain separately documented design evidence; I do not claim the whole product or Power BI.'
  },
  wizard: {
    idea: 'Offer two ways to find a chart, then bring both routes into one shared configuration workflow.',
    example: 'An author who knows they need a bar chart can browse Chart families directly. An author who needs to compare categories can start with Function and narrow the choices by use case, visual form, and measure count.',
    approach: 'Converge discovery on Customize and Advanced configuration. Keep Favorites inside discovery, styling and visibility in Customize, and analytical settings and sorting in Advanced.',
    reason: 'Two entry routes support different starting points without creating two separate configuration systems. Staging controls adds navigation, but avoids putting every decision on one screen.',
    value: 'Help authors get from either a known visual or an analytical question to a configurable chart without first needing to know the catalogue.',
    evidence: 'Chart Wizard shipped; end-to-end UX/UI, handoff, walkthroughs, and implementation review are documented. Customer-impact measurements are not supplied.'
  },
  storyboard: {
    idea: 'Let authors choose how much report structure to start with, then continue into a connected authoring canvas.',
    example: 'An author can start from a template when they want an existing structure, choose a custom layout when arrangement matters, or begin with a blank report. The selected route establishes the starting canvas for composing the report.',
    approach: 'Connect report creation, layout selection, and authoring while preserving the distinct template, custom-layout, and blank-report entry points.',
    reason: 'One mandatory starting route would assume the same need for every author. Different entry choices provide flexibility without making the editing context feel disconnected.',
    value: 'Help authors begin with a level of structure suited to their task, instead of rebuilding a layout or accepting a template they do not need.',
    evidence: 'Six supplied product screens support the authoring and template explanation. This evidence does not establish every interaction, a confirmed release, or measured time savings.'
  },
  gantt: {
    idea: 'Translate task and date columns into a timeline by making their roles explicit before the schedule is interpreted.',
    example: 'A Power BI author has task names and start/end dates in source data. They choose Gantt in Analytics+, assign those fields to their planning roles, and relate the resulting timeline to the mapped task and date context.',
    approach: 'Connect chart selection, task/date mapping, and the schedule view rather than assuming the source columns already have the meaning needed by a Gantt chart.',
    reason: 'The chart depends on what the fields represent. Mapping belongs in the explanation, not just the final timeline picture.',
    value: 'Help report authors understand how their source data becomes a schedule and what the timeline is intended to represent.',
    evidence: 'This is Analytics+ Gantt feature UX/UI in Power BI, not PowerTable in Fabric. Supplied design states do not establish measured scheduling accuracy or a confirmed release.'
  },
  presentation: {
    idea: 'Keep a chart observation, its explanation, and presentation controls together so the audience can follow the intended point.',
    example: 'A presenter wants to explain a noteworthy part of a chart. An annotation associates the observation with its report context; comments and formatting develop the explanation; presentation controls help direct attention while the report is discussed.',
    approach: 'Connect annotation, explanation, and presentation within the report instead of treating the chart image as a complete story on its own.',
    reason: 'A visible pattern does not explain why it matters. Keeping the explanation near its context reduces the need to reconstruct the connection elsewhere.',
    value: 'Help presenters communicate what they want the audience to notice and why, not simply display more chart detail.',
    evidence: 'Nine supplied design screens support the UX/UI contribution. Audience understanding, every runtime interaction, and release status are not established by those screens.'
  },
  kpi: {
    idea: 'Provide reusable metric-card starting points while distinguishing pattern selection, card authoring, and library management.',
    example: 'An author needs a straightforward metric card or a card with a comparison. Simple and variance presets offer different starting structures; authoring shapes the card, while library management concerns organizing and reusing the available templates.',
    approach: 'Separate simple and variance patterns, preserve focused authoring controls, and make the reusable-template library a distinct responsibility.',
    reason: 'A preset should provide a starting structure, not obscure the choices needed to make the card meaningful. Browsing a pattern and managing a library are different tasks.',
    value: 'Help authors start from a consistent metric pattern instead of repeatedly building cards from a blank state.',
    evidence: 'Reusable KPI-template delivery is confirmed. Other supplied authoring and management states are design evidence, not proof of every interaction or measured setup-time savings.'
  },
  codShield: {
    idea: 'Move repeated unwanted COD orders into one managed incident, with verified, temporary protection for the exact household.',
    example: 'A resident reports the repeated deliveries without needing an order ID. Support would verify their connection to the exact unit. Only after illustrative approval does the resident review genuine-order impact, choose a duration, and consent to protection.',
    approach: 'Design separate COD Shield features for Amazon, Flipkart, Swiggy Instamart and Blinkit. Each app reviews its own case and restricts only its eligible COD orders. Protection, expiry and removal require that app’s enforcement confirmation; no competitor case or restriction is shared.',
    reason: 'Refusing each parcel acts too late. But an unrestricted address block could harm neighbours and genuine orders, so verification, consent, and a clear exit are essential.',
    value: 'Reduce the repeated work placed on a targeted resident while preserving a way to challenge or remove household restrictions.',
    evidence: 'This is an unlaunched, untested concept with fictional demo data. No real verification, protection, service integration, or measured improvement is implemented.'
  },
  bikecare: {
    idea: 'Keep local-mechanic service records useful for periodic maintenance and eventual resale.',
    example: 'The advisor prepares a job card and estimate; the rider approves; the mechanic records work; billing staff issue the invoice. Rider review makes it a confirmed service record, not a payment receipt or quality certificate.',
    approach: 'Start with vehicle identity and separate rider, advisor, mechanic and billing responsibilities. Offer optional feedback after confirmation without confusing satisfaction with recorded work. Keep service history primary, with supplied maintenance cues, reviewed parts suppliers and motorcycle-only ride groups as supporting journeys.',
    reason: 'A service visit should not leave the rider relying on memory. A useful record needs an identifiable bike, clear provenance and an agreed next step.',
    value: 'Help riders remember care, local workshops follow up, and buyers inspect recorded service. Intended benefits, not measured savings or resale gains.',
    evidence: 'Original mobile UX/UI screens and connected vehicle/EV, access, service, reminder, support, purchase and ride journeys with custom light/dark themes. Public-source research informs the design; no live services, interviews or business results are claimed.'
  },
  spatial: {
    idea: 'Explore whether a familiar Analytics+ report workflow can remain understandable when presented as windows in a spatial environment.',
    example: 'The visual sequence starts at a room-like app launcher, enters Analytics+ in a floating window, then shows a report with charts and a table. It demonstrates a proposed transition between contexts, not tested interaction mechanics.',
    approach: 'Retain the recognizable entry-to-report sequence while exploring a spatial presentation, rather than claiming a fully implemented new way to manipulate the data.',
    reason: 'Familiar workflow structure is a starting hypothesis for orientation. The frames alone cannot establish comfortable placement, readable text, or usable spatial controls.',
    value: 'Explore a recognizable path into report viewing beyond a flat-screen setting. Whether this helps real users still needs validation.',
    evidence: 'Three concept frames only; not a shipped Vision Pro product. Gaze, gestures, accessibility, comfort, and spatial interaction behavior are not validated.'
  }
};

export const solutionSteps = Object.fromEntries(Object.entries({
  powertable: [
    ['Map the data', 'Identify task, date, time-entry, and resource columns.', 'Focused roles explain what each table contributes to the planning views.', 'The schedule is easier to interpret when its underlying data meaning is explicit.', 'table'],
    ['Configure Gantt', 'Choose the task timeline setting relevant to the planning question.', 'A contextual panel separates timeline behavior, milestones, dependencies, colors, and labels.', 'The planner can find a focused setting without losing the schedule context.', 'timeline'],
    ['Review resources', 'Move to the resource view and its configuration.', 'Resource settings and conditional rules have distinct editing surfaces.', 'Assignments, visual layout, and rule meaning do not have to be treated as the same task.', 'people']
  ],
  mapping: [
    ['Define task roles', 'Choose the source fields that identify the tasks and their dates.', 'Task mapping gives columns a planning role rather than relying on their names.', 'A task and a date must have clear meanings before they can form a useful timeline.', 'table'],
    ['Connect time', 'Select the time-entry table, Task ID, and logged-hours column.', 'The shared Task ID explains how logged effort relates to a specific task.', 'The planner can inspect the relationship instead of assuming the tables are connected correctly.', 'link'],
    ['Map resources', 'Define resource roles, then review the resource-dependent cost mapping.', 'Resource and Cost have focused tabs; the dependency remains visible.', 'Separate roles make the relationship understandable without mixing every mapping decision together.', 'people']
  ],
  baselines: [
    ['Choose a reference', 'Select the current plan and a saved reference for comparison.', 'The proposed comparison is bounded to two selections in total.', 'A limited comparison is easier to read than several overlapping references.', 'select'],
    ['Read differences', 'Read the current plan beside the visually distinct reference.', 'Both selections share timeline context without losing their individual identities.', 'A planner can explain schedule differences against a visible reference, not memory.', 'timeline'],
    ['Manage separately', 'Use the separate baseline manager for administrative work.', 'Comparison remains a reading task; saved-baseline management has its own surface.', 'Administrative actions do not compete with the timeline comparison. Creation behavior is not established.', 'settings']
  ],
  backlog: [
    ['Capture work', 'Start from the add-task action when the backlog is empty.', 'The empty state communicates a next step rather than displaying an unexplained blank panel.', 'Unscheduled work has a clear starting point before dates are assigned.', 'task'],
    ['Use the list', 'Review the populated task rows and their available actions.', 'Backlog work stays beside the schedule instead of becoming a disconnected list.', 'The planner retains the relationship between unscheduled work and the planning context.', 'table'],
    ['Check the status', 'Notice whether a change is still pending.', 'A pending indicator is distinct from a persisted state.', 'An in-progress edit should not be mistaken for a saved change; persistence remains unverified.', 'review']
  ],
  ganttPanel: [
    ['Find a category', 'Choose Timeline, Milestone, Dependency, Color, or Label.', 'Each tab identifies a different configuration job.', 'A planner can start from the purpose of the change rather than search one long settings list.', 'select'],
    ['Adjust the setting', 'Use the focused controls in the selected tab.', 'Scheduling behavior and visual appearance remain separated.', 'The control grouping makes the meaning of the change easier to understand.', 'settings'],
    ['Keep context', 'Refer to the adjacent timeline while interpreting the settings.', 'The configuration panel belongs beside the planning view.', 'The planner does not need to reconstruct which plan the settings concern. Live preview is not verified.', 'timeline']
  ],
  formatting: [
    ['Define a condition', 'Set Schedule hours greater than zero for scheduled work.', 'The rule names the data condition before assigning an appearance.', 'Positive hours indicate scheduled work, not evidence of overload.', 'condition'],
    ['Choose targets', 'Choose which targets the rule concerns.', 'Targets are a separate scope decision, not part of the color choice.', 'The planner can distinguish what matches from which parts of the view are affected.', 'select'],
    ['Choose a style', 'Define the appearance for the chosen condition and targets.', 'The editor connects condition, scope, and style without implying an applied result.', 'A visual signal has an explainable meaning; the supplied evidence stops at rule editing.', 'style']
  ],
  resourcePanel: [
    ['Choose an area', 'Select Timeline, Milestone, Color, or Label.', 'Four tabs group resource configuration by purpose.', 'The planner can locate the setting that fits the current resource-view task.', 'select'],
    ['Set the detail', 'Use the controls for that configuration area.', 'Resource layout settings are not mixed with the conditional-rule editor.', 'A visual configuration choice and a data-driven rule remain distinguishable.', 'settings'],
    ['Relate to the view', 'Interpret the setting beside the resource planning context.', 'The adjacent resource view explains what the panel is configuring.', 'The connection is visible without implying a verified live-update or capacity result.', 'people']
  ],
  crosstab: [
    ['Choose rows', 'Identify a business dimension for the row structure.', 'Row configuration determines how one dimension organizes the view.', 'The analyst can explain the reading structure rather than treat rows as an arbitrary setting.', 'rows'],
    ['Choose columns', 'Identify the dimension for the column structure.', 'Columns provide a second perspective on the same dataset.', 'Rows and columns can be understood as complementary layout choices.', 'columns'],
    ['Read measures', 'Relate the summarized measure to the chosen dimensions.', 'Measures provide values within the summary-and-detail structure.', 'The relationship is explained conceptually; no dedicated final interface or measured outcome is fabricated.', 'chart']
  ],
  analyticsSuite: [
    ['Discover a visual', 'Start with a known chart or an analytical question.', 'Chart Wizard supports Chart and Function routes into shared configuration.', 'Different author starting points do not need separate configuration systems.', 'chart'],
    ['Shape the report', 'Choose the feature that fits the authoring task.', 'KPI patterns, Gantt, and Storyboard address metrics, timelines, and layout respectively.', 'The product story explains why each feature exists instead of presenting an undifferentiated catalogue.', 'layout'],
    ['Explain the insight', 'Connect an observation with annotation and presentation context.', 'Presentation contributions keep the explanation near the report.', 'The audience gets context for the intended point. Only Chart Wizard and KPI-template delivery are confirmed here.', 'annotation']
  ],
  wizard: [
    ['Discover', 'Browse Chart families or narrow options through Function.', 'A chart-first route and a question-first route lead toward the same selected visual.', 'Authors can start from what they know without first mastering the entire catalogue.', 'chart'],
    ['Customize', 'Shape the selected visual with styling and visibility controls.', 'Customize keeps appearance choices together.', 'The author can focus on presentation choices without facing every analytical control at once.', 'style'],
    ['Configure', 'Use Advanced for analytical settings and sorting.', 'Both discovery routes converge on shared configuration; Favorites remain in discovery.', 'The workflow supports different entry needs without duplicating the downstream settings system.', 'settings']
  ],
  storyboard: [
    ['Choose a start', 'Select a template, custom layout, or blank report.', 'The entry route reflects how much structure the author wants.', 'A familiar starting structure and a free starting canvas can serve different authoring needs.', 'select'],
    ['Set the structure', 'Establish the report layout for the chosen route.', 'Layout belongs between creation and composition.', 'The author can understand the structure before deciding where report content belongs.', 'layout'],
    ['Compose the report', 'Continue into the authoring canvas.', 'The canvas retains the connection to the selected starting structure.', 'Creation and editing form one understandable journey. Supplied screens do not verify every interaction.', 'chart']
  ],
  gantt: [
    ['Choose Gantt', 'Select the timeline visual in Analytics+.', 'Gantt begins within the Power BI chart-selection context.', 'The author can relate the planning visual to the rest of the report workflow.', 'chart'],
    ['Map task dates', 'Assign task, start-date, and end-date fields.', 'Column roles explain the data the schedule will represent.', 'The source fields acquire a defined meaning before the timeline is interpreted.', 'table'],
    ['Read the timeline', 'Relate the mapped task/date roles to the schedule context.', 'The design connects field assignment with the Gantt view.', 'The author can explain how the data becomes a timeline; scheduling accuracy is not measured here.', 'timeline']
  ],
  presentation: [
    ['Mark a point', 'Associate an annotation with the relevant chart observation.', 'A marker connects the explanation to the report context.', 'The audience can identify which part of the visual the presenter is discussing.', 'annotation'],
    ['Explain the meaning', 'Develop the comment and its formatting beside the report.', 'The explanation stays connected to the observation.', 'The chart communicates a point rather than assuming the visible data explains itself.', 'comment'],
    ['Guide attention', 'Use presentation controls while discussing the report.', 'Observation, explanation, and presentation remain in a connected context.', 'The intended audience focus is explicit. Improved audience understanding is not established by these screens.', 'present']
  ],
  kpi: [
    ['Choose a pattern', 'Pick a simple metric card or a variance arrangement.', 'Presets provide different structures for different metric-reading tasks.', 'An author has an appropriate starting point instead of repeatedly beginning with a blank card.', 'select'],
    ['Shape the card', 'Use authoring controls to adapt the selected pattern.', 'Pattern selection and card authoring remain separate decisions.', 'The reusable structure does not replace the choices needed to make an individual card meaningful.', 'settings'],
    ['Reuse a template', 'Find and organize reusable patterns in the library context.', 'Browsing presets and managing the library have distinct responsibilities.', 'Consistent starting structures are reusable; template delivery is confirmed, but time savings are not measured.', 'template']
  ],
  codShield: [
    ['Report once', 'Report repeated unwanted COD deliveries for the exact home/unit.', 'The proposed incident route does not require an order ID or a separate approval for each parcel.', 'A targeted resident should not have to investigate every unwanted transaction.', 'report'],
    ['Verify the unit', 'Support would review contact and connection to the affected household.', 'An OTP alone does not establish residence. Protection stays inactive until authorised review and acknowledgement.', 'The proposal must prevent malicious or mistaken household blocks, not just reduce the number of reports.', 'review'],
    ['Confirm this app’s protection', 'Review household impact, duration and consent, then wait for the selected app to confirm.', 'Each app controls its own COD restriction. Other apps need separate reports; no competing platform is managed here.', 'COD eligibility and implementation are unverified. Expiry, removal and appeal remain required. No real integration or protection exists.', 'shield']
  ],
  bikecare: [
    ['Approve the service', 'The advisor records bike, complaint, intake and an itemised estimate. The rider approves the current version.', 'Additional parts require fresh approval. Mechanic work, billing and payment have separate owners and states.', 'Local shops receive brand-style documentation without claiming manufacturer integration.', 'bike'],
    ['Carry care forward', 'The mechanic records completed work and guidance; billing issues the bill; the rider reviews the record and can rate the service.', 'Only jointly confirmed history informs reminders and resale. Optional feedback creates a complaint only with explicit follow-up consent.', 'Supplied guidance is never guessed. Agreement is not satisfaction, a quality guarantee or a payment receipt.', 'review'],
    ['Connect parts and rides', 'Reviewed workshops/dealers support parts shopping. Riders discover public, brand/club and company motorcycle rides.', 'Check fit and product provenance separately from supplier documents. Ride requests need organiser review; exact meetup details stay private.', 'Secondary journeys support a motorcycle-care product, not an unrestricted marketplace or general social feed.', 'timeline']
  ],
  spatial: [
    ['Launch', 'Start from the proposed app launcher in the room-like environment.', 'The first concept frame supplies a recognizable entry point.', 'It introduces the setting without claiming tested gaze, gesture, or physical interaction behavior.', 'launch'],
    ['Enter Analytics+', 'Move conceptually into the Analytics+ floating window.', 'The entry frame retains a familiar application identity.', 'Continuity is an orientation hypothesis, not a validated spatial usability result.', 'layout'],
    ['View a report', 'Explore the frame showing charts and a table in a floating window.', 'The sequence carries the familiar report destination into the spatial proposal.', 'Readability, comfort, accessibility, and interaction still need validation; this is not a Vision Pro release.', 'chart']
  ]
}).map(([caseId, steps]) => [caseId, steps.map(([title, action, response, why, icon]) => ({ title, action, response, why, icon }))]));
