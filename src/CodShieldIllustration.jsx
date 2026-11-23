import React, { useId } from 'react';
import IllustrationSurface from './IllustrationSurface.jsx';

export default function CodShieldIllustration() {
  const titleId = useId();
  return <svg className="cod-shield-illustration" viewBox="0 0 430 335" role="img" aria-labelledby={titleId}>
    <title id={titleId}>Concept illustration of a home surrounded by unwanted parcels and repeated phone alerts</title>
    <IllustrationSurface>
    <g className="illustration-layer" data-illustration-order="0" fill="none" stroke="var(--ink)" strokeWidth="2">
      <path d="M75 277h292M123 267V150l93-77 93 77v117" fill="var(--md-sys-color-primary-container)" />
      <path d="m108 155 108-91 108 91" strokeWidth="8" strokeLinecap="round" />
      <rect x="190" y="185" width="48" height="82" rx="3" fill="var(--surface)" />
      <rect x="144" y="163" width="29" height="30" rx="3" />
      <rect x="260" y="163" width="29" height="30" rx="3" />
    </g>
    <g className="illustration-layer" data-illustration-order="1" stroke="var(--ink)" strokeWidth="2" fill="var(--md-sys-color-primary-container)">
      <rect x="23" y="195" width="85" height="72" rx="5" />
      <path d="M23 215h85M65 195v72" />
      <rect x="305" y="216" width="98" height="51" rx="5" />
      <path d="M305 232h98M354 216v51" />
      <rect x="316" y="155" width="67" height="61" rx="5" />
      <path d="M316 171h67M349 155v61" />
    </g>
    <g transform="rotate(-12 68 108)">
      <g className="illustration-layer" data-illustration-order="2">
      <rect x="41" y="53" width="55" height="101" rx="9" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="49" y="70" width="39" height="57" rx="3" fill="var(--md-sys-color-primary-container)" />
      <circle cx="69" cy="139" r="3" fill="var(--ink)" />
      <circle cx="91" cy="62" r="16" fill="var(--ink)" />
      <text x="91" y="66" textAnchor="middle" fill="var(--bg)" fontSize="12">99+</text>
      </g>
    </g>
    <path d="M112 87q23-21 45-16M300 75q30-8 43 14" stroke="var(--muted)" strokeWidth="2" fill="none" strokeDasharray="4 5" />
    <text x="215" y="309" textAnchor="middle" fill="var(--muted)" fontSize="13">An address is not consent to an order.</text>
    </IllustrationSurface>
  </svg>;
}
