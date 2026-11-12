import React from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import CaseStoryNav from '../CaseStoryNav.jsx';

export default function AnalyticsSpatialPage() {
  return <>
    <main id="main" className="design-review">
      <section className="case-hero wrap">
        <a className="back-link" href="/analytics-plus.html#spatial-exploration">← Analytics+ product case</a>
        <ProjectIdentity product="analytics" />
        <p className="eyebrow">Concept exploration · Apple Vision Pro-inspired</p>
        <h1>Analytics+, beyond the screen.</h1>
        <p className="case-summary">A familiar report workflow, explored in a spatial environment.</p>
        <p className="fine-print">Prototype only—not a shipped Vision Pro product.</p>
      </section>
      <section id="spatial-exploration" className="spatial-concept wrap" aria-labelledby="spatial-title">
        <CaseStoryNav caseId="spatial" />
        <div className="case-section-heading">
          <p className="eyebrow">The visual journey</p>
          <h2 id="spatial-title">Launch. Enter. Explore.</h2>
          <p>From app launch to an Analytics+ report.</p>
        </div>
        <div className="spatial-sequence">
          {[
            ['launch', 275, '01 / Launch', 'Concept frame showing an app launcher in a room-like spatial environment.'],
            ['entry', 280, '02 / Enter Analytics+', 'Concept frame showing the Analytics+ entry experience in a floating window.'],
            ['report', 276, '03 / Explore a report', 'Concept frame showing an Analytics+ report with charts and a table in a floating window.']
          ].map(([name, width, caption, alt]) => (
            <figure id={`spatial-${name}`} className="detail-figure spatial-step" key={name}>
              <a className="product-screenshot" href={`/assets/analytics-spatial-${name}.png`} target="_blank" rel="noopener noreferrer" aria-label={`${caption}: view concept frame full-size (opens in a new tab)`}>
                <img src={`/assets/analytics-spatial-${name}.png`} width={width} height="156" loading="lazy" alt={alt} />
              </a>
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="spatial-scope">
          <p>Visual concept screens—not validated spatial interactions.</p>
          <a className="text-link" href="/assets/analytics-spatial-sequence.png" target="_blank" rel="noopener noreferrer" aria-label="View original concept sequence (opens in a new tab)">View original sequence ↗</a>
        </div>
      </section>
    </main>
    <footer className="site-footer wrap">
      <a className="wordmark" href="/">Ravichandran V<span className="accent">.</span></a>
      <p>Product Designer · Thoughtfully, from complexity to clarity.</p>
      <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  </>;
}
