import React from 'react';
import CaseDiagram from './CaseDiagram.jsx';
import CaseIllustration from './CaseIllustration.jsx';
import CaseProblemScene from './CaseProblemScene.jsx';

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
  ],
  crosstab: [
    ['Data in different directions', 'Rows and columns organize the same measures.'],
    ['Make the structure visible', 'Connect configuration with summary and detail.'],
    ['Contribution only', 'Concept explanation; no dedicated design screens or measured outcomes.']
  ],
  powertable: [
    ['Planning across views', 'Connect tasks, time, and capacity.'],
    ['One connected workflow', 'Gantt and resource UX/UI using the Microsoft Fabric design system.'],
    ['Clear ownership', 'End-to-end Gantt and resources; Cross-tab contribution. Planning explorations stay labeled.']
  ],
  analyticsSuite: [
    ['Many authoring tasks', 'Connect discovery, authoring, and presentation.'],
    ['Five feature experiences', 'Shared UX/UI through handoff and implementation review.'],
    ['Confirmed delivery', 'Chart Wizard and reusable KPI templates shipped; other states remain separate.']
  ]
};

const headlines = {
  mapping: 'Give each column a clear job.',
  baselines: 'Keep the reference beside the current plan.',
  backlog: 'Unscheduled does not mean forgotten.',
  formatting: 'A condition is not a color.',
  ganttPanel: 'Adjust the view. Keep the plan in sight.',
  resourcePanel: 'One panel. Four focused settings.',
  storyboard: 'Different starts. One authoring canvas.',
  gantt: 'Fields first. Timeline next.',
  wizard: 'Two ways in. One way forward.',
  presentation: 'Keep the explanation beside the insight.',
  kpi: 'Start with a pattern, not a blank card.',
  crosstab: 'One dataset. Different perspectives.',
  powertable: 'One plan, connected views.',
  analyticsSuite: 'From finding a chart to telling a story.'
};

const stories = {
  mapping: {
    scenario: 'A planner needs logged hours beside the right task.',
    choices: [['All domains together', 'Focused mapping tabs'], ['Implicit table links', 'Visible IDs and measures']]
  },
  baselines: {
    scenario: 'A planner checks the current schedule against a saved reference.',
    choices: [['Unbounded comparisons', 'Two selections total'], ['Management in the chart', 'Separate baseline manager']]
  },
  backlog: {
    scenario: 'A planner captures work before dates are assigned.',
    choices: [['Unexplained empty panel', 'Explicit add-task action'], ['Pending looks saved', 'Separate pending indicator']]
  },
  formatting: {
    scenario: 'A resource planner wants scheduled work to stand out.',
    choices: [['Color without context', 'Condition, scope, style'], ['Positive hours means overload', 'Scheduled work, not overload']]
  },
  ganttPanel: {
    scenario: 'A planner adjusts dependencies without losing the timeline.',
    choices: [['One long settings surface', 'Five focused tabs'], ['Leaving the schedule', 'Contextual side panel']]
  },
  resourcePanel: {
    scenario: 'A resource planner adjusts working-time and label settings.',
    choices: [['Mixed resource settings', 'Four focused tabs'], ['Rules mixed with layout', 'Separate rule editor']]
  },
  storyboard: {
    scenario: 'A report author chooses how much structure to start with.',
    choices: [['One assumed starting point', 'Multiple starting routes'], ['Disconnected layout setup', 'Shared authoring context']]
  },
  gantt: {
    scenario: 'An analyst turns task and date columns into a schedule.',
    choices: [['Unassigned source columns', 'Task and date roles'], ['Data without planning context', 'Connected task timeline']]
  },
  wizard: {
    scenario: 'An author knows the question, but not the chart.',
    choices: [['One assumed starting point', 'Chart + Function routes'], ['Every control together', 'Customize + Advanced']]
  },
  presentation: {
    scenario: 'A presenter explains the observation, not just the chart.',
    choices: [['Insight without context', 'Markers and comments'], ['Narration outside the report', 'In-report presentation controls']]
  },
  kpi: {
    scenario: 'An author needs a consistent metric card without starting over.',
    choices: [['Repeated blank-card setup', 'Reusable KPI presets'], ['Presets and library conflated', 'Separate browsing and management']]
  },
  crosstab: {
    scenario: 'An analyst reorganizes measures by row and column.',
    choices: [['Hidden data relationships', 'Explicit configuration structure'], ['Configuration detached from view', 'Visible layout relationship']]
  }
};

