import React from 'react';
import { sitePath } from './site-path.js';

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
  const analytics = product === 'analytics';
  const name = analytics ? 'Inforiver Analytics+' : 'PowerTable';
  const image = analytics ? 'analytics-plus-official-dashboard.webp' : 'powertable-official-gantt.webp';
  const tags = analytics ? ['Chart Wizard', 'KPI templates', 'UX/UI & handoff'] : ['Gantt UX/UI', 'Resources', 'Cross-tab contribution'];
  const description = analytics
    ? 'Editorial cover with the original official Analytics+ planning dashboard from the Lumel Marketplace and a decorative question-to-chart illustration. The dashboard is product context, not a claim of personal authorship.'
    : 'Editorial cover with the original official PowerTable Gantt workspace from the product documentation and a decorative task-to-timeline illustration. The workspace is product context, not a claim of personal authorship.';

  return <div className={`cover-evidence product-cover-art product-cover-poster product-cover-art--${product}`} role="img" aria-label={`${name} product cover`} aria-description={description} onPointerEnter={analytics ? undefined : replayFlow}>
    <div className="cover-poster-content" aria-hidden="true">
      <div className="cover-poster-brand"><span>{analytics ? 'Analytics+' : name}</span><span className="cover-poster-badge">Product overview</span></div>
      <div className="cover-poster-copy">
        <p className="cover-headline"><span>{analytics ? 'Find a chart.' : 'Complex plans.'}</span><strong>{analytics ? 'Tell your story.' : 'Made clear.'}</strong></p>
        <svg className="cover-headline-rule" viewBox="0 0 240 12" preserveAspectRatio="none"><path d="M2 8C60 1 159 1 238 8" /></svg>
        <p className="cover-description">{analytics ? 'Chart discovery and reusable KPI cards in Power BI.' : 'Task schedules and team assignments in one workspace.'}</p>
        <div className="cover-scope-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="cover-screen">
        <div className="cover-screen-toolbar"><i /><i /><i /></div>
        <div className="cover-screen-media">
          <img className="product-cover-illustration" src={sitePath(`/assets/${image}`)} width={analytics ? 1920 : 2944} height={analytics ? 1080 : 1570} loading="lazy" decoding="async" alt="" />
        </div>
        <div className="cover-screen-caption">Official product canvas</div>
      </div>
      <div className="cover-flow">
        <span>{!analytics && <svg className="cover-task" viewBox="0 0 20 20">
          <g className="cover-task-row"><path d="m2 4 1.5 1.5L6 3M9 4h9" /></g>
          <g className="cover-task-row"><path d="m2 10 1.5 1.5L6 9M9 10h9" /></g>
          <g className="cover-task-row"><path d="m2 16 1.5 1.5L6 15M9 16h9" /></g>
        </svg>}{analytics ? 'Question' : 'Tasks'}</span>
        <svg className="cover-flow-track" viewBox="0 0 36 14"><path d="M2 7h30m-4-3 4 3-4 3" /><circle className="cover-flow-dot" cx="4" cy="7" r="2.5" /></svg>
        <span>{analytics ? 'Chart' : 'Timeline'}{analytics ? <svg className="cover-chart" viewBox="0 0 20 20"><rect className="cover-chart-bar" x="2" y="10" width="4" height="8" rx="1" /><rect className="cover-chart-bar" x="8" y="6" width="4" height="12" rx="1" /><rect className="cover-chart-bar" x="14" y="2" width="4" height="16" rx="1" /></svg> : <svg className="cover-timeline" viewBox="0 0 20 20">
          <path d="M5 2v16M10 2v16M15 2v16" />
          <rect className="cover-timeline-bar" x="2" y="3" width="8" height="3" rx="1" />
          <rect className="cover-timeline-bar" x="6" y="9" width="12" height="3" rx="1" />
          <rect className="cover-timeline-bar" x="11" y="15" width="7" height="3" rx="1" />
        </svg>}</span>
      </div>
    </div>
  </div>;
}
