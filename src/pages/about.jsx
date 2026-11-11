import React from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import { CaseDetails } from '../CaseReview.jsx';

export default function AboutPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"}>
        {"\n    "}
        <section id={"profile"} className={"case-hero wrap about-hero"}>
          {"\n      "}
          <p className={"eyebrow"}>{"About / Product Designer"}</p>
          {"\n      "}
          <h1>
            {"Product design for"}
            <br />
            <em>{"enterprise data experiences."}</em>
          </h1>
          {"\n      "}
          <nav className={"about-nav"} aria-label={"About sections"}>
            <a href={"#profile"}>{"Profile"}</a>
            <a href={"#approach"}>{"Approach"}</a>
            <a href={"#experience"}>{"Experience"}</a>
            <a href={"#recommendations"}>{"Recommendations"}</a>
          </nav>
          {"\n      "}
          <div className={"about-intro"}>
            {"\n        "}
            <div className={"name-block"}>
              {"\n          "}
              <img className={"profile-photo"} src={"/assets/ravichandran-profile.png"} width={"800"} height={"800"} alt={"Portrait of Ravichandran V"} />
              {"\n          "}
              <h2>{"Ravichandran V"}</h2>
              {"\n          "}
              <p>
                {"Product Designer"}
                <br />
                {"Lumel Technologies · Since October 2022"}
              </p>
              {"\n          "}
              <a className={"text-link"} href={"https://www.linkedin.com/in/ravichandran-uxui/"} target={"_blank"} rel={"noopener noreferrer"}>
                {"View LinkedIn profile "}
                <span aria-hidden={"true"}>{"↗"}</span>
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
              {"\n          "}
              <a className={"text-link"} href={"/assets/ravichandran-resume.pdf"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Resume "}
                <span aria-hidden={"true"}>{"↗"}</span>
                <span className={"sr-only"}>{" (PDF, opens in a new tab)"}</span>
              </a>
              {"\n          "}
              <a className={"text-link"} href={"https://github.com/tornadoravi"} target={"_blank"} rel={"noopener noreferrer"}>
                {"View GitHub profile "}
                <span aria-hidden={"true"}>{"↗"}</span>
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
              {"\n        "}
            </div>
            {"\n        "}
            <div>
              {"\n          "}
              <p className={"large-copy"}>{"I think in workflows, not isolated screens."}</p>
              {"\n          "}
              <p>{"I’m a Product Designer II at Lumel, with four years across PowerTable for Microsoft Fabric and Inforiver Analytics+ for Power BI."}</p>
              {"\n          "}
              <p>{"I connect product requirements, user flows, and interaction design—working with product managers and developers through handoff and implementation review."}</p>
              {"\n          "}
              <p>{"My design work on PowerTable was based entirely on the Microsoft Fabric design system."}</p>
              {"\n          "}
              <p className={"profile-current"}>{"Currently Product Designer II at Lumel, since January 2025."}</p>
              <ProjectIdentity product="portfolio" />
              {"\n        "}
            </div>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <CaseDetails id="experience-details" title="Experience & design approach">
        <section id={"approach"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"01 / Approach"}</span>
            <h2>
              {"From requirements"}
              <br />
              <em>{"to implementation."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"Designing an enterprise product means understanding both the system and the workflow it supports."}</p>
            {"\n        "}
            <p>{"I work with product managers, developers, and stakeholders to connect requirements with interaction decisions and implementation detail. That includes reviewing the existing experience, mapping flows, developing prototypes, and checking the implemented product against the design."}</p>
            {"\n        "}
            <div className={"principles"}>
              {"\n          "}
              <div>
                <span>{"01"}</span>
                <h3>{"Understand the workflow"}</h3>
                <p>{"Establish the requirements, existing controls, and sequence of decisions before designing individual screens."}</p>
              </div>
              {"\n          "}
              <div>
                <span>{"02"}</span>
                <h3>{"Structure the interaction"}</h3>
                <p>{"Organize discovery, configuration, and deeper controls so the experience supports different levels of familiarity."}</p>
              </div>
              {"\n          "}
              <div>
                <span>{"03"}</span>
                <h3>{"Carry the detail through"}</h3>
                <p>{"Stay involved in handoff and implementation reviews to maintain consistency between the design and the product."}</p>
              </div>
              {"\n        "}
            </div>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <section id={"experience"} className={"editorial-section wrap"} aria-labelledby={"experience-title"}>
          {"\n      "}
          <div className={"section-label"}>
            {"\n        "}
            <span className={"eyebrow"}>{"02 / Experience timeline"}</span>
            {"\n        "}
            <h2 id={"experience-title"}>
              {"A path into"}
              <br />
              <em>{"enterprise product design."}</em>
            </h2>
            {"\n        "}
            <a className={"text-link"} href={"https://www.linkedin.com/in/ravichandran-uxui/details/experience/"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Experience on LinkedIn "}
              <span aria-hidden={"true"}>{"↗"}</span>
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
            {"\n      "}
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <ol className={"experience-timeline"} role={"list"} aria-label={"Employment experience"}>
              {"\n          "}
              <li>
                {"\n            "}
                <div className={"timeline-heading"}>
                  <h3>{"Lumel Technologies"}</h3>
                  <span className={"timeline-duration"}>{"Since October 2022"}</span>
                </div>
                {"\n            "}
                <p className={"employer-location"}>{"Chennai, India"}</p>
                {"\n            "}
                <ol className={"role-timeline"} role={"list"} aria-label={"Roles at Lumel Technologies"}>
                  {"\n              "}
                  <li>
                    <h4>{"Product Designer II"}</h4>
                    <p className={"role-dates"}>
                      <time dateTime={"2025-01"}>{"Jan 2025"}</time>
                      {" — Present"}
                    </p>
                    <p>{"Designing data analytics experiences through Inforiver Analytics+ for Microsoft Power BI."}</p>
                  </li>
                  {"\n              "}
                  <li>
                    <h4>{"Product Designer I"}</h4>
                    <p className={"role-dates"}>
                      <time dateTime={"2023-07"}>{"Jul 2023"}</time>
                      {" — "}
                      <time dateTime={"2025-01"}>{"Jan 2025"}</time>
                    </p>
                  </li>
                  {"\n              "}
                  <li>
                    <h4>{"Contractor"}</h4>
                    <p className={"role-dates"}>
                      <time dateTime={"2022-10"}>{"Oct 2022"}</time>
                      {" — "}
                      <time dateTime={"2023-07"}>{"Jul 2023"}</time>
                    </p>
                  </li>
                  {"\n            "}
                </ol>
                {"\n          "}
              </li>
              {"\n          "}
              <li>
                {"\n            "}
                <div className={"timeline-heading"}>
                  <h3>{"Arus Info"}</h3>
                </div>
                {"\n            "}
                <p className={"employer-location"}>{"Chennai, India"}</p>
                {"\n            "}
                <ol className={"role-timeline"} role={"list"} aria-label={"Roles at Arus Info"}>
                  {"\n              "}
                  <li>
                    <h4>{"UX/UI Designer"}</h4>
                    <p className={"role-dates"}>
                      <time dateTime={"2023-04"}>{"Apr 2023"}</time>
                      {" — "}
                      <time dateTime={"2023-07"}>{"Jul 2023"}</time>
                    </p>
                  </li>
                  {"\n              "}
                  <li>
                    <h4>{"Trainee Engineer"}</h4>
                    <p className={"role-dates"}>
                      <time dateTime={"2022-07"}>{"Jul 2022"}</time>
                      {" — "}
                      <time dateTime={"2023-06"}>{"Jun 2023"}</time>
                    </p>
                  </li>
                  {"\n            "}
                </ol>
                {"\n          "}
              </li>
              {"\n          "}
              <li>
                {"\n            "}
                <div className={"timeline-heading"}>
                  <h3>{"Velsure Softech Solutions Pvt Ltd"}</h3>
                </div>
                {"\n            "}
                <p className={"employer-location"}>{"Madurai, India"}</p>
                {"\n            "}
                <ol className={"role-timeline"} role={"list"} aria-label={"Roles at Velsure Softech Solutions"}>
                  {"\n              "}
                  <li>
                    <h4>{"Project Intern"}</h4>
                    <p className={"role-dates"}>
                      <time dateTime={"2021-12"}>{"Dec 2021"}</time>
                      {" — "}
                      <time dateTime={"2022-04"}>{"Apr 2022"}</time>
                    </p>
                  </li>
                  {"\n            "}
                </ol>
                {"\n          "}
              </li>
              {"\n        "}
            </ol>
            {"\n        "}
            <p className={"fine-print"}>{"Role titles and dates follow the supplied LinkedIn experience screenshots. Overlapping periods are preserved as listed; product assignments below are not additional employment roles."}</p>
            {"\n        "}
            <h3 className={"assignment-label"}>{"Product focus at Lumel"}</h3>
            {"\n        "}
            <ol className={"assignment-timeline"} role={"list"} aria-label={"Product assignments at Lumel Technologies"}>
              {"\n          "}
              <li>
                <div className={"timeline-heading"}>
                  <h4>{"PowerTable"}</h4>
                  <span className={"timeline-duration"}>{"1.5 years"}</span>
                </div>
                <p>{"End-to-end Gantt and resource Gantt design, with contributions to cross-tab layout and data configuration for Microsoft Fabric."}</p>
                <a className={"text-link"} href={"/powertable.html"}>
                  {"PowerTable case study "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </li>
              {"\n          "}
              <li>
                <div className={"timeline-heading"}>
                  <h4>{"Inforiver Analytics+"}</h4>
                  <span className={"timeline-duration"}>{"2.5 years"}</span>
                </div>
                <p>{"End-to-end UX/UI for enterprise analytics in Microsoft Power BI, including competitive analysis, developer handoff, and implementation review. My feature work spans Storyboard, Gantt for Power BI, Chart Wizard, annotations, and reusable KPI templates."}</p>
                <a className={"text-link"} href={"/analytics-plus.html"}>
                  {"Inforiver Analytics+ product case study "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
                <div className={"profile-links"}>
                  <a className={"text-link"} href={"/storyboard.html"}>
                    {"Storyboard authoring "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                  <a className={"text-link"} href={"/gantt.html"}>
                    {"Gantt for Power BI "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                  <a className={"text-link"} href={"/analytics.html"}>
                    {"Chart Wizard "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                  <a className={"text-link"} href={"/presentation.html"}>
                    {"Annotations, Comments & Presentation "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                  <a className={"text-link"} href={"/kpi.html"}>
                    {"KPI Presets "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </div>
              </li>
              {"\n        "}
            </ol>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        </CaseDetails>
        <section id={"recommendations"} className={"editorial-section wrap"} aria-labelledby={"recommendations-title"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"03 / Recommendations"}</span>
            <h2 id={"recommendations-title"}>
              {"From the people"}
              <br />
              <em>{"I’ve worked with."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <div className={"recommendations-list"}>
              {"\n          "}
              <figure className={"recommendation-card"}>
                {"\n            "}
                <span className={"eyebrow"}>{"01 / Craft & judgment"}</span>
                {"\n            "}
                <blockquote className={"recommendation-excerpt"}>
                  <p>{"“He thinks through every edge case, so his designs hold up not just in the happy path but in the messy, real-world scenarios that often get missed.”"}</p>
                </blockquote>
                {"\n            "}
                <figcaption>
                  <cite>{"Mai Tran"}</cite>
                  <span>{"Senior Product Design Manager @ Lumel"}</span>
                  <span className={"recommendation-context"}>
                    {"Senior colleague; did not manage Ravichandran directly."}
                    <br />
                    <time dateTime={"2026-11-03"}>{"November 3, 2026"}</time>
                  </span>
                </figcaption>
                {"\n            "}
                <details className={"recommendation-full"}>
                  {"\n              "}
                  <summary>
                    {"Read full recommendation "}
                    <span aria-hidden={"true"}><span>{"+"}</span></span>
                  </summary>
                  {"\n              "}
                  <blockquote>
                    {"\n                "}
                    <p>{"Ravi is a well-rounded senior designer who you can count on to deliver design output of the highest quality. At Lumel, we design highly technical products for Microsoft Fabric, and Ravi has a real gift for balancing tasteful, polished visual design with the rigor those products demand. He thinks through every edge case, so his designs hold up not just in the happy path but in the messy, real-world scenarios that often get missed."}</p>
                    {"\n                "}
                    <p>{"He has led multiple projects independently from start to finish, and he needs remarkably little supervision. Once a project is in his hands, his lead and I have complete trust he will get it done to the highest level. What sets him apart is his judgment: he isn’t afraid to push back on stakeholders when something isn’t right for users, and he does it in a way that keeps business goals in view. That ability to find the balance between user needs and business needs is exactly what you want from a senior designer."}</p>
                    {"\n                "}
                    <p>{"I highly recommend Ravi to any team that values craft, ownership, and sound design judgment, and I’d be happy to give him a strong reference."}</p>
                    {"\n              "}
                  </blockquote>
                  {"\n            "}
                </details>
                {"\n          "}
              </figure>
              {"\n          "}
              <figure className={"recommendation-card"}>
                {"\n            "}
                <span className={"eyebrow"}>{"02 / Ownership & collaboration"}</span>
                {"\n            "}
                <blockquote className={"recommendation-excerpt"}>
                  <p>{"“Two highlights stand out: Storyboard mode in Inforiver Analytics+, and the entire Gantt module, which he owned and handled exceptionally well.”"}</p>
                </blockquote>
                {"\n            "}
                <figcaption>
                  <cite>{"Deepak Praveen"}</cite>
                  <span>{"Sr. Product Designer at Lumel | Crafting Microsoft Fabric IQ’s Plan"}</span>
                  <span className={"recommendation-context"}>
                    {"Managed Ravichandran directly."}
                    <br />
                    <time dateTime={"2026-11-02"}>{"November 2, 2026"}</time>
                  </span>
                </figcaption>
                {"\n            "}
                <details className={"recommendation-full"}>
                  {"\n              "}
                  <summary>
                    {"Read full recommendation "}
                    <span aria-hidden={"true"}><span>{"+"}</span></span>
                  </summary>
                  {"\n              "}
                  <blockquote>
                    {"\n                "}
                    <p>{"Working with Ravi has been one of my proudest experiences at Lumel Technologies. In over four years together, he has been one of the hardest-working designers I’ve ever seen."}</p>
                    {"\n                "}
                    <p>{"Ravi designed across Inforiver Analytics+ and PowerTable in Microsoft Fabric Planning, including the Gantt and Resources modules. Two highlights stand out: Storyboard mode in Inforiver Analytics+, and the entire Gantt module, which he owned and handled exceptionally well. He also repeatedly delivered critical work across several Inforiver Analytics+ releases."}</p>
                    {"\n                "}
                    <p>{"He brings the same energy to every task, even when the workload is overwhelming. He understands user needs, constraints, and our design system deeply, and his deliverables are among the cleanest our developers receive. He seeks feedback often, loves to brainstorm, and is always open to new ideas."}</p>
                    {"\n                "}
                    <p>{"Any team would be lucky to have Ravi. I recommend him without hesitation."}</p>
                    {"\n              "}
                  </blockquote>
                  {"\n            "}
                </details>
                {"\n          "}
              </figure>
              {"\n        "}
            </div>
            {"\n        "}
            <a className={"recommendation-link text-link"} href={"https://www.linkedin.com/in/ravichandran-uxui/details/recommendations/"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View originals on LinkedIn "}
              <span aria-hidden={"true"}>{"↗"}</span>
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <section className={"closing wrap"}>
          <p className={"eyebrow"}>{"See the thinking in practice"}</p>
          <a href={"/#work"}>
            {"Explore selected work "}
            <span aria-hidden={"true"}>{"↗"}</span>
          </a>
        </section>
        {"\n  "}
      </main>
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
