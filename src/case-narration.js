const stories = {
  powertable: {
    intro: "Let me walk you through PowerTable. Basically, it brings task schedules, time entries, and resource assignments into Microsoft Fabric. I worked on the Gantt and resource experience end to end, and contributed to Cross-tab configuration. I didn't design the whole product.",
    decisions: "The idea was to keep the planning context connected. First, give tasks, dates, time entries, resources, and costs clear data roles. Then, keep Gantt and resource settings beside the views they control. At the same time, make the ownership clear. Cross-tab was a contribution, and the planning explorations are labelled separately.",
    delivery: "My end-to-end work covered Gantt and resource experience design. Cross-tab was a contribution, not whole-product ownership. Baseline planning and resource earned-value are still explorations. So, the important thing is to read each feature with its own scope, rather than assume everything shown was shipped."
  },
  mapping: {
    intro: "Let's look at Column Mapping. Before a planner can use the timeline, the product needs to know what each column actually means. Is it a task, a time entry, a resource, or a cost? My work covered the Gantt and resource mapping experience end to end.",
    decisions: "I split the mapping into focused areas, instead of mixing every field together. Then I made the table relationships explicit. For example, the task identifier connects logged hours to the right task. Resource mapping also enables standard and usage costs. So, it's about making the meaning clear, not just matching column names.",
    delivery: "There are five supplied design states here. My work went through user experience and interface design, developer handoff, and implementation review. These screens explain the mapping decisions. They don't, on their own, establish runtime behaviour or a measured customer improvement."
  },
  baselines: {
    intro: "Let me take you through Baselines. Say the current schedule has changed, and you want to compare it with a saved reference. That's the idea behind this work. My part was the Gantt comparison experience, and this is still an exploration, not a confirmed release.",
    decisions: "I kept the comparison bounded to two selections in total. The current plan and the reference stay visually distinct on one timeline. Managing saved baselines is a separate task, so I kept that away from the comparison itself. Basically, you should be able to read the difference without mixing it up with baseline management.",
    delivery: "This is still an exploration. The supplied states cover comparison selection, the timeline, and baseline-management crops. They don't show a baseline-creation flow, or establish that a comparison feature was released. I'm keeping that distinction clear rather than presenting a design exploration as a shipped outcome."
  },
  backlog: {
    intro: "Let's talk about the Backlog. A task may not have dates yet, but it still needs a place beside the plan. I designed the Gantt backlog experience end to end, including how it starts empty and how pending changes are shown.",
    decisions: "I started with the empty state, so there's a clear way to add a task before a list exists. Once tasks are there, the rows and their actions stay beside the schedule. The key thing is the change state. If something hasn't been saved, it shouldn't look as though it's already persisted.",
    delivery: "The two supplied states explain the backlog design and its pending changes. They don't verify that those changes were saved to a database. So, this is design evidence, not a claim about persistence or a measured improvement."
  },
  ganttPanel: {
    intro: "Here's the Gantt Side Panel. The aim is quite simple: let planners change timeline settings without taking them away from the plan. I worked on this configuration experience end to end.",
    decisions: "I kept the settings in a contextual side panel. Then I grouped them by what the planner is trying to change: timeline, milestones, dependencies, colours, and labels. Each tab has one clear job. So, you can focus on the setting while keeping the planning view in sight.",
    delivery: "There are five configuration tab states in the supplied designs. They explain the structure of the panel, but they're not a recording of someone using the product. I'm not treating those static states as proof of every interaction or a measured outcome."
  },
  formatting: {
    intro: "Let's look at Conditional Formatting for the resource Gantt. A rule has a condition, a set of targets, and a visual style. My work covered that rule-editing experience end to end. The important part was not to mix up what a rule means with how it looks.",
    decisions: "I separated three decisions: the condition, its targets, and its appearance. In this example, scheduled hours greater than zero means scheduled work. It doesn't mean overload. Then the planner can set the scope and the visual treatment without confusing those choices with the condition itself.",
    delivery: "The evidence shows one rule-editing state. It doesn't show a result after pressing Apply, so I'm not claiming that result or an improvement in capacity planning. What you can inspect here is the design of the rule editor."
  },
  resourcePanel: {
    intro: "Let me take you through the Resource Side Panel. This is about adjusting a resource planning view without losing its context. I designed the resource Gantt configuration experience end to end.",
    decisions: "I organised the panel into four focused settings: timeline, milestones, colours, and labels. Those controls stay beside the resource view. Conditional rules are a different task, so I kept their editor separate. That way, view configuration and rule editing don't become one mixed-up job.",
    delivery: "The supplied evidence covers four configuration states. The conditional-formatting rule editor is a separate feature, with its own evidence. These screens explain the design; they don't establish every runtime interaction or a measured improvement."
  },
  crosstab: {
    intro: "Let's look at Cross-tab. Basically, rows, columns, and measures give people different ways to organise the same data. I contributed to its configuration. This wasn't an end-to-end ownership role for the whole experience.",
    decisions: "The focus was on making the structure understandable. Keep row and column configuration distinct, then show how the measures relate to the summary and detail view. Since dedicated design screens weren't supplied, the illustration explains that relationship rather than inventing a final interface.",
    delivery: "This is contribution-level work. There are no dedicated design screens or measured outcomes supplied for this case. So, I'm explaining the configuration concept and my part in it, without claiming a final interface or whole-product ownership."
  },
  analyticsSuite: {
    intro: "Let me walk you through Inforiver Analytics+. It sits inside Power BI and connects choosing a visual, building a report, and presenting the insight. My work included the full Chart Wizard experience, reusable KPI templates, and feature-specific contributions. I didn't design the whole product.",
    decisions: "I looked at the authoring journey as a set of connected tasks. Chart Wizard gives people two ways to find a visual. Storyboard, Gantt, and KPI patterns support different parts of building the report. Annotations and presentation then keep the explanation connected to the insight. Each feature still has its own scope.",
    delivery: "Chart Wizard and the reusable KPI templates are confirmed shipped work. The other screens remain separately identified design evidence. That distinction matters: showing a design state isn't the same as confirming a release, a runtime behaviour, or a measured customer outcome."
  },
  wizard: {
    intro: "Let me quickly walk you through Chart Wizard. Sometimes you already know the chart you want. Other times, you just know the question you need to answer. I worked on the full Chart Wizard flow, from user experience and interface design through handoff and implementation review.",
    decisions: "I gave people two ways in: start with a chart family, or start with an analytical function. From there, both routes come together. You customise the visual, then move into shared configuration. Favourites stay within discovery. So, it's a different starting point, but not a completely different setup process.",
    delivery: "Chart Wizard shipped. My work covered the flow end to end, including handoff, walkthroughs, and implementation checks. The screens show the design decisions behind that delivery. They don't, by themselves, prove a measured usability improvement or customer outcome."
  },
  storyboard: {
    intro: "Let's look at Storyboard. Not every report starts the same way. You might want a template, a custom layout, or just a blank canvas. I worked on the feature experience, developer handoff, and implementation review.",
    decisions: "I kept those starting points distinct, then connected them to the authoring canvas. First, choose how you want to begin. Next, establish the layout. Then, start composing the report in that structure. The idea is to connect the setup with the editing context, rather than treat them as unrelated screens.",
    delivery: "The six supplied screens cover report authoring and template states. Presentation is a separate contribution. These are design and product screens, not a recording of the complete journey or proof that every state was released."
  },
  gantt: {
    intro: "Here's the Gantt work inside Analytics+ for Power BI. Before task data becomes a useful timeline, its fields need clear meanings. I worked on the feature experience, handoff, and implementation review. This is separate from the PowerTable work in Microsoft Fabric.",
    decisions: "I connected three parts of the flow. Choose Gantt from the chart-selection context. Map the task, start date, and end date to their proper roles. Then, connect those roles to the schedule view. Basically, the timeline needs to make sense in terms of the data that created it.",
    delivery: "This case covers the Analytics+ Gantt feature in Power BI, not the PowerTable Gantt product in Fabric. The screens explain its design states. They don't, on their own, establish every interaction, a release outcome, or a measured improvement."
  },
  presentation: {
    intro: "Let's talk about annotations and presentation. A chart can show an observation, but people also need the explanation and a clear point of focus. I worked on this feature's experience, handoff, and implementation review.",
    decisions: "I connected the observation to its chart context, kept comments and formatting beside the report, and used the presentation context to guide attention. The aim wasn't just to add a note. It was to keep the insight, its explanation, and the audience's focus together.",
    delivery: "There are nine supplied design screens here. They show annotation and presentation states, but they're not proof of every interaction or release. So, I'm keeping the interface evidence separate from claims about what happened in use."
  },
  kpi: {
    intro: "Let me take you through KPI Presets. Instead of starting every metric card from scratch, authors can use a reusable pattern. My work focused on designing and delivering those reusable KPI templates.",
    decisions: "I separated simple cards from variance arrangements, so the starting patterns are clear. Choosing a preset is one task; shaping the card is another. Library management stays distinct as well. Basically, reuse shouldn't blur the difference between selecting a pattern and authoring the actual card.",
    delivery: "The reusable KPI templates shipped. Other authoring and library screens remain design evidence, not an automatic claim that every state was released. That's the scope of the contribution shown here."
  }
};

