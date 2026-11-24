import React, { useEffect, useMemo, useRef, useState } from 'react';
import { sitePath } from './site-path.js';
import { caseHeadlines, caseSummaries } from './CaseReview.jsx';
import CaseDiagram from './CaseDiagram.jsx';
import CaseProblemScene from './CaseProblemScene.jsx';
import CaseConceptFilm from './CaseConceptFilm.jsx';
import CaseIllustration from './CaseIllustration.jsx';
import CaseStudyPlayer, { WalkthroughButton } from './CaseStudyPlayer.jsx';
import CaseSolution from './CaseSolution.jsx';
import { caseNarratives } from './case-narratives.js';
import WalkthroughEntry from './WalkthroughEntry.jsx';
import { caseFeatureEvidence } from './case-feature-evidence.js';

const cases = [
  ['planning', '/powertable.html', 'PowerTable'],
  ['mapping', '/column-mapping.html', 'Column Mapping', 'Gantt and resource mapping UX/UI.'],
  ['baselines', '/gantt-baselines.html', 'Baselines', 'Baseline comparison exploration.'],
  ['backlog', '/gantt-backlog.html', 'Backlog', 'Backlog workflow UX/UI.'],
  ['ganttPanel', '/gantt-configuration.html', 'Gantt Side Panel', 'Gantt configuration UX/UI.'],
  ['formatting', '/gantt-conditional-formatting.html', 'Conditional Formatting', 'Resource rule editor UX/UI.'],
  ['resourcePanel', '/resource-configuration.html', 'Resource Side Panel', 'Resource configuration UX/UI.'],
  ['crosstab', '/crosstab.html', 'Cross-tab', 'Layout and data-configuration contribution.'],
  ['analyticsSuite', '/analytics-plus.html', 'Inforiver Analytics+'],
  ['wizard', '/analytics.html', 'Chart Wizard', 'End-to-end Chart Wizard; shipped.'],
  ['storyboard', '/storyboard.html', 'Storyboard', 'Report creation and layout UX/UI.'],
  ['gantt', '/gantt.html', 'Analytics+ Gantt', 'Analytics+ Gantt UX/UI.'],
  ['presentation', '/presentation.html', 'Annotations & Presentation', 'Annotations and presentation UX/UI.'],
  ['kpi', '/kpi.html', 'KPI Presets', 'Reusable KPI templates; shipped.']
];

export const chapters = [
  ['case-overview', 'Overview & my role'],
  ['case-problem', 'The problem'],
  ['case-approach', 'My design decisions'],
  ['case-flow', 'How it works'],
  ['case-screens', 'Interface walkthrough'],
  ['case-delivery', 'Delivery & scope']
];
export const readingChapters = chapters.filter((_, index) => [0, 2, 4].includes(index));

const productChapters = [
  ['case-overview', 'Understand the product'],
  ['case-approach', 'Find my feature work'],
  ['case-delivery', 'Delivery & scope']
];

const productGroups = {
  planning: [
    { id: 'product-tasks', name: 'Plan tasks', area: 'Gantt', role: 'Gantt UX/UI: mapping through view configuration.', features: ['mapping', 'baselines', 'backlog', 'ganttPanel'] },
    { id: 'product-resources', name: 'Review team assignments', area: 'Resources', role: 'Resource Gantt UX/UI and rule editing.', features: ['resourcePanel', 'formatting'] },
    { id: 'product-summary', name: 'Summarize the data', area: 'Cross-tab', role: 'Cross-tab layout and data-configuration contribution.', features: ['crosstab'] }
  ],
  analyticsSuite: [
    { id: 'product-discovery', name: 'Choose a visual', area: 'Chart Wizard & KPI templates', role: 'End-to-end Chart Wizard; reusable KPI templates delivered.', features: ['wizard', 'kpi'] },
    { id: 'product-authoring', name: 'Build the report', area: 'Storyboard & Gantt', role: 'Feature UX/UI, handoff and implementation review.', features: ['storyboard', 'gantt'] },
    { id: 'product-explanation', name: 'Explain the insight', area: 'Annotations & Presentation', role: 'Feature UX/UI, handoff and implementation review.', features: ['presentation'] }
  ]
};

