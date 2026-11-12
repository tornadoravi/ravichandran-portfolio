import React from 'react';
import IllustrationSurface, { PaperSheet } from './IllustrationSurface.jsx';

function Tile({ x, y, width = 126, height = 50, label, accent = false }) {
  return <g className={accent ? 'diagram-tile diagram-tile--accent' : 'diagram-tile'}>
    <rect className="illustration-paper-back" x={x + 3} y={y + 3} width={width} height={height} rx="10" />
    <PaperSheet x={x} y={y} width={width} height={height} rx="10" />
    <text x={x + width / 2} y={y + height / 2 + 5} textAnchor="middle">{label}</text>
  </g>;
}

function Arrow({ x = 172, y = 110, length = 50 }) {
  return <path className="diagram-arrow" d={`M${x} ${y}h${length}m-7-6 7 6-7 6`} />;
}

function Timeline({ x = 255, y = 54, baseline = false }) {
  return <g className="diagram-timeline">
    <rect className="illustration-paper-back" x={x + 4} y={y + 4} width="190" height="124" rx="12" />
    <PaperSheet x={x} y={y} width="190" height="124" rx="12" />
    {[45, 85, 125, 165].map(offset => <path key={offset} className="diagram-gridline" d={`M${x + offset} ${y + 22}v82`} />)}
    <text x={x + 16} y={y + 22}>{baseline ? 'Current + baseline' : 'Connected plan'}</text>
    {[0, 1, 2].map(row => <g key={row}>
      <rect className="diagram-bar" x={x + 18 + row * 28} y={y + 41 + row * 23} width={85 - row * 12} height="10" rx="4" />
      {baseline && <path className="diagram-baseline" d={`M${x + 18 + row * 22} ${y + 55 + row * 23}h${95 - row * 12}`} />}
    </g>)}
  </g>;
}

function Panel({ resource = false }) {
  return <>
    <Timeline x={20} y={52} />
    <Arrow x={220} length={24} />
    <g className="diagram-panel">
      <rect className="illustration-paper-back" x="264" y="28" width="200" height="184" rx="12" />
      <PaperSheet x="260" y="24" width="200" height="184" rx="12" />
      <text x="278" y="51">{resource ? 'Resource settings' : 'Gantt settings'}</text>
      {(resource ? ['Timeline', 'Milestone', 'Color', 'Label'] : ['Timeline', 'Milestone', 'Dependency', 'Color', 'Label']).map((label, index) => <g key={label}>
        <circle cx="283" cy={75 + index * 25} r="4" />
        <text x="298" y={80 + index * 25}>{label}</text>
      </g>)}
    </g>
  </>;
}

const descriptions = {
  mapping: 'Task, time, resource, and cost fields connect through shared identifiers to a planning view.',
  baselines: 'Select two comparison options; view current and baseline bars together while managing saved baselines separately.',
  backlog: 'An explicit empty-state action and a compact populated list sit beside the schedule; pending changes remain distinct.',
  formatting: 'A condition, its targets, and its visual styling are separate choices. This diagram does not show an applied result.',
  ganttPanel: 'A contextual panel groups five types of Gantt settings while retaining the timeline context.',
  resourcePanel: 'A contextual panel groups four types of resource settings, separate from conditional rules.',
  storyboard: 'Template, custom-layout, and blank-report starting points lead into an authoring canvas.',
  gantt: 'Task and date fields map into a Gantt timeline in Analytics+ for Power BI.',
  wizard: 'Chart-based and question-based discovery converge on shared chart configuration.',
  presentation: 'An observation on a chart connects to its explanatory comment and presentation context.',
  kpi: 'Simple and variance card arrangements provide starting points for reusable KPI templates.',
  crosstab: 'Rows and columns organize measures into a summary-and-detail matrix.',
  powertable: 'Task planning, resource planning, and cross-tab summaries are connected areas of PowerTable.',
  analyticsSuite: 'Chart discovery, Gantt, Storyboard, presentation, and KPI presets form connected authoring experiences.'
};

