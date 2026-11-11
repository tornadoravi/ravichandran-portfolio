import React, { useId } from 'react';

const ink = '#424653';
const green = '#6e917e';
const purple = '#9b8cb5';
const amber = '#c49b63';

function Paper({ x, y, width = 110, height = 130, angle = 0, label, children }) {
  return <g transform={`translate(${x} ${y}) rotate(${angle} ${width / 2} ${height / 2})`}>
    <rect x="3" y="6" width={width} height={height} rx="10" fill="#454352" opacity=".08" />
    <rect width={width} height={height} rx="10" fill="#fffdf8" stroke="#d8d6dd" />
    {label && <text x="12" y="25" fill={ink}>{label}</text>}
    {children}
  </g>;
}

function Lines({ x = 12, y = 43, width = 72, rows = 4, color = '#d7d4df' }) {
  return <g>{Array.from({ length: rows }, (_, index) =>
    <rect key={index} x={x} y={y + index * 17} width={width - (index % 2) * 13} height="7" rx="3.5" fill={color} />
  )}</g>;
}

function Tag({ x, y, width = 93, text, color = '#ded6ea' }) {
  return <g><rect x={x} y={y} width={width} height="30" rx="9" fill={color} /><text x={x + width / 2} y={y + 20} textAnchor="middle" fill={ink}>{text}</text></g>;
}

function Arrow({ d, color = green, dashed = false }) {
  return <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeDasharray={dashed ? '5 5' : undefined} strokeLinecap="round" strokeLinejoin="round" />;
}

function Schedule({ x = 0, y = 0, width = 160, reference = false }) {
  return <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2, 3].map(index => <path key={index} d={`M${18 + index * (width - 30) / 3} 0v67`} stroke="#e0dde2" />)}
    {[0, 1, 2].map(index => <g key={index}>
      <rect x={8 + index * 23} y={9 + index * 21} width={width * .53 - index * 12} height="10" rx="5" fill={index === 1 ? amber : green} />
      {reference && <path d={`M${9 + index * 17} ${24 + index * 21}h${width * .58 - index * 13}`} stroke={purple} strokeWidth="3" strokeDasharray="4 3" />}
    </g>)}
  </g>;
}

function Chart({ x = 0, y = 0, kind = 'bar', color = green }) {
  return <g transform={`translate(${x} ${y})`}>
    {kind === 'line' ? <path d="M3 62l23-26 24 10L78 7" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /> :
      kind === 'pie' ? <><circle cx="40" cy="36" r="31" fill="#e1dbe9" /><path d="M40 36V5a31 31 0 0 1 31 31Z" fill={color} /></> :
      [29, 49, 37, 65].map((height, index) => <rect key={index} x={index * 22} y={69 - height} width="14" height={height} rx="4" fill={index === 2 ? amber : color} />)}
  </g>;
}

function MappingScene({ stage }) {
  if (stage === 'challenge') return <>
    <Paper x={28} y={27} width={121} height={119} angle={-11} label="Tasks"><Lines width={82} /></Paper>
    <Paper x={188} y={72} width={133} height={125} angle={9} label="Time entries"><Lines width={91} color="#c7d8cd" /></Paper>
    <Tag x={34} y={169} text="Resource" color="#e7d4b8" />
    <Tag x={207} y={26} text="Cost" />
    <Arrow d="M151 89c54-39 60 17 10 35" dashed color={purple} />
    <text x="164" y="106" fill={ink} fontSize="24">?</text>
  </>;
  if (stage === 'design') return <>
    <Paper x={28} y={40} width={115} height={145} label="Source fields">
      <Tag x={10} y={47} width={95} text="Task ID" />
      <Tag x={10} y={92} width={95} text="Hours" color="#c7d8cd" />
    </Paper>
    <Paper x={215} y={40} width={115} height={145} label="Data roles">
      <Tag x={10} y={47} width={95} text="Task link" />
      <Tag x={10} y={92} width={95} text="Actual effort" color="#c7d8cd" />
    </Paper>
    <Arrow d="M151 102h55m-7-6 7 6-7 6M151 147h55m-7-6 7 6-7 6" />
    <text x="180" y="218" textAnchor="middle" fill={ink}>Match meaning, not just columns</text>
  </>;
  return <>
    {['Hierarchy', 'Task', 'Time', 'Resource', 'Cost'].map((label, index) =>
      <Paper key={label} x={29 + index * 52} y={38 + Math.abs(2 - index) * 14} width={85} height={125} angle={(index - 2) * 6} label={label}><Lines width={56} rows={3} /></Paper>)}
    <Tag x={95} y={190} width={170} text="5 mapping states" color="#c7d8cd" />
  </>;
}