function findElement(children, predicate) {
  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child)) continue;
    if (predicate(child)) return child;
    const result = findElement(child.props.children, predicate);
    if (result) return result;
  }
  return null;
}

export function promoteCaseDecisions(children) {
  const decisionStory = findElement(children, element => element.type === 'section' && element.props.id === 'decisions')
    || findElement(children, element => element.type === 'section' && element.props.id === 'solutions');
  if (!decisionStory) return { decisionStory: null, evidence: children };
  function retainEvidence(nodes) {
    return React.Children.map(nodes, node => {
      if (!React.isValidElement(node)) return node;
      if (node.type === decisionStory.type && node.props.id === decisionStory.props.id) return null;
      if (node.props.children === undefined) return node;
      return React.cloneElement(node, undefined, retainEvidence(node.props.children));
    });
  }
  return { decisionStory, evidence: retainEvidence(children) };
}

function plainText(children) {
  return React.Children.toArray(children).map(child => React.isValidElement(child) ? plainText(child.props.children) : String(child)).join(' ').replace(/\s+/g, ' ').trim();
}

function collectScreens(children) {
  const screens = [];
  const sources = new Set();
  function visit(nodes, figure, section) {
    React.Children.forEach(nodes, node => {
      if (!React.isValidElement(node)) return;
      const currentFigure = node.type === 'figure' ? node : figure;
      const currentSection = node.type === 'section' ? node : section;
      if (node.type === 'a' && /\bproduct-screenshot\b/.test(node.props.className || '')) {
        const image = findElement(node.props.children, element => element.type === 'img');
        if (image && !sources.has(image.props.src)) {
          sources.add(image.props.src);
          const caption = currentFigure && findElement(currentFigure.props.children, element => element.type === 'figcaption');
          const filename = image.props.src.split('/').pop().replace(/\.[^.]+$/, '');
          const label = filename.replace(/^(fabric-)?(mapping-|gantt-config-|resource-config-|baseline-|backlog-|conditional-)|^(wizard-|storyboard-|gantt-|presentation-|kpi-|powertable-|analytics-plus-)/, '').replaceAll('-', ' ');
          const heading = currentSection && findElement(currentSection.props.children, element => ['h2', 'h3'].includes(element.type));
          const takeaway = currentSection && findElement(currentSection.props.children, element => /\b(visual-takeaway|case-key-points)\b/.test(element.props.className || ''));
          const takeawayContent = takeaway?.type === 'ul' ? React.Children.toArray(takeaway.props.children)[0] : takeaway;
          screens.push({
            ...image.props,
            label: label.charAt(0).toUpperCase() + label.slice(1),
            heading: heading ? plainText(heading.props.children) : null,
            takeaway: takeawayContent ? plainText(takeawayContent) : null,
            caption: caption?.props.children || 'Original design screen. Full source context is retained in the detailed evidence.'
          });
        }
      }
      visit(node.props.children, currentFigure, currentSection);
    });
  }
  visit(children, null);
  return screens;
}

export function Chapter({ index, title, description, children, product = false, headingId, heading, label }) {
  const [id, chapterLabel] = (product ? productChapters : chapters)[index];
  return <section id={id} className="case-chapter" aria-labelledby={headingId || `${id}-title`}>
    <header className="case-chapter-heading">
      <p className="case-chapter-label">Chapter {String(index + 1).padStart(2, '0')} / {label || chapterLabel}</p>
      {heading || (title && <h2 id={`${id}-title`}>{title}</h2>)}
      {description && <p>{description}</p>}
    </header>
    {children}
  </section>;
}

