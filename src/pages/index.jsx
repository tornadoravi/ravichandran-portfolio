import { sitePath } from '../site-path.js';
import React from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import SoundroomControls from '../SoundroomControls.jsx';
import DesignApproach from '../DesignApproach.jsx';
import ProductCover from '../ProductCover.jsx';

export default function IndexPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"}>
        {"\n    "}
        <section className={"portrait-hero wrap"} aria-labelledby={"portrait-title"}>
          {"\n      "}
          <div className={"hero-copy"}>
            {"\n        "}
            <div className={"hero-context"}>
              <p className={"hero-role"}>
                <strong>{"Product Designer II at Lumel."}</strong>
                <span>{"Enterprise analytics & connected planning."}</span>
              </p>
            </div>
            {"\n        "}
            <h1 id={"portrait-title"} className={"portrait-title"} aria-label="I make complex products feel clear.">
              {"I make complex"}
              <br />
              <em>
                <span className="headline-phrase">products feel clear.</span>
              </em>
            </h1>
            {"\n        "}
            <p className={"hero-introduction"}>{"Four years shaping analytics and planning experiences—from UX/UI to implementation review."}</p>
            <a className={"text-link hero-work-link"} href={"#work"}>
              {"View selected work "}
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
            <ProjectIdentity product="portfolio" compact />
            {"\n      "}
          </div>
          {"\n      "}
          <figure className={"hero-portrait"}>
            {"\n        "}
            <span className={"portrait-wordmark"} aria-hidden={"true"}>
              {"PRODUCT"}
              <br />
              {"DESIGNER"}
            </span>
            {"\n        "}
            <img className={"portrait-art"} src={sitePath("/assets/portrait-3d.webp?v=3")} width={"1254"} height={"1254"} fetchPriority={"high"} alt={"3D-style illustrated portrait of Ravichandran V, smiling with swept-up dark hair and a mint-green collared shirt."} />
            <figcaption className="portrait-caption"><span>Ravichandran V.</span><span>Product designer</span></figcaption>
            {"\n      "}
          </figure>
          {"\n    "}
        </section>
        {"\n    "}
        <section id={"work"} className={"work-section wrap"} aria-labelledby={"work-title"}>
          {"\n      "}
          <div className={"section-heading"}>
            {"\n        "}
            <h2 id={"work-title"}>
              {"Selected work"}
              <sup>{"02"}</sup>
            </h2>
            {"\n        "}
            <SoundroomControls />
            {"\n      "}
          </div>
          {"\n      "}
          <div className={"work-browse"}>
            <p className={"review-reading-note"}>{"Two products. A closer look at the decisions behind them."}</p>
            {"\n        "}
            <nav className={"project-index"} aria-label={"Selected work index"}>
              <a href={"#project-planning"}>
                <span>{"01"}</span>
                {" PowerTable"}
              </a>
              <a href={"#project-analytics"}>
                <span>{"02"}</span>
                {" Inforiver Analytics+"}
              </a>
            </nav>
            {"\n      "}
          </div>
          {"\n      "}
          <article id={"project-planning"} className={"project"}>
            <div className={"project-caption"}>
              <div>
                <p className={"eyebrow"}>{"01 / Microsoft Fabric"}</p>
                <h3><a href={sitePath("/powertable.html")}>{"PowerTable"}</a></h3>
                <p className="project-pitch">Connect the data<br />behind the plan.</p>
                <ul className={"project-categories"} aria-label={"PowerTable categories"}>
                  <li>{"Connected planning"}</li>
                  <li>{"Enterprise UX"}</li>
                </ul>
              </div>
              <div className={"project-description"}>
                <p>{"Designing "}<mark className={"scan-highlight"}>{"connected task, timeline, and resource workflows."}</mark></p>
                <p className={"project-role"}>{"My role · "}<strong>{"End-to-end Gantt & resource UX/UI"}</strong>{"; cross-tab contribution"}</p>
                <a className={"text-link case-link"} href={sitePath("/powertable.html")}>{"Explore case study "}<span aria-hidden={"true"}>{"→"}</span></a>
                <a className="feature-entry" href={sitePath("/column-mapping.html")}>Inspect Gantt mapping <span aria-hidden="true">→</span></a>
              </div>
            </div>
            {"\n        "}
            <a className={"project-visual planning-scene"} href={sitePath("/powertable.html")} aria-label={"Read PowerTable case study"}>
              <ProductCover product="powertable" />
            </a>
            {"\n        "}
            {"\n      "}
          </article>
          {"\n      "}
          <article id={"project-analytics"} className={"project"}>
            <div className={"project-caption"}>
              <div>
                <p className={"eyebrow"}>{"02 / Microsoft Power BI"}</p>
                <h3><a href={sitePath("/analytics-plus.html")}>{"Inforiver Analytics+"}</a></h3>
                <p className="project-pitch">Start with a question,<br />not a chart name.</p>
                <ul className={"project-categories"} aria-label={"Analytics+ categories"}>
                  <li>{"Data visualization"}</li>
                  <li>{"Authoring tools"}</li>
                </ul>
              </div>
              <div className={"project-description"}>
                <p>{"Designing "}<mark className={"scan-highlight"}>{"scenario-based chart selection."}</mark></p>
                <p className={"project-role"}>{"My role · "}<strong>{"End-to-end Chart Wizard UX/UI"}</strong>{"; Chart Wizard and reusable KPI templates shipped"}</p>
                <div className="project-case-links">
                  <a className={"text-link case-link"} href={sitePath("/analytics-plus.html")}>{"Explore case study "}<span aria-hidden={"true"}>{"→"}</span></a>
                  <a className="text-link concept-case-link" href={sitePath("/analytics-spatial.html")}>Spatial Analytics+ · Concept study <span aria-hidden="true">→</span></a>
                </div>
                <a className="feature-entry" href={sitePath("/analytics.html")}>Inspect Chart Wizard decisions <span aria-hidden="true">→</span></a>
              </div>
            </div>
            {"\n        "}
            {"\n        "}
            <span id={"project-storyboard"} className={"project-bookmark"} aria-hidden={"true"}>{""}</span>
            {"\n        "}
            <span id={"project-gantt"} className={"project-bookmark"} aria-hidden={"true"}>{""}</span>
            {"\n        "}
            <span id={"project-wizard"} className={"project-bookmark"} aria-hidden={"true"}>{""}</span>
            {"\n        "}
            <span id={"project-presentation"} className={"project-bookmark"} aria-hidden={"true"}>{""}</span>
            {"\n        "}
            <span id={"project-kpi"} className={"project-bookmark"} aria-hidden={"true"}>{""}</span>
            {"\n        "}
            <a className={"project-visual analytics-scene"} href={sitePath("/analytics-plus.html")} aria-label={"Read Inforiver Analytics+ case study"}>
              <ProductCover product="analytics" />
            </a>
            {"\n        "}
            {"\n      "}
          </article>
          {"\n    "}
        </section>
        {"\n    "}
        <section className={"home-about wrap"} aria-labelledby={"about-title"}>
          {"\n      "}
          <p className={"eyebrow"}>{"Behind the work"}</p>
          {"\n      "}
          <div>
            <h2 id={"about-title"}>
              {"Good design connects"}
              <br />
              <em>{"the whole workflow."}</em>
            </h2>
            <DesignApproach />
            <div className={"profile-links"}>
              <a className={"text-link"} href={sitePath("/about.html")}>
                {"More about me "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </div>
          </div>
          {"\n    "}
        </section>
        {"\n  "}
      </main>
      {"\n  "}
      <footer className={"site-footer wrap"}>
        <a className={"wordmark"} href={sitePath("/")}>
          {"Ravichandran"}
          <span className={"accent"}>{" V."}</span>
        </a>
        <p>{"Product design, with care."}</p>
        <a href={"#main"}>
          {"Back to top "}
          <span aria-hidden={"true"}>{"↑"}</span>
        </a>
      </footer>
      {"\n\n\n"}
    </>
  );
}