function spokenText(text) {
  return text
    .replace(/\bUX\/UI\b/g, 'user experience and interface design')
    .replace(/\bPower BI\b/g, 'Power B I')
    .replace(/\bKPI\b/g, 'K P I')
    .replace(/\bAnalytics\+/g, 'Analytics Plus')
    .replace(/\bPowerTable\b/g, 'Power Table')
    .replace(/\s+/g, ' ')
    .trim();
}

export function createCaseNarration({ caseId, problem, hasScreen, official }) {
  const story = stories[caseId];
  if (!story) throw new Error(`Unknown case narration: ${caseId}`);
  const evidence = !hasScreen
    ? "Now, a quick note about what you're seeing. There's no dedicated design screen supplied for this case. This illustration explains my contribution; it's not a final interface or a recording of the product."
    : official
      ? "Now, here's the wider product for context. This is an official product image, not a claim that I designed the whole product. The feature cases explain my own contribution separately."
      : "Now, let's look at the actual design screen. You can open the original for a closer look. It shows a design state, not a recording of the product or, by itself, proof that every interaction shipped.";
  return [
    story.intro,
    `So, what was the challenge? ${problem}`,
    `Here's how I approached it. ${story.decisions}`,
    evidence,
    `And to wrap up. ${story.delivery}`
  ].map(spokenText);
}