function BaselineScene({ stage }) {
  if (stage === 'challenge') return <>
    <Paper x={27} y={35} width={202} height={119} angle={-9} label="Saved reference"><Schedule x={17} y={41} width={168} /></Paper>
    <Paper x={121} y={96} width={202} height={112} angle={8} label="Current schedule"><Schedule x={17} y={36} width={165} /></Paper>
    <path d="M275 41a22 22 0 1 1-25-5m0 0 0 13m0-13 13 1" stroke={purple} strokeWidth="3" fill="none" />
  </>;
  if (stage === 'design') return <>
    <Paper x={38} y={36} width={284} height={166} label="One comparison view">
      <Tag x={17} y={40} width={99} text="Current" color="#c7d8cd" />
      <Tag x={130} y={40} width={130} text="Baseline" />
      <Schedule x={22} y={80} width={231} reference />
    </Paper>
    <circle cx="310" cy="41" r="21" fill={ink} /><text x="310" y="47" textAnchor="middle" fill="#fffdf8">2 max</text>
  </>;
  return <>
    <Paper x={25} y={55} width={141} height={132} angle={-5} label="Comparison"><Schedule x={10} y={46} width={119} reference /></Paper>
    <Paper x={194} y={31} width={141} height={168} angle={5} label="Manage saved">
      {[0, 1, 2].map(index => <g key={index}><rect x="13" y={48 + index * 35} width="112" height="25" rx="5" fill="#e9e3ef" /><path d={`M99 ${55 + index * 35}h13m-11 0v10h9v-10`} fill="none" stroke={purple} strokeWidth="2" /></g>)}
    </Paper>
  </>;
}

function BacklogScene({ stage }) {
  if (stage === 'challenge') return <>
    {[[-10, 52, 33], [8, 144, 48], [-6, 215, 83]].map(([angle, x, y], index) =>
      <Paper key={x} x={x} y={y} width={89} height={78} angle={angle} label={`Task ${String.fromCharCode(65 + index)}`}><Lines width={55} rows={1} /></Paper>)}
    <path d="M35 155h81l20 19h89l20-19h80v55H35Z" fill="#d2c3df" stroke="#b09cc2" strokeWidth="2" />
    <text x="180" y="200" textAnchor="middle" fill={ink}>Not scheduled yet</text>
  </>;
  if (stage === 'design') return <>
    <Paper x={29} y={48} width={134} height={146} label="Empty backlog">
      <circle cx="67" cy="87" r="24" fill="#dce8df" /><path d="M55 87h24m-12-12v24" stroke={green} strokeWidth="4" strokeLinecap="round" />
    </Paper>
    <Paper x={195} y={31} width={135} height={170} label="Task list">
      {[0, 1, 2].map(index => <g key={index}><rect x="12" y={47 + index * 34} width="112" height="26" rx="5" fill="#e9e3ef" /><circle cx="25" cy={60 + index * 34} r="4" fill={purple} /><path d={`M38 ${60 + index * 34}h58`} stroke="#b5acbf" strokeWidth="4" strokeLinecap="round" /></g>)}
    </Paper>
  </>;
  return <>
    <Paper x={39} y={34} width={282} height={162} label="Changes need a clear state">
      <Lines x={18} y={47} width={215} rows={3} color="#cbdacf" />
      <rect x="0" y="120" width="282" height="42" rx="9" fill="#ead3a9" />
      <circle cx="21" cy="141" r="6" fill={amber} /><text x="38" y="146" fill={ink}>Pending changes</text>
    </Paper>
    <text x="180" y="223" textAnchor="middle" fill={ink}>Pending is not saved</text>
  </>;
}

