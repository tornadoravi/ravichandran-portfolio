import React from 'react';

const chartFamilies = [
  ['Bullet & progress', ['IBCS bullet', 'Comparative bullet', 'Progress bar', 'Quantitative bullet', 'Single measure bullet']],
  ['Comparison & breakdown', ['Marimekko chart', 'Tornado chart', 'Waterfall chart', 'Vertical measure breakdown']],
  ['Distribution & relationships', ['Box plot', 'Histogram', 'Quadrant', 'Parallel coordination charts']],
  ['Circular & radial', ['Radar chart', 'Polar chart', 'Radial chart', 'Pie chart', 'Donut chart']],
  ['Tabular', ['Data table']]
];

const analyticsGroups = [
  {
    id: 'contribution-authoring',
    title: 'Storyboard & authoring',
    status: 'Design contribution',
    image: ['storyboard-editor.png', 1390, 782, 'Storyboard workspace with report objects, layers, and configuration panels.'],
    caption: 'Product workspace',
    points: [
      ['Complete UI redesign', 'Charts, cards, tables, shapes, comments, slicers, images, and play-axis.'],
      ['Connected authoring surfaces', 'Landing page, canvas, side panels, main toolbar, and floating toolbar. Two landing-page designs and multiple toolbar iterations.'],
      ['Object & data interactions', 'Object interaction, managing series, and managing data.'],
      ['Entry & exploration', 'New onboarding experience; Storyboard flow and spatial design with video and interactive elements.']
    ],
    link: ['/storyboard.html', 'Explore Storyboard'],
    related: ['/analytics-spatial.html', 'Spatial concept · Prototype']
  },
  {
    id: 'contribution-charts',
    title: 'Charts & discovery',
    status: 'Chart Wizard shipped',
    image: ['wizard-use-case.png', 540, 370, 'Chart Wizard use-case menu with Comparison, Part to Whole, Ranking, Distribution, and Time series.'],
    caption: 'Product screen',
    points: [
      ['Scenario-based Chart Wizard', 'Guided chart creation by user scenario, use case, or chart group. Chart Builder is the same contribution, not a second feature.'],
      ['Chart design & requirements', 'Chart designs, revamps, and documented requirements across the families below; not a claim that every chart was implemented.'],
      ['Advanced chart features', 'Decomposition, network chart settings, data label panel, canvas design, and chart color system.'],
      ['Analytics+ Gantt', 'No Data experience, canvas toolbar, side panels, configuration flows, and freehand progress bar capabilities. Separate from PowerTable Gantt.'],
      ['Filter context', 'Measurement and display of filter context.']
    ],
    charts: true,
    link: ['/analytics.html', 'Explore Chart Wizard'],
    related: ['/gantt.html', 'Explore Power BI Gantt']
  },
  {
    id: 'contribution-foundations',
    title: 'Design foundations',
    status: 'Side panels implemented',
    symbol: 'foundations',
    points: [
      ['Side-panel design system', 'Revamped the existing side-panel patterns; the updated design was implemented and is in use.'],
      ['Toolbar redesign', 'Chart, card, and table toolbars, both component-based and standalone, with multiple design iterations.'],
      ['Color & themes', 'Color picker component design, a new theme palette, and Storyboard theme colors.'],
      ['Interface consistency', 'Chart interfaces, dropdowns, icons, and standard-size dialog design.']
    ]
  },
  {
    id: 'contribution-templates',
    title: 'Icons, KPI & templates',
    status: 'KPI templates shipped',
    image: ['kpi-simple.png', 2000, 1063, 'Analytics+ Simple KPI preset pane beside a report canvas in Power BI.'],
    caption: 'Design screen',
    points: [
      ['70+ unique icons', 'Designed for chart and matrix experiences.'],
      ['30+ KPI layouts · 20+ KPI presets', 'Separate design-scope counts, not the number of examples in this screen; not a claim that every variation shipped.'],
      ['Template builder', 'UI for dashboard templates and KPI creation.'],
      ['Reusable table templates', 'Standardized table layouts alongside reusable chart and matrix KPI patterns.']
    ],
    link: ['/kpi.html', 'Explore KPI presets']
  },
  {
    id: 'contribution-storytelling',
    title: 'Presentation & PowerPoint',
    status: 'Design contribution',
    image: ['annotation-detail.png', 700, 420, 'An Analytics+ chart annotation connected to a data point.'],
    caption: 'Design screen',
    points: [
      ['Presentation & annotations', 'Presentation mode, annotation system, and slideshow playback design.'],
      ['PowerPoint compatibility', 'Feature design and PowerPoint visualization templates for storytelling and presentations.'],
      ['Text-to-Visual', 'Storytelling experience design in Analytics+.']
    ],
    link: ['/presentation.html', 'Explore annotations & presentation']
  },
  {
    id: 'contribution-platforms',
    title: 'Excel, AI & exploration',
    status: 'Design · Research',
    symbol: 'platforms',
    points: [
      ['Analytics+ Excel Add-In', 'UI design for the Excel integration.'],
      ['Excel Analytics & AI Genie', 'UX refinements and design alignment across both experiences.'],
      ['Super App', 'Research and wireframes; not presented as a shipped product.']
    ]
  }
];

