import React from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import { CaseContext, CaseRationale, CaseFlow } from '../CaseReview.jsx';

export default function AnalyticsPlusPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"}>
        {"\n    "}
        <section className={"case-hero wrap analytics-product-hero"}>
          {"\n      "}
          <a className={"back-link"} href={"/#work"}>{"← Selected work"}</a>
          {"\n      "}
          <ProjectIdentity product="analytics" />
          {"\n      "}
          <h1>{"Inforiver Analytics+."}</h1>
          {"\n      "}
          <p className="case-summary">{"Connected authoring across five feature experiences."}</p>
          {"\n      "}
          <CaseContext role="Five-feature UX/UI · Chart Wizard & KPI templates shipped">
            <dl className={"metadata"}>
              <div>
                <dt>{"My role"}</dt>
                <dd>
                  {"Product Designer · "}
                  <strong className={"scan-emphasis"}>{"End-to-end UX/UI"}</strong>
                </dd>
              </div>
              <div>
                <dt>{"Scope"}</dt>
                <dd>{"Competitive analysis, developer handoff & implementation review"}</dd>
              </div>
              <div>
                <dt>{"Product"}</dt>
                <dd className={"analytics-logo-plate"}>
                  <img src={"/assets/inforiver-analytics-logo.svg"} width={"130"} height={"27"} alt={"Official Inforiver Analytics+ logo"} />
                </dd>
              </div>
              <div>
                <dt>{"Work context"}</dt>
                <dd>{"2.5 years on Analytics+ at Lumel"}</dd>
              </div>
            </dl>
          </CaseContext>
          <nav className="case-entry-links" aria-label="Analytics+ quick navigation">
            <a href="#features">Browse features</a>
            <a href="#design-details">Design thinking</a>
            <a href="#evidence-notes">Full evidence</a>
          </nav>
          {"\n    "}
        </section>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene case-evidence analytics-lead-screen product-overview"}>
          {"\n      "}
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Product overview / Power BI"}</span>
            <h2>{"Analytics+ in action."}</h2>
          </div>
          <p className={"product-overview-copy"}>{"Charts, KPI cards, tables, and storytelling in Power BI."}</p>
          {"\n      "}
          <a className={"product-screenshot"} href={"/assets/analytics-plus-official-dashboard.webp"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View official Analytics+ planning dashboard full-size (opens in a new tab)"}>
            <img src={"/assets/analytics-plus-official-dashboard.webp"} width={"1920"} height={"1080"} fetchPriority={"high"} alt={"Official Analytics+ planning report with KPI cards, expense tables, and charts comparing actual performance against plan."} />
          </a>
          {"\n      "}
          <figcaption>
            {"Official template preview · Planning Report | IBCS Theme by Lumel Inc. Product example, not my design deliverable. "}
            <a className={"image-link"} href={"https://store-ap.inforiver.com/dashboard-templates/7a651090-a2a0-4148-a8ce-e2c8be161eab"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Source: Analytics+ Marketplace ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
            {" "}
            <a className={"image-link"} href={"/assets/analytics-plus-official-dashboard.webp"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
          <details className={"product-marketplace"}>
            <summary>Marketplace templates & components</summary>
            <p>{"Ready-to-use dashboard and standalone templates, visual components, bundles, and data apps give report authors reusable starting points."}</p>
            <div className={"product-overview-links"}>
              <a className={"recommended-case"} href={"https://store-ap.inforiver.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Explore the Marketplace ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </div>
          </details>
          <div className="product-overview-links">
            <a className={"recommended-case"} href={"/analytics.html"} aria-label={"Recommended first read: Chart Wizard"}>
              <span>{"Start with Chart Wizard · Shipped"}</span>
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
          </div>
          {"\n    "}
        </figure>
        {"\n    "}
        <details id={"design-details"} className={"case-deep-dive"}>
          {"\n      "}
          <summary className={"wrap"}>
            <span>
              <strong>{"Explore the design thinking"}</strong>
              <small>{"Context, competitive analysis & process"}</small>
            </span>
            <span className={"disclosure-symbol"} aria-hidden={"true"}><span>{"+"}</span></span>
          </summary>
          {"\n      "}
          <div className={"deep-dive-content"}>
            <CaseRationale caseId="analyticsSuite" />
            <section className={"case-brief case-brief--compact wrap"} aria-label={"Detailed contribution summary"}>
              <div>
                <h2>{"Design challenge"}</h2>
                <p>
                  <strong>{"Connect visual discovery, report building, and presentation."}</strong>
                </p>
              </div>
              <div>
                <h2>{"My contribution"}</h2>
                <p>
                  <strong>{"Five connected feature experiences"}</strong>
                  {", through handoff and implementation review."}
                </p>
              </div>
              <div>
                <h2>{"Evidence"}</h2>
                <p>
                  <strong>{"Chart Wizard shipped."}</strong>
                  {" Reusable KPI templates shipped; other feature statuses remain separate."}
                </p>
              </div>
            </section>
            {"\n    "}
            <section id={"platform-context"} className={"platform-context wrap"} aria-labelledby={"platform-context-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Product context / New to the platform?"}</p>
                <h2 id={"platform-context-title"}>{"Where Analytics+ fits."}</h2>
                <p>{"Fabric is the wider platform. Power BI is its reporting and visualization experience. Analytics+ is a custom visual from Lumel."}</p>
              </div>
              {"\n      "}
              <ol className={"platform-stack"} aria-label={"Platform, reporting experience, and custom visual"}>
                {"\n        "}
                <li>
                  <img src={"/assets/microsoft-fabric.svg"} width={"48"} height={"48"} alt={""} />
                  <span className={"eyebrow"}>{"01 / The platform"}</span>
                  <h3>{"Microsoft Fabric"}</h3>
                  <p>{"Brings data and analytics workloads together, including Power BI."}</p>
                </li>
                {"\n        "}
                <li>
                  <img src={"/assets/microsoft-power-bi.svg"} width={"48"} height={"48"} alt={""} />
                  <span className={"eyebrow"}>{"02 / The report environment"}</span>
                  <h3>{"Microsoft Power BI"}</h3>
                  <p>{"Where people build, publish, and explore interactive reports."}</p>
                </li>
                {"\n        "}
                <li>
                  <img className={"platform-inforiver-logo"} src={"/assets/inforiver-analytics-logo.svg"} width={"173"} height={"36"} alt={""} />
                  <span className={"eyebrow"}>{"03 / The custom visual"}</span>
                  <h3>{"Inforiver Analytics+"}</h3>
                  <p>{"Added inside the report for advanced charts, layouts, KPI cards, and storytelling."}</p>
                </li>
                {"\n      "}
              </ol>
              {"\n      "}
              <p className={"fine-print"}>
                {"This is a product relationship, not a required setup sequence or a claim that every Analytics+ user must adopt additional Fabric workloads. Analytics+ is built by Lumel, not Microsoft. "}
                <a href={"https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"Microsoft's Power BI overview ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </p>
              {"\n    "}
            </section>
            {"\n    "}
            <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
              <a href={"#platform-context"}>{"Platform context"}</a>
              <a href={"#business-case"}>{"Why Analytics+"}</a>
              <a href={"#role"}>{"My role"}</a>
              <a href={"#competitive-analysis"}>{"Competitive analysis"}</a>
              <a href={"#concept"}>{"Design process"}</a>
              <a href={"#features"}>{"My feature work"}</a>
              <a href={"#reflection"}>{"Reflection"}</a>
              <a href={"#references"}>{"References"}</a>
            </nav>
            {"\n\n    "}
            <section id={"business-case"} className={"editorial-section wrap"} aria-label={"Business case"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"01 / Why Inforiver Analytics+"}</span>
                <h2>
                  {"More visual power."}
                  <br />
                  <em>{"A clearer way to use it."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
            <p className={"large-copy"}>{"A chart-rich product still needs a clear path from choosing a view to telling a story."}</p>
            <CaseFlow steps={[["Discover","Find a useful visual"],["Compose","Build the report"],["Explain","Give the insight context"]]} />
          </div>
              {"\n    "}
            </section>
            {"\n    "}
            <figure className={"analytics-official-figure wrap"}>
              {"\n      "}
              <img src={"/assets/inforiver-analytics-official.png"} width={"1500"} height={"654"} loading={"lazy"} alt={"Official Analytics+ marketing illustration connecting chart families and KPI cards to a unified reporting visual."} />
              {"\n      "}
              <figcaption>
                {"Official product illustration · Inforiver Analytics+ website. This explains the product proposition; it is not my design deliverable or a supplied feature screenshot. "}
                <a href={"https://inforiver.com/analytics-plus/"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View the official product page ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
              {"\n    "}
            </figure>
            {"\n    "}
            <section id={"solutions"} className={"solution-section wrap"} aria-labelledby={"solutions-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Pain points & solution highlights"}</p>
                <h2 id={"solutions-title"}>{"Connect the decisions, not just the screens."}</h2>
              </div>
              {"\n      "}
              <ol className={"solution-grid"} role={"list"}>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"01 / Discovery"}</span><h3>{"The analytical goal comes before the chart name."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Design response"}</strong>{"Offer Chart and Function routes into shared configuration."}</p>
              <a className={"text-link"} href={"#feature-wizard"}>
                    {"Explore Chart Wizard "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"02 / Authoring"}</span><h3>{"Individual visuals need a coherent report."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Design response"}</strong>{"Connect report composition, Gantt setup, and reusable KPI patterns."}</p>
              <a className={"text-link"} href={"#feature-storyboard"}>
                    {"Explore Storyboard "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"03 / Communication"}</span><h3>{"A data point does not explain itself."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Design response"}</strong>{"Keep annotations beside the data; guide presentation focus."}</p>
              <a className={"text-link"} href={"#feature-annotations"}>
                    {"Explore annotations "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
            </li>
          </ol>
              {"\n    "}
            </section>
            {"\n\n    "}
            <section id={"role"} className={"editorial-section wrap"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"02 / My role & ownership"}</span>
                <h2>
                  {"From the first question"}
                  <br />
                  <em>{"to implementation detail."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"I handled end-to-end UX/UI across the feature work, staying involved through developer handoff and implementation review."}</p>
                <div className={"principles"}>
                  {"\n        "}
                  <div>
                    <span>{"01"}</span>
                    <h3>{"Frame the problem"}</h3>
                    <p>{"Review requirements and existing workflows with PMs, developers, and stakeholders."}</p>
                  </div>
                  {"\n        "}
                  <div>
                    <span>{"02"}</span>
                    <h3>{"Compare and structure"}</h3>
                    <p>{"Use competitive analysis and product-pattern review to inform information architecture, alternative routes, and the separation between basic and advanced controls."}</p>
                  </div>
                  {"\n        "}
                  <div>
                    <span>{"03"}</span>
                    <h3>{"Design the interaction"}</h3>
                    <p>{"Develop user flows, prototypes, interface layouts, reusable patterns, and the visual hierarchy around the feature's core task."}</p>
                  </div>
                  {"\n        "}
                  <div>
                    <span>{"04"}</span>
                    <h3>{"Handoff and review"}</h3>
                    <p>{"Work through developer handoff, clarify interaction and visual details, and review the implementation against the intended experience."}</p>
                  </div>
                  {"\n      "}
                </div>
              </div>
              {"\n    "}
            </section>
            {"\n\n    "}
            <section id={"competitive-analysis"} className={"analytics-comparison wrap"} aria-labelledby={"comparison-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"03 / Competitive analysis · Author & viewer perspectives"}</p>
                <h2 id={"comparison-title"}>{"What should authors and viewers be able to do?"}</h2>
                <p>{"Two perspectives: the author building a report and the viewer interpreting it. Compare tasks, documented patterns, and design responses."}</p>
              </div>
              {"\n      "}
              <div className={"comparison-table-wrap"} tabIndex={"0"} role={"region"} aria-label={"Competitive analysis comparison"}>
                {"\n        "}
                <table className={"comparison-table"}>
                  <caption>{"Task-led public-documentation comparison · reviewed November 2026"}</caption>
                  <thead>
                    <tr>
                      <th scope={"col"}>{"Person & goal"}</th>
                      <th scope={"col"}>{"Documented reference pattern"}</th>
                      <th scope={"col"}>{"Design response in Analytics+"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {"\n          "}
                    <tr>
                      <th scope={"row"}>
                        <span className={"comparison-person"}>{"Report author"}</span>
                        {"Find a visual for my question."}
                      </th>
                      <td>
                        <strong>{"Power BI native visuals"}</strong>
                        {" organize visual types around analytical scenarios and support interactive report exploration. Power BI is the host environment here, not a separate competing add-on. "}
                        <a href={"https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview"} target={"_blank"} rel={"noopener noreferrer"}>
                          {"Microsoft documentation ↗"}
                          <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                        </a>
                      </td>
                      <td>
                        {"Offer Chart and Function routes so an author can start with a chart family or an analytical goal, then reach configuration. "}
                        <a href={"#feature-wizard"}>{"See Chart Wizard →"}</a>
                      </td>
                    </tr>
                    {"\n          "}
                    <tr>
                      <th scope={"row"}>
                        <span className={"comparison-person"}>{"Report author"}</span>
                        {"Build a coherent report, not isolated charts."}
                      </th>
                      <td>
                        <strong>{"Inforiver Analytics+"}</strong>
                        {" presents charts, Storyboard layouts and templates, and KPI cards as part of one Power BI visual suite. This is the product baseline, not a competitor ranking. "}
                        <a href={"https://inforiver.com/analytics-plus/"} target={"_blank"} rel={"noopener noreferrer"}>
                          {"Official product overview ↗"}
                          <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                        </a>
                      </td>
                      <td>
                        {"Connect layout choices and the authoring workspace with reusable starting points rather than make every report start from scratch. "}
                        <a href={"#feature-storyboard"}>{"See Storyboard →"}</a>
                      </td>
                    </tr>
                    {"\n          "}
                    <tr>
                      <th scope={"row"}>
                        <span className={"comparison-person"}>{"Report viewer"}</span>
                        {"Understand the takeaway and its context."}
                      </th>
                      <td>
                        <strong>{"Tableau Stories"}</strong>
                        {" arranges visualizations into story points to communicate a narrative. It is an adjacent storytelling reference, not a like-for-like Power BI custom visual. "}
                        <a href={"https://help.tableau.com/current/pro/desktop/en-us/stories.htm"} target={"_blank"} rel={"noopener noreferrer"}>
                          {"Tableau documentation ↗"}
                          <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                        </a>
                      </td>
                      <td>
                        {"Keep annotations close to the data and support presentation focus so an audience can connect an observation with its explanation. "}
                        <a href={"#feature-annotations"}>{"See annotations →"}</a>
                      </td>
                    </tr>
                    {"\n        "}
                  </tbody>
                </table>
                {"\n      "}
              </div>
              {"\n      "}
              <p className={"comparison-takeaway"}>
                <strong>{"My design point of view:"}</strong>
                {" help the author make the report, and help the viewer make sense of it. More available controls are not the same as a clearer experience."}
              </p>
              {"\n      "}
              <p className={"fine-print"}>{"Comparison basis: author/viewer tasks and current public product documentation."}</p>
              {"\n    "}
            </section>
            {"\n\n    "}
            <figure id={"concept"} className={"concept-model wrap"} aria-labelledby={"concept-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"04 / Design process · Original illustration"}</p>
                <h2 id={"concept-title"}>{"One design thread, carried through delivery."}</h2>
              </div>
              {"\n      "}
              <div className={"concept-map analytics-process"}>
                {"\n        "}
                <a className={"concept-node"} href={"#role"}>
                  <span className={"small-index"}>{"01 / Frame"}</span>
                  <strong>{"Understand"}</strong>
                  <span>{"Requirements, existing flows, and the author's task."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#competitive-analysis"}>
                  <span className={"small-index"}>{"02 / Compare"}</span>
                  <strong>{"Find patterns"}</strong>
                  <span>{"Review discovery, authoring, and storytelling approaches."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#features"}>
                  <span className={"small-index"}>{"03 / Design"}</span>
                  <strong>{"Connect the flow"}</strong>
                  <span>{"Shape interaction, interface, and reusable patterns."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#role"}>
                  <span className={"small-index"}>{"04 / Handoff"}</span>
                  <strong>{"Make it clear"}</strong>
                  <span>{"Communicate the intended behavior and visual detail."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#reflection"}>
                  <span className={"small-index"}>{"05 / Review"}</span>
                  <strong>{"Carry it through"}</strong>
                  <span>{"Review implementation with product and engineering."}</span>
                </a>
                {"\n      "}
              </div>
              <figcaption>{"Original illustration of my design workflow."}</figcaption>
              {"\n    "}
            </figure>
            {"\n    "}
            <details id={"user-flow"} className={"flow-disclosure wrap"}>
              <summary>{"Explore the connected product experience"}</summary>
              <div className={"flow-overview"}>
                <nav className={"analytics-product-flow"} aria-label={"Analytics+ product user flow"}>
                  {"\n      "}
                  <a className={"flow-stage"} href={"#feature-wizard"}>
                    <span className={"flow-number"}>{"01"}</span>
                    <span>
                      <strong>{"Choose a visual"}</strong>
                      <small>{"Enter through a chart family or an analytical question."}</small>
                    </span>
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                  {"\n      "}
                  <a className={"flow-stage"} href={"#feature-storyboard"}>
                    <span className={"flow-number"}>{"02"}</span>
                    <span>
                      <strong>{"Build the report"}</strong>
                      <small>{"Arrange visuals, templates, and reusable metric layouts."}</small>
                    </span>
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                  {"\n      "}
                  <a className={"flow-stage"} href={"#feature-annotations"}>
                    <span className={"flow-number"}>{"03"}</span>
                    <span>
                      <strong>{"Explain the insight"}</strong>
                      <small>{"Connect a data point to context and audience focus."}</small>
                    </span>
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                  {"\n    "}
                </nav>
                <p className={"flow-caption"}>{"A product-level mental model, not a mandatory sequence. Gantt and KPI authoring remain task-specific workflows."}</p>
              </div>
            </details>
            {"\n\n      "}
          </div>
          {"\n    "}
        </details>
        {"\n    "}
        <section id={"features"} className={"analytics-feature-section wrap review-features"} aria-labelledby={"features-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"My feature work / Five experiences"}</p>
            <h2 id={"features-title"}>{"Five feature stories."}</h2>
            <p>{"My design work, with product examples labeled separately. "}<a className={"text-link"} href={"#feature-references"}>{"Official feature references →"}</a></p>
          </div>
          {"\n      "}
          <nav className={"feature-card-grid"} aria-label={"Analytics+ feature index"}>
            {"\n        "}
            <a id={"feature-storyboard"} className={"album-card album-card--lilac"} href={"/storyboard.html"} aria-label={"Read Storyboard authoring case study"}>
              <span className={"album-kicker"}>{"01 / Report authoring"}</span>
              <h3>{"Storyboard"}</h3>
              <p className={"album-description"}>{"Build reports from templates, custom layouts, or auto-create."}</p>
              <div className={"album-media"}>
                <img src={"/assets/storyboard-editor.png"} width={"1390"} height={"782"} loading={"lazy"} alt={"Storyboard workspace with report layers, charts, KPI cards, and a table."} />
              </div>
              <span className={"album-footer"}>
                {"Storyboard product workspace "}
                <span aria-hidden={"true"}>{"↗"}</span>
              </span>
            </a>
            {"\n        "}
            <a id={"feature-gantt"} className={"album-card"} href={"/gantt.html"} aria-label={"Read Power BI Gantt case study"}>
              <span className={"album-kicker"}>{"02 / Task planning"}</span>
              <h3>{"Gantt for Power BI"}</h3>
              <p className={"album-description"}>{"Map tasks and dates; visualize progress, milestones, and dependencies."}</p>
              <div className={"album-media"}>
                <img src={"/assets/gantt-timeline.png"} width={"1406"} height={"786"} loading={"lazy"} alt={"Analytics+ Gantt workspace showing task details beside blue timeline bars."} />
              </div>
              <span className={"album-footer"}>
                {"Gantt product workspace "}
                <span aria-hidden={"true"}>{"↗"}</span>
              </span>
            </a>
            {"\n        "}
            <a id={"feature-wizard"} className={"album-card album-card--peach"} href={"/analytics.html"} aria-label={"Read Chart Wizard case study"}>
              <span className={"album-kicker"}>{"03 / Visual discovery"}</span>
              <h3>{"Chart Wizard"}</h3>
              <p className={"album-description"}>{"Choose by chart or function, then customize and configure."}</p>
              <div className={"album-media"}>
                <img src={"/assets/wizard-chart-family.png"} width={"540"} height={"370"} loading={"lazy"} alt={"Chart Wizard dialog with chart-family choices and visual recommendations."} />
              </div>
              <span className={"album-footer"}>
                {"Chart Wizard product screen "}
                <span aria-hidden={"true"}>{"↗"}</span>
              </span>
            </a>
            {"\n        "}
            <a id={"feature-annotations"} className={"album-card album-card--lilac"} href={"/presentation.html"} aria-label={"Read Annotations, Comments and Presentation case study"}>
              <span className={"album-kicker"}>{"04 / Data storytelling"}</span>
              <h3>{"Annotations & Presentation"}</h3>
              <p className={"album-description"}>{"Add contextual comments and present them in reading mode."}</p>
              <div className={"album-media"}>
                <img src={"/assets/annotation-detail.png"} width={"700"} height={"420"} loading={"lazy"} alt={"Chart detail with an explanatory annotation connected to a data point."} />
              </div>
              <span className={"album-footer"}>
                {"Design screen · Annotation detail "}
                <span aria-hidden={"true"}>{"↗"}</span>
              </span>
            </a>
            {"\n        "}
            <a id={"feature-kpi"} className={"album-card"} href={"/kpi.html"} aria-label={"Read KPI Presets case study"}>
              <span className={"album-kicker"}>{"05 / Reusable patterns"}</span>
              <h3>{"KPI Presets"}</h3>
              <p className={"album-description"}>{"Choose Simple or Variance layouts for reusable metric cards."}</p>
              <div className={"album-media"}>
                <img src={"/assets/analytics-kpi-official-presets.webp"} width={"520"} height={"300"} loading={"lazy"} alt={"Official Analytics+ variance preset example with an actual-value KPI and prior-year, plan, and forecast comparisons. Demo values, not project outcomes."} />
              </div>
              <span className={"album-footer"}>
                {"Official product example · Variance preset "}
                <span aria-hidden={"true"}>{"↗"}</span>
              </span>
            </a>
            {"\n      "}
          </nav>
          {"\n    "}
        </section>
        {"\n    "}
        <details id="supporting-work" className="analytics-supporting-work wrap">
          <summary>More contributions · KPI, icons, systems & integrations</summary>
          <dl>
            <div><dt>KPI & iconography</dt><dd>30+ KPI layouts, 20+ chart/matrix KPI presets, and 70+ unique chart/matrix icons.</dd></div>
            <div><dt>Design foundations</dt><dd>Implemented side-panel revamp; toolbar designs, color picker, and theme palette.</dd></div>
            <div><dt>Excel, PowerPoint & AI</dt><dd>Excel Add-In UI; Excel Analytics and AI Genie UX refinements; PowerPoint visualization templates and Text-to-Visual storytelling.</dd></div>
            <div><dt>Research</dt><dd>Super App research and wireframes.</dd></div>
          </dl>
          <p>Design-scope highlights, not a claim that every variation shipped. Detailed feature cases retain their own delivery status.</p>
        </details>
        <section id="spatial-exploration" className="spatial-concept wrap" aria-labelledby="spatial-title">
          <div className="case-section-heading">
            <p className="eyebrow">Separate concept case study</p>
            <h2 id="spatial-title">Analytics+, beyond the screen.</h2>
            <p>Apple Vision Pro-inspired exploration. Prototype only—not a shipped Vision Pro product.</p>
          </div>
          <a className="text-link" href="/analytics-spatial.html">Explore spatial concept <span aria-hidden="true">→</span></a>
        </section>
        <details id={"evidence-notes"} className={"case-deep-dive"}>
          {"\n      "}
          <summary className={"wrap"}>
            <span>
              <strong>{"Reflection, evidence & credits"}</strong>
              <small>{"Sources & scope boundaries"}</small>
            </span>
            <span className={"disclosure-symbol"} aria-hidden={"true"}><span>{"+"}</span></span>
          </summary>
          {"\n      "}
          <div className={"deep-dive-content"}>
            {"\n    "}
            <section id={"reflection"} className={"editorial-section wrap"}>
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"06 / Reflection"}</span>
                <h2>
                  {"One product experience."}
                  <br />
                  <em>{"Not five isolated screens."}</em>
                </h2>
              </div>
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"The design thread is the relationship between the decisions an author makes."}</p>
                <ul className="case-key-points">
              <li>{"Connect discovery, configuration, composition, and explanation. Carry that intent through handoff and implementation review."}</li>
              <li>{"Feature screens show design decisions—not measured user outcomes, regardless of screen counts or vendor claims."}</li>
            </ul>
              </div>
            </section>
            {"\n    "}
            <section id={"references"} className={"editorial-section wrap"}>
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"07 / Sources & credits"}</span>
                <h2>
                  {"Official product context."}
                  <br />
                  <em>{"My contribution, separately."}</em>
                </h2>
              </div>
              <div className={"section-copy"}>
                <ul className="case-key-points">
              <li>
                  <a className={"text-link"} href={"https://inforiver.com/analytics-plus/"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Inforiver Analytics+ official website "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </li>
              <li>{"Official logo and product artwork belong to Inforiver / Lumel. Used for identification, not claimed as my design deliverables."}</li>
              <li>
                  {"The lead dashboard is the "}
                  <a href={"https://store-ap.inforiver.com/dashboard-templates/7a651090-a2a0-4148-a8ce-e2c8be161eab"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Planning Report | IBCS Theme template by Lumel Inc. ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {" from the "}
                  <a href={"https://store-ap.inforiver.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Analytics+ Marketplace ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {". The preview and catalogue categories illustrate current product capabilities, not my authorship of the template, ownership of the Marketplace, or measured project outcomes."}
                </li>
              <li>
                  {"The unchanged Microsoft Power BI and Fabric icons come from "}
                  <a href={"https://learn.microsoft.com/en-us/fabric/fundamentals/icons"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Microsoft's official icon collection ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {". They identify the platform relationship, not a Microsoft endorsement or ownership of Analytics+."}
                </li>
              <li>{"Comparisons cite Microsoft Learn and Tableau Stories. Feature cases retain supplied screens; official examples are labeled separately."}</li>
            </ul>
                <div id={"feature-references"}>
                  <h3>{"Feature references."}</h3>
                  <p>{"Official sources checked 11 November 2026: capabilities, not individual design ownership or each screen’s release status."}</p>
                  <p>
                    <a href={"https://docs.inforiver.com/analytics+/storyboard"} target={"_blank"} rel={"noopener noreferrer"}>{"Storyboard documentation ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                    {" — Auto-create, template selection, custom layouts, and arranging report elements."}
                  </p>
                  <p>
                    <a href={"https://docs.inforiver.com/analytics+/gantt-chart"} target={"_blank"} rel={"noopener noreferrer"}>{"Gantt documentation ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                    {" — Task/date mapping, progress, milestones, and dependency connectors inside Analytics+ for Power BI, not PowerTable in Fabric."}
                  </p>
                  <p>
                    <a href={"https://inforiver.com/blog/inforiver-analytics-plus/inforiver-analytics-flexible-kpi-containers/#Chart-wizard"} target={"_blank"} rel={"noopener noreferrer"}>{"Chart Wizard release notes ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                    {" — Chart- and function-based discovery, customization, and advanced analytics/sorting/ranking."}
                  </p>
                  <p>
                    <a href={"https://docs.inforiver.com/analytics+/storyboard/annotations"} target={"_blank"} rel={"noopener noreferrer"}>{"Annotations & presentation documentation ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                    {" — Data-point and dashboard annotations, a comments pane, and the Present option for reading mode."}
                  </p>
                  <p>
                    <a href={"https://docs.inforiver.com/analytics+/working-with-analytics+/4.-cards/4.2.-quick-options-cards/kpi-customizations"} target={"_blank"} rel={"noopener noreferrer"}>{"KPI preset documentation ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                    {" — Simple and Variance presets. The card preview is cropped from "}
                    <a href={"https://inforiver.com/blog/inforiver-analytics-plus/inforiver-analytics-flexible-kpi-containers/#KPI-templates"} target={"_blank"} rel={"noopener noreferrer"}>{"Inforiver’s official KPI examples ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                    {", not my design deliverable. The linked KPI case retains my original supplied design screens and confirmed contribution."}
                  </p>
                </div>
                <ul className="case-key-points">
              <li>
                  <a href={"https://www.linkedin.com/posts/info-river_powerbi-datastorytelling-dashboarddesign-activity-7449433719045537792-W7XT"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Inforiver’s public post on storyboarding, layouts, and reusable templates ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {" describes the vendor’s product perspective. It is not independent customer feedback or evidence of measured results from my designs."}
                </li>
            </ul>
                <p className={"fine-print"}>{"No customer interviews, competitor test results, usability improvements, ROI, adoption metrics, or third-party endorsements are invented."}</p>
              </div>
            </section>
            {"\n      "}
          </div>
          {"\n    "}
        </details>
        {"\n    "}
        <section className={"review-contact wrap"} aria-label={"Continue the portfolio review"}>
          <p className={"eyebrow"}>{"The person behind the work"}</p>
          <h2>
            {"Experience, recommendations,"}
            <br />
            {"and a conversation."}
          </h2>
          <div className={"profile-links"}>
            <a className={"text-link"} href={"/about.html#experience"}>
              {"Experience & recommendations "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
            <a className={"text-link"} href={"/about.html#recommendations"}>
              {"Colleague feedback on collaboration "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
            <a className={"text-link"} href={"https://www.linkedin.com/in/ravichandran-uxui/"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Connect on LinkedIn "}
              <span aria-hidden={"true"}>{"↗"}</span>
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </div>
        </section>
        {"\n    "}
        <a className={"next-project wrap review-next"} href={"/powertable.html"}>
          <span className={"eyebrow"}>{"Other product / PowerTable"}</span>
          <span className={"next-title"}>
            {"Connected planning."}
            <br />
            <em>{"Tasks, timelines, and resource context."}</em>
          </span>
          <span className={"next-arrow"} aria-hidden={"true"}>{"↗"}</span>
        </a>
        {"\n  "}
      </main>
      {"\n  "}
      <footer className={"site-footer wrap"}>
        <a className={"wordmark"} href={"/"}>
          {"Ravichandran V"}
          <span className={"accent"}>{"."}</span>
        </a>
        <p>{"Product Designer · Thoughtfully, from complexity to clarity."}</p>
        <a href={"#main"}>
          {"Back to top "}
          <span aria-hidden={"true"}>{"↑"}</span>
        </a>
      </footer>
      {"\n\n\n"}
    </>
  );
}
