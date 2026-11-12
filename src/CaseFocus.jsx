import React from 'react';

const stories = {
  planning: {
    title: 'From task data to a connected plan.',
    scenario: 'A planner needs to schedule work and see who is assigned.',
    steps: [
      ['Map the task data', 'Task IDs, dates, and assignees.'],
      ['Schedule the work', 'Tasks and dependencies on a timeline.'],
      ['Connect the people', 'Assignments in the resource view.']
    ],
    ownership: 'End-to-end Gantt and resource UX/UI; Microsoft Fabric design system.',
    decision: 'Separate task, time, resource, and cost roles; expose shared IDs.',
    evidence: 'Design screens and implementation review. Baseline planning and resource earned-value remain explorations.',
    link: ['/column-mapping.html', 'Inspect my mapping design']
  },
  wizard: {
    title: 'Start with the question, not a chart name.',
    scenario: 'An author needs to compare categories without knowing which chart to choose.',
    steps: [
      ['Start with the need', 'Compare categories.'],
      ['Choose a suitable chart', 'Review the available chart options.'],
      ['Shape the result', 'Customize appearance; configure analysis.']
    ],
    ownership: 'End-to-end UX/UI through handoff and implementation review.',
    decision: 'Chart and Function share Customize and Advanced.',
    evidence: 'Chart Wizard shipped. Original screens below.',
    link: ['#browse-function', 'Compare the two entry routes']
  }
};

function ScenarioScene({ story, step }) {
  if (story === 'planning') {
    if (step === 0) return <>
      <rect x="8" y="16" width="72" height="110" rx="9" />
      <rect x="122" y="16" width="70" height="110" rx="9" />
      {[0, 1, 2].map(row => <g key={row}>
        <rect className="focus-fill" x="19" y={34 + row * 28} width="49" height="16" rx="4" />
        <path className="focus-connector" d={`M84 ${42 + row * 28}h30m-5-5 5 5-5 5`} />
        <circle className="focus-dot" cx="139" cy={42 + row * 28} r="5" />
        <path d={`M151 ${42 + row * 28}h27`} />
      </g>)}
    </>;
    if (step === 1) return <>
      <rect x="6" y="14" width="188" height="112" rx="9" />
      {[55, 94, 133, 172].map(x => <path className="focus-gridline" key={x} d={`M${x} 26v88`} />)}
      {[0, 1, 2].map(row => <g key={row}>
        <circle cx="21" cy={43 + row * 29} r="4" />
        <rect className={row === 1 ? 'focus-secondary' : 'focus-solid'} x={39 + row * 31} y={36 + row * 29} width={69 - row * 10} height="13" rx="4" />
      </g>)}
      <path className="focus-connector" d="M108 43h10v29m-4-5 4 5 4-5" />
    </>;
    return <>
      <rect x="6" y="14" width="188" height="112" rx="9" />
      {[0, 1, 2].map(row => <g key={row}>
        <circle className="focus-fill" cx="26" cy={40 + row * 31} r="12" />
        <circle cx="26" cy={36 + row * 31} r="3" />
        <path d={`M20 ${46 + row * 31}q6-8 12 0`} />
        <rect className="focus-fill" x="48" y={34 + row * 31} width="130" height="13" rx="5" />
        <rect className={row === 1 ? 'focus-secondary' : 'focus-solid'} x={52 + row * 16} y={34 + row * 31} width={63 - row * 9} height="13" rx="5" />
      </g>)}
    </>;
  }
  if (step === 0) return <>
    <rect className="focus-fill" x="9" y="18" width="92" height="107" rx="10" />
    {[29, 55, 76].map((height, index) => <rect className="focus-solid" key={height} x={24 + index * 23} y={108 - height} width="13" height={height} rx="3" />)}
    <rect x="115" y="18" width="76" height="47" rx="8" />
    <path d="m126 53 15-17 13 6 24-14" />
    <rect x="115" y="78" width="76" height="47" rx="8" />
    {[[130, 110], [144, 96], [153, 113], [165, 92], [176, 103]].map(([x, y]) => <circle className="focus-dot" key={x} cx={x} cy={y} r="3" />)}
  </>;
  if (step === 1) return <>
    <rect className="focus-fill" x="8" y="18" width="88" height="107" rx="9" />
    {[28, 50, 70].map((height, index) => <rect className="focus-solid" key={height} x={23 + index * 23} y={107 - height} width="13" height={height} rx="3" />)}
    <rect x="110" y="18" width="82" height="107" rx="9" />
    {[35, 57, 78].map((width, row) => <rect className="focus-secondary" key={width} x="122" y={39 + row * 25} width={width * .7} height="12" rx="3" />)}
    <circle className="focus-solid" cx="87" cy="27" r="13" />
    <path className="focus-check" d="m81 27 4 4 8-8" />
  </>;
  return <>
    <rect x="8" y="18" width="184" height="107" rx="9" />
    {[30, 55, 73].map((height, index) => <rect className="focus-solid" key={height} x={24 + index * 24} y={109 - height} width="14" height={height} rx="3" />)}
    <path className="focus-gridline" d="M111 19v105" />
    {[38, 65, 92].map((y, index) => <g key={y}>
      <path d={`M126 ${y}h51`} />
      <circle className="focus-fill" cx={139 + index * 12} cy={y} r="5" />
    </g>)}
  </>;
}

export default function CaseFocus({ story }) {
  const content = stories[story];
  if (!content) throw new Error(`Unknown focused story: ${story}`);
  return <section id="design-focus" className="case-snapshot case-focus wrap" aria-labelledby="design-focus-title" data-focus-story={story}>
    <p className="eyebrow">{story === 'planning' ? 'Ownership story' : 'Scenario-based design'}</p>
    <h2 id="design-focus-title" className="visual-story-title">{content.title}</h2>
    <p id="story-problem" className="focus-task">{content.scenario}</p>
    <div className="focus-story">
      <figure id="story-flow" className="focus-illustration">
        <ol className="focus-steps" aria-label={story === 'planning' ? 'Illustrative planning scenario' : 'Illustrative chart-selection scenario'}>
          {content.steps.map(([title, detail], step) => <li key={title}>
            <svg viewBox="0 0 200 140" aria-hidden="true" focusable="false"><ScenarioScene story={story} step={step} /></svg>
            <div><span className="story-step-number" aria-hidden="true">{String(step + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{detail}</p></div>
          </li>)}
        </ol>
        <figcaption>Original scenario illustration · Not product UI or an observed session.</figcaption>
      </figure>
      <div className="focus-explanation">
        <dl>
          <div className="story-highlight"><dt>My ownership</dt><dd>{content.ownership}</dd></div>
          <div id="story-decision" className="story-highlight"><dt>Key design decision</dt><dd>{content.decision}</dd></div>
          <div id="story-evidence" className="story-highlight"><dt>Delivery & evidence</dt><dd>{content.evidence}</dd></div>
        </dl>
        <a className="text-link" href={content.link[0]}>{content.link[1]} <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>;
}