export function EvidenceScreen({ screen, eager = false }) {
  return <figure className="detail-figure case-demo-figure">
    <a className="product-screenshot case-demo-image" href={screen.src} target="_blank" rel="noopener noreferrer"
      aria-label={`View ${screen.label} screen at original resolution (opens in a new tab)`}>
      <img src={screen.src} alt={screen.alt} width={screen.width} height={screen.height}
        loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : undefined} />
    </a>
    <figcaption>{screen.caption}</figcaption>
  </figure>;
}

export function CaseEvidencePreview({ caseId, children, compact = false }) {
  const screens = useMemo(() => collectScreens(children), [children]);
  return <summary className="case-evidence-summary" aria-label="Explore full evidence and sources">
    <span className="case-evidence-intro">
      <span className="case-card-number">Behind the work</span>
      <span className="case-evidence-title">{compact ? 'Full evidence & sources.' : screens.length ? 'See the work behind the story.' : 'Understand the contribution.'}</span>
      <span className="case-evidence-description">{compact ? 'Original screens, decisions and references.' : screens.length
        ? 'Design screens, product context, and source notes. Explore the details when you need them.'
        : 'Contribution notes and design context. Dedicated interface screens were not supplied.'}</span>
      {!compact && <span className="case-evidence-topics">
        <span><b>01</b>{screens.length ? 'Screens' : 'Contribution'}</span>
        <span><b>02</b>Design context</span>
        <span><b>03</b>Sources & scope</span>
      </span>}
      <span className="case-evidence-action"><span className="evidence-closed-label">Explore the evidence</span><span className="evidence-open-label">Close the evidence</span><span className="case-evidence-chevron" aria-hidden="true">&#8595;</span></span>
    </span>
    <span className="case-evidence-previews" aria-hidden="true">
      {screens.length ? screens.slice(0, 2).map(screen => <span className="case-evidence-thumbnail" key={screen.src}>
        <span className="case-evidence-thumbnail-image"><img src={screen.src} alt="" width={screen.width} height={screen.height} loading="lazy" decoding="async" /></span>
        <span className="case-evidence-caption">{compact
          ? screen.src.includes('official') ? 'Official product context' : 'Original design screen'
          : plainText(React.Children.toArray(screen.caption).filter(node => !React.isValidElement(node) || node.type !== 'a'))}</span>
      </span>) : <span className="case-evidence-concept"><CaseDiagram caseId={caseId} /><span>Contribution-level concept / not a product screen</span></span>}
    </span>
  </summary>;
}

export function ScreenWalkthrough({ screens, diagramId }) {
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const buttons = useRef([]);
  useEffect(() => { setEnhanced(true); }, []);
  function move(event, index) {
    const last = screens.length - 1;
    const next = event.key === 'ArrowRight' ? (index + 1) % screens.length
      : event.key === 'ArrowLeft' ? (index + last) % screens.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? last : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next].focus();
  }
  if (!screens.length) return <div className="case-concept-evidence">
    <CaseDiagram caseId={diagramId} />
    <p>Contribution-level concept explanation. Dedicated design screens were not supplied; no final interface or measured outcome is fabricated.</p>
  </div>;
  const panels = screens.map((screen, index) => <div key={screen.src} className="case-demo-panel"
    id={`screen-panel-${index}`} role="tabpanel" aria-labelledby={`screen-tab-${index}`} hidden={enhanced && active !== index}>
    <div className="case-demo-bar"><span>Original screen / {String(index + 1).padStart(2, '0')}</span><span>{index + 1} of {screens.length}</span></div>
    {screen.heading && <div className="case-demo-insight"><h3>{screen.heading}</h3>{screen.takeaway && <p>{screen.takeaway}</p>}</div>}
    <EvidenceScreen screen={screen} />
  </div>);
  return <div className="case-screen-walkthrough">
    <div className="case-demo-tabs" role="tablist" aria-label="Original design screens">
      {screens.map((screen, index) => <button key={screen.src} ref={element => { buttons.current[index] = element; }}
        type="button" role="tab" id={`screen-tab-${index}`} aria-controls={`screen-panel-${index}`}
        aria-selected={active === index} tabIndex={active === index ? 0 : -1}
        onClick={() => setActive(index)} onKeyDown={event => move(event, index)}>
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{screen.label}
      </button>)}
    </div>
    {panels[0]}
    {panels.length > 1 && <details className="case-screen-more" open={enhanced}>
      <summary>View additional original screens</summary>
      {panels.slice(1)}
    </details>}
  </div>;
}