function FormattingScene({ stage }) {
  if (stage === 'challenge') return <>
    <Paper x={27} y={42} width={219} height={151} angle={-4} label="Resource assignments"><Schedule x={16} y={51} width={184} /></Paper>
    {[green, purple, amber, '#c48583'].map((color, index) => <circle key={color} cx={246 + (index % 2) * 43} cy={99 + Math.floor(index / 2) * 44} r="24" fill={color} stroke="#fffdf8" strokeWidth="4" />)}
    <text x="271" y="56" textAnchor="middle" fill={ink}>Color alone?</text>
  </>;
  if (stage === 'design') return <>
    <Paper x={31} y={36} width={187} height={158} label="Condition">
      <text x="94" y="83" textAnchor="middle" fill={green} fontSize="22">Hours &gt; 0</text>
      <Tag x={18} y={105} width={151} text="Scheduled work" color="#dce8df" />
    </Paper>
    <Paper x={240} y={46} width={92} height={68} label="Targets"><Lines width={59} rows={1} /></Paper>
    <Paper x={240} y={132} width={92} height={68} label="Style"><circle cx="29" cy="45" r="9" fill={amber} /><circle cx="57" cy="45" r="9" fill={green} /></Paper>
    <Arrow d="M219 79h14m-5-5 5 5-5 5M219 164h14m-5-5 5 5-5 5" />
  </>;
  return <>
    <Paper x={87} y={24} width={186} height={190} label="Rule editor">
      <Tag x={18} y={47} width={150} text="Hours > 0" color="#dce8df" />
      <Lines x={19} y={95} width={143} rows={2} />
      <rect x="18" y="143" width="150" height="30" rx="5" fill="#eee7da" /><text x="93" y="163" textAnchor="middle" fill={ink}>Editing state only</text>
    </Paper>
    <path d="M52 167l9-10 18 18-9 10Zm9-10 9-30 30 30-30 9" fill="#d8c6a9" stroke={amber} strokeWidth="2" />
  </>;
}

function GanttPanelScene({ stage }) {
  if (stage === 'challenge') return <>
    <Paper x={25} y={65} width={218} height={136} label="The plan"><Schedule x={14} y={42} width={181} /></Paper>
    <g transform="rotate(8 264 96)">{['Calendar', 'Links', 'Style', 'Labels'].map((label, index) => <Tag key={label} x={222 - index * 10} y={23 + index * 37} width={106} text={label} />)}</g>
  </>;
  if (stage === 'design') return <>
    <Paper x={21} y={46} width={315} height={157} label="Plan stays in sight"><Schedule x={13} y={55} width={147} />
      <rect x="172" y="0" width="143" height="157" rx="10" fill="#e5deed" />
      {['Timeline', 'Milestone', 'Dependency', 'Color', 'Label'].map((label, index) => <text key={label} x="186" y={27 + index * 25} fill={ink}>{label}</text>)}
    </Paper>
  </>;
  return <>
    <path d="M40 50h280v148H40Z" fill="#fdfcf8" stroke="#c7bed4" strokeWidth="2" />
    {['Time', 'Milestone', 'Dependency', 'Color', 'Label'].map((label, index) => <g key={label}>
      <rect x={50 + index * 54} y={38 + index * 9} width="51" height={125 - index * 9} rx="7" fill={index % 2 ? '#c8dacf' : '#d9cfe5'} stroke="#fffdf8" strokeWidth="2" />
      <text x={75 + index * 54} y="187" textAnchor="middle" fill={ink} fontSize="10">{label}</text>
    </g>)}
    <text x="180" y="222" textAnchor="middle" fill={ink}>Five settings, distinct jobs</text>
  </>;
}

