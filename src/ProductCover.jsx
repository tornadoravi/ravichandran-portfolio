import React from 'react';
import { sitePath } from './site-path.js';
import { BikeCareLogo } from './BikeCareBrand.jsx';
import { bikecareScreens } from './bikecare-story.js';

function BikeCareCover() {
  return <div className="cover-evidence product-cover-art product-cover-poster product-cover-art--bikecare bikecare-project-cover"
    role="img" aria-label="BikeCare prototype cover"
    aria-description="Portfolio-themed cover with original Signal rider home, estimate and private-document concept screens. Fictional records; UX/UI design, not a launched app.">
    <div className="cover-poster-content" data-cinematic-root="" data-cinematic-art="" aria-hidden="true">
      <div className="cover-poster-brand"><BikeCareLogo /><span className="cover-poster-badge">Unlaunched concept</span></div>
      <div className="cover-poster-copy">
        <p className="cover-headline"><span>Local service.</span><strong>Lasting care.</strong></p>
        <svg className="cover-headline-rule" viewBox="0 0 240 12" preserveAspectRatio="none"><path d="M2 8C60 1 159 1 238 8" /></svg>
        <p className="cover-description">Proposed care for riders and independent workshops.</p>
        <div className="cover-scope-tags">{['Service records', 'Private documents', 'Care reminders'].map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="cover-screen">
        <div className="cover-screen-toolbar"><i /><i /><i /></div>
        <div className="cover-screen-media"><div className="cover-phone-trio">
          {['home', 'estimate', 'documents'].map(state => <img key={state}
            src={sitePath(`/assets/bikecare-mobile-${state}.webp`)} width="390" height="844" loading="lazy" decoding="async" alt="" />)}
        </div></div>
        <div className="cover-screen-caption">{bikecareScreens.length} screens / 7 journey maps / 2 themes<br />Original design / Fictional data</div>
      </div>
      <div className="cover-flow">
        <span>Record</span>
        <svg className="cover-flow-track" viewBox="0 0 36 14"><path d="M2 7h30m-4-3 4 3-4 3" /><circle className="cover-flow-dot" cx="4" cy="7" r="2.5" /></svg>
        <span>Confirm &amp; care</span>
      </div>
    </div>
  </div>;
}

function replayFlow(event) {
  if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
  const animations = event.currentTarget.querySelector('.cover-flow').getAnimations({ subtree: true });
  if (animations.some(animation => animation.playState === 'running')) return;
  for (const animation of animations) {
    animation.currentTime = 0;
    animation.play();
  }
}

export default function ProductCover({ product }) {
  if (product === 'bikecare') return <BikeCareCover />;
  const analytics = product === 'analytics';
  const concept = product === 'codShield';
  const bike = product === 'bikecare';
  if (!['analytics', 'powertable', 'codShield', 'bikecare'].includes(product)) throw new Error(`Unknown product cover: ${product}`);
  const name = bike ? 'BikeCare' : concept ? 'COD Shield' : analytics ? 'Inforiver Analytics+' : 'PowerTable';
  const image = analytics ? 'analytics-plus-official-dashboard.webp' : 'powertable-official-gantt.webp';
  const tags = bike ? ['Service handovers', 'Parts checks', 'Motorcycle rides'] : concept ? ['Recipient UX', 'Verification', 'Safeguards'] : analytics ? ['Chart Wizard', 'KPI templates', 'UX/UI & handoff'] : ['Gantt UX/UI', 'Resources', 'Cross-tab contribution'];
  const description = bike ? 'Original BikeCare UX/UI screens: local-shop job card, itemised bill and motorcycle community. Fictional accounts and data, not a launched app.' : concept
    ? 'Original COD Shield concept interface with fictional example data. Not a launched product, working identity verification, or activated protection.'
    : analytics
    ? 'Editorial cover with the original official Analytics+ planning dashboard from the Lumel Marketplace and a decorative question-to-chart illustration. The dashboard is product context, not a claim of personal authorship.'
    : 'Editorial cover with the original official PowerTable Gantt workspace from the product documentation and a decorative task-to-timeline illustration. The workspace is product context, not a claim of personal authorship.';

  return <div className={`cover-evidence product-cover-art product-cover-poster product-cover-art--${product}`} role="img" aria-label={`${name} ${bike ? 'prototype' : concept ? 'concept' : 'product'} cover`} aria-description={description} onPointerEnter={product === 'powertable' ? replayFlow : undefined}>
    <div className="cover-poster-content" data-cinematic-root="" data-cinematic-art="" aria-hidden="true">
      <div className="cover-poster-brand"><span>{analytics ? 'Analytics+' : name}</span><span className="cover-poster-badge">{bike ? 'Mobile concept' : concept ? 'Unlaunched concept' : 'Product overview'}</span></div>
      <div className="cover-poster-copy">
        <p className="cover-headline"><span>{bike ? 'Local service.' : concept ? 'One report.' : analytics ? 'Find a chart.' : 'Complex plans.'}</span><strong>{bike ? 'Care remembered.' : concept ? 'A quieter home.' : analytics ? 'Tell your story.' : 'Made clear.'}</strong></p>
        <svg className="cover-headline-rule" viewBox="0 0 240 12" preserveAspectRatio="none"><path d="M2 8C60 1 159 1 238 8" /></svg>
        <p className="cover-description">{bike ? 'Service records first. Parts and motorcycle people connected.' : concept ? 'A proposed mobile recipient support and protection flow.' : analytics ? 'Chart discovery and reusable KPI cards in Power BI.' : 'Task schedules and team assignments in one workspace.'}</p>
        <div className="cover-scope-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="cover-screen">
        <div className="cover-screen-toolbar"><i /><i /><i /></div>
        <div className="cover-screen-media">
          {concept || bike ? <div className="cover-phone-trio">{(bike ? ['jobcard', 'bill', 'rides'] : ['report', 'pending', 'active']).map(state =>
            <img key={state} src={sitePath(bike ? `/assets/bikecare-mobile-${state}.webp` : `/assets/cod-shield-${state}.svg`)} width="390" height="844" loading="lazy" decoding="async" alt="" />)}</div>
            : <img className="product-cover-illustration" src={sitePath(`/assets/${image}`)} width={analytics ? 1920 : 2944} height={analytics ? 1080 : 1570} loading="lazy" decoding="async" alt="" />}
        </div>
        <div className="cover-screen-caption">{bike ? 'Original mobile concept / simulated roles' : concept ? 'Original mobile concept / demo only' : 'Official product canvas'}</div>
      </div>
      <div className="cover-flow">
        <span>{product === 'powertable' && <svg className="cover-task" viewBox="0 0 20 20">
          <g className="cover-task-row"><path d="m2 4 1.5 1.5L6 3M9 4h9" /></g>
          <g className="cover-task-row"><path d="m2 10 1.5 1.5L6 9M9 10h9" /></g>
          <g className="cover-task-row"><path d="m2 16 1.5 1.5L6 15M9 16h9" /></g>
        </svg>}{bike ? 'Record' : concept ? 'Report' : analytics ? 'Question' : 'Tasks'}</span>
        <svg className="cover-flow-track" viewBox="0 0 36 14"><path d="M2 7h30m-4-3 4 3-4 3" /><circle className="cover-flow-dot" cx="4" cy="7" r="2.5" /></svg>
        <span>{bike ? 'Confirm & care' : concept ? 'Verify & protect' : analytics ? 'Chart' : 'Timeline'}{analytics ? <svg className="cover-chart" viewBox="0 0 20 20"><rect className="cover-chart-bar" x="2" y="10" width="4" height="8" rx="1" /><rect className="cover-chart-bar" x="8" y="6" width="4" height="12" rx="1" /><rect className="cover-chart-bar" x="14" y="2" width="4" height="16" rx="1" /></svg> : !concept && !bike && <svg className="cover-timeline" viewBox="0 0 20 20">
          <path d="M5 2v16M10 2v16M15 2v16" />
          <rect className="cover-timeline-bar" x="2" y="3" width="8" height="3" rx="1" />
          <rect className="cover-timeline-bar" x="6" y="9" width="12" height="3" rx="1" />
          <rect className="cover-timeline-bar" x="11" y="15" width="7" height="3" rx="1" />
        </svg>}</span>
      </div>
    </div>
  </div>;
}
