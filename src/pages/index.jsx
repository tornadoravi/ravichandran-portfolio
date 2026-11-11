import React, { useEffect, useState } from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import SoundroomControls from '../SoundroomControls.jsx';

const headlinePhrases = [
  'Considered experiences.',
  'Intuitive workflows.',
  'Clear interactions.',
  'Confident decisions.'
];

export default function IndexPage() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const events = new AbortController();
    function updateMotion() {
      setMotionAllowed(!preference.matches && !document.hidden);
      if (preference.matches) setPhraseIndex(0);
    }
    updateMotion();
    preference.addEventListener('change', updateMotion, { signal: events.signal });
    document.addEventListener('visibilitychange', updateMotion, { signal: events.signal });
    return () => events.abort();
  }, []);

  useEffect(() => {
    if (!motionAllowed) return;
    const timer = window.setInterval(() => {
      setPhraseIndex(index => (index + 1) % headlinePhrases.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [motionAllowed]);

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
              <ProjectIdentity product="portfolio" />
            </div>
            {"\n        "}
            <h1 id={"portrait-title"} className={"portrait-title"} aria-label="Complex products. Considered experiences.">
              {"Complex products."}
              <br />
              <em className="rotating-headline" data-sizer={headlinePhrases[0]} data-rotating={motionAllowed}>
                <span className="headline-phrase" key={phraseIndex}>{headlinePhrases[phraseIndex]}</span>
              </em>
            </h1>
            {"\n        "}
            <p className={"hero-introduction"}>{"I turn complex enterprise data tools into clear workflows, from UX/UI to implementation review."}</p>
            <a className={"text-link hero-work-link"} href={"#work"}>
              {"View selected work "}
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
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
            <img className={"portrait-art"} src={"/assets/portrait-3d.webp?v=3"} width={"1254"} height={"1254"} fetchPriority={"high"} alt={"3D-style illustrated portrait of Ravichandran V, smiling with swept-up dark hair and a mint-green collared shirt."} />
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
            <p className={"review-reading-note"}>{"A five-minute first look: choose a product, then explore a feature for design evidence."}</p>
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
            {"\n        "}
            <a className={"project-visual planning-scene"} href={"/powertable.html"} aria-label={"Read PowerTable case study"}>
              {"\n          "}
              <div className={"visual-heading"}>
                <span>
                  {"PowerTable"}
                  <small>{"Task and timeline planning"}</small>
                </span>
                <span className={"visual-pill platform-pill"}>
                  <img src={"/assets/microsoft-fabric.svg"} width={"24"} height={"24"} alt={""} />
                  {"Microsoft Fabric"}
                </span>
              </div>
              {"\n          "}
              <p className={"cover-statement"}>
                {"Complex planning."}
                <br />
                {"Connected workflows."}
              </p>
              {"\n          "}
              <div className={"product-screenshot"}>
                <img src={"/assets/powertable-official-gantt.webp"} width={"2944"} height={"1570"} loading={"lazy"} alt={"Official PowerTable implementation in Microsoft Fabric, with a task table and a populated Gantt timeline showing progress, milestones, and dependencies."} />
              </div>
              {"\n          "}
              <div className={"visual-bottom"}>
                <span>{"Official PowerTable implementation · Product preview"}</span>
                <span className={"project-open"} aria-hidden={"true"}>{"↗"}</span>
              </div>
              {"\n        "}
            </a>
            {"\n        "}
            <div className={"project-caption"}>
              <div>
                <p className={"eyebrow"}>{"01 / Microsoft Fabric"}</p>
                <h3>
                  <a href={"/powertable.html"}>{"PowerTable"}</a>
                </h3>
                <ul className={"project-categories"} aria-label={"PowerTable categories"}>
                  <li>{"Connected planning"}</li>
                  <li>{"Enterprise UX"}</li>
                </ul>
              </div>
              <div className={"project-description"}>
                <p>
                  {"Designing "}
                  <mark className={"scan-highlight"}>{"connected task, timeline, and resource workflows."}</mark>
                </p>
                <p className={"project-role"}>
                  {"My role · "}
                  <strong>{"End-to-end Gantt & resource UX/UI"}</strong>
                  {"; cross-tab contribution"}
                </p>
                <a className={"text-link case-link"} href={"/powertable.html"}>
                  {"Explore case study "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </div>
            </div>
            {"\n      "}
          </article>
          {"\n      "}
          <article id={"project-analytics"} className={"project"}>
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
            <a className={"project-visual analytics-scene"} href={"/analytics-plus.html"} aria-label={"Read Inforiver Analytics+ case study"}>
              {"\n          "}
              <div className={"visual-heading"}>
                <span>
                  <img className={"analytics-brand"} src={"/assets/inforiver-analytics-logo.svg"} width={"173"} height={"36"} alt={"Inforiver Analytics+"} />
                  <small>{"One product. Five connected feature experiences."}</small>
                </span>
                <span className={"visual-pill platform-pill"}>
                  <img src={"/assets/microsoft-power-bi.svg"} width={"24"} height={"24"} alt={""} />
                  {"Microsoft Power BI"}
                </span>
              </div>
              {"\n          "}
              <p className={"cover-statement"}>
                {"Connected authoring"}
                <br />
                {"inside Power BI."}
              </p>
              {"\n          "}
              <div className={"product-screenshot"}>
                <img src={"/assets/analytics-plus-official-dashboard.webp"} width={"1920"} height={"1080"} loading={"lazy"} alt={"Official Analytics+ planning report with KPI cards, expense tables, and charts comparing actual performance against plan."} />
              </div>
              {"\n          "}
              <div className={"visual-bottom"}>
                <span>{"Official Analytics+ template · Lumel Inc."}</span>
                <span className={"project-open"} aria-hidden={"true"}>{"↗"}</span>
              </div>
              {"\n        "}
            </a>
            {"\n        "}
            <div className={"project-caption"}>
              <div>
                <p className={"eyebrow"}>{"02 / Microsoft Power BI"}</p>
                <h3>
                  <a href={"/analytics-plus.html"}>{"Inforiver Analytics+"}</a>
                </h3>
                <ul className={"project-categories"} aria-label={"Analytics+ categories"}>
                  <li>{"Data visualization"}</li>
                  <li>{"Authoring tools"}</li>
                </ul>
              </div>
              <div className={"project-description"}>
                <p>
                  {"Designing "}
                  <mark className={"scan-highlight"}>{"consistent report authoring across five connected features."}</mark>
                </p>
                <p className={"project-role"}>
                  {"My role · "}
                  <strong>{"Five-feature UX/UI"}</strong>
                  {"; Chart Wizard and reusable KPI templates shipped"}
                </p>
                <a className={"text-link case-link"} href={"/analytics-plus.html"}>
                  {"Explore case study "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </div>
            </div>
            {"\n      "}
          </article>
          {"\n    "}
        </section>
        {"\n    "}
        <section className={"home-about wrap"} aria-labelledby={"about-title"}>
          {"\n      "}
          <p className={"eyebrow"}>{"About my work"}</p>
          {"\n      "}
          <div>
            <h2 id={"about-title"}>
              {"From requirements"}
              <br />
              <em>{"to implementation."}</em>
            </h2>
            <p>
              {"At Lumel, I connect user flows, "}
              <strong className={"scan-emphasis"}>{"UX/UI, developer handoff, and implementation review"}</strong>
              {" across enterprise data products."}
            </p>
            <p>
              {"My design work on PowerTable was based entirely on the "}
              <strong className={"scan-emphasis"}>{"Microsoft Fabric design system"}</strong>
              {"."}
            </p>
            <div className={"profile-links"}>
              <a className={"text-link"} href={"/about.html"}>
                {"Experience & recommendations "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              <a className={"text-link"} href={"/assets/ravichandran-resume.pdf"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Resume "}
                <span aria-hidden={"true"}>{"↗"}</span>
                <span className={"sr-only"}>{" (PDF, opens in a new tab)"}</span>
              </a>
              <a className={"text-link"} href={"https://www.linkedin.com/in/ravichandran-uxui/"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Connect on LinkedIn "}
                <span aria-hidden={"true"}>{"↗"}</span>
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
              <a className={"text-link"} href={"https://github.com/tornadoravi"} target={"_blank"} rel={"noopener noreferrer"}>
                {"View GitHub "}
                <span aria-hidden={"true"}>{"↗"}</span>
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </div>
            <div className={"home-contact"} aria-labelledby={"home-contact-title"}>
              <h3 id={"home-contact-title"}>{"Let’s talk product design."}</h3>
              <a className={"text-link contact-link"} href={"https://www.linkedin.com/in/ravichandran-uxui/"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Discuss a product design role "}
                <span aria-hidden={"true"}>{"↗"}</span>
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </div>
          </div>
          {"\n    "}
        </section>
        {"\n  "}
      </main>
      {"\n  "}
      <audio id={"portfolio-ambience"} src={"/assets/soundroom-roja.mp3"} preload={"none"} loop={true}>{""}</audio>
      {"\n  "}
      <footer className={"site-footer wrap"}>
        <a className={"wordmark"} href={"/"}>
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
