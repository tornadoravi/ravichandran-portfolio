import React from 'react';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import ProjectIdentity from '../ProjectIdentity.jsx';
import { CaseDetails, CaseSnapshot, CaseContext } from '../CaseReview.jsx';

export default function GanttConditionalFormattingPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"} className="design-review">
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/powertable.html#resource-features"}>{"← PowerTable case study"}</a>
          {"\n      "}
          <ProjectIdentity product="powertable" />
          <WorkspaceFeatureTabs workspace="resources" active="formatting" />
          {"\n      "}
          <h1>{"Conditional Formatting."}</h1>
          {"\n      "}
          <p className="case-summary">{"Define the condition, target, and style separately."}</p>
          {"\n      "}
          <CaseContext role="End-to-end resource Gantt UX/UI">
            <dl className={"metadata"}>
              {"\n        "}
              <div>
                <dt>{"Company"}</dt>
                <dd>{"Lumel Technologies"}</dd>
              </div>
              {"\n        "}
              <div>
                <dt>{"My role"}</dt>
                <dd>{"End-to-end resource Gantt UX/UI"}</dd>
              </div>
              {"\n        "}
              <div>
                <dt>{"Delivery scope"}</dt>
                <dd>{"Developer handoff & implementation review"}</dd>
              </div>
              {"\n        "}
              <div>
                <dt>{"Evidence"}</dt>
                <dd>{"One rule-editing design state"}</dd>
              </div>
              {"\n      "}
            </dl>
          </CaseContext>
          {"\n    "}
        </section>

        {"\n\n    "}
        <section id={"overview"} className={"mapping-lead wrap"} aria-labelledby={"formatting-overview-title"}>
          {"\n      "}
          <div className={"mapping-lead-copy"}>
            {"\n        "}
            <p className={"eyebrow"}>{"01 / Create Formatting Rule"}</p>
            {"\n        "}
            <h2 id={"formatting-overview-title"}>
              {"A workload signal."}
              <br />
              {"Not just a color choice."}
            </h2>
            <p className="visual-takeaway">Positive hours identify scheduled work, not overload.</p>
            <details className="interface-notes">
              <summary>Screen notes</summary>
              {"\n        "}
              <ul className="case-key-points">
              <li>
                <strong>{"Schedule Hours > 0"}</strong>
                {" is the displayed condition. Rule 1 separates the qualifying metric from its targets and appearance."}
              </li>
              <li>
                {"Milestone Icon, Fill, Bar Fill, and Data Label have individual controls. The shown fill swatches are orange; the data-label swatch is black. "}
                <strong>{"Discard and Apply"}</strong>
                {" remain separate actions."}
              </li>
            </ul>
              {"\n        "}
              <p className={"fine-print"}>{"A positive-hours threshold identifies scheduled work, not over-allocation against capacity."}</p>
              {"\n        "}
              <p className={"fine-print"}>{"Impacts On: Bar +2. Apply To: Bar and a truncated label. Hidden selections are not inferred."}</p>
              {"\n      "}
            </details>

          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-preview"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-conditional-rule.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View conditional formatting editor at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-conditional-rule.png"} width={"612"} height={"823"} fetchPriority={"high"} alt={"Create Formatting Rule panel: Rule 1, Rules (If Conditions), target selectors, Schedule Hours greater than 0, Add Condition, Milestone Icon, Fill, Bar Fill, Data Label, Discard, and Apply."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Design screen / Rule editor crop. Product controls and values are unchanged. "}
              <a className={"image-link"} href={"/assets/fabric-conditional-rule.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Original resolution ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n    "}
        </section>
        {"\n\n    "}
        <CaseSnapshot caseId="formatting" />
        <CaseDetails caseId="formatting">
        <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
          <a href={"#overview"}>{"Rule editor"}</a>
          <a href={"#timeline"}>{"Resource context"}</a>
          <a href={"#decisions"}>{"Design decisions"}</a>
          <a href={"#evidence"}>{"Evidence & sources"}</a>
        </nav>
        {"\n\n    "}
        <section id={"timeline"} className={"mapping-evidence wrap"} aria-labelledby={"timeline-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"02 / Same supplied state · Resource context"}</p>
            <h2 id={"timeline-title"}>{"Keep scheduled hours beside the assignments."}</h2>
            <p>
              {"The toolbar identifies "}
              <strong>{"Summary Bar — Scheduled Hours"}</strong>
              {" at the Quarter timescale. Below it, brown summary bars and blue task bars share the timeline. Resource names are excluded from these crops."}
            </p>
            <p>
              <strong>{"This is not an after-Apply result."}</strong>
              {" The open editor does not establish that its orange rule produced the timeline's existing colors."}
            </p>
          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-screen formatting-context"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-conditional-summary.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View resource summary metric at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-conditional-summary.png"} width={"445"} height={"39"} loading={"lazy"} alt={"Resource layout toolbar showing Summary Bar - Scheduled Hours and the Quarter timescale."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Design screen / Metric and timescale detail from the same editing state. "}
              <a className={"image-link"} href={"/assets/fabric-conditional-summary.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Original resolution ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n      "}
          <figure className={"detail-figure mapping-screen"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-conditional-timeline.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt timeline context at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-conditional-timeline.png"} width={"1076"} height={"732"} loading={"lazy"} alt={"Timeline detail from the same editing state, with a December-to-March time scale, blue task bars with IDs, and brown summary bars with numeric labels; resource names are excluded."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Design screen / Timeline-only crop from the same screenshot, not a second state. Resource names and workspace chrome are excluded. "}
              <a className={"image-link"} href={"/assets/fabric-conditional-timeline.png"} target={"_blank"} rel={"noopener noreferrer"}>
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
            <p className={"eyebrow"}>{"Design rationale / Reading the supplied interface"}</p>
            <h2 id={"decisions-title"}>{"Make the workload signal explainable."}</h2>
            <p>{"Keep the metric, target, and visual treatment distinct. These are design trade-offs, not measured usability findings."}</p>
          </div>
          {"\n      "}
          <ol className={"mapping-decision-list"}>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"01"}</span>
              <div>
                <h3>{"Make the threshold readable."}</h3>
                <p>{"Field → operator → value. Schedule Hours > 0 means scheduled work—not overload; no capacity criterion is shown."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02"}</span>
              <div>
                <h3>{"Where does it apply?"}</h3>
                <p>{"Set scope before the rule. Trade-off: compact controls hide selections and truncate labels."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03"}</span>
              <div>
                <h3>{"Keep values legible alongside color."}</h3>
                <p>{"Keep numeric labels beside the fill. Separate label styling is visible; contrast and non-color accessibility still require validation."}</p>
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
            <p className={"eyebrow"}>{"Evidence & official product context"}</p>
            <h2 id={"evidence-title"}>{"Resource formatting is documented."}</h2>
            <p>
              {"Microsoft Learn's "}
              <strong>{"Customize resource layout"}</strong>
              {" guide documents formatting rules for task bars, summary bars, and milestones, including summary-metric conditions and Bar / Data Label targets. This supports the feature context—not a claim that every control or result in this design has been independently tested."}
            </p>
          </div>
          {"\n      "}
          <div className={"mapping-source-links"}>
            {"\n        "}
            <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-customize-resource-layout#create-formatting-rules"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Resource layout / Formatting rules "}
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
            <a className={"text-link"} href={"/gantt-backlog.html"}>
              {"Related case / Gantt Backlog "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
            {"\n        "}
            <a className={"text-link"} href={"/resource-configuration.html"}>
              {"Related case / Resource Configuration — Side Panel "}
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
                {" this case sits within the confirmed end-to-end PowerTable Gantt and resource UX/UI scope, including developer handoff and implementation review. It does not imply Microsoft employment or ownership of all production code."}
              </p>
              <p>
                <strong>{"Evidence:"}</strong>
                {" one supplied editing state, presented as three native-resolution crops: rule editor, resource metric toolbar, and timeline. They are not a before/after sequence. Surrounding resource names, account controls, and workspace chrome are excluded; no interface controls, colors, or values have been repainted."}
              </p>
              <p>
                <strong>{"Limits:"}</strong>
                {" hidden target selections, rule precedence, invalid-input feedback, save persistence, Apply/Discard behavior, and post-application results are not established by this screenshot. This is a screenshot-led design case, not an interactive rule engine."}
              </p>
              <p>
                <strong>{"Documentation versus design:"}</strong>
                {" the official Resource layout guide also describes AND/OR conditions and rule management; those states are not supplied here. Its Scheduled Hours > 8 example is separate from this design's Schedule Hours > 0 condition. Documented component choices do not reveal the selections hidden behind this screen's +2 indicator or truncated label."}
              </p>
              <p>
                <strong>{"Validation:"}</strong>
                {" no independently verified feature-specific review, usability finding, or business-impact metric is included. Public documentation supports the capability, not independent testing or the release status of this exact design. General grid formatting, Intelligence charts, and Analytics+ Gantt are not substituted as evidence."}
              </p>
              <p>
                <strong>{"Handling:"}</strong>
                {" the original attachment is marked Confidential/Internal Only. Cropping is not publication clearance. Permission to publish these supplied screenshots has been confirmed."}
              </p>
              <p>
                <strong>{"Sources:"}</strong>
                {" Microsoft Learn overview and Customize Resource Layout guide reviewed November 10, 2026. These are official product documentation, not customer reviews. The unchanged Fabric icon identifies the platform, not endorsement."}
              </p>
            </div>
          </details>
          {"\n    "}
        </section>
        {"\n    "}
        </CaseDetails>
        <a className={"next-project wrap review-next"} href={"/gantt-baselines.html"}>
          <span className={"eyebrow"}>{"Related PowerTable feature"}</span>
          <span className={"next-title"}>{"Gantt Baselines."}</span>
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
