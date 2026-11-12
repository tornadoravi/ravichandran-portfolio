import React from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import { CaseDetails, CaseSnapshot, CaseContext, CaseFlow } from '../CaseReview.jsx';

export default function KpiPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"} className="design-review">
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/analytics-plus.html#features"}>{"← Inforiver Analytics+ features"}</a>
          {"\n      "}
          <ProjectIdentity product="analytics" />
          <WorkspaceFeatureTabs workspace="analytics" active="kpi" />
          {"\n      "}
          <h1>{"KPI Presets."}</h1>
          {"\n      "}
          <p className="case-summary">{"Reusable starting points for metrics and comparisons."}</p>
          {"\n      "}
          <CaseContext role="Reusable KPI templates shipped">
            <dl className={"metadata"}>
              {"\n        "}
              <div>
                <dt>{"Company"}</dt>
                <dd>{"Lumel Technologies"}</dd>
              </div>
              {"\n        "}
              <div>
                <dt>{"Role"}</dt>
                <dd>{"Product Designer"}</dd>
              </div>
              {"\n        "}
              <div>
                <dt>{"Product context"}</dt>
                <dd>{"Analytics+ · Microsoft Power BI"}</dd>
              </div>
              {"\n        "}
              <div>
                <dt>{"Case focus"}</dt>
                <dd>{"KPI layouts & reusable presets"}</dd>
              </div>
              {"\n      "}
            </dl>
          </CaseContext>
          {"\n    "}
        </section>

        {"\n\n    "}
        <figure id={"simple-screen"} className={"detail-figure case-evidence wrap screenshot-scene"}>
          {"\n      "}
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Design screen / 01"}</span>
            <h3>{"Choose a starting point for the metric"}</h3>
          </div>
          {"\n      "}
          <a className={"product-screenshot native-shot"} href={"/assets/kpi-simple.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Simple KPI presets full-size (opens in a new tab)"}>
            <img src={"/assets/kpi-simple.png"} width={"2000"} height={"1063"} fetchPriority={"high"} alt={"Analytics+ Card ribbon in Power BI with the KPI Preset panel open on Simple, several metric layout previews, and a small AC card on the report canvas."} />
          </a>
          {"\n      "}
          <figcaption>
            {"Design screen · The Simple tab shows alternative arrangements of labels, values, accents, and image placeholders. "}
            <a className={"image-link"} href={"/assets/kpi-simple.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
          {"\n    "}
        </figure>
        {"\n\n    "}
        <CaseSnapshot caseId="kpi" />
        <CaseDetails caseId="kpi">
        <section className={"case-brief wrap"} aria-label={"Detailed contribution summary"}>
          {"\n      "}
          <div>
            <h2>{"Design challenge"}</h2>
            <p>{"Give report authors reusable KPI starting points while keeping the main value, comparison, and supporting context readable."}</p>
          </div>
          {"\n      "}
          <div>
            <h2>{"My contribution"}</h2>
            <p>{"Reusable KPI layouts, presets, and custom icons within my Analytics+ design work. Reusable KPI templates shipped."}</p>
          </div>
          {"\n      "}
          <div>
            <h2>{"Evidence & status"}</h2>
            <p>{"Two supplied Power BI design screens and one preset-library sheet. Preview numbers illustrate layouts, not measured customer outcomes."}</p>
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <details id={"user-flow"} className={"flow-disclosure wrap"}>
          {"\n      "}
          <summary>{"Explore the KPI preset user flow"}</summary>
          {"\n      "}
          <nav className={"flow-overview"} aria-label={"KPI Presets user flow"}>
            {"\n        "}
            <a className={"flow-stage"} href={"#overview"}>
              <span className={"flow-number"}>{"01"}</span>
              <span>
                <strong>{"Identify the metric context"}</strong>
                <small>{"Start with measures already available to the Card visual."}</small>
              </span>
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
            {"\n        "}
            <a className={"flow-stage"} href={"#simple"}>
              <span className={"flow-number"}>{"Alternative / A"}</span>
              <span>
                <strong>{"Browse Simple presets"}</strong>
                <small>{"Choose a hierarchy for the main metric and its label."}</small>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            {"\n        "}
            <a className={"flow-stage"} href={"#variance"}>
              <span className={"flow-number"}>{"Alternative / B"}</span>
              <span>
                <strong>{"Browse Variance presets"}</strong>
                <small>{"Consider a layout that makes comparisons visible."}</small>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            {"\n        "}
            <p className={"flow-route-note"}>{"Simple and Variance are alternative preset families, not consecutive required steps. Advanced contents are not supplied."}</p>
            {"\n        "}
            <a className={"flow-stage"} href={"#library"}>
              <span className={"flow-number"}>{"02"}</span>
              <span>
                <strong>{"Review the information hierarchy"}</strong>
                <small>{"Check the value, label, comparison, and supporting visual context."}</small>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            {"\n        "}
            <p className={"flow-caption"}>{"Illustrative flow—not a recorded task. No data-preparation or matched preset-to-canvas result is demonstrated."}</p>
            {"\n      "}
          </nav>
          {"\n    "}
        </details>
        {"\n\n    "}
        <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
          <a href={"#business-case"}>{"Business case"}</a>
          <a href={"#solutions"}>{"Solutions"}</a>
          <a href={"#concept"}>{"Concept"}</a>
          <a href={"#overview"}>{"Overview"}</a>
          <a href={"#simple"}>{"Simple presets"}</a>
          <a href={"#variance"}>{"Variance presets"}</a>
          <a href={"#library"}>{"Preset library"}</a>
          <a href={"#reflection"}>{"Reflection"}</a>
          <a href={"#references"}>{"References"}</a>
        </nav>
        {"\n\n    "}
        <section id={"business-case"} className={"editorial-section wrap"} aria-label={"Business case"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"Business case"}</span>
            <h2>
              {"Make reusable design"}
              <br />
              <em>{"part of report authoring."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            <p className={"large-copy"}>{"Help report authors communicate performance without starting every KPI layout from a blank canvas."}</p>
            <CaseFlow steps={[["Intent","Headline, comparison, or trend"],["Preset family","Simple or Variance"],["Reading order","Main value before supporting context"]]} />
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"solutions"} className={"solution-section wrap"} aria-labelledby={"solutions-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Design rationale"}</p>
            <h2 id={"solutions-title"}>{"Pain points & solution highlights."}</h2>
            <p>{"Authoring challenges grounded in the supplied interface states and confirmed design scope, not findings from a formal user study."}</p>
          </div>
          {"\n      "}
          <ol className={"solution-grid"} role={"list"}>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"01 / Pain point"}</span><h3>{"A blank card has no hierarchy."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Simple presets establish the value and label."}</p>
              <a className={"text-link"} href={"#simple"}>
                {"See Simple presets "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"02 / Pain point"}</span><h3>{"A value needs comparison context."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Variance presets add differences, percentages, and directional cues."}</p>
              <a className={"text-link"} href={"#variance"}>
                {"See Variance presets "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"03 / Pain point"}</span><h3>{"More information can compete for attention."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Keep the main value first; give supporting context its own place."}</p>
              <a className={"text-link"} href={"#library"}>
                {"See the preset library "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
          </ol>
          {"\n    "}
        </section>
        {"\n\n    "}
        <figure id={"concept"} className={"concept-model wrap"} aria-labelledby={"concept-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Illustrative concept model"}</p>
            <h2 id={"concept-title"}>{"Intent. Starting point. Reading order."}</h2>
          </div>
          {"\n      "}
          <div className={"concept-map"}>
            {"\n        "}
            <a className={"concept-node"} href={"#overview"}>
              <span className={"small-index"}>{"Reporting intent"}</span>
              <strong>{"What needs explaining?"}</strong>
              <span>{"A headline measure, a comparison, or supporting trend context."}</span>
            </a>
            {"\n        "}
            <a className={"concept-node"} href={"#simple"}>
              <span className={"small-index"}>{"Reusable structure"}</span>
              <strong>{"Choose a preset family"}</strong>
              <span>{"Start with a simple metric or a comparison-oriented layout."}</span>
            </a>
            {"\n        "}
            <a className={"concept-node"} href={"#library"}>
              <span className={"small-index"}>{"Information hierarchy"}</span>
              <strong>{"Read value + context"}</strong>
              <span>{"Keep the main metric distinct from labels, variances, and supporting graphics."}</span>
            </a>
            {"\n      "}
          </div>
          {"\n      "}
          <figcaption>{"Original explanatory diagram, not a product screenshot or an interactive KPI builder. It explains the design concept; the supplied images below document actual layout examples."}</figcaption>
          {"\n    "}
        </figure>
        {"\n\n    "}
        <section id={"overview"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"01 / Overview"}</span>
            <h2>
              {"A small surface."}
              <br />
              <em>{"Several design decisions."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"A KPI card needs to communicate what the number is and how to interpret it."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"My scope: reusable KPI layouts, presets, and custom icons. Help authors recognize a useful starting arrangement."}</li>
              <li>{"Measures are already mapped. This is preset selection—not data preparation."}</li>
            </ul>
            {"\n        "}
            <div className={"note"}>
              <span className={"eyebrow"}>{"Reading the evidence"}</span>
              <p>{"Preset tiles use sample values that differ from the adjacent report canvas. Selection is not an applied result. Figma required sign-in; prototype interactions were not inspected."}</p>
            </div>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"simple"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"02 / Simple presets"}</span>
            <h2>
              {"Establish the value."}
              <br />
              <em>{"Give it a clear label."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"A clear starting hierarchy matters even when the card contains one metric."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>
              <a className={"text-link"} href={"#simple-screen"}>
                {"Simple screen "}
                <span aria-hidden={"true"}>{"↑"}</span>
              </a>
              {": centered or left-aligned layouts, side accents, and image placeholders."}
            </li>
              <li>{"Recognize the layout before formatting. The screenshot shows choices—not every preset or its interaction behavior."}</li>
            </ul>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"variance"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"03 / Variance presets"}</span>
            <h2>
              {"Keep the headline."}
              <br />
              <em>{"Add the comparison."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"Comparison information should explain the main value without competing with it."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"Variance adds differences, percentages, arrows, and comparison blocks while keeping the main value distinct."}</li>
              <li>{"Thumbnails and canvas use different values/comparison counts—not a matched before-and-after example."}</li>
              <li>{"Advanced is visible. Its detailed contents and behavior are not shown."}</li>
            </ul>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene"}>
          {"\n      "}
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Design screen / 02"}</span>
            <h3>{"Make comparisons visible in the preset browser"}</h3>
          </div>
          {"\n      "}
          <a className={"product-screenshot native-shot"} href={"/assets/kpi-variance.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Variance KPI presets full-size (opens in a new tab)"}>
            <img src={"/assets/kpi-variance.png"} width={"2000"} height={"1046"} loading={"lazy"} alt={"Analytics+ KPI Preset pane on the Variance tab with metric, percentage, arrow, and colored-block previews beside a report canvas and populated Power BI field well."} />
          </a>
          {"\n      "}
          <figcaption>
            {"Design screen · Variance-family browsing. Tile sample values and report values differ; this is not a matched before-and-after result. "}
            <a className={"image-link"} href={"/assets/kpi-variance.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
          {"\n    "}
        </figure>
        {"\n\n    "}
        <section id={"library"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"04 / Preset library"}</span>
            <h2>
              {"A family of patterns."}
              <br />
              <em>{"Not one fixed card."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"Reuse the visual logic while allowing different reporting needs."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"One reading hierarchy across metric cards, icons, variances, and compact trends."}</li>
              <li>{"Reusable templates shipped. Scope counts—not a count of the examples in this image or proof every pictured variation shipped."}</li>
            </ul>
            {"\n        "}
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
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene"}>
          {"\n      "}
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Design sheet / 03"}</span>
            <h3>{"The reusable KPI layout library"}</h3>
          </div>
          {"\n      "}
          <a className={"product-screenshot native-shot"} href={"/assets/kpi-preset-library.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View KPI preset design library full-size (opens in a new tab)"}>
            <img src={"/assets/kpi-preset-library.png"} width={"1996"} height={"211"} loading={"lazy"} alt={"KPI design sheet with simple metric cards, icon arrangements, variance indicators, colored comparison blocks, and compact sparkline and area-chart examples."} />
          </a>
          {"\n      "}
          <figcaption>
            {"Design sheet · Preserved at its original 1996 × 211 resolution. Use Actual size in the inspector to read the small cards; no missing detail has been redrawn. "}
            <a className={"image-link"} href={"/assets/kpi-preset-library.png"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
          {"\n    "}
        </figure>
        {"\n\n    "}
        <section id={"reflection"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"05 / Reflection"}</span>
            <h2>
              {"Consistency is more"}
              <br />
              <em>{"than matching colors."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"A reusable preset needs a repeatable reading order, not only a repeatable appearance."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"Simple establishes the metric. Variance adds context. Both preserve a repeatable reading order."}</li>
            </ul>
            {"\n        "}
            <details className={"evidence-note"}>
              <summary>{"Role, delivery & evidence"}</summary>
              <div className={"note"}>
                <p>
                  <strong>{"Role:"}</strong>
                  {" reusable KPI layouts, presets, icons, and comparison hierarchy. Reusable templates shipped."}
                </p>
                <p>
                  <strong>{"Evidence:"}</strong>
                  {" Simple and Variance design screens and the layout library. Deliverable counts describe design scope; preview values illustrate layouts."}
                </p>
                <p>
                  <strong>{"Review:"}</strong>
                  {" broader Analytics+ requirements walkthroughs and implementation-fidelity review. Preset-specific usability measurements and historical iteration records are not included."}
                </p>
              </div>
            </details>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"references"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"06 / References"}</span>
            <h2>
              {"Verified capabilities."}
              <br />
              <em>{"Clear evidence boundaries."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"Simple/Variance presets are documented. These are vendor references, not independent customer reviews or proof of personal design ownership."}</li>
            </ul>
            {"\n        "}
            <div className={"note"}>
              <span className={"eyebrow"}>{"Official feature references"}</span>
              {"\n          "}
              <p>
                <a href={"https://docs.inforiver.com/analytics+/working-with-analytics+/1.-navigating-the-analytics+-toolbar/card-toolbar"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"Analytics+ Card toolbar documentation ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
                {" describes built-in simple and integrated variance presets, alongside broader card-authoring capabilities."}
              </p>
              {"\n          "}
              <p>
                <a href={"https://docs.inforiver.com/analytics+/working-with-analytics+/4.-cards/4.2.-quick-options-cards/kpi-customizations"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"KPI customization documentation ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
                {" describes preset selection through the KPI floating toolbar. That is a documented alternative access point, not an interaction shown in these screenshots."}
              </p>
              {"\n          "}
              <p>
                <a href={"https://store-ap.inforiver.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"Analytics+ template store ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
                {" provides catalogue context; it is not evidence that these exact presets are store listings."}
              </p>
              {"\n        "}
            </div>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        </CaseDetails>
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
