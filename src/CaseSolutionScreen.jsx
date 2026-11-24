import React from 'react';
import { sitePath } from './site-path.js';
import { explainCaseScreen } from './case-screen-context.js';

export default function CaseSolutionScreen({ screen, pause, step }) {
  const src = sitePath(screen.src);
  return <figure className="case-solution-screen" data-solution-step={step === undefined ? undefined : step + 1}>
    <a className={`case-solution-screen-image${pause ? '' : ' product-screenshot'}`}
      href={src} target="_blank" rel="noopener noreferrer" onClick={pause}
      aria-label={`Inspect ${screen.label.toLowerCase()} at original resolution (opens in a new tab)`}>
      <img src={src} alt={screen.alt} width={screen.width} height={screen.height}
        loading="eager" decoding="async" />
    </a>
    <figcaption>
      <span className="case-screen-explanation">{screen.explanation || explainCaseScreen(screen.src)}</span>
      {screen.caption} <a href={src} target="_blank" rel="noopener noreferrer" onClick={pause}>
      Open original screen<span className="sr-only"> (opens in a new tab)</span>
    </a></figcaption>
  </figure>;
}
