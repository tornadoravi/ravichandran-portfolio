import React from 'react';
import IllustrationSurface, { PaperSheet } from './IllustrationSurface.jsx';

const icons = {
  bike: 'M13 25a6 6 0 1 0-12 0 6 6 0 0 0 12 0ZM34 25a6 6 0 1 0-12 0 6 6 0 0 0 12 0ZM7 25l7-12h8l7 12M12 19h10l-3 6H7M22 13l-2-7h7M10 11h7',
  table: 'M2 4h32v27H2ZM2 12h32M2 21h32M13 4v27',
  timeline: 'M7 2v31M18 2v31M29 2v31M2 8h18M10 18h22M19 28h12',
  people: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM24 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM3 29v-5c0-8 18-8 18 0v5M22 18c7 0 11 2 11 6v5',
  link: 'M13 24 8 29c-8 7-16-5-9-11l10-10c6-6 15 1 10 8M20 10l5-5c8-7 16 5 9 11L24 26c-6 6-15-1-10-8M10 23 24 9',
  select: 'M4 3h27v29H4ZM10 12l3 3 6-7M10 24h14',
  settings: 'M2 8h31M2 18h31M2 28h31M10 4v8M24 14v8M15 24v8',
  task: 'M6 3h22v30H6ZM11 11h12M11 19h12M11 27h8',
  review: 'M5 3h24v30H5ZM11 19l4 4 9-11',
  condition: 'M3 5h29v27H3ZM10 13h3M10 23h3M20 13l6 5-6 5',
  style: 'M17 2C10 12 5 17 5 23a12 12 0 0 0 24 0c0-6-5-11-12-21ZM11 25c0 4 4 5 6 5',
  rows: 'M3 5h29v6H3ZM3 15h29v6H3ZM3 25h29v6H3Z',
  columns: 'M3 5h7v27H3ZM14 5h7v27h-7ZM25 5h7v27h-7Z',
  chart: 'M3 32V19h7v13M14 32V11h7v21M25 32V3h7v29',
  layout: 'M3 4h29v8H3ZM3 17h12v15H3ZM20 17h12v15H20Z',
  annotation: 'M2 29h31M6 29V17M16 29V11M26 29V4M16 6l8-5M22 1h5v5',
  comment: 'M3 3h29v22H17l-8 7v-7H3ZM9 10h17M9 17h12',
  present: 'M2 3h31v22H2ZM17 25v8M10 33h14M14 9l9 5-9 5Z',
  template: 'M8 2h25v26H8ZM2 8v26h25M13 8h14M13 14h7M13 20h14',
  report: 'M7 2h22v32H7ZM12 10h12M12 17h12M12 24h7',
  shield: 'M17 2 4 7v12c0 8 13 14 13 14s13-6 13-14V7ZM10 17l5 5 10-12',
  launch: 'M3 3h11v11H3ZM21 3h11v11H21ZM3 21h11v11H3ZM21 21h11v11H21Z'
};

export function SolutionGlyph({ icon, ...props }) {
  const path = icons[icon];
  if (!path) throw new Error(`Unknown solution illustration: ${icon}`);
  return <path d={path} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props} />;
}

export default function CaseSolutionScene({ steps, active, animated = false, seconds = 8 }) {
  return <svg className="case-topic-art portfolio-illustration" viewBox="0 0 360 236" aria-hidden="true" focusable="false" data-solution-step={active + 1}>
    <IllustrationSurface>
      <ellipse cx="180" cy="217" rx="148" ry="9" fill="var(--art-shadow-ink)" opacity=".09" />
      {steps.map((step, index) => {
        const path = icons[step.icon];
        if (!path) throw new Error(`Unknown solution illustration: ${step.icon}`);
        const selected = index === active;
        const words = step.title.split(' ');
        const first = words.length > 2 ? words.slice(0, 2).join(' ') : words[0];
        const second = words.length > 2 ? words.slice(2).join(' ') : words.slice(1).join(' ');
        return <g key={step.title} transform={`translate(${16 + index * 116} ${selected ? 45 : 57})`}>
          <g className={animated ? 'cod-film-arrival' : undefined} ref={element => {
            if (element && animated) element.style.animationDelay = `${index * .14}s`;
          }}>
          <rect x="4" y="4" width="96" height="140" rx="10" fill="var(--art-soft)" />
          <PaperSheet width="96" height="140" rx="10" stroke={selected ? 'var(--art-accent)' : 'var(--art-line)'} strokeWidth={selected ? 2 : 1} />
          <circle cx="48" cy="53" r="27" fill={selected ? 'var(--art-sand-soft)' : 'var(--art-soft)'} />
          <path d={path} transform="translate(31 36)" fill="none" stroke="var(--art-ink)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <text x="13" y="20" fill="var(--art-muted)" fontSize="10">0{index + 1}</text>
          <text x="48" y="105" textAnchor="middle" fill="var(--art-ink)" fontSize="11">{first}</text>
          <text x="48" y="121" textAnchor="middle" fill="var(--art-ink)" fontSize="11">{second}</text>
          </g>
        </g>;
      })}
      <path d="M116 125h11m-5-5 5 5-5 5M232 125h11m-5-5 5 5-5 5" fill="none" stroke="var(--art-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IllustrationSurface>
  </svg>;
}