function ResourcePanelScene({ stage }) {
  if (stage === 'challenge') return <>
    <Paper x={28} y={35} width={279} height={164} label="Resource planning">
      {[0, 1].map(index => <g key={index}><circle cx="28" cy={63 + index * 55} r="12" fill={index ? purple : amber} /><rect x="51" y={54 + index * 55} width="192" height="20" rx="6" fill="#e5e9e1" /><rect x="51" y={54 + index * 55} width={index ? 152 : 98} height="20" rx="6" fill={green} /></g>)}
    </Paper>
    <g transform="rotate(-12 293 174)"><Tag x={246} y={168} width={93} text="Capacity" color="#e8d4b7" /></g>
  </>;
  if (stage === 'design') return <>
    <circle cx="180" cy="120" r="71" fill="none" stroke="#cec4dc" strokeWidth="19" />
    <circle cx="180" cy="120" r="39" fill="#fffdf8" /><text x="180" y="125" textAnchor="middle" fill={ink}>Resource</text>
    {[['Timeline', 130, 23], ['Milestone', 234, 103], ['Color', 130, 185], ['Label', 25, 103]].map(([label, x, y]) => <Tag key={label} x={x} y={y} width={100} text={label} color="#d1dfd5" />)}
  </>;
  return <>
    {['Timeline', 'Milestone', 'Color', 'Label'].map((label, index) => <Paper key={label} x={43 + (index % 2) * 148} y={28 + Math.floor(index / 2) * 102} width={125} height={86} label={label}>
      {index === 0 ? <path d="M17 54h89m-72-9v18m32-18v18m31-18v18" stroke={green} strokeWidth="3" /> :
        index === 1 ? <path d="m63 43 14 14-14 14-14-14Z" fill={amber} /> :
          index === 2 ? [green, purple, amber].map((color, i) => <circle key={color} cx={31 + i * 31} cy="57" r="11" fill={color} />) :
            <text x="63" y="66" textAnchor="middle" fill={purple} fontSize="28">Aa</text>}
    </Paper>)}
  </>;
}

function StoryboardScene({ stage }) {
  if (stage === 'challenge') return <>
    {['Template', 'Custom', 'Blank'].map((label, index) => <g key={label} transform={`translate(${29 + index * 104} ${43 + (index === 1 ? 17 : 0)})`}>
      <rect width="91" height="130" rx="10" fill={['#dacfe8', '#c9dccf', '#ecd8b9'][index]} />
      <rect x="10" y="12" width="71" height="106" rx="5" fill="#fffdf8" />
      {index !== 2 && <Lines x={18} y={30} width={51} rows={index ? 2 : 4} />}
      <text x="45" y="153" textAnchor="middle" fill={ink}>{label}</text>
    </g>)}
  </>;
  if (stage === 'design') return <>
    <Paper x={52} y={27} width={254} height={178} label="Authoring canvas">
      <rect x="16" y="42" width="222" height="24" rx="5" fill="#d5c9e2" />
      <rect x="16" y="78" width="105" height="81" rx="5" fill="#d0dfd5" /><Chart x={27} y={84} color={green} />
      <rect x="134" y="78" width="104" height="81" rx="5" fill="#e9d8bd" /><Lines x={146} y={95} width={76} rows={3} color="#c5a77d" />
    </Paper>
    <path d="m31 177 14-58 15 5-14 58-12 15Z" fill={amber} stroke="#a9814d" strokeWidth="2" />
  </>;
  return <>
    {Array.from({ length: 6 }, (_, index) => <Paper key={index} x={30 + (index % 3) * 103} y={32 + Math.floor(index / 3) * 94} width={91} height={79}>
      <rect x="10" y="10" width="71" height="9" rx="3" fill="#c7b9d8" />
      <rect x="10" y="27" width={index % 2 ? 31 : 71} height="40" rx="3" fill="#c6d8cc" />
      {index % 2 === 1 && <rect x="49" y="27" width="32" height="40" rx="3" fill="#e4d1b3" />}
    </Paper>)}
    <text x="180" y="224" textAnchor="middle" fill={ink}>Six authoring screens</text>
  </>;
}

