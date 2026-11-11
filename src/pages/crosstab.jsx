import React from 'react';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import ProjectIdentity from '../ProjectIdentity.jsx';

export default function CrosstabPage() {
  return (
    <>
      <main id="main">
        <section className="case-hero wrap">
          <a className="back-link" href="/powertable.html#crosstab-features">← PowerTable / Cross-tab</a>
          <ProjectIdentity product="powertable" />
          <WorkspaceFeatureTabs workspace="crosstab" />
          <h1>Cross-tab.<br /><em>Summary & detail.</em></h1>
          <p className="case-summary">Contributions to layout and data configuration.<br className="desktop-break" /> Rows, columns, measures, and contextual settings.</p>
          <dl className="metadata">
            <div><dt>Company</dt><dd>Lumel Technologies</dd></div>
            <div><dt>My role</dt><dd>Cross-tab design contributions</dd></div>
            <div><dt>Focus</dt><dd>Layout & data configuration</dd></div>
            <div><dt>Evidence</dt><dd>Contribution overview · Concept diagram</dd></div>
          </dl>
        </section>
        <section id="contribution" className="editorial-section wrap" aria-labelledby="contribution-title">
          <div className="section-label">
            <span className="eyebrow">01 / Contribution overview</span>
            <h2 id="contribution-title">Structured data.<br /><em>Flexible perspectives.</em></h2>
          </div>
          <div className="section-copy">
            <p>Alongside the Gantt work, I contributed to cross-tab layout and data configuration: rows, columns, measures, contextual settings, and the presentation of summarized and detailed information.</p>
            <p>The intent was to make the relationship between configuration and the resulting view understandable, so people can shape a useful perspective on their data without losing its structure.</p>
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
            <p>This overview describes my contribution to Cross-tab configuration, not end-to-end ownership of the Cross-tab product. My end-to-end Gantt and resource UX/UI work is documented separately.</p>
            <p>No dedicated Cross-tab design screens, historical iteration records, or measured customer outcomes are included here. The diagram explains the configuration structure; it is not evidence of a shipped interface.</p>
            <a className="text-link" href="/powertable.html#role">View the full PowerTable role & scope <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <a className="wordmark" href="/">Ravichandran<span className="accent"> V.</span></a>
        <a className="text-link" href="#main">Back to top <span aria-hidden="true">↑</span></a>
        <span>Product design, with care.</span>
      </footer>
    </>
  );
}
