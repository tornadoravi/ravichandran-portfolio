import React from 'react';

const steps = [
  ['Understand', 'Business goals, user needs & realistic use cases.'],
  ['Structure', 'Everyday tasks, edge cases & reusable patterns.'],
  ['Refine', 'Handoff, feedback & implementation review.']
];

function ApproachScene({ step }) {
  if (step === 0) return <>
    <circle cx="30" cy="36" r="13" /><circle cx="90" cy="20" r="9" /><circle cx="92" cy="65" r="9" />
    <path d="m43 32 37-10M43 42l37 19M89 30v25" /><circle className="approach-solid" cx="30" cy="36" r="4" />
  </>;
  if (step === 1) return <>
    <rect x="14" y="12" width="92" height="62" rx="8" /><path d="M14 29h92M46 29v45" />
    <rect className="approach-solid" x="24" y="40" width="12" height="22" rx="3" />
    <path d="M58 42h34M58 53h25M58 64h30" />
  </>;
  return <>
    <rect x="14" y="12" width="76" height="61" rx="8" /><path d="M26 29h48M26 41h33M26 53h22" />
    <circle className="approach-disc" cx="88" cy="60" r="20" /><path d="m78 60 7 7 14-15" />
  </>;
}

export default function DesignApproach() {
  return <ol className="design-approach" aria-label="My design approach">
    {steps.map(([title, description], index) => <li key={title}>
      <svg viewBox="0 0 120 86" aria-hidden="true" focusable="false"><ApproachScene step={index} /></svg>
      <div>
        <span className="story-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>)}
  </ol>;
}