function GanttScene({ stage }) {
  if (stage === 'challenge') return <>
    <g transform="rotate(-9 92 111)">{['Task', 'Start date', 'End date'].map((label, index) => <Tag key={label} x={31} y={38 + index * 51} width={118} text={label} />)}</g>
    <Paper x={192} y={45} width={135} height={151} label="Timeline?"><Lines width={108} rows={4} color="#e2dedf" /></Paper>
    <Arrow d="M161 112h23" dashed />
  </>;
  if (stage === 'design') return <>
    <Paper x={25} y={37} width={132} height={162} label="Task fields"><Lines width={99} rows={5} color="#c9bbdc" /></Paper>
    <Paper x={174} y={37} width={162} height={162} label="Time context"><Schedule x={12} y={61} width={135} /></Paper>
    <Arrow d="M127 96h74v24h17m-7-6 7 6-7 6" color={amber} />
    <path d="M36 21v27m21-27v27m223-27v27m21-27v27" stroke={purple} strokeWidth="4" strokeLinecap="round" />
  </>;
  return <>
    <Paper x={28} y={49} width={89} height={132} angle={-8} label="Choose"><Chart x={12} y={45} kind="line" /></Paper>
    <Paper x={135} y={30} width={89} height={150} label="Map"><Lines width={58} rows={5} /></Paper>
    <Paper x={242} y={49} width={89} height={132} angle={8} label="View"><Schedule x={6} y={48} width={76} /></Paper>
    <text x="180" y="217" textAnchor="middle" fill={ink}>Analytics+ in Power BI</text>
  </>;
}

function WizardScene({ stage }) {
  if (stage === 'challenge') return <>
    {[['bar', 34, 30], ['pie', 219, 23], ['line', 44, 131]].map(([kind, x, y]) => <Paper key={kind} x={x} y={y} width={103} height={93} angle={kind === 'pie' ? 8 : -6}><Chart x={11} y={10} kind={kind} color={purple} /></Paper>)}
    <circle cx="235" cy="158" r="43" fill="#fffdf8" stroke="#c4b8d3" strokeWidth="2" />
    <path d="m235 126 12 32-12 29-12-29Z" fill={amber} /><circle cx="235" cy="158" r="5" fill={ink} />
  </>;
  if (stage === 'design') return <>
    <path d="M83 69c0 49 97 25 97 67m97-67c0 49-97 25-97 67m0 0v48" stroke="#b8cdbf" strokeWidth="17" fill="none" />
    <Tag x={27} y={28} width={114} text="Chart" />
    <Tag x={219} y={28} width={114} text="Function" color="#e7d3b3" />
    <Paper x={119} y={127} width={122} height={84} label="Configure"><Lines width={88} rows={2} color="#bad0c1" /></Paper>
    <circle cx="180" cy="113" r="18" fill={green} /><path d="m172 113 6 6 10-13" stroke="#fffdf8" fill="none" strokeWidth="3" />
  </>;
  return <>
    <Paper x={30} y={42} width={134} height={152} angle={-7} label="UX/UI"><Chart x={23} y={52} color={purple} /></Paper>
    <Paper x={196} y={42} width={134} height={152} angle={7} label="Handoff"><Lines width={99} rows={4} color="#c5d5c9" /></Paper>
    <g transform="rotate(-8 181 174)"><rect x="115" y="153" width="135" height="43" rx="10" fill={green} /><text x="182" y="180" textAnchor="middle" fill="#fffdf8" fontSize="19">Shipped</text></g>
  </>;
}

