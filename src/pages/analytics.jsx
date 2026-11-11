import React from 'react';

export default function AnalyticsPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"}>
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/analytics-plus.html#features"}>{"← Inforiver Analytics+ features"}</a>
          {"\n      "}
          <p className={"eyebrow"}>{"03 / Inforiver Analytics+ feature"}</p>
          {"\n      "}
          <h1>
            {"Chart Wizard."}
            <br />
            <em>{"Guiding visualization selection."}</em>
          </h1>
          {"\n      "}
          <p className={"case-summary"}>
            {"A familiar chart name or an analytical question:"}
            <br className={"desktop-break"} />
            {" two starting points, one guided configuration flow."}
          </p>
          {"\n      "}
          <dl className={"metadata"}>
            <div>
              <dt>{"Company"}</dt>
              <dd>{"Lumel Technologies"}</dd>
            </div>
            <div>
              <dt>{"Role"}</dt>
              <dd>{"Product Designer · End-to-end UX/UI"}</dd>
            </div>
            <div>
              <dt>{"Product context"}</dt>
              <dd>{"Analytics+ · Microsoft Power BI"}</dd>
            </div>
            <div>
              <dt>{"Work context"}</dt>
              <dd>{"Within 2.5 years on Analytics+"}</dd>
            </div>
          </dl>
          {"\n    "}
        </section>
        {"\n    "}
        <div className={"wizard-gallery case-evidence wrap"}>
          {"\n      "}
          <figure id={"browse-chart"} className={"detail-figure screenshot-scene"}>
            <div className={"figure-label"}>
              <span className={"eyebrow"}>{"Screenshot / 01"}</span>
              <h3>{"Browse a chart family"}</h3>
            </div>
            <a className={"product-screenshot wizard-shot"} href={"/assets/wizard-chart-family.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Chart Wizard chart-family screenshot full-size (opens in a new tab)"}>
              <img src={"/assets/wizard-chart-family.png"} width={"540"} height={"370"} fetchPriority={"high"} alt={"Chart Wizard Chart route with Bar/Column selected, recommended chart thumbnails, Favorites, and Proceed."} />
            </a>
            <figcaption>
              {"Product screenshot · Chart-family route. "}
              <a className={"image-link"} href={"/assets/wizard-chart-family.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"View full-size ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
          </figure>
          {"\n      "}
          <figure id={"browse-function"} className={"detail-figure screenshot-scene"}>
            <div className={"figure-label"}>
              <span className={"eyebrow"}>{"Screenshot / 02"}</span>
              <h3>{"Filter by function"}</h3>
            </div>
            <a className={"product-screenshot wizard-shot"} href={"/assets/wizard-function.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Chart Wizard function screenshot full-size (opens in a new tab)"}>
              <img src={"/assets/wizard-function.png"} width={"540"} height={"370"} alt={"Chart Wizard Function route with categorical data, Use case and Visualize filters, Single, 2–4, and 5+ measure choices, and recommended charts."} />
            </a>
            <figcaption>
              {"Product screenshot · Alternative Function route. "}
              <a className={"image-link"} href={"/assets/wizard-function.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"View full-size ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
          </figure>
          {"\n    "}
        </div>
        {"\n    "}
        <section className={"case-brief wrap"} aria-label={"Case study at a glance"}>
          <div>
            <h2>{"Design challenge"}</h2>
            <p>{"A broad chart catalogue and inconsistent controls complicated selection and configuration."}</p>
          </div>
          <div>
            <h2>{"My contribution"}</h2>
            <p>{"End-to-end UX/UI: requirements, two discovery routes, prototypes, handoff, and implementation checks."}</p>
          </div>
          <div>
            <h2>{"Delivery & validation"}</h2>
            <p>{"Chart Wizard shipped. Reviewed through PM, developer, and stakeholder walkthroughs and implementation checks."}</p>
          </div>
        </section>
        {"\n    "}
        <section id={"decisions"} className={"decision-story wrap"} aria-labelledby={"decisions-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Featured decision story"}</p>
            <h2 id={"decisions-title"}>{"The decisions behind the screens."}</h2>
            <p>{"Keep a direct route for familiar tasks while giving less familiar tasks a guided entry."}</p>
          </div>
          {"\n      "}
          <ol className={"decision-ledger"}>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"01 / Discovery"}</span>
              <div>
                <h3>{"Two routes, not one assumed starting point."}</h3>
                <p>{"Chart starts with a known family. Function narrows choices by analytical goal, visual form, and measure count."}</p>
                <p className={"decision-tradeoff"}>
                  <strong>{"Trade-off"}</strong>
                  {"More flexibility introduces an entry choice; both routes retain a shared destination."}
                </p>
                <a className={"text-link"} href={"#browse-function"}>
                  {"Compare the discovery interfaces "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02 / Configuration"}</span>
              <div>
                <h3>{"Give appearance and analysis different places."}</h3>
                <p>{"Customize groups styling and visibility. Advanced groups analytical settings and sorting."}</p>
                <p className={"decision-tradeoff"}>
                  <strong>{"Trade-off"}</strong>
                  {"A staged flow adds navigation, but avoids placing every control in one view."}
                </p>
                <a className={"text-link"} href={"#customize"}>
                  {"Inspect Customize & Advanced "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03 / Returning authors"}</span>
              <div>
                <h3>{"Keep a shortcut inside discovery."}</h3>
                <p>{"Favorites gives saved charts a place alongside the browsing routes, rather than adding a mandatory stage."}</p>
                <p className={"decision-tradeoff"}>
                  <strong>{"Trade-off"}</strong>
                  {"The shortcut helps with known choices; first-time discovery still needs the full catalogue."}
                </p>
                <a className={"text-link"} href={"#favorites"}>
                  {"Inspect the saved-chart state "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </div>
            </li>
            {"\n      "}
          </ol>
          {"\n      "}
          <aside className={"edge-state"} aria-labelledby={"edge-state-title"}>
            <div>
              <p className={"eyebrow"}>{"A visible edge state"}</p>
              <h3 id={"edge-state-title"}>{"Not every visual form is available."}</h3>
              <p>{"The Visualize menu shows Boxes disabled alongside Lines, Points, and Bar. The screen records the unavailable state; explaining its eligibility rule is a follow-up design question."}</p>
            </div>
            <a className={"text-link"} href={"#visual-form"}>
              {"Inspect the actual state "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
          </aside>
          {"\n    "}
        </section>
        {"\n    "}
        <details id={"user-flow"} className={"flow-disclosure wrap"}>
          <summary>{"Explore the three-stage user flow"}</summary>
          <div className={"flow-overview"}>
            {"\n      "}
            <div className={"figure-label"}>
              <span className={"eyebrow"}>{"Feature flow"}</span>
              <h3>{"Find a chart. Shape the view. Set the analysis."}</h3>
            </div>
            {"\n      "}
            <nav className={"storyboard-flow wizard-flow"} aria-label={"Chart Wizard user flow"}>
              {"\n        "}
              <a className={"flow-stage"} href={"#wizard"}>
                <span className={"flow-number"}>{"01"}</span>
                <span>
                  <strong>{"Chart type"}</strong>
                  <small>{"Start from a familiar chart family or an analytical goal."}</small>
                </span>
                <span aria-hidden={"true"}>{"↓"}</span>
              </a>
              {"\n        "}
              <div className={"flow-routes"}>
                <a className={"route-card"} href={"#browse-chart"}>
                  <span className={"eyebrow"}>{"Alternative route / A"}</span>
                  <strong>{"Browse by chart"}</strong>
                  <small>{"Choose a family and review the chart options."}</small>
                  <span aria-hidden={"true"}>{"↗"}</span>
                </a>
                <a className={"route-card"} href={"#browse-function"}>
                  <span className={"eyebrow"}>{"Alternative route / B"}</span>
                  <strong>{"Filter by function"}</strong>
                  <small>{"Use data type, use case, visual style, and measure count."}</small>
                  <span aria-hidden={"true"}>{"↗"}</span>
                </a>
              </div>
              {"\n        "}
              <p className={"flow-route-note"}>{"These are alternative discovery routes, not consecutive steps. Favorites provides access to saved chart choices."}</p>
              {"\n        "}
              <a className={"flow-stage"} href={"#customize"}>
                <span className={"flow-number"}>{"02"}</span>
                <span>
                  <strong>{"Customize"}</strong>
                  <small>{"Set appearance and choose which chart elements to show."}</small>
                </span>
                <span aria-hidden={"true"}>{"↓"}</span>
              </a>
              {"\n        "}
              <a className={"flow-stage"} href={"#advanced"}>
                <span className={"flow-number"}>{"03"}</span>
                <span>
                  <strong>{"Advanced"}</strong>
                  <small>{"Configure analytics and sorting; access the TopN tab."}</small>
                </span>
                <span aria-hidden={"true"}>{"↓"}</span>
              </a>
              {"\n        "}
              <a className={"flow-stage"} href={"#result"}>
                <span className={"flow-number"}>{"→"}</span>
                <span>
                  <strong>{"Return to the report"}</strong>
                  <small>{"See the supplied chart-canvas example."}</small>
                </span>
                <span aria-hidden={"true"}>{"↗"}</span>
              </a>
              {"\n      "}
            </nav>
            {"\n      "}
            <p className={"flow-caption"}>{"Eight supplied product states, arranged for the walkthrough below. Not an interactive BI tool or a recorded session."}</p>
            {"\n    "}
          </div>
        </details>
        {"\n    "}
        <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
          <a href={"#decisions"}>{"Decisions"}</a>
          <a href={"#business-case"}>{"Business case"}</a>
          <a href={"#solutions"}>{"Solutions"}</a>
          <a href={"#concept"}>{"Concept"}</a>
          <a href={"#overview"}>{"Overview"}</a>
          <a href={"#challenge"}>{"Challenge"}</a>
          <a href={"#wizard"}>{"Chart Wizard"}</a>
          <a href={"#configuration"}>{"Configuration"}</a>
          <a href={"#result"}>{"Report view"}</a>
          <a href={"#supporting"}>{"Supporting work"}</a>
          <a href={"#reflection"}>{"Reflection"}</a>
        </nav>
        {"\n    "}
        <details id={"feature-walkthrough"} className={"case-deep-dive"}>
          {"\n      "}
          <summary className={"wrap"}>
            <span>
              <strong>{"Explore all eight screens & the full walkthrough"}</strong>
              <small>{"Product context, discovery, configuration & supporting work"}</small>
            </span>
            <span className={"disclosure-symbol"} aria-hidden={"true"}>{"+"}</span>
          </summary>
          {"\n      "}
          <div className={"deep-dive-content"}>
            {"\n    "}
            <section id={"business-case"} className={"editorial-section wrap"} aria-label={"Business case"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"Business case"}</span>
                <h2>
                  {"Make a broad catalogue"}
                  <br />
                  <em>{"usable without expertise."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"Help report authors turn an analytical question into an appropriate visual."}</p>
                <p>{"Analytics+ offers a wide range of charts inside Power BI. Authors who know chart names and authors who know only their analytical goal need different starting points."}</p>
                <p>{"The objective was approachable discovery without removing the direct route for experienced authors."}</p>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <section id={"solutions"} className={"solution-section wrap"} aria-labelledby={"solutions-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Design rationale"}</p>
                <h2 id={"solutions-title"}>{"Pain points & solution highlights."}</h2>
                {"      "}
                <p>{"Confirmed workflow problems, paired with the design responses and supporting feature detail."}</p>
              </div>
              {"\n      "}
              <ol className={"solution-grid"} role={"list"}>
                {"\n        "}
                <li>
                  <span className={"small-index"}>{"01 / Pain point"}</span>
                  <h3>{"The chart name is not always known."}</h3>
                  <p>{"A broad catalogue is difficult to enter when the user knows the comparison they need, but not the visualization vocabulary."}</p>
                  <p className={"solution-highlight"}>
                    <strong>{"Solution highlight"}</strong>
                    {"Offer Chart and Function routes into the same selection flow: one starts with a family, the other with an analytical goal."}
                  </p>
                  <a className={"text-link"} href={"#wizard"}>
                    {"See discovery routes "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </li>
                {"\n        "}
                <li>
                  <span className={"small-index"}>{"02 / Pain point"}</span>
                  <h3>{"Selection is only the first decision."}</h3>
                  <p>{"Measures, labels, and visual styling still need to form a coherent view after a chart is chosen."}</p>
                  <p className={"solution-highlight"}>
                    <strong>{"Solution highlight"}</strong>
                    {"Make Customize a distinct stage for appearance and visibility, with deeper chart-specific settings left in configuration panels."}
                  </p>
                  <a className={"text-link"} href={"#configuration"}>
                    {"See configuration "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </li>
                {"\n        "}
                <li>
                  <span className={"small-index"}>{"03 / Pain point"}</span>
                  <h3>{"Different decisions compete for attention."}</h3>
                  <p>{"Appearance controls and analytical rules have different purposes, even when they affect the same chart."}</p>
                  <p className={"solution-highlight"}>
                    <strong>{"Solution highlight"}</strong>
                    {"Separate Customize from Advanced, with clear movement between stages and a return to the report canvas."}
                  </p>
                  <a className={"text-link"} href={"#advanced"}>
                    {"See Advanced "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </li>
                {"\n      "}
              </ol>
              {"\n    "}
            </section>
            {"\n    "}
            <figure id={"concept"} className={"concept-model wrap"} aria-labelledby={"concept-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Illustrative concept model"}</p>
                <h2 id={"concept-title"}>{"Two ways in. One configured view."}</h2>
              </div>
              {"\n      "}
              <div className={"concept-map"}>
                {"\n        "}
                <a className={"concept-node"} href={"#wizard"}>
                  <span className={"small-index"}>{"Starting point"}</span>
                  <strong>{"Intent"}</strong>
                  <span>{"A familiar chart name or an analytical question."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#browse-function"}>
                  <span className={"small-index"}>{"Discovery"}</span>
                  <strong>{"Chart choice"}</strong>
                  <span>{"Chart-family browsing or Function-based filtering."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#configuration"}>
                  <span className={"small-index"}>{"Configuration"}</span>
                  <strong>{"Meaningful view"}</strong>
                  <span>{"Appearance and analysis, organized into distinct stages."}</span>
                </a>
                {"\n      "}
              </div>
              {"\n      "}
              <figcaption>{"Original explanatory diagram, not a product screenshot. The concept separates discovering a chart from configuring it; it does not add a data-preparation step. Select a node to explore its feature detail."}</figcaption>
              {"\n    "}
            </figure>
            {"\n    "}
            <section id={"overview"} className={"editorial-section wrap"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"01 / Overview"}</span>
                <h2>
                  {"Enterprise analytics."}
                  <br />
                  <em>{"A clearer starting point."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"Inforiver Analytics+ brings no-code analytics, dashboarding, and reporting into Microsoft Power BI."}</p>
                <p>{"My work covered requirements and existing-experience reviews with product managers and stakeholders, followed by user flows, prototypes, interaction and visual design, developer handoff, and implementation checks."}</p>
                <p>
                  {"This case follows chart selection and configuration. Explore the separate cases for "}
                  <a className={"text-link"} href={"/storyboard.html"}>
                    {"Storyboard authoring "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                  {" and "}
                  <a className={"text-link"} href={"/presentation.html"}>
                    {"Annotations, Comments & Presentation "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                  {"."}
                </p>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <section id={"challenge"} className={"editorial-section wrap"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"02 / The challenge"}</span>
                <h2>
                  {"Many chart options."}
                  <br />
                  <em>{"Different starting points."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"A person who knows the chart name and a person who knows the question need different routes into the same experience."}</p>
                <p>{"Actual-versus-target comparison was one of the workflows behind the design problem: select a chart, configure measures and labels, and match KPI styling. A broad catalogue and inconsistent controls complicated that sequence."}</p>
                <p>{"The walkthrough shows a multi-measure column-chart example with measures already mapped in Power BI."}</p>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <section id={"wizard"} className={"editorial-section wrap walkthrough-step"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"03 / Chart type"}</span>
                <h2>
                  {"Browse by chart."}
                  <br />
                  <em>{"Filter by intent."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"Keep the familiar route direct. Make the guided route specific."}</p>
                <p>{"Opened from the Chart Type dropdown, the wizard offers Chart and Function routes. Both lead to chart recommendations, with access to Favorites."}</p>
                <div className={"two-column"}>
                  <div>
                    <span className={"small-index"}>{"PATH A / CHART"}</span>
                    <h3>{"Start with a known family"}</h3>
                    <p>{"The supplied Chart view has Bar/Column selected. Named thumbnails make the available chart variants visible before proceeding."}</p>
                  </div>
                  <div>
                    <span className={"small-index"}>{"PATH B / FUNCTION"}</span>
                    <h3>{"Start with the analytical need"}</h3>
                    <p>{"The Function view exposes Data type, Use case, Visualize, and Measure filters. The screenshot shows categorical data and the 2–4 measure option selected."}</p>
                  </div>
                </div>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <section className={"editorial-section wrap walkthrough-step"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"03.1 / Function filters"}</span>
                <h2>
                  {"Make the question"}
                  <br />
                  <em>{"part of the choice."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p>{"The open Use case menu shows Comparison, Part to Whole, Ranking, Distribution, and Time series. The separate Visualize menu shows Lines, Points, and Bar, with Boxes disabled in the supplied state."}</p>
                <p>{"Separating analytical purpose from visual form gives authors a route into the catalogue without starting from a chart name."}</p>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <div className={"wizard-gallery wrap"}>
              {"\n      "}
              <figure className={"detail-figure screenshot-scene"}>
                <div className={"figure-label"}>
                  <span className={"eyebrow"}>{"Screenshot / 03"}</span>
                  <h3>{"Choose the use case"}</h3>
                </div>
                <a className={"product-screenshot wizard-shot"} href={"/assets/wizard-use-case.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Chart Wizard use-case screenshot full-size (opens in a new tab)"}>
                  <img src={"/assets/wizard-use-case.png"} width={"540"} height={"370"} loading={"lazy"} alt={"Chart Wizard with the Use case menu open, showing Comparison, Part to Whole, Ranking, Distribution, and Time series."} />
                </a>
                <figcaption>
                  {"Product screenshot · Analytical-purpose options. "}
                  <a className={"image-link"} href={"/assets/wizard-use-case.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"View full-size ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
              </figure>
              {"\n      "}
              <figure id={"visual-form"} className={"detail-figure screenshot-scene"}>
                <div className={"figure-label"}>
                  <span className={"eyebrow"}>{"Screenshot / 04"}</span>
                  <h3>{"Choose the visual form"}</h3>
                </div>
                <a className={"product-screenshot wizard-shot"} href={"/assets/wizard-visual-style.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Chart Wizard visual-style screenshot full-size (opens in a new tab)"}>
                  <img src={"/assets/wizard-visual-style.png"} width={"540"} height={"370"} loading={"lazy"} alt={"Chart Wizard with the Visualize menu open, showing All, Lines, Points, Bar, and a disabled Boxes option."} />
                </a>
                <figcaption>
                  {"Product screenshot · Visual-form options, including the disabled Boxes state. "}
                  <a className={"image-link"} href={"/assets/wizard-visual-style.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"View full-size ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
              </figure>
              {"\n    "}
            </div>
            {"\n    "}
            <section id={"favorites"} className={"editorial-section wrap walkthrough-step"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"03.2 / Favorites"}</span>
                <h2>
                  {"A shorter route"}
                  <br />
                  <em>{"back to a familiar chart."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p>{"The Favorites tab shows a saved Overlapped column chart, while the Function filters remain visible alongside it. Public product documentation also describes adding go-to chart types to Favorites."}</p>
                <p>{"Favorites belongs within chart discovery, not as another mandatory stage. It supports returning to a known choice without changing the three-stage structure."}</p>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <figure className={"detail-figure wrap screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Screenshot / 05"}</span>
                <h3>{"A saved chart in Favorites"}</h3>
              </div>
              <a className={"product-screenshot wizard-shot"} href={"/assets/wizard-favorites.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Chart Wizard favorites screenshot full-size (opens in a new tab)"}>
                <img src={"/assets/wizard-favorites.png"} width={"540"} height={"370"} loading={"lazy"} alt={"Chart Wizard Favorites tab showing a starred Overlapped column chart and the Function filter controls."} />
              </a>
              <figcaption>
                {"Product screenshot · A saved chart choice, not an additional required step. "}
                <a className={"image-link"} href={"/assets/wizard-favorites.png"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View full-size ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
            </figure>
            {"\n    "}
            <section id={"configuration"} className={"editorial-section wrap walkthrough-step"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"04 / Customize & Advanced"}</span>
                <h2>
                  {"Shape the display."}
                  <br />
                  <em>{"Then set the analysis."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p>{"Customize brings Theme, Font, Auto color, and category fill controls together with visibility toggles for titles, axes, sliders, and Data Label. Back and Proceed provide a route between stages."}</p>
                <p>{"Advanced separates analytic controls from the appearance settings. The supplied view has Reference line enabled and sorting set to Descending by AC. TopN is visible as a tab; its configuration is not shown in these screenshots."}</p>
                <p>{"The wizard connects selection, appearance, and analysis while deeper chart-specific settings remain in the wider product’s configuration panels. Detailed bullet bands and layouts are part of that broader scope, not the column-chart screens shown here."}</p>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <div className={"wizard-gallery wrap"}>
              {"\n      "}
              <figure id={"customize"} className={"detail-figure screenshot-scene"}>
                <div className={"figure-label"}>
                  <span className={"eyebrow"}>{"Screenshot / 06 · Stage 02"}</span>
                  <h3>{"Customize the chart"}</h3>
                </div>
                <a className={"product-screenshot wizard-shot"} href={"/assets/wizard-customize.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Chart Wizard customization screenshot full-size (opens in a new tab)"}>
                  <img src={"/assets/wizard-customize.png"} width={"540"} height={"370"} loading={"lazy"} alt={"Chart Wizard Customize stage with theme, font, category fill settings, chart-element toggles, Back, and Proceed."} />
                </a>
                <figcaption>
                  {"Product screenshot · Appearance and chart-element controls. "}
                  <a className={"image-link"} href={"/assets/wizard-customize.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"View full-size ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
              </figure>
              {"\n      "}
              <figure id={"advanced"} className={"detail-figure screenshot-scene"}>
                <div className={"figure-label"}>
                  <span className={"eyebrow"}>{"Screenshot / 07 · Stage 03"}</span>
                  <h3>{"Set analytics and sorting"}</h3>
                </div>
                <a className={"product-screenshot wizard-shot"} href={"/assets/wizard-advanced.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Chart Wizard advanced screenshot full-size (opens in a new tab)"}>
                  <img src={"/assets/wizard-advanced.png"} width={"540"} height={"370"} loading={"lazy"} alt={"Chart Wizard Advanced stage with Reference line enabled, other analytics toggles, Descending sort by AC, a TopN tab, Back, and Finish."} />
                </a>
                <figcaption>
                  {"Product screenshot · Advanced settings; TopN contents are not shown. "}
                  <a className={"image-link"} href={"/assets/wizard-advanced.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"View full-size ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
              </figure>
              {"\n    "}
            </div>
            {"\n    "}
            <section id={"result"} className={"editorial-section wrap walkthrough-step"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"05 / Report view"}</span>
                <h2>
                  {"Back to the canvas."}
                  <br />
                  <em>{"Keep the context visible."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p>{"The report view shows a multi-measure column chart by Weekday, with data labels, annotation markers, and an average reference line. The Analytics+ ribbon remains visible above the chart."}</p>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <figure className={"detail-figure wrap screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Screenshot / 08"}</span>
                <h3>{"The chart in its report context"}</h3>
              </div>
              <a className={"product-screenshot"} href={"/assets/wizard-result.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Chart Wizard report-result screenshot full-size (opens in a new tab)"}>
                <img src={"/assets/wizard-result.png"} width={"1420"} height={"805"} loading={"lazy"} alt={"Analytics+ report canvas with a multi-measure column chart by Weekday, labels, annotation markers, an average reference line, and the chart ribbon."} />
              </a>
              <figcaption>
                {"Product screenshot · Report-canvas example, cropped without browser, account, or surrounding Power BI panels. "}
                <a className={"image-link"} href={"/assets/wizard-result.png"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View full-size ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
            </figure>
            {"\n    "}
            <section id={"supporting"} className={"editorial-section wrap"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"06 / Supporting work"}</span>
                <h2>
                  {"Reusable layouts"}
                  <br />
                  <em>{"and configuration."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p>{"Alongside the core flows, I worked on redesigned side panels that are implemented and in use, and reusable KPI templates that shipped. That supporting work included 30+ KPI layouts, 20+ presets, and 70+ custom icons."}</p>
                <div className={"deliverable-stats"}>
                  <div>
                    <strong>{"30+"}</strong>
                    <span>{"KPI layouts"}</span>
                  </div>
                  <div>
                    <strong>{"20+"}</strong>
                    <span>{"Presets"}</span>
                  </div>
                  <div>
                    <strong>{"70+"}</strong>
                    <span>{"Custom icons"}</span>
                  </div>
                </div>
                <p className={"fine-print"}>{"These counts describe design deliverables, not adoption or business-impact metrics."}</p>
                <a className={"text-link"} href={"/kpi.html"}>
                  {"Explore the KPI Presets case "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </div>
              {"\n    "}
            </section>
            {"\n      "}
          </div>
          {"\n    "}
        </details>
        {"\n    "}
        <section id={"reflection"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"Delivery & reflection"}</span>
            <h2>
              {"Shipped."}
              <br />
              <em>{"Reviewed through delivery."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            <p className={"large-copy"}>{"Chart Wizard shipped, with my UX/UI involvement continuing through handoff and implementation review."}</p>
            <p>{"PM, developer, and stakeholder walkthroughs checked flow clarity and requirements coverage. Implementation reviews checked fidelity to the intended design."}</p>
            <p>{"Giving discovery, appearance, and analysis distinct places is the central design thread. Delivery and internal review are documented here; customer-impact measurements are not included."}</p>
            {"\n        "}
            <details className={"evidence-note"}>
              <summary>{"Role, delivery & evidence"}</summary>
              <div className={"note"}>
                <span className={"eyebrow"}>{"Evidence record"}</span>
                <p>
                  <strong>{"My role:"}</strong>
                  {" requirements, user flows, prototypes, UX/UI, developer handoff, and implementation review."}
                </p>
                <p>
                  <strong>{"Materials:"}</strong>
                  {" eight representative states and a vendor release walkthrough. The final chart is not claimed to preserve every setting in the other images. No historical before/after iteration log or formal user-study results are included. The decision trade-offs describe the visible interface structure, not an undocumented alternatives study."}
                </p>
                <p>
                  <a href={"https://inforiver.com/blog/inforiver-analytics-plus/inforiver-analytics-flexible-kpi-containers/#Chart-wizard"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Inforiver’s Chart Wizard release walkthrough · November 24, 2024 "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {" is vendor documentation, not a customer review or evidence of personal impact."}
                </p>
                <p>
                  {"The "}
                  <a href={"https://store-ap.inforiver.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Analytics+ store "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {" is template-ecosystem context, not a Chart Wizard review page."}
                </p>
              </div>
            </details>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <a className={"next-project wrap"} href={"/presentation.html"}>
          <span className={"eyebrow"}>{"Next feature / Annotations"}</span>
          <span className={"next-title"}>
            {"Keep the context."}
            <br />
            <em>{"Communicate the insight."}</em>
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
