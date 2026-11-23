import { sitePath } from '../site-path.js';
import React from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import CaseStoryLayout from '../CaseStoryLayout.jsx';
import CaseSolution from '../CaseSolution.jsx';
import CaseConceptFilm from '../CaseConceptFilm.jsx';
import CaseStudyPlayer from '../CaseStudyPlayer.jsx';
import { caseSolutions } from '../case-solutions.js';

const narrative = {
  purpose: caseSolutions.spatial.idea,
  audience: 'report authors exploring a spatial workflow',
  role: 'visual concept exploration',
  steps: [['Retain the workflow', caseSolutions.spatial.approach], ['Question usability', caseSolutions.spatial.reason]]
};
const facts = [
  ['Keep the workflow recognizable.', caseSolutions.spatial.reason],
  ['Three concept frames.', caseSolutions.spatial.example],
  ['An exploration, not a release.', caseSolutions.spatial.evidence]
];
const screen = {
  src: sitePath('/assets/analytics-spatial-sequence.png'),
  alt: 'Original spatial concept sequence showing the launcher, Analytics+ entry, and report frames.'
};

export default function AnalyticsSpatialPage() {
  return <>
    <main id="main" className="design-review">
      <section className="case-hero wrap">
        <a className="back-link" href={sitePath("/analytics-plus.html#spatial-exploration")}>← Analytics+ product case</a>
        <p className="eyebrow">Concept exploration · Apple Vision Pro-inspired</p>
        <h1>Analytics+, beyond the screen.</h1>
        <p className="case-summary">A familiar report workflow, explored in a spatial environment.</p>
        <p className="fine-print">Prototype only—not a shipped Vision Pro product.</p>
        <ProjectIdentity product="analytics" />
        <div className="case-player-entry">
          <CaseStudyPlayer caseId="spatial" name="Analytics+ spatial exploration" narrative={narrative}
            facts={facts} screen={screen} evidenceNote={caseSolutions.spatial.evidence} concept />
        </div>
      </section>
      <CaseStoryLayout caseId="spatial">
      <section id="spatial-exploration" className="spatial-concept wrap" aria-labelledby="spatial-title">
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
              <a className="product-screenshot" href={sitePath(`/assets/analytics-spatial-${name}.png`)} target="_blank" rel="noopener noreferrer" aria-label={`${caption}: view concept frame full-size (opens in a new tab)`}>
                <img src={sitePath(`/assets/analytics-spatial-${name}.png`)} width={width} height="156" loading="lazy" alt={alt} />
              </a>
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="spatial-scope">
          <p>Visual concept screens—not validated spatial interactions.</p>
          <a className="text-link" href={sitePath("/assets/analytics-spatial-sequence.png")} target="_blank" rel="noopener noreferrer" aria-label="View original concept sequence (opens in a new tab)">View original sequence ↗</a>
        </div>
        <CaseSolution caseId="spatial" />
        <CaseConceptFilm caseId="spatial" />
      </section>
      </CaseStoryLayout>
    </main>
    <footer className="site-footer wrap">
      <a className="wordmark" href={sitePath("/")}>Ravichandran V<span className="accent">.</span></a>
      <p>Product Designer · Thoughtfully, from complexity to clarity.</p>
      <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  </>;
}