function PresentationScene({ stage }) {
  if (stage === 'challenge') return <>
    <Paper x={37} y={48} width={230} height={151} label="An observation"><Chart x={37} y={58} /></Paper>
    <path d="M212 30h99q16 0 16 16v43q0 15-16 15h-49l-25 21 3-21h-28q-16 0-16-15V46q0-16 16-16" fill="#d8cce5" />
    <text x="262" y="76" textAnchor="middle" fill={ink} fontSize="23">Why?</text>
  </>;
  if (stage === 'design') return <>
    <Paper x={25} y={66} width={178} height={137} label="Chart context"><Chart x={22} y={46} /></Paper>
    <circle cx="111" cy="121" r="24" stroke={amber} fill="none" strokeWidth="4" />
    <path d="M134 121h24V68h52" stroke={amber} fill="none" strokeWidth="3" />
    <Paper x={205} y={28} width={128} height={110} label="Explanation"><Lines width={94} rows={3} /></Paper>
    <Tag x={205} y={165} width={128} text="Audience focus" color="#c8d9cf" />
  </>;
  return <>
    <rect x="66" y="28" width="228" height="141" rx="8" fill="#fffdf8" stroke="#c3b9d0" strokeWidth="3" />
    <Chart x={92} y={70} color={purple} /><rect x="207" y="55" width="68" height="51" rx="7" fill="#e2d4b9" /><Lines x={216} y={68} width={49} rows={2} color="#c2a472" />
    <path d="M180 169v38m-40 1h80" stroke={ink} strokeWidth="4" />
    {[88, 180, 272].map(x => <g key={x}><circle cx={x} cy="205" r="13" fill={ink} /><path d={`M${x - 23} 235q0-21 23-21t23 21`} fill={x === 180 ? green : purple} /></g>)}
    <text x="180" y="18" textAnchor="middle" fill={ink}>Presentation design states</text>
  </>;
}

function KpiScene({ stage }) {
  if (stage === 'challenge') return <>
    {[[-10, 34, 37], [7, 136, 68], [-3, 224, 36]].map(([angle, x, y], index) => <Paper key={x} x={x} y={y} width={100} height={131} angle={angle} label="Metric">
      <rect x="13" y="48" width="74" height="52" rx="5" fill={index === 1 ? '#dfd1e9' : '#e8e4ed'} /><path d="m37 75 12-12 10 10-12 12-14 4Z" fill={amber} />
    </Paper>)}
    <text x="180" y="217" textAnchor="middle" fill={ink}>Repeat the setup?</text>
  </>;
  if (stage === 'design') return <>
    <Paper x={28} y={47} width={138} height={139} label="Simple"><text x="69" y="92" textAnchor="middle" fill={green} fontSize="27">Value</text></Paper>
    <Paper x={194} y={47} width={138} height={139} label="Variance"><text x="69" y="82" textAnchor="middle" fill={purple} fontSize="30">Δ</text><path d="M21 109h96" stroke={amber} strokeWidth="8" strokeLinecap="round" /></Paper>
    <path d="M63 204h234" stroke="#c3b9cf" strokeWidth="3" strokeDasharray="4 5" />
  </>;
  return <>
    <Paper x={30} y={36} width={156} height={163} label="Reusable templates"><Lines x={16} y={50} width={119} rows={4} color="#c5d9cd" /></Paper>
    {[0, 1, 2].map(index => <g key={index} transform={`translate(${207 + index * 10} ${42 + index * 36}) rotate(${index * 4})`}><rect width="99" height="68" rx="9" fill="#fffdf8" stroke="#c8bcd5" /><rect x="13" y="14" width="56" height="6" rx="3" fill={purple} /><rect x="13" y="33" width="74" height="20" rx="5" fill="#d6e4da" /></g>)}
    <Tag x={49} y={174} width={120} text="Shipped" color="#c5d9cd" />
  </>;
}

