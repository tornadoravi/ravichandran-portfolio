import React from 'react';
import IllustrationSurface from './IllustrationSurface.jsx';

const descriptions = {
  storyboard: 'Template, custom, and blank starting points connect to one report-authoring canvas.',
  gantt: 'Task, start, and end fields connect to a structured timeline.',
  wizard: 'Chart-first and question-first discovery converge on a shared configuration.',
  presentation: 'An annotation connects a chart observation to explanation and presentation.',
  kpi: 'A preset library provides reusable simple and variance card layouts.'
};

function Paper({ x, y, width, height, title, paint, children, stacked = false }) {
  return <g transform={`translate(${x} ${y})`}>
    {stacked && <rect className="feature-paper-back" x="6" y="5" width={width} height={height} rx="8" transform={`rotate(3 ${width / 2} ${height / 2})`} />}
    <rect className="feature-paper" width={width} height={height} rx="8" fill={`url(#${paint.paper})`} filter={`url(#${paint.shadow})`} />
    {title && <>
      <path className="feature-rule" d={`M0 29h${width}`} />
      <circle className="feature-dot" cx="14" cy="14" r="2.5" />
      <text className="feature-micro feature-heading" x="24" y="17">{title}</text>
    </>}
    {children}
  </g>;
}

function Arrow({ d }) {
  return <path className="feature-connector" d={d} />;
}