function Scene({ caseId }) {
  switch (caseId) {
    case 'mapping':
      return <>
        {['Task', 'Time', 'Resource', 'Cost'].map((label, index) => <Tile key={label} x={20 + (index % 2) * 112} y={42 + Math.floor(index / 2) * 68} width={100} label={label} />)}
        <path className="diagram-arrow" d="M125 95v15m-6-6 6 6 6-6" />
        <text className="diagram-note" x="125" y="187" textAnchor="middle">Shared Task ID</text>
        <Arrow x={239} length={24} />
        <Timeline x={275} />
      </>;
    case 'baselines':
      return <>
        <Tile x={20} y={42} label="Current data" accent />
        <Tile x={20} y={111} label="Baseline" />
        <text className="diagram-note" x="83" y="187" textAnchor="middle">2 selections total</text>
        <Arrow x={169} length={56} />
        <Timeline baseline />
      </>;
    case 'backlog':
      return <>
        <Tile x={15} y={45} width={128} label="+ Add task" />
        <Tile x={15} y={115} width={128} label="Backlog list" accent />
        <path className="diagram-arrow" d="M78 99v12m-5-5 5 5 5-5" />
        <text className="diagram-note" x="78" y="190" textAnchor="middle">Panel states</text>
        <path className="diagram-gridline" d="M185 35v165" />
        <Timeline x={220} />
        <text className="diagram-note" x="315" y="202" textAnchor="middle">Pending ≠ saved</text>
      </>;
    case 'formatting':
      return <>
        <Tile x={15} y={70} width={145} label="Hours > 0" accent />
        <text className="diagram-note" x="87" y="146" textAnchor="middle">Condition</text>
        <Arrow x={171} length={26} />
        <Tile x={210} y={70} width={100} label="Targets" />
        <Arrow x={321} length={26} />
        <Tile x={360} y={70} width={105} label="Style" accent />
        <text className="diagram-note" x="260" y="146" textAnchor="middle">Scope</text>
        <text className="diagram-note" x="412" y="146" textAnchor="middle">Appearance</text>
        <text className="diagram-note" x="240" y="197" textAnchor="middle">Rule editor, not an after-Apply result</text>
      </>;
    case 'ganttPanel': return <Panel />;
    case 'resourcePanel': return <Panel resource />;
    case 'storyboard':
      return <>
        {['Template', 'Custom layout', 'Blank report'].map((label, index) => <Tile key={label} x={15} y={18 + index * 64} width={143} label={label} accent={index === 1} />)}
        <path className="diagram-arrow" d="M170 44h30v128h-30m30-64h40m-7-6 7 6-7 6" />
        <g className="diagram-canvas">
          <PaperSheet x="255" y="35" width="205" height="160" rx="12" />
          <rect x="270" y="50" width="175" height="28" rx="5" />
          <rect x="270" y="89" width="80" height="87" rx="5" />
          <rect x="362" y="89" width="83" height="87" rx="5" />
          <text x="310" y="140" textAnchor="middle">Visual</text>
          <text x="402" y="140" textAnchor="middle">Context</text>
        </g>
      </>;
    case 'gantt':
      return <>
        {['Task', 'Start date', 'End date'].map((label, index) => <Tile key={label} x={25} y={20 + index * 65} label={label} accent={index === 0} />)}
        <Arrow />
        <Timeline />
      </>;
    case 'wizard':
      return <>
        <Tile x={15} y={30} width={144} label="Chart first" />
        <Tile x={15} y={135} width={144} label="Question first" accent />
        <path className="diagram-arrow" d="M170 55h40v105h-40m40-52h50m-7-6 7 6-7 6" />
        <Tile x={278} y={80} width={185} height={60} label="Shared configuration" accent />
        <text className="diagram-note" x="368" y="171" textAnchor="middle">Customize → configure</text>
      </>;
    case 'presentation':
      return <>
        <g className="diagram-canvas">
          <PaperSheet x="20" y="40" width="220" height="160" rx="12" />
          {[65, 98, 50, 80].map((height, index) => <rect className="diagram-bar" key={index} x={45 + index * 43} y={180 - height} width="26" height={height} rx="4" />)}
          <circle className="diagram-pin" cx="101" cy="72" r="13" />
          <text className="diagram-pin-label" x="101" y="77" textAnchor="middle">1</text>
        </g>
        <path className="diagram-arrow" d="M119 70h139m-7-6 7 6-7 6" />
        <Tile x={277} y={45} width={183} label="Explain the insight" accent />
        <Tile x={277} y={132} width={183} label="Guide attention" />
        <path className="diagram-arrow" d="M369 101v25m-6-7 6 7 6-7" />
      </>;
    case 'kpi':
      return <>
        <g className="diagram-canvas">
          <PaperSheet x="20" y="55" width="137" height="120" rx="12" />
          <text className="diagram-note" x="88" y="85" textAnchor="middle">Simple</text>
          <text className="diagram-value" x="88" y="133" textAnchor="middle">Value</text>
          <PaperSheet x="178" y="55" width="137" height="120" rx="12" />
          <text className="diagram-note" x="246" y="85" textAnchor="middle">Variance</text>
          <text className="diagram-value" x="246" y="128" textAnchor="middle">Δ</text>
          <path className="diagram-bar" d="M197 149h98" strokeWidth="5" />
        </g>
        <Arrow x={327} length={24} />
        <Tile x={364} y={89} width={101} label="Reuse" accent />
      </>;
    case 'crosstab':
      return <>
        <Tile x={15} y={35} width={107} label="Rows" />
        <Tile x={15} y={103} width={107} label="Columns" />
        <Tile x={15} y={171} width={107} height={38} label="Measures" accent />
        <Arrow x={133} length={32} />
        <g className="diagram-matrix">
          <PaperSheet x="183" y="45" width="272" height="132" rx="2" />
          {[0, 1, 2].flatMap(row => [0, 1, 2, 3].map(col => <rect className={row === 0 || col === 0 ? 'diagram-matrix-header' : undefined} key={`${row}-${col}`} x={183 + col * 68} y={45 + row * 44} width="68" height="44" />))}
          <text x="319" y="202" textAnchor="middle">Summary + detail</text>
        </g>
      </>;
    case 'powertable':
      return <>
        <Tile x={15} y={22} width={140} label="Task data" />
        <Tile x={15} y={94} width={140} label="Time + capacity" accent />
        <Tile x={15} y={166} width={140} label="Summary view" />
        <Arrow />
        {['Gantt', 'Resources', 'Cross-tab'].map((label, index) => <Tile key={label} x={254} y={22 + index * 72} width={207} label={label} accent={index === 1} />)}
      </>;
    case 'analyticsSuite':
      return <>
        {['Chart Wizard', 'Gantt', 'Storyboard', 'Presentation', 'KPI Presets'].map((label, index) => <g key={label}>
          <Tile x={20 + (index % 3) * 155} y={index < 3 ? 45 : 139} width={135} label={label} accent={index === 0 || index === 4} />
          {index < 2 && <Arrow x={161 + index * 155} y={70} length={9} />}
        </g>)}
        <text className="diagram-note" x="400" y="169" textAnchor="middle">5 feature stories</text>
      </>;
    default: throw new Error(`Unknown case diagram: ${caseId}`);
  }
}

export default function CaseDiagram({ caseId }) {
  return <svg className="case-diagram portfolio-illustration" viewBox="0 0 480 236" role="img" aria-label={descriptions[caseId]}>
    <IllustrationSurface><Scene caseId={caseId} /></IllustrationSurface>
  </svg>;
}
