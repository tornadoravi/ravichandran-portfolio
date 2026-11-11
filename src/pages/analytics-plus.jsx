import React from 'react';

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
          <p className={"eyebrow"}>{"02 / Inforiver Analytics+ · Power BI"}</p>
          {"\n      "}
          <div className={"analytics-brand-row"}>
            <div className={"analytics-logo-plate"}>
              <img src={"/assets/inforiver-analytics-logo.svg"} width={"173"} height={"36"} alt={"Official Inforiver Analytics+ logo"} />
            </div>
            <div className={"analytics-host"}>
              <img src={"/assets/microsoft-power-bi.svg"} width={"40"} height={"40"} alt={""} />
              <span>
                <small>{"Runs inside"}</small>
                {" Microsoft Power BI"}
              </span>
            </div>
          </div>
          {"\n      "}
          <h1>
            {"Inforiver Analytics+."}
            <br />
            <em>{"From data to a clear story."}</em>
          </h1>
          {"\n      "}
          <p className={"case-summary"}>
            {"End-to-end UX/UI across five Analytics+ features, including flexible report creation."}
          </p>
          {"\n      "}
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
              <dd>{"Analytics+ · Microsoft Power BI"}</dd>
            </div>
            <div>
              <dt>{"Work context"}</dt>
              <dd>{"2.5 years on Analytics+ at Lumel"}</dd>
            </div>
          </dl>
          {"\n    "}
        </section>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene case-evidence analytics-lead-screen"}>
          {"\n      "}
          <div className={"figure-label"}>
            <a className={"recommended-case"} href={"/storyboard.html"} aria-label={"Recommended first read: Storyboard authoring"}>
              <span>{"Start here · Storyboard"}</span>
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
            <h2>{"Choose a starting path."}</h2>
          </div>
          {"\n      "}
          <a className={"product-screenshot"} href={"/assets/storyboard-start.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Analytics+ report creation options full-size (opens in a new tab)"}>
            <img src={"/assets/storyboard-start.png"} width={"1400"} height={"790"} fetchPriority={"high"} alt={"Storyboard report creation screen offering Auto create report, Custom layout, Choose template, and Blank report."} />
          </a>
          {"\n      "}
          <figcaption>
            {"Storyboard report creation · My feature work. Four starting options support different authoring intentions. The linked case shows alternative starting routes, not mandatory setup steps. "}
            <a className={"image-link"} href={"/assets/storyboard-start.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
          {"\n    "}
        </figure>
        {"\n    "}
        <section className={"case-brief case-brief--compact wrap"} aria-label={"Case study at a glance"}>
          <div>
            <h2>{"Design challenge"}</h2>
            <p>
              <strong>{"Visual discovery, report authoring, and clear communication."}</strong>
            </p>
          </div>
          <div>
            <h2>{"My contribution"}</h2>
            <p>
              <strong>{"UX/UI across five features"}</strong>
              {", through handoff and implementation review."}
            </p>
          </div>
          <div>
            <h2>{"Evidence"}</h2>
            <p>
              <strong>{"Chart Wizard shipped."}</strong>
              {" Other feature statuses remain separate."}
            </p>
          </div>
        </section>
        {"\n    "}
        <details id={"design-details"} className={"case-deep-dive"}>
          {"\n      "}
          <summary className={"wrap"}>
            <span>
              <strong>{"Explore the design thinking"}</strong>
              <small>{"Context, competitive analysis & process"}</small>
            </span>
            <span className={"disclosure-symbol"} aria-hidden={"true"}>{"+"}</span>
          </summary>
          {"\n      "}
          <div className={"deep-dive-content"}>
            {"\n    "}
            <section id={"platform-context"} className={"platform-context wrap"} aria-labelledby={"platform-context-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Product context / New to the platform?"}</p>
                <h2 id={"platform-context-title"}>{"Where Analytics+ fits."}</h2>
                <p>{"Microsoft Fabric is the broader data and analytics platform. Power BI is its reporting and visualization experience. Inforiver Analytics+ is a custom visual from Lumel that report authors add inside a Power BI report."}</p>
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
                <p>{"Analytics+ extends Power BI with visualization, report authoring, and storytelling capabilities. The design challenge is to connect chart choice, report composition, and explanation while keeping deeper controls available."}</p>
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
                {"\n        "}
                <li>
                  <span className={"small-index"}>{"01 / Discovery"}</span>
                  <h3>{"The analytical goal comes before the chart name."}</h3>
                  <p>{"Authors may know the question they need to answer without knowing the right visualization."}</p>
                  <p className={"solution-highlight"}>
                    <strong>{"Design response"}</strong>
                    {"Make chart-family and analytical-function discovery alternative routes into configuration."}
                  </p>
                  <a className={"text-link"} href={"#feature-wizard"}>
                    {"Explore Chart Wizard "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </li>
                {"\n        "}
                <li>
                  <span className={"small-index"}>{"02 / Authoring"}</span>
                  <h3>{"Individual visuals need a coherent report."}</h3>
                  <p>{"Layout, reusable patterns, task fields, and timeline context must work as part of the wider workspace."}</p>
                  <p className={"solution-highlight"}>
                    <strong>{"Design response"}</strong>
                    {"Connect Storyboard authoring, Gantt setup, and reusable KPI starting points."}
                  </p>
                  <a className={"text-link"} href={"#feature-storyboard"}>
                    {"Explore Storyboard "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </li>
                {"\n        "}
                <li>
                  <span className={"small-index"}>{"03 / Communication"}</span>
                  <h3>{"A data point does not explain itself."}</h3>
                  <p>{"Report authors need to connect an observation with the context their audience needs."}</p>
                  <p className={"solution-highlight"}>
                    <strong>{"Design response"}</strong>
                    {"Keep annotations close to the data and support a focused presentation sequence."}
                  </p>
                  <a className={"text-link"} href={"#feature-annotations"}>
                    {"Explore annotations "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </li>
                {"\n      "}
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
                    <p>{"Review requirements and the existing experience with product managers, developers, and stakeholders. Identify the decisions and controls the workflow needs to support."}</p>
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
                <p>{"Two viewpoints shape this comparison: the author building the report and the viewer trying to understand it. The focus is their task, the documented product pattern, and the design response in Analytics+."}</p>
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
          </div>
          {"\n      "}
          <nav className={"feature-card-grid"} aria-label={"Analytics+ feature index"}>
            {"\n        "}
            <a id={"feature-storyboard"} className={"album-card album-card--lilac"} href={"/storyboard.html"} aria-label={"Read Storyboard authoring case study"}>
              <span className={"album-kicker"}>{"01 / Report authoring"}</span>
              <h3>{"Storyboard"}</h3>
              <p className={"album-description"}>{"Arrange visuals into one clear report."}</p>
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
              <p className={"album-description"}>{"Connect field setup with a readable timeline."}</p>
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
              <p className={"album-description"}>{"Start with a question. Find the right visual."}</p>
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
              <h3>{"Annotations"}</h3>
              <p className={"album-description"}>{"Keep the explanation beside the insight."}</p>
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
              <p className={"album-description"}>{"Give metrics a reusable, meaningful starting point."}</p>
              <div className={"album-media"}>
                <img src={"/assets/kpi-variance.png"} width={"2000"} height={"1046"} loading={"lazy"} alt={"KPI Presets panel with variance layouts beside a Power BI report."} />
              </div>
              <span className={"album-footer"}>
                {"KPI Presets design screen "}
                <span aria-hidden={"true"}>{"↗"}</span>
              </span>
            </a>
            {"\n      "}
          </nav>
          {"\n    "}
        </section>
        {"\n    "}
        <details id={"evidence-notes"} className={"case-deep-dive"}>
          {"\n      "}
          <summary className={"wrap"}>
            <span>
              <strong>{"Reflection, evidence & credits"}</strong>
              <small>{"Sources & scope boundaries"}</small>
            </span>
            <span className={"disclosure-symbol"} aria-hidden={"true"}>{"+"}</span>
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
                <p>{"Discovery, configuration, report composition, and explanation need different controls, but they should not feel like unrelated products. Carrying the work through handoff and implementation review helps preserve that intended connection."}</p>
                <p>{"The feature stories show concrete interface decisions and the supplied evidence behind them. They do not substitute screen counts, vendor claims, or current public comparisons for measured user outcomes."}</p>
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
                <p>
                  <a className={"text-link"} href={"https://inforiver.com/analytics-plus/"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Inforiver Analytics+ official website "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </p>
                <p>{"The official logo and product-consolidation illustration are sourced from this page and belong to Inforiver / Lumel. They are used for product identification and context, not presented as assets I designed."}</p>
                <p>
                  {"The unchanged Microsoft Power BI and Fabric icons come from "}
                  <a href={"https://learn.microsoft.com/en-us/fabric/fundamentals/icons"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Microsoft's official icon collection ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {". They identify the platform relationship, not a Microsoft endorsement or ownership of Analytics+."}
                </p>
                <p>{"The competitive analysis cites Microsoft Learn and Tableau's official Stories documentation. The feature sections use the supplied product/design screens and preserve their existing detailed case studies."}</p>
                <p>
                  <a href={"https://www.linkedin.com/posts/info-river_powerbi-datastorytelling-dashboarddesign-activity-7449433719045537792-W7XT"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Inforiver’s public post on storyboarding, layouts, and reusable templates ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {" describes the vendor’s product perspective. It is not independent customer feedback or evidence of measured results from my designs."}
                </p>
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