function ScenarioVisual({ caseId }) {
  switch (caseId) {
    case 'mapping':
      return <div className="scenario-relationship">
        <div><strong>Tasks</strong><span>Task ID</span></div>
        <span className="relationship-link" aria-label="Linked by Task ID">↔</span>
        <div><strong>Time entries</strong><span>Task ID</span><span>Logged hours</span></div>
      </div>;
    case 'baselines':
      return <div className="scenario-comparison">
        <div><span>Current</span><i aria-hidden="true" /></div>
        <div><span>Baseline</span><i aria-hidden="true" /></div>
        <small>Two selections total · Management separate</small>
      </div>;
    case 'backlog':
      return <div className="scenario-state-cards">
        <div><span aria-hidden="true">+</span><strong>Empty</strong></div>
        <div><span aria-hidden="true">≡</span><strong>Task list</strong></div>
        <div><span className="pending-dot" aria-hidden="true" /><strong>Pending ≠ saved</strong></div>
      </div>;
    case 'formatting':
      return <div className="scenario-rule">
        <div><small>Condition</small><strong>Schedule hours &gt; 0</strong></div>
        <div><small>Scope</small><strong>Targets</strong></div>
        <div><small>Appearance</small><strong>Style</strong></div>
        <p>Rule editor, not an applied result.</p>
      </div>;
    case 'ganttPanel':
    case 'resourcePanel':
      return <div className="scenario-context">
        <div className="context-plan"><span>{caseId === 'ganttPanel' ? 'Task timeline' : 'Resource timeline'}</span><i /><i /><i /></div>
        <ul>{(caseId === 'ganttPanel' ? ['Timeline', 'Milestone', 'Dependency', 'Color', 'Label'] : ['Timeline', 'Milestone', 'Color', 'Label']).map(tab => <li key={tab}>{tab}</li>)}</ul>
      </div>;
    case 'storyboard':
      return <div className="scenario-starters">
        {['Auto-create', 'Custom layout', 'Template', 'Blank report'].map((start, index) => <div key={start}><span className={`starter-preview starter-preview--${index}`} aria-hidden="true" /><strong>{start}</strong></div>)}
      </div>;
    case 'gantt':
      return <div className="scenario-date-mapping">
        <div><span>Task</span><span>Start date</span><span>End date</span></div>
        <span aria-hidden="true">→</span>
        <div className="date-result"><strong>Task timeline</strong><i aria-hidden="true" /><i aria-hidden="true" /></div>
      </div>;
    case 'wizard':
      return <div className="scenario-discovery">
        <div><strong>Chart</strong><small>Known family</small></div>
        <div><strong>Function</strong><small>Analytical goal</small></div>
        <span aria-hidden="true">↓</span>
        <p>Customize → Configure</p>
      </div>;
    case 'presentation':
      return <div className="scenario-callout">
        <div className="callout-plot" aria-hidden="true"><i /><i /><i /><span>1</span></div>
        <div><strong>1 / Observation</strong><span>Explain the insight.</span><small>Keep it beside the chart.</small></div>
      </div>;
    case 'kpi':
      return <div className="scenario-presets">
        <div><small>Simple</small><strong>Value</strong></div>
        <div><small>Variance</small><strong>Value <span aria-hidden="true">Δ</span></strong></div>
        <p>Reusable starting points, not demo metrics.</p>
      </div>;
    case 'crosstab':
      return <div className="scenario-pivot">
        <span>Columns</span>
        <div><span>Rows</span><div className="pivot-cells" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div></div>
        <strong>Measures → Summary + detail</strong>
      </div>;
    default: throw new Error(`Unknown scenario: ${caseId}`);
  }
}

