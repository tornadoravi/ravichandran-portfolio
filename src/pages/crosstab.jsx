import React from 'react';
import CaseStoryLayout from '../CaseStoryLayout.jsx';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import ProjectIdentity from '../ProjectIdentity.jsx';
import { CaseContext, CaseDetails, CaseSnapshot } from '../CaseReview.jsx';

export default function CrosstabPage() {
  return (
    <>
      <main id="main" className="design-review">
        <section className="case-hero wrap">
          <a className="back-link" href="/powertable.html#crosstab-features">← PowerTable / Cross-tab</a>
          <ProjectIdentity product="powertable" />
          <WorkspaceFeatureTabs workspace="crosstab" />
          <h1>{"Cross-tab."}</h1>
          <p className="case-summary">{"Shape rows, columns, and measures into a useful view."}</p>
          <CaseContext role="Cross-tab contribution · Not end-to-end ownership">
            <dl className="metadata">
              <div><dt>Company</dt><dd>Lumel Technologies</dd></div>
              <div><dt>My role</dt><dd>Cross-tab design contributions</dd></div>
              <div><dt>Focus</dt><dd>Layout & data configuration</dd></div>
              <div><dt>Evidence</dt><dd>Contribution overview · Concept diagram</dd></div>
            </dl>
          </CaseContext>
        </section>
        <CaseStoryLayout caseId="crosstab">
        <CaseSnapshot caseId="crosstab" id="contribution" />
        <CaseDetails caseId="crosstab">
        <section id="contribution-notes" className="editorial-section wrap" aria-labelledby="contribution-title">
          <div className="section-label">
            <span className="eyebrow">01 / Contribution overview</span>
            <h2 id="contribution-title">Structured data.<br /><em>Flexible perspectives.</em></h2>
          </div>
          <div className="section-copy">
            <ul className="case-key-points">
              <li>My contribution: rows, columns, measures, contextual settings, and summary/detail layouts.</li>
              <li>Make configuration and its resulting view understandable together.</li>
            </ul>
          </div>
        </section>
        <section id="configuration" className="editorial-section wrap" aria-labelledby="configuration-title">
          <div className="section-label">
            <span className="eyebrow">02 / Configuration structure</span>
            <h2 id="configuration-title">Rows, columns<br /><em>& measures.</em></h2>
          </div>
          <div className="section-copy">
            <figure className="crosstab-structure">
              <div className="structure-map" role="img" aria-label="Concept diagram: rows and columns organize measures into summary and detail.">
                <span>Columns</span><span>Rows</span><strong>Measures</strong><span>Summary + detail</span>
              </div>
              <figcaption>Original concept diagram · Not a product screenshot.</figcaption>
            </figure>
          </div>
        </section>
        <section id="evidence" className="editorial-section wrap" aria-labelledby="evidence-title">
          <div className="section-label">
            <span className="eyebrow">03 / Scope & evidence</span>
            <h2 id="evidence-title">Contribution.<br /><em>Not suite ownership.</em></h2>
          </div>
          <div className="section-copy">
            <ul className="case-key-points">
              <li>Cross-tab contribution—not end-to-end ownership. My Gantt and resource work is documented separately.</li>
              <li>Concept diagram only. No dedicated Cross-tab design screens, historical iterations, measured outcomes, or proof of a shipped interface.</li>
            </ul>
            <a className="text-link" href="/powertable.html#role">View the full PowerTable role & scope <span aria-hidden="true">→</span></a>
          </div>
        </section>
        </CaseDetails>
        </CaseStoryLayout>
      </main>
      <footer className="site-footer wrap">
        <a className="wordmark" href="/">Ravichandran<span className="accent"> V.</span></a>
        <a className="text-link" href="#main">Back to top <span aria-hidden="true">↑</span></a>
        <span>Product design, with care.</span>
      </footer>
    </>
  );
}
