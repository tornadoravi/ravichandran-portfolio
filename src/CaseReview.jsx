import React from 'react';

const summaries = {
  mapping: [
    ['Complex data roles', 'Tasks, time entries, resources, and costs need distinct meanings.'],
    ['One layout, focused tabs', 'Separate the domains; expose the relationships between tables.'],
    ['Five design states', 'UX/UI through developer handoff and implementation review.']
  ],
  baselines: [
    ['Plan versus current', 'A useful comparison needs a clear reference.'],
    ['Two selections, one timeline', 'Bound the selection; keep baseline management separate.'],
    ['Two comparison states', 'Selection, timeline, and management crops; no creation flow is shown.']
  ],
  backlog: [
    ['Tasks without a schedule', 'An empty backlog still needs a useful next step.'],
    ['Empty → List → Pending', 'Separate the starting state, row actions, and unsaved changes.'],
    ['Two supplied states', 'Design evidence; database persistence is not verified.']
  ],
  formatting: [
    ['Signals amid assignments', 'People need to distinguish a condition from its appearance.'],
    ['Condition → Scope → Style', 'Keep the rule beside the resource timeline.'],
    ['One rule-editing state', 'No after-Apply result or capacity improvement is claimed.']
  ],
  ganttPanel: [
    ['Many timeline settings', 'Configuration should not obscure the planning context.'],
    ['Contextual configuration', 'Group timeline, milestone, dependency, color, and label controls.'],
    ['Five tab states', 'Supplied design evidence, not a recorded interaction sequence.']
  ],
  resourcePanel: [
    ['Resource-specific settings', 'Capacity, task styling, and labels need clear boundaries.'],
    ['Contextual configuration', 'Group timeline, milestone, color, and label controls.'],
    ['Four tab states', 'Configuration evidence, separate from the conditional-formatting rule editor.']
  ],
  storyboard: [
    ['Different starting points', 'Authors may need a template, custom layout, or blank report.'],
    ['Start → Structure → Author', 'Connect report creation, layout, and editing context.'],
    ['Six product screens', 'Authoring and template evidence; presentation is a separate contribution.']
  ],
  gantt: [
    ['Data before a timeline', 'Source columns must acquire task and date meanings.'],
    ['Choose → Map → View', 'Guide authors from chart selection to a readable schedule.'],
    ['Power BI feature work', 'Analytics+ Gantt, separate from PowerTable in Microsoft Fabric.']
  ],
  wizard: [
    ['A broad chart catalogue', 'People start with either a known chart or an analytical question.'],
    ['Discover → Customize → Configure', 'Two discovery routes converge on shared configuration.'],
    ['Chart Wizard shipped', 'End-to-end UX/UI, handoff, walkthroughs, and implementation checks.']
  ],
  presentation: [
    ['Insight needs context', 'Connect an observation, its explanation, and the audience’s focus.'],
    ['Annotate → Format → Present', 'Keep comments and presentation controls within the report context.'],
    ['Nine design screens', 'Supplied interface states, not proof of every interaction or release.']
  ],
  kpi: [
    ['Repeated KPI setup', 'Authors need reusable starting points for cards and comparisons.'],
    ['Simple → Variance → Reuse', 'Keep preset choice distinct from authoring and library management.'],
    ['Reusable templates shipped', 'KPI template delivery is confirmed; other states remain design evidence.']
  ]
};

export function CaseSnapshot({ caseId }) {
  return (
    <section className="case-snapshot wrap" aria-label="Case study at a glance">
      <p className="eyebrow">Quick visual summary</p>
      <ol className="decision-flow">
        {summaries[caseId].map(([title, description], index) => (
          <li key={title}>
            <span className="small-index">{['01 / Challenge', '02 / Design', '03 / Evidence'][index]}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CaseDetails({ children, id = 'case-details', title = 'Design details & evidence' }) {
  return (
    <details id={id} className="case-deep-dive recruiter-details">
      <summary className="wrap">
        <span><strong>{title}</strong><small>Optional · Full walkthrough, decisions, and sources</small></span>
        <span className="story-toggle" aria-hidden="true" />
      </summary>
      <div className="deep-dive-content">{children}</div>
    </details>
  );
}