export function CaseContext({ role, children }) {
  return <details className="case-context">
    <summary><span className="case-ownership">{role}</span><span className="case-context-action">Role & context <span aria-hidden="true"><span>+</span></span></span></summary>
    {children}
  </details>;
}

export function CaseFlow({ steps }) {
  return <ol className="case-highlight-flow" aria-label="Design intent">
    {steps.map(([title, detail]) => <li key={title}>
      <strong>{title}</strong>
      <span>{detail}</span>
    </li>)}
  </ol>;
}

export function CaseSnapshot({ caseId, id }) {
  return (
    <section id={id} className="case-snapshot case-quick-read wrap" aria-label="Case study at a glance">
      <p className="eyebrow">Design highlights</p>
      <h2 className="visual-story-title">{headlines[caseId]}</h2>
      <CaseHighlights caseId={caseId} />
    </section>
  );
}

export function CaseHighlights({ caseId, facts = summaries[caseId].map(([, description]) => description) }) {
  return <div className="case-at-a-glance">
    <dl className={`case-key-facts${caseId === 'presentation' ? ' presentation-key-points' : ''}`}>
      {facts.map((description, index) => <div key={index} id={['story-problem', 'story-decision', 'story-evidence'][index]} className="story-highlight">
        <dt>{['Problem', 'My decision', 'Evidence'][index]}</dt>
        <dd>
          {index === 0 && <figure className="problem-illustration">
            <CaseProblemScene caseId={caseId} />
          </figure>}
          {index === 1 && <figure id="story-flow" className="decision-illustration">
            <CaseDiagram caseId={caseId} />
            <figcaption>Illustrative problem & design flow · Not a product screenshot.</figcaption>
          </figure>}
          <p>{description}</p>
        </dd>
      </div>)}
    </dl>
  </div>;
}

export function CaseRationale({ caseId }) {
  const story = stories[caseId];
  return (
    <section className="case-rationale wrap" aria-label="Detailed design rationale">
      <h2 className="visual-story-title">Scenario & design decisions</h2>
      <div className={`visual-storyboard${story ? '' : ' visual-storyboard--overview'}`}>
        <ol className="decision-flow">
          {summaries[caseId].map(([title, description], index) => (
            <li key={title}>
              <span className="small-index">{['01 / Challenge', '02 / Design', '03 / Evidence'][index]}</span>
              <CaseIllustration caseId={caseId} stage={['challenge', 'design', 'evidence'][index]} />
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
        <p className="story-art-note">Original illustrations · Not research participants or measured outcomes.</p>
        {story && <div className="case-narrative">
          <section className="case-scenario" aria-label="Illustrative task">
            <p className="eyebrow">Illustrative use case</p>
            <h3>{story.scenario}</h3>
            <div className="scenario-visual" data-use-case={caseId}><ScenarioVisual caseId={caseId} /></div>
            <p className="scenario-caption">Concept illustration · Not an observed session.</p>
          </section>
          <section className="case-choice" aria-label="Design choices">
            <h3>The design choice</h3>
            <table>
              <thead><tr><th scope="col">Risk to avoid</th><th scope="col">Design response</th></tr></thead>
              <tbody>{story.choices.map(([risk, response]) => <tr key={risk}><td>{risk}</td><td>{response}</td></tr>)}</tbody>
            </table>
          </section>
        </div>}
      </div>
    </section>
  );
}

export function CaseDetails({ children, caseId, id = 'case-details', title = 'Design details & evidence' }) {
  return (
    <details id={id} className="case-deep-dive recruiter-details">
      <summary className="wrap">
        <span><strong>{title}</strong><small>Optional · Full walkthrough, decisions, and sources</small></span>
        <span className="story-toggle" aria-hidden="true" />
      </summary>
      <div className="deep-dive-content">
        {caseId && <CaseRationale caseId={caseId} />}
        {children}
      </div>
    </details>
  );
}