const planningGroups = [
  {
    id: 'contribution-gantt-ownership',
    title: 'Gantt & Gantt Resources',
    status: 'End-to-end design ownership',
    image: ['fabric-mapping-resource.png', 780, 588, 'PowerTable Gantt resource mapping with employee fields and an uncommitted configuration.'],
    caption: 'Design screen',
    points: [
      ['Workspace & configuration', 'Layout canvas, column mapping, timescale management, navigation, effort tracking, scroll-to-task, and add/drive column flow.'],
      ['Planning detail', 'Baseline features, time entries/logs, history comments, and PDF/Excel export design.'],
      ['Gantt Resources', 'Navigation and summary-bar flows, connected to the resource planning experience.']
    ],
    note: 'Design ownership is not a blanket release claim. Baseline planning and resource earned-value explorations keep their separate status in the detailed cases.',
    link: ['/column-mapping.html', 'Explore Gantt design'],
    related: ['/gantt-conditional-formatting.html', 'Explore resource design']
  },
  {
    id: 'contribution-planning',
    title: 'Planning & collaboration',
    status: 'Design contribution',
    symbol: 'planning',
    points: [
      ['Planning workflows', 'Split By, Data Form Query, and Sheet Flow.'],
      ['Planning Comments', 'Complete interaction flow for planning collaboration.'],
      ['Cross-tab', 'Layout and data-configuration contributions, not end-to-end workspace ownership.']
    ],
    link: ['/crosstab.html', 'Explore Cross-tab contribution']
  },
  {
    id: 'contribution-forms',
    title: 'Forms & ad-hoc analysis',
    status: 'Design · Prototype',
    symbol: 'forms',
    points: [
      ['Editing & forms', 'Bulk row insert, row edit form, BI PowerTable form designs, and bookmark flow.'],
      ['Ad-hoc Analysis', 'Redesigned filter panel and modern bar-style layout.'],
      ['Super Filter', 'Complete demo and end-to-end prototype; not labeled as a confirmed release.']
    ]
  },
  {
    id: 'contribution-bi',
    title: 'BI foundations & controls',
    status: 'Design contribution',
    symbol: 'controls',
    points: [
      ['BI Fabric base layout', 'Layout framework to standardize BI experiences, using the existing Fabric design-system foundation.'],
      ['Panels & customization', 'Color picker, visualization panel, filter panel, control panel, View Options, and data source panel.'],
      ['Data & display', 'Footer zoom, data and visual loading, Measures as Category, and Category by Measure.']
    ]
  }
];

function ScopeSymbol({ kind }) {
  const content = {
    foundations: <><rect x="30" y="24" width="70" height="112" rx="8" /><path d="M44 46h42M44 65h28M44 90h42M44 110h28" /><rect x="119" y="24" width="151" height="27" rx="6" /><circle cx="137" cy="85" r="13" /><circle cx="180" cy="85" r="13" /><circle cx="223" cy="85" r="13" /><path d="M123 124h134" /></>,
    platforms: <><rect x="26" y="32" width="100" height="96" rx="7" /><path d="M26 56h100M54 56v72M88 56v72M26 80h100M26 104h100M140 80h29m-8-8 8 8-8 8" /><rect x="184" y="32" width="90" height="96" rx="7" /><path d="M202 105V82h13v23m10 0V65h13v40m10 0V47h10v58" /></>,
    planning: <><path d="M35 42h230M35 80h230M35 118h230M106 27v106M177 27v106" /><rect x="50" y="33" width="76" height="18" rx="4" /><rect x="110" y="71" width="83" height="18" rx="4" /><rect x="182" y="109" width="61" height="18" rx="4" /></>,
    forms: <><rect x="34" y="24" width="112" height="112" rx="7" /><path d="M49 45h56M49 64h80M49 83h80M49 102h45" /><rect x="168" y="38" width="99" height="25" rx="5" /><path d="M168 83h73M168 105h52M168 127h87" /></>,
    controls: <><path d="M38 43h224M38 80h224M38 117h224" /><circle cx="95" cy="43" r="12" /><circle cx="209" cy="80" r="12" /><circle cx="139" cy="117" r="12" /></>
  };
  return <svg className="contribution-symbol" viewBox="0 0 300 160" aria-hidden="true" focusable="false">{content[kind]}</svg>;
}

