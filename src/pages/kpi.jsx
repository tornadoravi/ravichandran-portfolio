import React from 'react';

export default function KpiPage() {
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
          <p className={"eyebrow"}>{"05 / Inforiver Analytics+ feature"}</p>
          {"\n      "}
          <h1>
            {"KPI Presets."}
            <br />
            <em>{"Make the metric readable."}</em>
          </h1>
          {"\n      "}
          <p className={"case-summary"}>
            {"Reusable starting points for a clear headline metric,"}
            <br className={"desktop-break"} />
            {" a meaningful comparison, and a consistent report."}
          </p>
          {"\n      "}
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
        <section className={"case-brief wrap"} aria-label={"Case study at a glance"}>
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
            <p className={"flow-route-note"}>{"Simple and Variance are alternative preset families, not consecutive required steps. The Advanced tab is visible, but its contents were not supplied."}</p>
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
            <p className={"flow-caption"}>{"Illustrative user flow grounded in the supplied screens and official documentation, not a recorded task. The screens do not demonstrate data preparation or prove that a highlighted preset produced the adjacent canvas values."}</p>
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
            {"\n        "}
            <p className={"large-copy"}>{"Help report authors communicate performance without starting every KPI layout from a blank canvas."}</p>
            {"\n        "}
            <p>{"A KPI can communicate a headline number, a comparison, or a trend. Authors need a starting point that matches that intent; audiences need to distinguish the main value from its supporting information."}</p>
            {"\n        "}
            <p>{"The business objective is to make Analytics+ card authoring more approachable and support visual consistency across a report. A reusable preset provides a starting hierarchy, while the actual measures and reporting context determine what belongs in the card."}</p>
            {"\n      "}
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
            {"\n        "}
            <li>
              <span className={"small-index"}>{"01 / Pain point"}</span>
              <h3>{"A blank card has no hierarchy."}</h3>
              <p>{"Even a single number requires decisions about its label, alignment, spacing, and supporting elements."}</p>
              <p className={"solution-highlight"}>
                <strong>{"Solution highlight"}</strong>
                {"Offer Simple presets as recognizable starting arrangements for the main metric and its label."}
              </p>
              <a className={"text-link"} href={"#simple"}>
                {"See Simple presets "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02 / Pain point"}</span>
              <h3>{"A value needs comparison context."}</h3>
              <p>{"The headline alone does not communicate the size or direction of a difference from another measure."}</p>
              <p className={"solution-highlight"}>
                <strong>{"Solution highlight"}</strong>
                {"Group comparison-oriented layouts under Variance, with visible value, percentage, and directional treatments."}
              </p>
              <a className={"text-link"} href={"#variance"}>
                {"See Variance presets "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03 / Pain point"}</span>
              <h3>{"More information can compete for attention."}</h3>
              <p>{"Icons, comparisons, and trend graphics must support the metric rather than obscure which information matters first."}</p>
              <p className={"solution-highlight"}>
                <strong>{"Solution highlight"}</strong>
                {"Build reusable layout patterns with a deliberate relationship between the primary value and supporting context."}
              </p>
              <a className={"text-link"} href={"#library"}>
                {"See the preset library "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            {"\n      "}
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
            <p>{"My Analytics+ work included reusable KPI layouts, presets, and custom icons. This case focuses on the reusable visual structure: how a report author finds a starting arrangement and how that arrangement makes information readable."}</p>
            {"\n        "}
            <p>{"The supplied Power BI screens show the Card ribbon and KPI Preset pane beside the report canvas. Measures are already present in the field well. This is a preset-selection experience, not a data-preparation workflow."}</p>
            {"\n        "}
            <div className={"note"}>
              <span className={"eyebrow"}>{"Reading the evidence"}</span>
              <p>{"The preset tiles use sample values that differ from the adjacent report canvas. A highlighted tile is a visible selection state, not proof of an applied result or a matched before-and-after example. The shared Figma link required sign-in; this case uses the supplied images, not inspected prototype interactions."}</p>
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
            <p>
              {"The "}
              <a className={"text-link"} href={"#simple-screen"}>
                {"first supplied screen "}
                <span aria-hidden={"true"}>{"↑"}</span>
              </a>
              {" shows the Simple tab with centered and left-aligned arrangements, a side-accent treatment, and image placeholders. Each preview presents an alternative balance between the value and its label."}
            </p>
            {"\n        "}
            <p>{"The design intent is to make those arrangements recognizable before the author commits to further formatting. The screenshot documents the visible choices, not every available preset or its interaction behavior."}</p>
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
            <p>{"The Variance tab groups layouts that combine a headline metric with differences, percentages, arrows, and colored comparison blocks. The previews vary the position and emphasis of those elements while retaining a distinct main value."}</p>
            {"\n        "}
            <p>{"The selected canvas example and the preset thumbnails use different values and comparison counts. They illustrate the design space, not a demonstration that the selected thumbnail generated that exact report card."}</p>
            {"\n        "}
            <p>{"The Advanced tab is visible in both supplied screens. Its detailed contents and behavior are not shown, so this walkthrough does not invent an Advanced selection state."}</p>
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
            <p>{"The supplied design sheet brings together simple metric arrangements, icon placements, variance treatments, and compact trend examples. It illustrates how a common value-and-context hierarchy can extend across different card compositions."}</p>
            {"\n        "}
            <p>{"Across my broader KPI design work, the confirmed deliverables included 30+ KPI layouts, 20+ presets, and 70+ custom icons. Reusable KPI templates shipped. These are scope counts, not a count of the examples in this image or a claim that every pictured variation shipped."}</p>
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
            <p>{"The main design principle is to keep the metric recognizable while giving comparisons and supporting visuals a deliberate place. Separating Simple and Variance families makes the reporting intent part of browsing, rather than asking every author to rebuild the hierarchy."}</p>
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
            <p>{"Official documentation corroborates simple and variance presets. These are vendor references, not independent customer reviews or proof of personal design ownership."}</p>
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
        <a className={"next-project wrap"} href={"/analytics-plus.html#features"}>
          <span className={"eyebrow"}>{"Back to the product / Inforiver Analytics+"}</span>
          <span className={"next-title"}>
            {"Five feature stories."}
            <br />
            <em>{"One connected product."}</em>
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
