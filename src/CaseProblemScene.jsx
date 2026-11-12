import React, { useId } from 'react';

const descriptions = {
  mapping: 'Source fields need clear task, time, resource, and cost roles.',
  baselines: 'A saved reference and current schedule need a common comparison view.',
  backlog: 'Tasks without dates need a place outside the schedule.',
  formatting: 'Resource colors need an explicit condition and meaning.',
  ganttPanel: 'A large settings surface can obscure the task timeline.',
  resourcePanel: 'Resource settings need boundaries without losing the assignment context.',
  storyboard: 'An author needs to choose between template, custom, and blank starting points.',
  wizard: 'An author starts with an analytical need, not necessarily a chart name.',
  gantt: 'Source fields need assigned task and date roles.',
  presentation: 'A chart can show a change without explaining why.',
  kpi: 'Repeated blank-card setup needs a reusable starting point.',
  crosstab: 'Flat data needs clear rows, columns, and measure groupings.'
};

function Window({ x, y, width, height, title, children }) {
  return <g transform={`translate(${x} ${y})`}>
    <path className="scene-depth" d={`M0 0l8-6h${width}v${height}l-8 6Z`} />
    <rect className="scene-paper" width={width} height={height} rx="8" />
    <path className="scene-line" d={`M0 32h${width}`} />
    <circle className="scene-dot" cx="15" cy="16" r="3" />
    <text x="27" y="21">{title}</text>
    {children}
  </g>;
}

function Bars({ x = 16, y = 55, width = 145 }) {
  return <g>{[0, 1, 2].map(row => <g key={row}>
    <path className="scene-line" d={`M${x} ${y + row * 29 + 16}h${width}`} />
    <rect className="scene-bar" x={x + row * 23} y={y + row * 29} width={width * .5} height="11" rx="4" />
  </g>)}</g>;
}

function SourceTable() {
  return <Window x={38} y={34} width={282} height={166} title="Source data">
    {['ID', 'Date', 'Value'].map((label, index) => <g key={label}>
      <text className="scene-muted" x={20 + index * 88} y="61">{label}</text>
      {[0, 1, 2].map(row => <rect className="scene-placeholder" key={row} x={18 + index * 88} y={78 + row * 26} width="67" height="9" rx="3" />)}
    </g>)}
  </Window>;
}

function Problem({ caseId }) {
  switch (caseId) {
    case 'mapping':
    case 'gantt':
    case 'crosstab':
      return <>
        <SourceTable />
        <rect className="scene-callout" x="167" y="154" width="275" height="54" rx="8" />
        <text x="304" y="177" textAnchor="middle">{caseId === 'mapping' ? 'Which field means what?' : caseId === 'gantt' ? 'Which dates define the task?' : 'How should this group?'}</text>
        <text className="scene-muted" x="304" y="196" textAnchor="middle">{caseId === 'crosstab' ? 'Rows · Columns · Measures' : 'Data needs a clear role.'}</text>
      </>;
    case 'baselines':
      return <>
        <Window x={25} y={29} width={202} height={164} title="Saved reference"><Bars width={160} /></Window>
        <Window x={253} y={52} width={202} height={164} title="Current schedule"><Bars x={28} width={155} /></Window>
        <path className="scene-question" d="M233 92h15m-4-4 4 4-4 4M248 152h-15m4-4-4 4 4 4" />
      </>;
    case 'backlog':
      return <>
        <Window x={27} y={34} width={236} height={164} title="No dates assigned">
          <path className="scene-line" d="M18 72h198M18 104h198M18 136h198" />
          <text className="scene-muted" x="118" y="96" textAnchor="middle">Where does this work go?</text>
        </Window>
        {['Task A', 'Task B', 'Task C'].map((title, index) => <g key={title}>
          <rect className="scene-callout" x={302 + index * 9} y={45 + index * 54} width="117" height="42" rx="6" />
          <circle className="scene-dot" cx={319 + index * 9} cy={66 + index * 54} r="4" />
          <text x={332 + index * 9} y={71 + index * 54}>{title}</text>
        </g>)}
      </>;
    case 'formatting':
      return <Window x={46} y={30} width={388} height={176} title="Resource assignments">
        {[0, 1, 2].map(row => <g key={row}>
          <circle className="scene-placeholder" cx="30" cy={63 + row * 35} r="10" />
          <rect className="scene-bar" x="57" y={57 + row * 35} width={230 - row * 37} height="12" rx="4" />
        </g>)}
        <rect className="scene-callout" x="219" y="116" width="147" height="43" rx="6" />
        <text x="292" y="142" textAnchor="middle">Color means what?</text>
      </Window>;
    case 'ganttPanel':
    case 'resourcePanel':
      return <>
        <Window x={32} y={32} width={350} height={174} title={caseId === 'ganttPanel' ? 'Task timeline' : 'Resource timeline'}><Bars width={280} /></Window>
        <Window x={247} y={51} width={194} height={165} title="Many settings">
          {['Time', 'Appearance', 'Labels'].map((label, index) => <g key={label}>
            <text className="scene-muted" x="16" y={61 + index * 33}>{label}</text>
            <rect className="scene-placeholder" x="111" y={49 + index * 33} width="61" height="16" rx="4" />
          </g>)}
        </Window>
      </>;
    case 'storyboard':
    case 'wizard':
      return <>
        {(caseId === 'storyboard' ? ['Template', 'Custom', 'Blank'] : ['Compare', 'Trend', 'Distribution']).map((title, index) => <Window key={title} x={23 + index * 151} y={42 + (index === 1 ? 18 : 0)} width={132} height={140} title={title}>
          {index === 2 ? <path className="scene-line" d="M50 77h32M66 61v32" /> : <Bars x={13} y={54} width={105} />}
        </Window>)}
        <text className="scene-muted" x="240" y="220" textAnchor="middle">Where should I start?</text>
      </>;
    case 'presentation':
      return <>
        <Window x={31} y={30} width={284} height={176} title="The chart shows a change">
          {[47, 76, 57, 98].map((height, index) => <rect className="scene-bar" key={index} x={28 + index * 52} y={154 - height} width="31" height={height} rx="4" />)}
        </Window>
        <rect className="scene-callout" x="300" y="77" width="153" height="91" rx="9" />
        <text x="376" y="111" textAnchor="middle">What changed?</text>
        <text className="scene-muted" x="376" y="138" textAnchor="middle">And why?</text>
      </>;
    case 'kpi':
      return <>
        {['Metric A', 'Metric B', 'Metric C'].map((title, index) => <Window key={title} x={23 + index * 151} y={45} width={132} height={141} title={title}>
          <path className="scene-line" d="M42 77h48M66 53v48" />
          <text className="scene-muted" x="66" y="125" textAnchor="middle">Start again?</text>
        </Window>)}
        <text className="scene-muted" x="240" y="220" textAnchor="middle">Repeated blank-card setup</text>
      </>;
    default:
      throw new Error(`Unknown problem illustration: ${caseId}`);
  }
}

export default function CaseProblemScene({ caseId }) {
  const grid = useId();
  return <svg className="case-problem-scene" viewBox="0 0 480 236" role="img" aria-label={`Illustrative problem: ${descriptions[caseId]} Not a historical product screen.`}>
    <defs><pattern id={grid} width="24" height="24" patternUnits="userSpaceOnUse"><path className="scene-grid" d="M24 0H0v24" /></pattern></defs>
    <rect className="scene-ground" width="480" height="236" rx="10" />
    <rect width="480" height="236" fill={`url(#${grid})`} rx="10" />
    <Problem caseId={caseId} />
  </svg>;
}
