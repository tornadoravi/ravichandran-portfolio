import { sitePath } from '../site-path.js';
import React, { useEffect, useRef } from 'react';
import ProductCover from '../ProductCover.jsx';

const products = [
  { id: 'project-planning', name: 'PowerTable', platform: 'Microsoft Fabric', platformIcon: 'microsoft-fabric.svg', description: 'Plan tasks, track time, and review resources.', role: 'Gantt & resource UX/UI; Cross-tab contribution.', href: '/powertable.html', artwork: 'powertable' },
  { id: 'project-analytics', name: 'Inforiver Analytics+', platform: 'Microsoft Power BI', platformIcon: 'microsoft-power-bi.svg', description: 'Build charts, KPI cards, and reports.', role: 'Chart Wizard UX/UI & reusable KPI templates.', href: '/analytics-plus.html', artwork: 'analytics' }
];
const linkedInUrl = 'https://www.linkedin.com/in/ravichandran-uxui/';

export default function IndexPage() {
  const root = useRef(null);
  useEffect(() => {
    const stage = root.current.querySelector('.hero-portrait-stage');
    const image = stage.querySelector('img');
    const events = new AbortController();
    const reveal = () => stage.classList.add('is-ready');
    const settle = () => stage.classList.add('is-settled');
    image.addEventListener('load', reveal, { once: true, signal: events.signal });
    if (image.complete && image.naturalWidth) reveal();
    if (window.location.hash || document.activeElement?.matches(':focus-visible')) settle();
    window.addEventListener('hashchange', settle, { signal: events.signal });
    document.addEventListener('keydown', settle, { once: true, signal: events.signal });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) settle();
    }, { signal: events.signal });
    return () => events.abort();
  }, []);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in-view');
      observer.unobserve(entry.target);
    }), { threshold: .2 });
    root.current.querySelectorAll('[data-cinematic], .cover-flow').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <>
    <main id="main" className="home-showcase" data-visitor-cursor="" ref={root}>
      <section className="reference-hero wrap" aria-labelledby="portrait-title">
          <div className="hero-portrait-stage">
            <div className="hero-portrait-type" aria-hidden="true"><span>PRODUCT</span><span>DESIGNER</span></div>
            <div className="hero-portrait-frame">
              <img className="hero-portrait-art" src={sitePath('/assets/portrait-3d.webp')} width="1254" height="1254" fetchPriority="high" alt="3D-style illustrated portrait of Ravichandran V" />
            </div>
          </div>
          <div className="hero-identity">
            <p className="hero-role"><strong>Ravichandran V.</strong><span>Product Designer II at Lumel</span></p>
          </div>
          <h1 id="portrait-title" className="portrait-title">
            I’m a product designer making complex products easier to use.
          </h1>
          <p className="hero-introduction">Four years of enterprise UX for Power BI and Microsoft Fabric.</p>
          <div className="hero-socials">
            <a className="hero-profile-link" href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path fillRule="evenodd" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM6.5 10h2v8h-2ZM7.5 6a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM11 10h2v1c.5-.8 1.3-1.2 2.3-1.2 2 0 2.7 1.3 2.7 3.4V18h-2v-4.4c0-1.2-.4-1.8-1.4-1.8-1.1 0-1.6.7-1.6 1.8V18h-2Z" />
              </svg>
            </a>
            <a className="hero-work-link" href="#work" aria-label="View enterprise product design"><span aria-hidden="true">↓</span></a>
          </div>
      </section>

      <section id="work" className="product-context wrap" aria-labelledby="products-title">
        <div id="products" className="product-context-heading"><h2 id="products-title">Enterprise product design</h2></div>
        <div className="product-context-grid">
          {products.map(product => <a id={product.id} className="product-context-card" href={sitePath(product.href)} aria-label={`Read ${product.name} case study`} key={product.artwork} data-cinematic="">
            <ProductCover product={product.artwork} />
            <div className="product-context-copy">
              <div className="product-card-tags">
                <p className="eyebrow"><img src={sitePath(`/assets/${product.platformIcon}`)} width="20" height="20" alt="" />{product.platform}</p>
                <span className="product-live-badge"><span className="product-live-dot" aria-hidden="true" />{product.artwork === 'powertable' ? 'Live on Fabric' : 'Live on Power BI'}</span>
              </div>
              <h3>{product.name} <span aria-hidden="true">↗</span></h3>
              <p>{product.description}</p>
              <p className="product-my-work"><strong>My work</strong> {product.role}</p>
            </div>
            {product.artwork === 'analytics' && ['storyboard', 'gantt', 'wizard', 'presentation', 'kpi'].map(name =>
              <span id={`project-${name}`} className="project-bookmark" aria-hidden="true" key={name} />
            )}
          </a>)}
        </div>
        <section className="home-concept" aria-labelledby="concepts-title">
          <div className="product-context-heading"><h2 id="concepts-title">Independent exploration</h2></div>
          <div className="product-context-grid concept-context-grid">
            <a id="project-cod-shield" className="product-context-card" href={sitePath('/cod-shield.html')} aria-label="Read COD Shield concept case study" data-cinematic="">
              <ProductCover product="codShield" />
              <div className="product-context-copy">
                <p className="eyebrow">Trust &amp; safety / Independent concept</p>
                <h3>COD Shield <span aria-hidden="true">↗</span></h3>
                <p>One harassment report. Fewer unwanted deliveries.</p>
                <p className="product-my-work"><strong>Concept exploration</strong>Service flow, recipient prototype, and safeguards. Not launched or user-tested.</p>
              </div>
            </a>
            <a id="project-bikecare" className="product-context-card" href={sitePath('/bikecare.html')} aria-label="Read BikeCare prototype case study" data-cinematic="">
              <ProductCover product="bikecare" />
              <div className="product-context-copy">
                <p className="eyebrow">Two-wheeler & EV care / Signal design system</p>
                <h3>BikeCare <span aria-hidden="true">↗</span></h3>
                <p>Local service. Timely care. A history for resale.</p>
                <p className="product-my-work"><strong>UX/UI design</strong>Care, documents, parts and motorcycle rides. Case study, prototype, guide. Unlaunched.</p>
              </div>
            </a>
          </div>
        </section>
      </section>
    </main>
    <footer className="site-footer reference-footer wrap">
      <p>Reach out at</p>
      <h2><a href="mailto:ravichandran.uxui@gmail.com">ravichandran.uxui@gmail.com</a></h2>
      <a className="footer-contact" href="mailto:ravichandran.uxui@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
      <div className="footer-bottom">
        <a className="wordmark" href={sitePath('/')}>Ravichandran<span className="accent"> V.</span></a>
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
        <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  </>;
}
