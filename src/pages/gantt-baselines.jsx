import React from 'react';

export default function GanttBaselinesPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"}>
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/powertable.html#baseline-comparison"}>{"← PowerTable case study"}</a>
          {"\n      "}
          <p className={"eyebrow platform-pill"}>
            <img src={"/assets/microsoft-fabric.svg"} width={"24"} height={"24"} alt={""} />
            {"PowerTable / Gantt / Microsoft Fabric"}
          </p>
          {"\n      "}
          <h1>
            {"Gantt Baselines."}
            <br />
            {"Configure & compare."}
          </h1>
          {"\n      "}
          <p className={"case-summary"}>
            {"Keep a reference plan in view as the schedule changes."}
            <br className={"desktop-break"} />
            {" Choose the comparison on the timeline; manage saved baselines separately."}
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
              <dt>{"My role"}</dt>
              <dd>{"End-to-end Gantt UX/UI"}</dd>
            </div>
            {"\n        "}
            <div>
              <dt>{"Delivery scope"}</dt>
              <dd>{"Developer handoff & implementation review"}</dd>
            </div>
            {"\n        "}
            <div>
              <dt>{"Evidence"}</dt>
              <dd>{"Two supplied design states"}</dd>
            </div>
            {"\n      "}
          </dl>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"overview"} className={"mapping-lead wrap"} aria-labelledby={"baseline-overview-title"}>
          {"\n      "}
          <div className={"mapping-lead-copy"}>
            {"\n        "}
            <p className={"eyebrow"}>{"01 / Comparison selection"}</p>
            {"\n        "}
            <h2 id={"baseline-overview-title"}>
              {"Choose what to compare."}
              <br />
              {"Keep the choice bounded."}
            </h2>
            {"\n        "}
            <p>{"Set Baseline groups Create New, Manage, and Compare. The open Compare submenu lists Current Data and three named baselines."}</p>
            {"\n        "}
            <p>
              <strong>{"Current Data + Baseline 1"}</strong>
              {" are selected. “Select upto 2 options to compare” states a limit of two total selections, not two baselines plus current data."}
            </p>
            {"\n        "}
            <p className={"fine-print"}>{"Create New is visible, but its configuration dialog is not supplied."}</p>
            {"\n      "}
          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-preview"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-baseline-compare-menu.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View baseline comparison menu at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-baseline-compare-menu.png"} width={"452"} height={"281"} fetchPriority={"high"} alt={"Set Baseline menu with Create New, Manage, and Compare; submenu states up to two options, with Current Data and Baseline 1 checked and Baseline 2 and 3 unchecked."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Supplied design / Comparison menu detail, cropped from the first screen. "}
              <a className={"image-link"} href={"/assets/fabric-baseline-compare-menu.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Original resolution ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n    "}
        </section>
        {"\n\n    "}
        <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
          <a href={"#overview"}>{"Selection"}</a>
          <a href={"#comparison"}>{"Timeline comparison"}</a>
          <a href={"#management"}>{"Manage baselines"}</a>
          <a href={"#decisions"}>{"Design decisions"}</a>
          <a href={"#evidence"}>{"Evidence & sources"}</a>
        </nav>
        {"\n\n    "}
        <section id={"comparison"} className={"mapping-evidence wrap"} aria-labelledby={"comparison-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"02 / Same screen · Timeline detail"}</p>
            <h2 id={"comparison-title"}>{"Read the comparison in schedule context."}</h2>
            <p>{"Blue task bars and light-grey comparison bars share the same month and week scale. Dependencies and progress labels remain visible, rather than moving the comparison to a separate report."}</p>
            <p className={"fine-print"}>{"This is another crop of the first supplied screen, not an additional state. Bar positions are visual evidence, not a calculated variance or a measured project outcome."}</p>
          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-screen"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-baseline-timeline.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt comparison timeline at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-baseline-timeline.png"} width={"918"} height={"692"} loading={"lazy"} alt={"Gantt timeline detail with blue task bars, light-grey comparison bars, progress percentages, dependency connectors, and a shared January-to-March time scale."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Supplied design / Timeline detail from the same comparison screen. Task names and workspace chrome are excluded. "}
              <a className={"image-link"} href={"/assets/fabric-baseline-timeline.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Original resolution ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"management"} className={"mapping-step baseline-manager wrap"} aria-labelledby={"management-title"}>
          {"\n      "}
          <div className={"mapping-step-copy"}>
            {"\n        "}
            <p className={"eyebrow"}>{"03 / Second supplied state · Manage Baselines"}</p>
            {"\n        "}
            <h2 id={"management-title"}>{"Give saved baselines a dedicated place."}</h2>
            {"\n        "}
            <p>{"The side panel lists Baseline 1, Baseline 2, and Baseline 3 with row-level action icons. The original screen keeps the Gantt canvas visible beside it."}</p>
            {"\n        "}
            <p>{"Management and comparison have different surfaces: the menu chooses the active comparison; the panel presents the saved baselines. Screens behind Create New or the action icons, permission rules, and confirmation states are not supplied."}</p>
            {"\n        "}
            <p className={"fine-print"}>{"The panel crop preserves baseline names and controls. Author metadata rows have been redacted for privacy; they are not empty product states."}</p>
            {"\n      "}
          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-screen"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-baseline-manager.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View privacy-redacted baseline manager at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-baseline-manager.png"} width={"350"} height={"360"} loading={"lazy"} alt={"Manage Baselines panel with Baseline 1, Baseline 2, and Baseline 3, each with action icons; author metadata rows are redacted for privacy."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Supplied design / Manager panel crop. Author metadata redacted; control labels unchanged. "}
              <a className={"image-link"} href={"/assets/fabric-baseline-manager.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Original resolution ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"decisions"} className={"mapping-decisions wrap"} aria-labelledby={"decisions-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Design rationale / Reading the supplied interfaces"}</p>
            <h2 id={"decisions-title"}>{"Separate the choice from the administration."}</h2>
            <p>{"The design challenge is to compare a schedule without making every baseline-management action part of that reading task."}</p>
          </div>
          {"\n      "}
          <ol className={"mapping-decision-list"}>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"01"}</span>
              <div>
                <h3>{"Keep comparison selection close to the timeline."}</h3>
                <p>{"A compact submenu retains the schedule context. The trade-off is nested navigation and a small surface for explaining the selection rule."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02"}</span>
              <div>
                <h3>{"Make the comparison limit explicit."}</h3>
                <p>{"The two-option instruction sets a clear boundary before selection. The supplied state does not show how a third selection is prevented or explained."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03"}</span>
              <div>
                <h3>{"Keep baseline names consistent across surfaces."}</h3>
                <p>{"Baseline 1–3 appear in both the menu and manager. Matching names connect the saved references to the comparison choice; more descriptive names would be a future design question, not a tested improvement."}</p>
              </div>
            </li>
            {"\n      "}
          </ol>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"evidence"} className={"mapping-evidence wrap"} aria-labelledby={"evidence-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Evidence & product context"}</p>
            <h2 id={"evidence-title"}>{"PowerTable context, without overstating the feature."}</h2>
            <p>{"Microsoft Learn places PowerTable within Planning in Fabric and documents its Gantt timeline, task bars, progress, and dependencies. The checked pages do not document these Set Baseline controls or the two-selection rule; those details are described from the supplied designs only."}</p>
          </div>
          {"\n      "}
          <div className={"mapping-source-links"}>
            {"\n        "}
            <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-concept-gantt"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Gantt layout in PowerTable "}
              <span aria-hidden={"true"}>{"↗"}</span>
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
            {"\n        "}
            <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/overview"} target={"_blank"} rel={"noopener noreferrer"}>
              {"What is planning in Fabric? "}
              <span aria-hidden={"true"}>{"↗"}</span>
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
            {"\n        "}
            <a className={"text-link"} href={"/gantt-conditional-formatting.html"}>
              {"Related case / Gantt Resources — Conditional Formatting "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
            {"\n        "}
            <a className={"text-link"} href={"/gantt-configuration.html"}>
              {"Related case / Gantt Configuration — Side Panel "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
            {"\n      "}
          </div>
          {"\n      "}
          <details className={"evidence-note"}>
            <summary>{"Scope, delivery & source limitations"}</summary>
            <div className={"note"}>
              <p>
                <strong>{"My contribution:"}</strong>
                {" baseline comparison sits within the confirmed end-to-end PowerTable Gantt design scope, including developer handoff and implementation review. This does not imply Microsoft employment or production-code ownership."}
              </p>
              <p>
                <strong>{"Evidence:"}</strong>
                {" two supplied screenshot states, presented as three focused crops. The first provides the comparison menu and timeline. The second provides the manager panel, with author rows explicitly redacted. Other product controls, selections, and bar positions are unchanged."}
              </p>
              <p>
                <strong>{"Limits:"}</strong>
                {" no creation form, baseline storage behavior, restore behavior, third-selection feedback, confirmation dialog, permission state, or historical iteration is supplied. This is a screenshot-led design case, not an interactive planning tool."}
              </p>
              <p>
                <strong>{"Validation:"}</strong>
                {" no independently verified baseline-specific product review or release status is included. No usability result, schedule improvement, adoption figure, or business-impact metric is claimed. Resource Gantt baseline planning remains a separate exploration."}
              </p>
              <p>
                <strong>{"Handling:"}</strong>
                {" the original attachments are marked Confidential/Internal Only. Cropping and redaction are not publication clearance. Permission to publish these supplied screenshots has been confirmed."}
              </p>
              <p>
                <strong>{"Sources:"}</strong>
                {" Microsoft Learn overview and PowerTable Gantt concept pages reviewed November 10, 2026. The unchanged Fabric icon identifies the platform, not an endorsement."}
              </p>
            </div>
          </details>
          {"\n    "}
        </section>
        {"\n    "}
        <a className={"next-project wrap review-next"} href={"/column-mapping.html"}>
          <span className={"eyebrow"}>{"Related PowerTable feature"}</span>
          <span className={"next-title"}>
            {"Column Mapping"}
            <br />
            <em>{"& Configuration."}</em>
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