function OutcomeCard({ caseId, facts, evidenceNote, reviewChecks, compact = false }) {
  const outcomes = {
    planning: {
      status: 'Design contribution',
      headline: 'Gantt and resource UX/UI.',
      emphasis: 'Connected planning, clearly scoped.',
      highlights: [['Gantt + resources', 'End-to-end UX/UI'], ['Cross-tab', 'Contribution-level work'], ['Planning explorations', 'Baseline planning and resource earned-value']]
    },
    analyticsSuite: {
      status: 'Confirmed delivery',
      headline: 'Two confirmed deliveries.',
      emphasis: 'One connected authoring story.',
      highlights: [['Chart Wizard', 'Shipped'], ['Reusable KPI templates', 'Shipped'], ['End-to-end Analytics+ UX/UI', 'Selected feature stories']]
    },
    wizard: {
      status: 'Confirmed delivery',
      headline: 'Chart Wizard shipped.',
      emphasis: 'Two ways in. One way forward.',
      highlights: [['Chart + Function', 'Two discovery routes'], ['Customize + Advanced', 'Shared configuration'], ['Shipped feature', 'Chart Wizard delivery confirmed']]
    },
    kpi: {
      status: 'Confirmed delivery',
      headline: 'Reusable KPI templates.',
      emphasis: 'Designed and shipped.',
      highlights: [['Simple + Variance', 'Reusable KPI starting points'], ['Templates shipped', 'Confirmed reusable-template delivery'], ['Original evidence', 'Library and authoring states stay labeled']]
    },
    baselines: {
      status: 'Exploration',
      headline: 'A clearer comparison,',
      emphasis: 'explored through design.',
      highlights: [['Comparison states', 'Selection, timeline, and management'], ['Exploration', 'Not claimed as a shipped feature'], ['Original screens', 'No measured outcome is inferred']]
    },
    crosstab: {
      status: 'Contribution',
      headline: 'The structure behind the view.',
      emphasis: 'A clearly scoped contribution.',
      highlights: [['My contribution', 'Layout and data configuration'], ['Concept explanation', 'Rows, columns, and measures'], ['Evidence', 'Contribution notes and structure diagram']]
    }
  };
  const outcome = outcomes[caseId] || {
    status: 'Design contribution',
    headline: `${facts[1][0]}.`,
    emphasis: 'Backed by original evidence.',
    highlights: [['Design decisions', facts[1][1]], ['Original screens', 'Supplied interface states, not measured outcomes'], ['Delivery scope', facts[2][1]]]
  };
  const icons = ['M8 16l5 5 11-12', 'M7 7h8v8H7zm12 0h8v8h-8zM7 19h8v8H7zm12 0h8v8h-8z', 'M8 9h12m-4-4 4 4-4 4M26 25H14m4-4-4 4 4 4'];
  const highlights = <dl className="case-outcome-highlights">
    {outcome.highlights.map(([title, detail], index) => <div key={title}>
      <svg viewBox="0 0 34 34" aria-hidden="true"><path d={icons[index]} /></svg>
      <dt>{title}</dt><dd>{detail}</dd>
    </div>)}
  </dl>;
  return <div className="case-outcome" role="group" aria-label="Delivery and contribution summary">
    <span className="case-outcome-status"><span aria-hidden="true" />{outcome.status}</span>
    <h3>{outcome.headline} <em>{outcome.emphasis}</em></h3>
    <p className="case-outcome-description">{facts[2][1]}</p>
    {compact ? <details className="case-reading-details"><summary>Delivery details</summary>{highlights}</details> : highlights}
    {reviewChecks && <section className="case-review-evidence" aria-label="Documented implementation review">
      <h4>How I checked the work</h4>
      {React.cloneElement(reviewChecks, { className: 'case-review-checks' })}
    </section>}
    <p className="case-outcome-note">{evidenceNote}</p>
  </div>;
}

