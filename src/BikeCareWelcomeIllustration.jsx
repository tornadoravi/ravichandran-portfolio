import React, { useId } from 'react';

export default function BikeCareWelcomeIllustration() {
  const id = useId();
  return <figure className="bikecare-welcome-visual">
    <svg className="bikecare-welcome-illustration" viewBox="0 0 400 270" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>Unbranded bike-care illustration</title>
      <desc id={`${id}-description`}>A mechanic cares for a generic motorcycle in a softly shaded workshop, beside a service record and care check. It represents no manufacturer or selected vehicle.</desc>
      <defs>
        <linearGradient id={`${id}-backdrop`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--bc-soft)" />
          <stop offset="1" stopColor="var(--bc-canvas)" />
        </linearGradient>
        <linearGradient id={`${id}-paint`} x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="var(--bc-primary)" />
          <stop offset="1" stopColor="var(--bc-feature)" />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#e4eee8" />
          <stop offset=".5" stopColor="var(--bc-art-metal)" />
          <stop offset="1" stopColor="var(--bc-art-mid)" />
        </linearGradient>
      </defs>
      <path d="M61 213V119a104 104 0 0 1 104-104h75a104 104 0 0 1 104 104v94Z" fill={`url(#${id}-backdrop)`} />
      <path d="M65 208h272M183 55v42m-9-36h18m-18 25h18" fill="none" stroke="var(--bc-line)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="47" cy="112" r="4" fill="var(--bc-line)" />
      <circle cx="354" cy="125" r="3" fill="var(--bc-control-line)" />
      <path d="M49 149v10m-5-5h10M349 72v8m-4-4h8" stroke="var(--bc-control-line)" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="210" cy="235" rx="155" ry="11" fill="var(--bc-line)" opacity=".65" />
      <ellipse cx="222" cy="231" rx="111" ry="6" fill="var(--bc-art-dark)" opacity=".12" />
      <g className="bikecare-welcome-record">
        <rect x="256" y="43" width="94" height="66" rx="15" fill="var(--bc-art-dark)" opacity=".06" />
        <path d="M263 36h65a14 14 0 0 1 14 14v36a14 14 0 0 1-14 14h-37l-15 10v-10h-13a14 14 0 0 1-14-14V50a14 14 0 0 1 14-14Z" fill="var(--bc-surface)" stroke="var(--bc-line)" strokeWidth="1.5" />
        <rect x="261" y="48" width="25" height="6" rx="3" fill="var(--bc-primary)" opacity=".75" />
        <path d="M263 65h27m-27 10h18m-18 10h51" fill="none" stroke="var(--bc-control-line)" strokeWidth="3" strokeLinecap="round" />
        <g className="bikecare-welcome-check">
          <circle cx="319" cy="61" r="14" fill="var(--bc-primary)" />
          <path d="m312 61 5 5 9-10" fill="none" stroke="var(--bc-on-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <g className="bikecare-welcome-mechanic">
        <path d="m90 139 27 6-9 38-5 36H88l5-45Zm24 5 17 1-3 43 15 27-13 6-21-32Z" fill="var(--bc-art-dark)" />
        <path d="m105 158-5 28-3 25m22-48 1 28 11 20" fill="none" stroke="var(--bc-art-mid)" strokeWidth="2" strokeLinecap="round" />
        <path d="M87 216h17l4 8-1 5H83c-3-5 0-10 4-13Zm43-1 12-4 13 10c4 3 3 7-2 8h-24l-3-5Z" fill="var(--bc-art-dark)" />
        <path d="M85 227h21m25 0h22" stroke="var(--bc-art-metal)" strokeWidth="2" strokeLinecap="round" />
        <path d="m104 79-2 17 15 9 7-15-8-13Z" fill="var(--bc-art-skin)" />
        <path d="M96 58c10-13 27-5 26 11l5 7-8 3-2 9c-11 6-23-5-23-16Z" fill="var(--bc-art-skin)" />
        <path d="M95 63c1 8 2 13 5 15l-1-11 6-6 13 1-2-10-19 1Z" fill="var(--bc-art-dark)" />
        <ellipse cx="99" cy="73" rx="4" ry="5" fill="var(--bc-art-skin)" />
        <circle cx="116" cy="69" r="1.5" fill="var(--bc-art-dark)" />
        <path d="m116 81 5-1" stroke="var(--bc-art-dark)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M91 60c-2-15 8-23 23-19l7 16-17 6Z" fill={`url(#${id}-paint)`} />
        <path d="m105 57 26 1c4 1 4 4 0 5l-27-1Z" fill="var(--bc-art-dark)" />
        <path d="M93 91c8-4 19-1 29 2l10 38-4 17-39-3-4-32Z" fill={`url(#${id}-paint)`} />
        <path d="m103 91 8 12 9-12" fill="var(--bc-surface)" />
        <path d="M109 103v36m7-25h9v10h-9" fill="none" stroke="var(--bc-on-primary)" strokeWidth="1.5" opacity=".45" />
        <path d="M92 96c-9 1-19 24-17 34l18 16 9-12-14-9 12-21Z" fill="var(--bc-primary)" />
        <path d="m96 133 11 3 8-4 4 6-13 7-10-3Z" fill="var(--bc-art-skin)" />
        <path d="M119 97c9-1 18 16 24 26l18 8-5 12-23-12-18-23Z" fill="var(--bc-primary)" />
        <path d="m158 131 13 4 8-1 2 5-10 6-16-5Z" fill="var(--bc-art-skin)" />
        <path d="m112 139 11-15m-4-5 4 5 5 2-2-8-6-3-1 4Zm-10 25 4-5" fill="none" stroke="var(--bc-art-metal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="bikecare-welcome-bike">
        {[151, 313].map(x => <g key={x} transform={`translate(${x} 200)`}>
          <circle r="31" fill="var(--bc-art-dark)" />
          <circle r="27" fill="none" stroke="var(--bc-art-mid)" strokeWidth="1.5" />
          <circle r="22" fill={`url(#${id}-metal)`} />
          <circle r="18" fill="var(--bc-art-dark)" />
          <g className="bikecare-welcome-wheel-spokes" fill="var(--bc-art-metal)">
            <circle r="17" fill="none" />
            {[0, 60, 120, 180, 240, 300].map(angle => <path key={angle} d="m-3-4 6-13 5 2-6 16Z" transform={`rotate(${angle})`} />)}
          </g>
          <circle r="8" fill={`url(#${id}-metal)`} />
          <circle r="3" fill="var(--bc-art-dark)" />
        </g>)}
        <path d="m151 200 42-52 30 56Zm42-52h79l-49 56m-72-4h67" fill="none" stroke="var(--bc-art-dark)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m165 158 13 27m108-53 27 68" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="7" strokeLinecap="round" />
        <path d="m172 158 12 25" stroke="var(--bc-art-dark)" strokeWidth="3" strokeDasharray="2 4" strokeLinecap="round" />
        <path d="M121 184c12-22 43-28 63-10l-5 8c-16-12-35-8-49 9Zm163 2c10-24 40-32 60-11l-5 6c-19-12-35-7-48 11Z" fill={`url(#${id}-paint)`} />
        <path d="M143 140c17-4 38 0 56 0l17 7-4 8h-64l-12-8Z" fill="var(--bc-art-dark)" />
        <path d="m150 143 44 1" stroke="var(--bc-art-mid)" strokeWidth="2" strokeLinecap="round" />
        <path d="M209 146c13-24 42-28 57-9l9 18-22 16h-35l-17-13Z" fill={`url(#${id}-paint)`} />
        <path d="M222 141c10-9 21-12 32-5" fill="none" stroke="var(--bc-on-primary)" strokeWidth="3" strokeLinecap="round" opacity=".45" />
        <path d="m191 156 27 10-9 16h-27l-10-9Z" fill="var(--bc-primary)" />
        <path d="m183 176 28-5 20 11-4 21-38 4-15-15Z" fill={`url(#${id}-metal)`} stroke="var(--bc-art-dark)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="m188 179 23-4m-21 10 25-4m-23 10 25-4" stroke="var(--bc-art-mid)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="213" cy="196" r="9" fill="var(--bc-art-mid)" />
        <circle cx="213" cy="196" r="4" fill="var(--bc-art-metal)" />
        <path d="M231 190c4 18 19 13 21 20" fill="none" stroke="var(--bc-art-dark)" strokeWidth="5" strokeLinecap="round" />
        <path d="M186 210h71l-7 9h-62Z" fill={`url(#${id}-metal)`} />
        <path d="M246 211h11l-7 8h-9" fill="var(--bc-art-dark)" />
        <path d="m276 129 9-9 14 2m-14-2-1-14" fill="none" stroke="var(--bc-art-dark)" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="284" cy="103" rx="8" ry="4" fill="var(--bc-art-mid)" />
        <path d="m296 141 32-7v25l-29-6Z" fill="var(--bc-warning-soft)" opacity=".5" />
        <rect x="279" y="133" width="21" height="20" rx="8" fill="var(--bc-art-dark)" />
        <path d="M293 137h4v12h-4" fill={`url(#${id}-metal)`} />
        <rect x="131" y="145" width="8" height="5" rx="2" fill="var(--bc-art-skin)" />
      </g>
    </svg>
    <figcaption>Your bike comes next.</figcaption>
  </figure>;
}
