import React from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import { CaseDetails, CaseSnapshot, CaseContext, CaseFlow } from '../CaseReview.jsx';

export default function StoryboardPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"} className="design-review">
        {"\n    "}
        <section className={"case-hero wrap"}>
          <a className={"back-link"} href={"/analytics-plus.html#features"}>{"← Inforiver Analytics+ features"}</a>
          <ProjectIdentity product="analytics" />
          <WorkspaceFeatureTabs workspace="analytics" active="storyboard" />
          <h1>{"Storyboard."}</h1>
          <p className="case-summary">{"Choose a start. Build a report. Tell the story."}</p>
          <CaseContext role="Feature UX/UI · Handoff & implementation review">
            <dl className={"metadata"}>
              <div>
                <dt>{"Company"}</dt>
                <dd>{"Lumel Technologies"}</dd>
              </div>
              <div>
                <dt>{"Role"}</dt>
                <dd>{"Product Designer"}</dd>
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
          </CaseContext>
        </section>

        {"\n    "}
        <figure className={"detail-figure case-evidence wrap screenshot-scene"}>
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Screenshot / 01"}</span>
            <h3>{"Report creation options"}</h3>
          </div>
          <a className={"product-screenshot"} href={"/assets/storyboard-start.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View report creation options full-size (opens in a new tab)"}>
            <img src={"/assets/storyboard-start.png"} width={"1400"} height={"790"} fetchPriority={"high"} alt={"Storyboard starting screen with Auto create report, Custom layout, Choose template, and Blank report options."} />
          </a>
          <figcaption>
            {"Product screenshot · Four entry points into report authoring. "}
            <a className={"image-link"} href={"/assets/storyboard-start.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
        </figure>
        {"\n    "}
        <CaseSnapshot caseId="storyboard" />
        <CaseDetails caseId="storyboard">
        <section className={"case-brief wrap"} aria-label={"Detailed contribution summary"}>
          <div>
            <h2>{"Design challenge"}</h2>
            <p>{"Connect the starting point, report structure, and editing context without losing the story."}</p>
          </div>
          <div>
            <h2>{"My contribution"}</h2>
            <p>{"Storyboard enhancements, Text-to-Visual, and PowerPoint visualization templates, with presentation work linked separately."}</p>
          </div>
          <div>
            <h2>{"Evidence"}</h2>
            <p>{"Six authoring and template screenshots. Presentation contributions are described separately from these interface states."}</p>
          </div>
        </section>
        {"\n    "}
        <details id={"user-flow"} className={"flow-disclosure wrap"}>
          <summary>{"Explore the storyboard user flow"}</summary>
          <section className={"flow-overview"} aria-labelledby={"flow-title"}>
            <div className={"visual-heading"}>
              <span id={"flow-title"}>
                {"Storyboard user flow"}
                <small>{"A starting point, alternative setup routes, and authoring context"}</small>
              </span>
              <span className={"visual-pill"}>{"View sequence"}</span>
            </div>
            <nav className={"storyboard-flow"} aria-label={"Storyboard user flow"}>
              <a className={"flow-stage"} href={"#starting-point"}>
                <span className={"flow-number"}>{"01"}</span>
                <span>
                  <strong>{"Choose a starting point"}</strong>
                  <small>{"Four options on the report-creation screen"}</small>
                </span>
                <span aria-hidden={"true"}>{"↓"}</span>
              </a>
              <div className={"flow-routes"}>
                <div className={"route-card route-not-shown"}>
                  <span className={"eyebrow"}>{"Entry option"}</span>
                  <strong>{"Auto create – report"}</strong>
                  <small>{"Generated-report state not included in the supplied images."}</small>
                </div>
                <a className={"route-card"} href={"#layout"}>
                  <span className={"eyebrow"}>{"Alternative / A"}</span>
                  <strong>{"Custom layout"}</strong>
                  <small>{"Configure elements, review the layout, and inspect data fields."}</small>
                  <span aria-hidden={"true"}>{"↗"}</span>
                </a>
                <a className={"route-card"} href={"#templates"}>
                  <span className={"eyebrow"}>{"Alternative / B"}</span>
                  <strong>{"Choose template"}</strong>
                  <small>{"Explore the store or import an existing template."}</small>
                  <span aria-hidden={"true"}>{"↗"}</span>
                </a>
                <a className={"route-card"} href={"#blank-report"}>
                  <span className={"eyebrow"}>{"Alternative / C"}</span>
                  <strong>{"Blank report"}</strong>
                  <small>{"Start with an empty canvas and an insert instruction."}</small>
                  <span aria-hidden={"true"}>{"↗"}</span>
                </a>
              </div>
              <p className={"flow-route-note"}>{"These are alternative starting routes—not consecutive steps in one task."}</p>
              <a className={"flow-stage"} href={"#editor"}>
                <span className={"flow-number"}>{"02"}</span>
                <span>
                  <strong>{"Compose the report"}</strong>
                  <small>{"Populated workspace example: layers, cards, charts, and a table"}</small>
                </span>
                <span aria-hidden={"true"}>{"↓"}</span>
              </a>
              <a className={"flow-stage"} href={"#presentation"}>
                <span className={"flow-number"}>{"03"}</span>
                <span>
                  <strong>{"Communicate the story"}</strong>
                  <small>{"Presentation contribution scope; authoring screenshots are shown separately"}</small>
                </span>
                <span aria-hidden={"true"}>{"↗"}</span>
              </a>
            </nav>
            <p className={"flow-caption"}>{"Flow overview based on the supplied interface states. Follow a route to its corresponding section; intermediate transitions are not depicted."}</p>
          </section>
        </details>
        {"\n    "}
        <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
          <a href={"#business-case"}>{"Business case"}</a>
          <a href={"#solutions"}>{"Solutions"}</a>
          <a href={"#concept"}>{"Concept"}</a>
          <a href={"#overview"}>{"Overview"}</a>
          <a href={"#starting-point"}>{"Report creation"}</a>
          <a href={"#layout"}>{"Custom layout"}</a>
          <a href={"#templates"}>{"Templates"}</a>
          <a href={"#authoring"}>{"Authoring"}</a>
          <a href={"#presentation"}>{"Presentation"}</a>
          <a href={"#reflection"}>{"Reflection"}</a>
        </nav>
        {"\n    "}
        <section id={"business-case"} className={"editorial-section wrap"} aria-label={"Business case"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"Business case"}</span>
            <h2>
              {"Turn visual building blocks"}
              <br />
              <em>{"into a useful report."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            <p className={"large-copy"}>{"Support different starting points within one authoring experience."}</p>
            <CaseFlow steps={[["Choose a start","Auto-create, layout, template, or blank"],["Shape the report","Connect elements and data"],["Author","Keep the canvas structure visible"]]} />
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
            <p>{"Authoring challenges grounded in the supplied interfaces, paired with their design responses."}</p>
          </div>
          {"\n      "}
          <ol className={"solution-grid"} role={"list"}>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"01 / Pain point"}</span><h3>{"Authors do not all begin the same way."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Offer four starting routes, each with a clear purpose."}</p>
              <a className={"text-link"} href={"#starting-point"}>
                {"See entry choices "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"02 / Pain point"}</span><h3>{"Configuration needs spatial context."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Show element configuration, layout preview, and data together."}</p>
              <a className={"text-link"} href={"#layout"}>
                {"See the layout "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"03 / Pain point"}</span><h3>{"The canvas needs a readable structure."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Give blank boards an insert action; expose populated reports through layers."}</p>
              <a className={"text-link"} href={"#editor"}>
                {"See authoring context "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
          </ol>
          {"\n    "}
        </section>
        {"\n    "}
        <figure id={"concept"} className={"concept-model wrap"} aria-labelledby={"concept-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Illustrative concept model"}</p>
            <h2 id={"concept-title"}>{"Different starts. A shared authoring context."}</h2>
          </div>
          {"\n      "}
          <div className={"concept-map"}>
            {"\n        "}
            <a className={"concept-node"} href={"#starting-point"}>
              <span className={"small-index"}>{"Entry choices"}</span>
              <strong>{"Starting route"}</strong>
              <span>{"Auto-create, custom layout, template, or blank report."}</span>
            </a>
            {"\n        "}
            <a className={"concept-node"} href={"#layout"}>
              <span className={"small-index"}>{"Composition"}</span>
              <strong>{"Report structure"}</strong>
              <span>{"Connect elements, layout, and data context."}</span>
            </a>
            {"\n        "}
            <a className={"concept-node"} href={"#editor"}>
              <span className={"small-index"}>{"Authoring"}</span>
              <strong>{"Composed report"}</strong>
              <span>{"Understand the report through its canvas and layers."}</span>
            </a>
            {"\n      "}
          </div>
          {"\n      "}
          <figcaption>{"Original explanatory diagram, not a product screenshot. Entry routes are alternatives, not consecutive screens. The auto-create result is not shown in the supplied images, and intermediate transitions are not asserted."}</figcaption>
          {"\n    "}
        </figure>
        {"\n    "}
        <section id={"overview"} className={"editorial-section wrap"}>
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"01 / Overview"}</span>
            <h2>
              {"From individual visuals"}
              <br />
              <em>{"to report composition."}</em>
            </h2>
          </div>
          <div className={"section-copy"}>
            <p className={"large-copy"}>{"Storyboard connects the choice of starting point, report structure, and editing context into one authoring experience."}</p>
            <ul className="case-key-points">
              <li>{"My work included storyboard enhancements, presentation mode, annotations, slideshow interactions, Text-to-Visual, and PowerPoint visualization templates, within Analytics+ at Lumel Technologies."}</li>
              <li>
              {"The walkthrough follows report creation, layout, template entry points, and the canvas. Chart Wizard has a "}
              <a className={"text-link"} href={"/analytics.html"}>
                {"separate case study "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              {"."}
            </li>
            </ul>
            <div className={"note"}>
              <span className={"eyebrow"}>{"Scope & evidence"}</span>
              <p>{"Authoring screenshots show product context—not ownership of every feature or template. Presentation contributions stay separate."}</p>
            </div>
          </div>
        </section>
        {"\n    "}
        <section id={"starting-point"} className={"editorial-section wrap walkthrough-step"}>
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"02 / Starting point"}</span>
            <h2>
              {"Choose how"}
              <br />
              <em>{"to begin."}</em>
            </h2>
          </div>
          <div className={"section-copy"}>
            <ul className="case-key-points">
              <li>{"Four starting routes: Auto create – report, Custom layout, Choose template, Blank report."}</li>
              <li>{"Choose the amount of starting structure before entering the canvas."}</li>
            </ul>
          </div>
        </section>
        {"\n    "}
        <section id={"layout"} className={"editorial-section wrap walkthrough-step"}>
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"03 / Custom layout"}</span>
            <h2>
              {"Connect configuration"}
              <br />
              <em>{"with the report structure."}</em>
            </h2>
          </div>
          <div className={"section-copy"}>
            <ul className="case-key-points">
              <li>{"Three regions: Elements Configuration, Preview, Pivot data – KPI. Counts, trellis, navigation, comments, and viz-data-ink controls stay together."}</li>
              <li>{"See the configured element, its report position, and its category/measure fields together."}</li>
              <li>{"Reset and Apply sit at the bottom of the workspace, keeping the confirmation controls separate from the configuration regions."}</li>
            </ul>
          </div>
        </section>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene"}>
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Screenshot / 02"}</span>
            <h3>{"Configuration, preview, and data context"}</h3>
          </div>
          <a className={"product-screenshot"} href={"/assets/custom-layout.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View custom layout screenshot full-size (opens in a new tab)"}>
            <img src={"/assets/custom-layout.png"} width={"1350"} height={"759"} loading={"lazy"} alt={"Custom layout workspace with element counts and toggles, a report preview with a selected KPI, and category and measure fields."} />
          </a>
          <figcaption>
            {"Product screenshot · The custom-layout workspace, cropped without browser chrome. "}
            <a className={"image-link"} href={"/assets/custom-layout.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
        </figure>
        {"\n    "}
        <section id={"templates"} className={"editorial-section wrap walkthrough-step"}>
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"04 / Templates"}</span>
            <h2>
              {"Browse a starting point"}
              <br />
              <em>{"or bring an existing one."}</em>
            </h2>
          </div>
          <div className={"section-copy"}>
            <ul className="case-key-points">
              <li>{"Choose between Explore template store and Import templates. Import includes a drag-and-drop instruction."}</li>
              <li>{"The store offers dashboard/standalone templates, visual components, and data apps. Search, filters, and previews support browsing."}</li>
              <li>{"Store imagery is ecosystem context—not ownership of the catalogue, community assets, or individual dashboards."}</li>
            </ul>
          </div>
        </section>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene"}>
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Screenshot / 03"}</span>
            <h3>{"Template discovery and import"}</h3>
          </div>
          <a className={"product-screenshot"} href={"/assets/template-selection.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View template entry screenshot full-size (opens in a new tab)"}>
            <img src={"/assets/template-selection.png"} width={"1350"} height={"760"} loading={"lazy"} alt={"Choose template screen with Explore template store, Import templates, and a drag-and-drop import instruction."} />
          </a>
          <figcaption>
            {"Product screenshot · Template browsing and import entry points. "}
            <a className={"image-link"} href={"/assets/template-selection.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
        </figure>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene"}>
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Screenshot / 04"}</span>
            <h3>{"The Analytics+ template ecosystem"}</h3>
          </div>
          <a className={"product-screenshot"} href={"/assets/template-store.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View template store screenshot full-size (opens in a new tab)"}>
            <img src={"/assets/template-store.png"} width={"2000"} height={"1020"} loading={"lazy"} alt={"Analytics+ template store showing navigation categories, search, filters, dashboard previews, and standalone visual templates."} />
          </a>
          <figcaption>
            {"Store screenshot · Product context, not a claim of ownership of the catalogue. "}
            <a className={"image-link"} href={"/assets/template-store.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
            {" "}
            <a className={"image-link"} href={"https://store-ap.inforiver.com/"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Visit the product store ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
        </figure>
        {"\n    "}
        <section id={"authoring"} className={"editorial-section wrap walkthrough-step"}>
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"05 / Blank report route"}</span>
            <h2>
              {"An empty board."}
              <br />
              <em>{"A visible next action."}</em>
            </h2>
          </div>
          <div className={"section-copy"}>
            <ul className="case-key-points">
              <li>{"Blank report → empty-state instruction → insert control. An alternative to layouts and templates, not a later required step."}</li>
              <li>{"Pivot data, Properties, Advanced, Action, and board tabs remain visible before content is added."}</li>
            </ul>
          </div>
        </section>
        {"\n    "}
        <figure id={"blank-report"} className={"detail-figure wrap screenshot-scene"}>
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Screenshot / 05"}</span>
            <h3>{"An empty canvas with an explicit next action"}</h3>
          </div>
          <a className={"product-screenshot"} href={"/assets/blank-canvas.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View blank canvas screenshot full-size (opens in a new tab)"}>
            <img src={"/assets/blank-canvas.png"} width={"1350"} height={"759"} loading={"lazy"} alt={"Empty storyboard canvas with an instruction to insert new elements, authoring controls, a left tool rail, and board tabs."} />
          </a>
          <figcaption>
            {"Product screenshot · Blank report state and authoring controls. "}
            <a className={"image-link"} href={"/assets/blank-canvas.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
        </figure>
        {"\n    "}
        <section id={"editor"} className={"editorial-section wrap walkthrough-step"}>
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"05.1 / Populated authoring state"}</span>
            <h2>
              {"Compose the report."}
              <br />
              <em>{"Keep its structure visible."}</em>
            </h2>
          </div>
          <div className={"section-copy"}>
            <ul className="case-key-points">
              <li>{"KPI cards, three charts, a slicer, and a table. The layer hierarchy exposes the report’s structure."}</li>
              <li>{"A composed authoring state—not a recording of how every element was created."}</li>
            </ul>
          </div>
        </section>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene"}>
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Screenshot / 06"}</span>
            <h3>{"The populated storyboard workspace"}</h3>
          </div>
          <a className={"product-screenshot"} href={"/assets/storyboard-editor.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View storyboard editor screenshot full-size (opens in a new tab)"}>
            <img src={"/assets/storyboard-editor.png"} width={"1390"} height={"782"} loading={"lazy"} alt={"Inforiver storyboard editor with a layer hierarchy on the left and a report containing KPI cards, bar charts, and a table."} />
          </a>
          <figcaption>
            {"Product screenshot · Cropped to the authoring workspace; browser and account chrome removed. "}
            <a className={"image-link"} href={"/assets/storyboard-editor.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
        </figure>
        {"\n    "}
        <section id={"presentation"} className={"editorial-section wrap"}>
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"06 / Related presentation work"}</span>
            <h2>
              {"Beyond authoring."}
              <br />
              <em>{"Communicating the story."}</em>
            </h2>
          </div>
          <div className={"section-copy"}>
            <p className={"large-copy"}>{"A composed report is the foundation for communicating insights in a deliberate sequence."}</p>
            <ul className="case-key-points">
              <li>
              {"My contributions extended to presentation mode, annotations, and slideshow interactions. That communication layer now has a "}
              <a className={"text-link"} href={"/presentation.html"}>
                {"dedicated Annotations, Comments & Presentation case "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              {"."}
            </li>
              <li>{"Six authoring/template screens—not presentation playback or slideshow evidence. No customer results are inferred."}</li>
            </ul>
          </div>
        </section>
        {"\n    "}
        <section id={"reflection"} className={"editorial-section wrap"}>
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"07 / Reflection"}</span>
            <h2>
              {"Keeping the structure"}
              <br />
              <em>{"and the story connected."}</em>
            </h2>
          </div>
          <div className={"section-copy"}>
            <p className={"large-copy"}>{"The authoring context matters as much as the final report."}</p>
            <ul className="case-key-points">
              <li>{"Keep the starting point, report structure, and element-to-data relationship visible."}</li>
            </ul>
            <details className={"evidence-note"}>
              <summary>{"Role, delivery & evidence"}</summary>
              <div className={"note"}>
                <p>
                  <strong>{"Role:"}</strong>
                  {" Storyboard enhancements, Text-to-Visual, and visualization templates; presentation contributions have their own case."}
                </p>
                <p>
                  <strong>{"Evidence:"}</strong>
                  {" six authoring and template screens. Store imagery is product context, not ownership of the catalogue."}
                </p>
                <p>
                  <strong>{"Review:"}</strong>
                  {" broader Analytics+ requirements, PM/developer/stakeholder walkthroughs, and implementation reviews. Feature-specific usability measurements and historical iteration records are not included."}
                </p>
              </div>
            </details>
          </div>
        </section>
        {"\n    "}
        </CaseDetails>
        <a className={"next-project wrap"} href={"/gantt.html"}>
          <span className={"eyebrow"}>{"Next feature"}</span>
          <span className={"next-title"}>{"Gantt for Power BI."}</span>
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