function ContributionGroup({ group }) {
  return <details id={group.id} className="contribution-group">
    <summary>
      <span className="contribution-preview">
        {group.image
          ? <img src={`/assets/${group.image[0]}`} width={group.image[1]} height={group.image[2]} loading="lazy" alt={group.image[3]} />
          : <ScopeSymbol kind={group.symbol} />}
        <span className="contribution-caption">{group.caption || 'Scope illustration'}</span>
      </span>
      <span className="contribution-label">
        <span className="contribution-status">{group.status}</span>
        <strong>{group.title}</strong>
      </span>
      <span className="contribution-toggle" aria-hidden="true" />
    </summary>
    <div className="contribution-content">
      <dl>
        {group.points.map(([title, detail]) => <div key={title}>
          <dt>{title}</dt><dd>{detail}</dd>
        </div>)}
      </dl>
      {group.charts && <details id="chart-contributions" className="chart-contributions">
        <summary>View chart contributions</summary>
        <div className="chart-contribution-families">
          {chartFamilies.map(([title, charts]) => <section key={title}>
            <h4>{title}</h4>
            <ul>{charts.map(chart => <li key={chart}>{chart}</li>)}</ul>
          </section>)}
        </div>
      </details>}
      {group.note && <p className="contribution-note">{group.note}</p>}
      {group.link && <a className="text-link" href={group.link[0]}>{group.link[1]} <span aria-hidden="true">→</span></a>}
      {group.related && <a className="text-link" href={group.related[0]}>{group.related[1]} <span aria-hidden="true">→</span></a>}
    </div>
  </details>;
}

export default function ContributionMap({ product }) {
  const analytics = product === 'analytics';
  return <section id="contributions" className="contribution-map wrap" aria-labelledby="contributions-title">
    <div className="case-section-heading">
      <p className="eyebrow">{analytics ? 'Contribution breadth' : 'Ownership & contribution'}</p>
      <h2 id="contributions-title">{analytics ? 'Across the product.' : 'Owned deeply. Contributed broadly.'}</h2>
      <p>Open an area for scope and evidence.</p>
    </div>
    <div className={`contribution-grid${analytics ? '' : ' contribution-grid--planning'}`}>
      {(analytics ? analyticsGroups : planningGroups).map(group => <ContributionGroup key={group.id} group={group} />)}
    </div>
    <details className="contribution-sources">
      <summary>Scope & official sources</summary>
      <p>Contribution inventory from my design work. Linked cases retain original evidence and delivery boundaries. Scope illustrations are explanatory, not product screens.</p>
      <p>Official documentation describes the product, not my authorship or proof that every listed design shipped. No additional screens are supplied for text-only scope entries.</p>
      <ul>
        {analytics ? <>
          <li><a href="https://inforiver.com/analytics-plus/" target="_blank" rel="noopener noreferrer">Analytics+ official product overview<span className="sr-only"> (opens in a new tab)</span></a></li>
          <li><a href="https://docs.inforiver.com/analytics+/storyboard" target="_blank" rel="noopener noreferrer">Storyboard documentation<span className="sr-only"> (opens in a new tab)</span></a></li>
          <li><a href="https://docs.inforiver.com/analytics+/gantt-chart" target="_blank" rel="noopener noreferrer">Analytics+ Gantt documentation<span className="sr-only"> (opens in a new tab)</span></a></li>
        </> : <li><a href="https://docs.powertable.com/explore-powertable/layout-views/gantt-chart-view" target="_blank" rel="noopener noreferrer">PowerTable Gantt documentation<span className="sr-only"> (opens in a new tab)</span></a></li>}
      </ul>
      <p>Official sources reviewed 12 November 2026. Existing design screens are reused without redrawing or relabeling them as new implementation evidence.</p>
    </details>
  </section>;
}