function CrosstabScene({ stage }) {
  if (stage === 'challenge') return <>
    <Paper x={101} y={34} width={161} height={164} angle={-6} label="One dataset"><Lines width={127} rows={5} /></Paper>
    <Arrow d="M82 61H33v110m-6-7 6 7 6-7M282 189h43V78m-6 7 6-7 6 7" color={amber} />
    <Tag x={14} y={186} width={88} text="Rows" color="#e6d0ae" /><Tag x={259} y={29} width={88} text="Columns" />
  </>;
  if (stage === 'design') return <>
    <g transform="translate(78 47) skewY(-8)">
      {[0, 1, 2, 3].flatMap(row => [0, 1, 2, 3].map(col => <rect key={`${row}-${col}`} x={col * 51} y={row * 34} width="51" height="34" fill={row === 0 ? '#bcb0d0' : col === 0 ? '#b8cfbf' : '#fffdf8'} stroke="#e6e1e9" />))}
    </g>
    <Tag x={120} y={191} width={136} text="Measures" color="#e6d0ae" />
    <path d="M54 68v113m-6-7 6 7 6-7M97 28h186m-7-6 7 6-7 6" stroke={green} strokeWidth="3" fill="none" />
  </>;
  return <>
    <Paper x={46} y={33} width={266} height={169} label="Configuration contribution">
      <rect x="18" y="44" width="228" height="102" rx="5" fill="none" stroke="#d1c7dc" strokeWidth="2" strokeDasharray="5 5" />
      <rect x="18" y="44" width="99" height="58" rx="5" fill="#d1dfd5" stroke={green} strokeWidth="2" />
      <Lines x={30} y={59} width={71} rows={2} color="#8daf9b" />
      <text x="177" y="128" textAnchor="middle" fill={ink}>Defined scope</text>
    </Paper>
    <path d="m269 180 34-45 12 10-34 45-18 7Z" fill={amber} />
  </>;
}

function PowerTableScene({ stage }) {
  if (stage === 'challenge') return <>
    <Paper x={21} y={30} width={115} height={103} angle={-6} label="Tasks"><Lines width={80} rows={3} /></Paper>
    <Paper x={221} y={36} width={115} height={103} angle={6} label="Capacity"><rect x="16" y="45" width="82" height="14" rx="5" fill="#c5d8cb" /><rect x="16" y="69" width="51" height="14" rx="5" fill="#c5d8cb" /></Paper>
    <Paper x={121} y={119} width={115} height={89} label="Time"><Schedule x={9} y={32} width={94} /></Paper>
    <path d="M142 71h73m-29 34v12M99 143l15 18m128-3 15-18" fill="none" stroke={amber} strokeWidth="3" strokeDasharray="5 5" />
  </>;
  if (stage === 'design') return <>
    <path d="m180 35 131 72v73l-131 37-131-73V72Z" fill="#d4dfd6" />
    <Paper x={54} y={36} width={112} height={112} label="Gantt"><Schedule x={8} y={38} width={94} /></Paper>
    <Paper x={194} y={83} width={112} height={112} label="Resources"><Lines width={79} rows={3} color="#b4cdbd" /></Paper>
    <path d="M166 90h18v37h10" stroke={green} fill="none" strokeWidth="4" />
    <Tag x={45} y={171} width={108} text="Cross-tab" />
  </>;
  return <>
    <Paper x={26} y={35} width={143} height={159} label="Gantt + resources"><Schedule x={12} y={48} width={117} /><text x="72" y="143" textAnchor="middle" fill={green}>End-to-end</text></Paper>
    <rect x="196" y="60" width="136" height="132" rx="10" fill="#fffdf8" stroke={purple} strokeWidth="2" strokeDasharray="5 5" />
    <text x="264" y="89" textAnchor="middle" fill={ink}>Cross-tab</text><Lines x={211} y={107} width={105} rows={2} />
    <text x="264" y="175" textAnchor="middle" fill={ink}>Contribution</text>
  </>;
}

