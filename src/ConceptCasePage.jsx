import React from 'react';
import { sitePath } from './site-path.js';
import { EvidenceScreen, VisualCaseBody } from './CasePresentation.jsx';
import WalkthroughEntry from './WalkthroughEntry.jsx';

export default function ConceptCasePage({ caseId, title, summary, role, screens, player, children, sources }) {
  const next = {
    codShield: ['/bikecare.html', 'BikeCare'],
    spatial: ['/analytics-plus.html', 'Analytics+']
  }[caseId];
  return <>
    <main id="main" className="design-review">
      <section className="case-hero wrap">
        <a className="back-link" href={sitePath('/#work')}>All case studies</a>
        <p className="eyebrow">Independent concept</p>
        <h1>{title}</h1>
        <p className="case-summary">{summary}</p>
        <p className="case-ownership">{role}</p>
      </section>
      <div className="case-presentation-layout">
        <WalkthroughEntry caseId={caseId} readHref={children ? undefined : '#case-screens'}>
          {player}{children}
        </WalkthroughEntry>
        <div className="case-presentation-hero">
          <div className="case-hero-preview"><EvidenceScreen screen={screens[0]} eager compact /></div>
        </div>
        <VisualCaseBody caseId={caseId} screens={screens}>
          {sources && <nav className="case-source-links" aria-label="Concept sources">{sources}</nav>}
        </VisualCaseBody>
        <nav className="case-endcap" aria-label="Continue exploring case studies">
          <a className="case-endcap-back" href={sitePath('/#work')}>All case studies</a>
          {next && <a className="case-endcap-next" href={sitePath(next[0])}>Next: {next[1]} →</a>}
        </nav>
      </div>
    </main>
    <footer className="site-footer wrap">
      <a className="wordmark" href={sitePath('/')}>Ravichandran V<span className="accent">.</span></a>
      <p>Concept / Not launched or user-tested.</p>
      <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  </>;
}