function ProductFeature({ id, onWalkthrough }) {
  const [, path, label, role] = cases.find(([key]) => key === id);
  const evidence = caseFeatureEvidence[id];
  const screen = evidence && { ...evidence, src: sitePath(evidence.src), caption: `Original design · ${evidence.label}` };
  return <details className="case-product-feature" data-feature={id}>
    <summary>
      <figure className="feature-card-illustration" aria-hidden="true">
        {screen ? <img src={screen.src} width={screen.width} height={screen.height} alt="" loading="lazy" />
          : <CaseIllustration caseId={id} stage="design" />}
        <figcaption>{screen ? 'Original design screen' : 'Contribution structure diagram'}</figcaption>
      </figure>
      <strong>{label} <span aria-hidden="true">+</span></strong>
      <small>My work: {role}</small>
      <b className="feature-case-action">Explore on this page <span aria-hidden="true">↓</span></b>
    </summary>
    <div className="case-feature-detail">
      <p>{caseNarratives[id].purpose}</p>
      {screen && <EvidenceScreen screen={screen} />}
      <ol>{caseNarratives[id].steps.map(([title, detail]) => <li key={title}><strong>{title}</strong><p>{detail}</p></li>)}</ol>
      <div className="case-feature-actions">
        <WalkthroughButton onClick={event => onWalkthrough(event, id)} />
        <a href={sitePath(path)}>Full feature evidence <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </details>;
}

function ProductOverview({ caseId, product, narrative, facts, evidenceNote, onWalkthrough }) {
  const planning = caseId === 'planning';
  return <>
    <nav className="case-chapter-nav" aria-label="Case study chapters" data-section-tabs="">
      {productChapters.map(([id, label], index) => <a key={id} href={`#${id}`}><span>0{index + 1}</span>{label}</a>)}
    </nav>
    <Chapter product index={0} title={planning ? 'A workspace for planning work.' : 'A tool for building Power BI reports.'}
      description={planning ? 'PowerTable is a Lumel product inside Microsoft Fabric for task planning and resource assignments.' : 'Inforiver Analytics+ is a Lumel visual inside Power BI for chart discovery and report authoring.'}>
      <span id="case-problem" className="case-bookmark" /><span id="case-audience" className="case-bookmark" />
      <aside className="case-fast-read" aria-label="Case in 30 seconds">
        <p className="case-card-number">Product first. My contribution next.</p>
        <dl>
          <div><dt>Used by</dt><dd>{narrative.audience}</dd></div>
          <div className="case-my-work"><dt>My work</dt><dd>{narrative.role}</dd></div>
        </dl>
      </aside>
      <CaseSolution caseId={planning ? 'powertable' : 'analyticsSuite'} compact />
      <details className="case-reading-details"><summary>Explore the illustrated workflow</summary><CaseConceptFilm caseId={planning ? 'powertable' : 'analyticsSuite'} /></details>
    </Chapter>
    <Chapter product index={1} title="Explore my feature work."
      description={planning ? 'Selected workflows from end-to-end Gantt and resource UX/UI.' : 'Selected features from end-to-end Analytics+ UX/UI.'}>
      <span id="case-gap" className="case-bookmark" /><span id="case-goals" className="case-bookmark" />
      <span id="case-flow" className="case-bookmark" /><span id="case-architecture" className="case-bookmark" /><span id="case-screens" className="case-bookmark" />
      <div className="product-work-areas">
        {productGroups[caseId].map((group, index) => <section id={group.id} className="product-work-area" key={group.id} aria-labelledby={`${group.id}-title`}>
          <header><span className="case-card-number">0{index + 1} / {group.area}</span><h3 id={`${group.id}-title`}>{group.name}</h3><p className="product-area-role"><strong>My part</strong> {group.role}</p></header>
          <div className="case-product-features" aria-label={`${product} ${group.area} case studies`}>
            {group.features.map(id => <ProductFeature key={id} id={id} onWalkthrough={onWalkthrough} />)}
          </div>
        </section>)}
      </div>
    </Chapter>
    <Chapter product index={2} title="What was delivered.">
      <span id="case-evidence" className="case-bookmark" /><span id="case-system" className="case-bookmark" />
      <OutcomeCard caseId={caseId} facts={facts} evidenceNote={evidenceNote} compact />
    </Chapter>
  </>;
}