function MiniBars({ x, y, paint, width = 64, height = 54 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path className="feature-rule" d={`M0 ${height}h${width}`} />
    {[24, 39, 31, 48].map((value, index) => {
      const barHeight = value * height / 54;
      return <g key={value}>
        <rect x={index * width / 4 + 3} y={height + 1 - barHeight} width={width / 4 - 6} height={barHeight} rx="2" className="feature-bar-depth" />
        <rect x={index * width / 4 + 2} y={height - 1 - barHeight} width={width / 4 - 6} height={barHeight} rx="2" fill={`url(#${index === 2 ? paint.sand : paint.green})`} />
      </g>;
    })}
  </g>;
}

function Storyboard({ paint }) {
  return <>
    <ellipse className="feature-ground-shadow" cx="251" cy="211" rx="182" ry="9" />
    {['Template', 'Custom', 'Blank'].map((label, index) => <Paper key={label} x={34 + index * 3} y={47 + index * 49} width={128} height={38} paint={paint}>
      <rect className="feature-soft-panel" x="10" y="9" width="21" height="21" rx="4" />
      {index === 2
        ? <path className="feature-connector" d="M16 19h9m-4.5-4.5v9" />
        : <g className="feature-small-icon">
          <rect x="15" y="14" width={index ? 10 : 4} height="4" rx="1" />
          <rect x="15" y="21" width="4" height="4" rx="1" />
          <rect x="22" y={index ? 21 : 14} width="4" height={index ? 4 : 11} rx="1" />
        </g>}
      <text x="42" y="24">{label}</text>
    </Paper>)}
    <Arrow d="M172 116h27m-6-5 6 5-6 5" />
    <Paper x={211} y={33} width={227} height={164} title="AUTHORING CANVAS" paint={paint} stacked>
      <rect className="feature-soft-panel" x="14" y="42" width="199" height="17" rx="3" />
      <path className="feature-muted-line" d="M24 50h76m75 0h27" />
      <rect className="feature-module" x="14" y="71" width="94" height="76" rx="4" />
      <MiniBars x={23} y={80} width={76} paint={paint} />
      <rect className="feature-module" x="119" y="71" width="94" height="76" rx="4" />
      <path className="feature-muted-line" d="M132 86h64M132 101h64M132 116h64M132 131h44" />
      <path className="feature-rule" d="M163 79v60" />
    </Paper>
  </>;
}

function Gantt({ paint }) {
  return <>
    <path className="feature-ground" d="m43 201 161-18 234 15-141 21Z" />
    <ellipse className="feature-ground-shadow" cx="247" cy="208" rx="180" ry="8" />
    <Paper x={37} y={43} width={131} height={149} title="SOURCE FIELDS" paint={paint} stacked>
      {['Task', 'Start', 'End'].map((label, index) => <g key={label}>
        <rect className="feature-soft-panel" x="13" y={44 + index * 31} width="105" height="22" rx="4" />
        <rect className="feature-field-icon" x="22" y={51 + index * 31} width="8" height="8" rx="2" />
        <text x="39" y={59 + index * 31}>{label}</text>
        <circle className="feature-port" cx="109" cy={55 + index * 31} r="2" />
      </g>)}
    </Paper>
    <Arrow d="M178 119h29m-6-5 6 5-6 5" />
    <Paper x={219} y={39} width={222} height={157} title="TIMELINE" paint={paint}>
      <rect className="feature-soft-panel" x="13" y="40" width="196" height="18" rx="3" />
      <path className="feature-rule" d="M58 40v100M95 40v100M132 40v100M169 40v100M206 40v100M13 85h196M13 114h196M13 143h196" />
      {[0, 1, 2].map(row => <g key={row}>
        <path className="feature-muted-line" d={`M19 ${74 + row * 29}h19`} />
        <rect className="feature-bar-depth" x={57 + row * 36} y={69 + row * 29} width={75 - row * 10} height="11" rx="3" />
        <rect x={56 + row * 36} y={67 + row * 29} width={75 - row * 10} height="11" rx="3" fill={`url(#${row === 1 ? paint.sand : paint.green})`} />
      </g>)}
      <path className="feature-connector feature-fine-line" d="M132 73h8v29h-10m26 0h12v29h-4" />
    </Paper>
  </>;
}

function Wizard({ paint }) {
  return <>
    <ellipse className="feature-ground-shadow" cx="246" cy="210" rx="182" ry="8" />
    <Paper x={38} y={39} width={135} height={69} paint={paint}>
      <text className="feature-micro feature-heading" x="13" y="20">CHART FIRST</text>
      <MiniBars x={15} y={27} width={51} height={31} paint={paint} />
      <path className="feature-muted-line" d="M84 39h35M84 51h25" />
    </Paper>
    <Paper x={38} y={130} width={135} height={69} paint={paint}>
      <text className="feature-micro feature-heading" x="13" y="20">QUESTION FIRST</text>
      <path className="feature-soft-panel feature-speech" d="M18 29h38a6 6 0 0 1 6 6v15a6 6 0 0 1-6 6H35l-9 7v-7h-8a6 6 0 0 1-6-6V35a6 6 0 0 1 6-6Z" />
      <text className="feature-symbol" x="38" y="49" textAnchor="middle">?</text>
      <path className="feature-muted-line" d="M80 37h39M80 49h28" />
    </Paper>
    <path className="feature-route" d="M183 74h21q19 0 19 19v13m-40 58h21q19 0 19-19v-13" />
    <circle className="feature-node-depth" cx="225" cy="122" r="15" />
    <circle cx="223" cy="119" r="15" fill={`url(#${paint.green})`} />
    <path className="feature-check" d="m216 119 5 5 9-11" />
    <Arrow d="M246 119h34m-6-5 6 5-6 5" />
    <Paper x={294} y={36} width={142} height={163} title="CONFIGURE" paint={paint} stacked>
      <rect className="feature-module" x="15" y="42" width="112" height="65" rx="4" />
      <MiniBars x={34} y={47} width={74} paint={paint} />
      {[0, 1].map(row => <g key={row}>
        <rect className="feature-soft-panel" x="16" y={121 + row * 21} width="10" height="10" rx="2" />
        <path className="feature-muted-line" d={`M36 ${126 + row * 21}h73`} />
      </g>)}
    </Paper>
  </>;
}

function Presentation({ paint }) {
  return <>
    <ellipse className="feature-ground-shadow" cx="252" cy="210" rx="179" ry="8" />
    <Paper x={40} y={66} width={235} height={128} title="CHART CONTEXT" paint={paint} stacked>
      <MiniBars x={22} y={50} width={123} paint={paint} />
      <path className="feature-muted-line" d="M166 64h45M166 78h34M166 92h39" />
      <circle className="feature-highlight" cx="81" cy="67" r="16" />
      <circle className="feature-port" cx="95" cy="53" r="4" />
    </Paper>
    <path className="feature-route" d="M135 119h37q13 0 13-13V91q0-13 13-13h87" />
    <Paper x={289} y={35} width={150} height={89} paint={paint}>
      <rect className="feature-soft-panel" x="12" y="12" width="24" height="24" rx="6" />
      <path className="feature-connector" d="M19 19h11m-11 5h8" />
      <text className="feature-micro feature-heading" x="45" y="22">ADD CONTEXT</text>
      <path className="feature-muted-line" d="M15 49h119M15 62h119M15 75h81" />
    </Paper>
    <path className="feature-paper-back" d="m304 124 1 10 14-10" />
    <Paper x={305} y={157} width={126} height={37} paint={paint}>
      <circle className="feature-soft-panel" cx="21" cy="18.5" r="10" />
      <path className="feature-play" d="m19 14 7 4.5-7 4.5Z" />
      <text x="39" y="23">Present</text>
    </Paper>
    <Arrow d="M365 134v14m-5-6 5 6 5-6" />
  </>;
}

function Kpi({ paint }) {
  return <>
    <path className="feature-ground" d="m45 200 151-19 244 18-118 20Z" />
    <ellipse className="feature-ground-shadow" cx="249" cy="211" rx="181" ry="8" />
    <Paper x={40} y={39} width={142} height={157} title="PRESET LIBRARY" paint={paint} stacked>
      {[0, 1, 2, 3].map(index => <g key={index} transform={`translate(${14 + index % 2 * 60} ${44 + Math.floor(index / 2) * 51})`}>
        <rect className={index === 0 ? 'feature-selected-panel' : 'feature-module'} width="53" height="41" rx="4" />
        <path className="feature-muted-line" d="M10 12h27" />
        <rect x="10" y="22" width={index % 2 ? 18 : 32} height="8" rx="2" fill={`url(#${paint.green})`} />
      </g>)}
    </Paper>
    <Arrow d="M194 119h35m-6-5 6 5-6 5" />
    <Paper x={246} y={48} width={115} height={135} paint={paint}>
      <text className="feature-micro feature-heading" x="14" y="22">SIMPLE</text>
      <path className="feature-rule" d="M14 34h87" />
      <text className="feature-value" x="57.5" y="83" textAnchor="middle">Value</text>
      <path className="feature-muted-line" d="M33 105h49" />
    </Paper>
    <Paper x={338} y={82} width={105} height={116} paint={paint}>
      <text className="feature-micro feature-heading" x="13" y="22">VARIANCE</text>
      <path className="feature-rule" d="M13 34h79" />
      <path className="feature-connector" d="M49 73V48m-6 6 6-6 6 6" />
      <rect x="20" y="85" width="65" height="8" rx="3" fill={`url(#${paint.sand})`} />
    </Paper>
  </>;
}

const scenes = { storyboard: Storyboard, gantt: Gantt, wizard: Wizard, presentation: Presentation, kpi: Kpi };

export default function FeatureIllustration({ caseId }) {
  const Scene = scenes[caseId];
  if (!Scene) throw new Error(`Unknown feature illustration: ${caseId}`);
  return <svg className="case-topic-art feature-illustration portfolio-illustration" data-case-scene={`${caseId}-design`} viewBox="0 0 480 236" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Concept illustration: ${descriptions[caseId]}`}>
    <IllustrationSurface>{paint => <g className="case-topic-scene"><Scene paint={paint} /></g>}</IllustrationSurface>
  </svg>;
}