function AnalyticsSuiteScene({ stage }) {
  if (stage === 'challenge') return <>
    <Paper x={22} y={29} width={112} height={99} angle={-8}><Chart x={16} y={15} kind="pie" color={purple} /></Paper>
    <Paper x={217} y={34} width={120} height={105} angle={8}><Schedule x={10} y={19} width={98} /></Paper>
    <Paper x={117} y={111} width={124} height={102} label="Tell the story"><Lines width={88} rows={3} /></Paper>
    <Tag x={24} y={159} width={85} text="KPI" color="#d7e3da" /><path d="m296 173 17-17 12 12-17 17-19 6Z" fill={amber} />
  </>;
  if (stage === 'design') return <>
    <Paper x={95} y={54} width={171} height={132} label="Report authoring"><Chart x={18} y={46} color={green} /><Lines x={112} y={49} width={42} rows={4} /></Paper>
    {[[52, 48], [303, 52], [38, 163], [307, 161], [180, 214]].map(([x, y], index) => <g key={x}>
      <path d={`M${x} ${y}L180 119`} stroke="#b7c9bd" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx={x} cy={y} r="21" fill={index % 2 ? '#d2c2e0' : '#e7cda6'} /><text x={x} y={y + 5} textAnchor="middle" fill={ink}>{['Chart', 'Gantt', 'Layout', 'Notes', 'KPI'][index]}</text>
    </g>)}
  </>;
  return <>
    <Paper x={28} y={42} width={138} height={143} angle={-5} label="Chart Wizard"><Chart x={23} y={44} kind="line" color={purple} /></Paper>
    <Paper x={194} y={42} width={138} height={143} angle={5} label="KPI templates"><rect x="19" y="55" width="100" height="47" rx="7" fill="#d0dfd5" /><text x="69" y="87" textAnchor="middle" fill={green} fontSize="25">Value</text></Paper>
    <Tag x={53} y={168} width={87} text="Shipped" color="#c2d7c9" /><Tag x={220} y={168} width={87} text="Shipped" color="#c2d7c9" />
    <text x="180" y="222" textAnchor="middle" fill={ink}>Two confirmed deliveries</text>
  </>;
}

const scenes = {
  mapping: MappingScene, baselines: BaselineScene, backlog: BacklogScene,
  formatting: FormattingScene, ganttPanel: GanttPanelScene, resourcePanel: ResourcePanelScene,
  storyboard: StoryboardScene, gantt: GanttScene, wizard: WizardScene,
  presentation: PresentationScene, kpi: KpiScene, crosstab: CrosstabScene,
  powertable: PowerTableScene, analyticsSuite: AnalyticsSuiteScene
};

export default function CaseIllustration({ caseId, stage }) {
  const gradientId = useId();
  const Scene = scenes[caseId];
  if (!Scene) throw new Error(`Unknown illustrated case: ${caseId}`);
  if (!['challenge', 'design', 'evidence'].includes(stage)) throw new Error(`Unknown illustration stage: ${stage}`);
  return <svg className="case-topic-art" data-case-scene={`${caseId}-${stage}`} viewBox="0 0 360 236" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="var(--story-wash)" /><stop offset="1" stopColor="var(--story-paper)" />
      </linearGradient>
    </defs>
    <rect width="360" height="236" rx="18" fill={`url(#${gradientId})`} />
    <ellipse cx="180" cy="218" rx="145" ry="9" fill="#343d51" opacity=".07" />
    <g className="case-topic-scene"><Scene stage={stage} /></g>
  </svg>;
}