export default function CasePresentation({ caseId, children, decisionStory }) {
  const contentId = caseId === 'planning' ? 'powertable' : caseId;
  const facts = caseSummaries[contentId];
  const title = caseHeadlines[contentId];
  if (!facts || !title) throw new Error(`Unknown case presentation: ${caseId}`);
  const screens = useMemo(() => collectScreens(children), [children]);
  const narrative = caseNarratives[contentId];
  const root = useRef(null);
  const walkthrough = useRef(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [walkthroughOpener, setWalkthroughOpener] = useState(null);
  const openWalkthrough = (event, feature = null) => {
    setSelectedFeature(feature);
    setWalkthroughOpener(event.currentTarget);
  };
  useEffect(() => {
    if (!walkthroughOpener) return;
    walkthrough.current.open(walkthroughOpener);
    setWalkthroughOpener(null);
  }, [selectedFeature, walkthroughOpener]);
  const analytics = ['analyticsSuite', 'wizard', 'storyboard', 'gantt', 'presentation', 'kpi'].includes(caseId);
  const product = analytics ? 'Inforiver Analytics+' : 'PowerTable';
  const problemId = caseId === 'planning' ? 'mapping' : caseId === 'analyticsSuite' ? 'wizard' : caseId;
  const platform = analytics ? 'Power BI' : 'Microsoft Fabric';
  const name = cases.find(([id]) => id === caseId)[2];
  const isProduct = caseId === 'planning' || caseId === 'analyticsSuite';
  const parentId = analytics ? 'analyticsSuite' : 'planning';
  const parentPath = analytics ? '/analytics-plus.html' : '/powertable.html';
  const area = !isProduct && productGroups[parentId].find(group => group.features.includes(caseId));
  const officialHero = caseId === 'planning' ? '/assets/powertable-official-gantt.webp'
    : caseId === 'analyticsSuite' ? '/assets/analytics-plus-official-dashboard.webp' : null;
  const heroScreen = officialHero ? screens.find(screen => screen.src === sitePath(officialHero)) : screens[0];
  const featureScreen = selectedFeature && caseFeatureEvidence[selectedFeature];
  const playerCase = selectedFeature || contentId;
  const playerName = selectedFeature ? cases.find(([id]) => id === selectedFeature)[2] : name;
  const playerScreen = featureScreen
    ? { ...featureScreen, src: sitePath(featureScreen.src), caption: `Original design · ${featureScreen.label}` }
    : selectedFeature ? undefined : heroScreen;
  if (officialHero && !heroScreen) throw new Error(`Missing official product overview image: ${caseId}`);
  const evidenceNote = caseId === 'planning'
    ? 'Baseline planning and resource earned-value remain explorations. Original design screens and official product images are identified separately.'
    : caseId === 'baselines'
      ? 'Baseline planning remains an exploration. These configuration states do not establish a shipped comparison feature or a measured improvement.'
      : caseId === 'crosstab'
        ? 'Contribution-level concept explanation. Dedicated design screens were not supplied; no final interface or measured outcome is fabricated.'
        : 'Design screens explain the interface states shown. They do not by themselves prove runtime behavior, usability improvements, or measured customer outcomes.';
  const overview = caseId === 'planning'
    ? 'PowerTable brings no-code data apps and planning to Microsoft Fabric. Teams can organize business data, plan tasks with Gantt timelines, review resource assignments, and summarize information in Cross-tab views.'
    : caseId === 'analyticsSuite'
      ? 'Inforiver Analytics+ is a custom visual for Power BI. It brings chart discovery, KPI cards, tables, report authoring, and presentation into the reporting experience.'
      : `${narrative.purpose} Part of ${product} in ${platform}.`;
  const reflection = caseId === 'wizard' && findElement(children, element => element.props.id === 'reflection');
  const reviewChecks = reflection && findElement(reflection.props.children,
    element => element.type === 'ul' && /\bcase-key-points\b/.test(element.props.className || ''));
  const decisionHeader = decisionStory && findElement(decisionStory.props.children,
    element => /\bcase-section-heading\b/.test(element.props.className || ''));
  const decisionBody = decisionHeader && React.cloneElement(decisionStory, undefined,
    React.Children.toArray(decisionStory.props.children).filter(element =>
      !React.isValidElement(element) || !/\bcase-section-heading\b/.test(element.props.className || '')));

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    root.current.querySelectorAll('.case-chapter').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <>
      <WalkthroughEntry caseId={contentId} onClick={openWalkthrough}
        readHref={isProduct ? '#case-approach' : '#case-overview'} readLabel={isProduct ? 'Explore my feature work' : 'Read case study'}>
        <CaseStudyPlayer ref={walkthrough} caseId={playerCase} name={playerName}
          narrative={caseNarratives[playerCase]} facts={caseSummaries[playerCase]} screen={playerScreen}
          evidenceNote={selectedFeature ? caseSummaries[playerCase][2][1] : evidenceNote} showTrigger={false} />
      </WalkthroughEntry>
    <div className="case-presentation-hero">
      <div className="case-hero-preview">
        {heroScreen ? <EvidenceScreen screen={heroScreen} eager /> : <div className="case-concept-evidence"><CaseDiagram caseId={contentId} /><p>Concept explanation / contribution-level work.</p></div>}
      </div>
    </div>
    <div className="case-chapters" ref={root}>
      {isProduct ? <ProductOverview caseId={caseId} product={product} narrative={narrative} facts={facts} evidenceNote={evidenceNote} onWalkthrough={openWalkthrough} /> : <>
      <aside className="case-fast-read" aria-label="Case in 30 seconds">
        <nav className="case-location" aria-label="Product to feature">
          <a href={sitePath(parentPath)}>{product}</a><span aria-hidden="true">&#8594;</span>
          <a href={sitePath(`${parentPath}#${area.id}`)}>{area.area}</a><span aria-hidden="true">&#8594;</span><strong aria-current="page">{name}</strong>
        </nav>
        <p className="case-card-number">{name} / My design contribution</p>
        <dl>
          <div><dt>What it does</dt><dd>{narrative.purpose}</dd></div>
          <div className="case-my-work"><dt>My work</dt><dd>{narrative.role}</dd></div>
          <div><dt>Delivery & evidence</dt><dd>{facts[2][1]}</dd></div>
        </dl>
        <div><a href="#case-approach">Read design decisions <span aria-hidden="true">&#8595;</span></a><a href="#case-screens">Explore the screens <span aria-hidden="true">&#8599;</span></a></div>
      </aside>
      <nav className="case-chapter-nav" aria-label="Case study chapters" data-section-tabs="">
        {readingChapters.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </nav>
      <Chapter index={0} title={`What is ${name}?`} description={overview}>
        <span id="case-audience" className="case-bookmark" />
        <p className="case-audience-line"><strong>Designed for</strong> {narrative.audience}</p>
      </Chapter>
      <Chapter index={1} title={facts[0][0]} description={facts[0][1]}>
        <details className="case-reading-details"><summary>Explore the visual problem explanation</summary><figure className="case-problem-stage">
          <CaseProblemScene caseId={problemId} />
          <figcaption>Illustrative design problem / not an observed session or a historical product screen.</figcaption>
        </figure></details>
      </Chapter>
      <Chapter index={2} title={decisionHeader ? null : 'What I designed.'}
        description={decisionHeader ? null : narrative.goal} heading={decisionHeader}
        headingId={decisionHeader && decisionStory.props['aria-labelledby']}>
        <span id="case-gap" className="case-bookmark" /><span id="case-goals" className="case-bookmark" />
        {decisionStory ? <div className="case-promoted-decisions">{decisionBody || decisionStory}</div> : <div className="case-design-cards">
          {narrative.steps.map(([heading, detail], index) => <article key={heading}><span className="case-card-number">0{index + 1}</span><h3>{heading}</h3><p>{detail}</p></article>)}
        </div>}
      </Chapter>
      <Chapter index={3} title="How the solution works." description="Start with the idea and its value. Explore an example, the design reasoning, and the evidence.">
        <span id="case-architecture" className="case-bookmark" />
        <CaseSolution caseId={contentId} />
        <details className="case-reading-details"><summary>Explore the illustrated workflow</summary><CaseConceptFilm caseId={contentId} /></details>
      </Chapter>
      <Chapter index={4} title={screens.length ? 'Explore the design screens.' : 'The contribution, clearly scoped.'}
        description={screens.length ? 'Select a screen. Open it full-size for the details.' : 'A concept explanation, not a fabricated final interface.'}>
        <ScreenWalkthrough screens={screens} diagramId={contentId} />
      </Chapter>
      <Chapter index={5} title="Delivery & scope.">
        <span id="case-evidence" className="case-bookmark" /><span id="case-system" className="case-bookmark" />
        <OutcomeCard caseId={caseId} facts={facts} evidenceNote={evidenceNote} reviewChecks={reviewChecks} />
      </Chapter>
      </>}
    </div>
  </>;
}

export function CaseEndcap({ caseId }) {
  const index = cases.findIndex(([id]) => id === caseId);
  if (index < 0) throw new Error(`Unknown case ending: ${caseId}`);
  const nextProduct = {
    planning: ['/analytics-plus.html', 'Analytics+'],
    analyticsSuite: ['/cod-shield.html', 'COD Shield']
  };
  const [nextPath, nextName] = nextProduct[caseId] || cases[(index + 1) % cases.length].slice(1, 3);
  const isProduct = caseId === 'planning' || caseId === 'analyticsSuite';
  const parent = index < 8 ? 'planning' : 'analyticsSuite';
  const area = !isProduct && productGroups[parent].find(group => group.features.includes(caseId));
  const parentPath = parent === 'planning' ? '/powertable.html' : '/analytics-plus.html';
  const backPath = isProduct ? '/#work' : `${parentPath}#${area.id}`;
  const backLabel = isProduct ? 'Back to selected work' : `Back to ${parent === 'planning' ? 'PowerTable' : 'Analytics+'} features`;
  return <section className="case-endcap" aria-labelledby="case-endcap-title">
    <span className="case-endcap-badge">End of case study / {cases[index][2]}</span>
    <h2 id="case-endcap-title">Thanks for reading!</h2>
    <nav aria-label="Continue exploring case studies">
      <a className="case-endcap-back" href={sitePath(backPath)}><span aria-hidden="true">&#8592;</span> {backLabel}</a>
      <a className="case-endcap-next" href={sitePath(nextPath)}>Next: {nextName} <span aria-hidden="true">&#8594;</span></a>
    </nav>
  </section>;
}
