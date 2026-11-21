import { sitePath } from '../site-path.js';
import React, { useEffect, useRef } from 'react';
import ProductCover from '../ProductCover.jsx';

const products = [
  { id: 'project-planning', name: 'PowerTable', platform: 'Microsoft Fabric', platformIcon: 'microsoft-fabric.svg', description: 'Plan tasks, track time, and review resources.', role: 'Gantt & resource UX/UI; Cross-tab contribution.', href: '/powertable.html', artwork: 'powertable' },
  { id: 'project-analytics', name: 'Inforiver Analytics+', platform: 'Microsoft Power BI', platformIcon: 'microsoft-power-bi.svg', description: 'Build charts, KPI cards, and reports.', role: 'Chart Wizard UX/UI & reusable KPI templates.', href: '/analytics-plus.html', artwork: 'analytics' }
];

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
    if (document.activeElement?.matches(':focus-visible')) settle();
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
            <img className="hero-portrait-art" src={sitePath('/assets/portrait-3d.webp')} width="1254" height="1254" fetchPriority="high" alt="3D-style illustrated portrait of Ravichandran V" />
          </div>
          <div className="hero-identity">
            <p className="hero-role"><strong>Ravichandran V.</strong><span>Product Designer II at Lumel</span></p>
          </div>
          <h1 id="portrait-title" className="portrait-title">
            I'm a product designer making{' '}<br /><span className="headline-phrase">complex products feel clear.</span>
          </h1>
          <p className="hero-introduction">Four years, from UX/UI to implementation review.</p>
          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/ravichandran-uxui/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><strong aria-hidden="true">in</strong></a>
            <a className="hero-work-link" href="#work" aria-label="View selected work"><span aria-hidden="true">↓</span></a>
          </div>
      </section>

      <section id="work" className="product-context wrap" aria-labelledby="products-title">
        <div id="products" className="product-context-heading"><h2 id="products-title">What I worked on recently</h2></div>
        <p className="product-browse-help">Start with a product. Choose a feature. See what I designed.</p>
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
      </section>
    </main>
    <footer className="site-footer reference-footer wrap">
      <p>Reach out at</p>
      <h2><a href="mailto:ravichandran.uxui@gmail.com">ravichandran.uxui@gmail.com</a></h2>
      <a className="footer-contact" href="mailto:ravichandran.uxui@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
      <div className="footer-bottom">
        <a className="wordmark" href={sitePath('/')}>Ravichandran<span className="accent"> V.</span></a>
        <a href="https://www.linkedin.com/in/ravichandran-uxui/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
        <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  </>;
}
