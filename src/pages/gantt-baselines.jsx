import React from 'react';
import CaseStoryLayout from '../CaseStoryLayout.jsx';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import ProjectIdentity from '../ProjectIdentity.jsx';
import { CaseDetails, CaseSnapshot, CaseContext } from '../CaseReview.jsx';

export default function GanttBaselinesPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"} className="design-review">
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/powertable.html#gantt-features"}>{"← PowerTable case study"}</a>
          {"\n      "}
          <ProjectIdentity product="powertable" />
          <WorkspaceFeatureTabs active="baselines" />
          {"\n      "}
          <h1>{"Gantt Baselines."}</h1>
          {"\n      "}
          <p className="case-summary">{"Compare the current schedule with a saved reference."}</p>
          {"\n      "}
          <CaseContext role="End-to-end Gantt UX/UI">
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
                <dd>{"Two comparison design states"}</dd>
              </div>
              {"\n      "}
            </dl>
          </CaseContext>
          {"\n    "}
        </section>
        <CaseStoryLayout caseId="baselines">

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
            <p className="visual-takeaway">Compare two selections. Keep management separate.</p>
            <details className="interface-notes">
              <summary>Screen notes</summary>
              {"\n        "}
              <ul className="case-key-points">
              <li>{"Set Baseline groups Create New, Manage, and Compare. The open Compare submenu lists Current Data and three named baselines."}</li>
              <li>
                <strong>{"Current Data + Baseline 1"}</strong>
                {" are selected. “Select upto 2 options to compare” states a limit of two total selections, not two baselines plus current data."}
              </li>
            </ul>
              {"\n        "}
              <p className={"fine-print"}>{"Create New is visible, but its configuration dialog is not supplied."}</p>
              {"\n      "}
            </details>

          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-preview"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-baseline-compare-menu.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View baseline comparison menu at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-baseline-compare-menu.png"} width={"452"} height={"281"} fetchPriority={"high"} alt={"Set Baseline menu with Create New, Manage, and Compare; submenu states up to two options, with Current Data and Baseline 1 checked and Baseline 2 and 3 unchecked."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Design screen / Comparison menu detail, cropped from the first screen. "}
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
        <CaseSnapshot caseId="baselines" />
        <CaseDetails caseId="baselines">
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
            <p>{"Blue task bars and light-grey comparison bars share one timescale. Dependencies and progress remain visible."}</p>
            <p className={"fine-print"}>{"Another crop of the first screen, not an additional state, a calculated variance, or a measured outcome."}</p>
          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-screen"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-baseline-timeline.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt comparison timeline at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-baseline-timeline.png"} width={"918"} height={"692"} loading={"lazy"} alt={"Gantt timeline detail with blue task bars, light-grey comparison bars, progress percentages, dependency connectors, and a shared January-to-March time scale."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Design screen / Timeline detail from the same comparison screen. Task names and workspace chrome are excluded. "}
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
            <ul className="case-key-points">
              <li>{"Baseline 1–3 and row actions sit in a side panel, beside the Gantt canvas."}</li>
              <li>{"Menu = comparison selection. Panel = saved baselines. Creation, permissions, action results, and confirmations are not supplied."}</li>
            </ul>
            {"\n        "}
            <p className={"fine-print"}>{"Names and controls are retained. Author metadata rows have been redacted—not empty product states."}</p>
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
              {"Design screen / Manager panel crop. Author metadata redacted; control labels unchanged. "}
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
                <p>{"The submenu keeps schedule context. Trade-off: nested navigation and limited explanation space."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02"}</span>
              <div>
                <h3>{"Make the comparison limit explicit."}</h3>
                <p>{"Two selections total. The supplied state does not show third-selection prevention or feedback."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03"}</span>
              <div>
                <h3>{"Keep baseline names consistent across surfaces."}</h3>
                <p>{"Baseline 1–3 connects menu and manager. More descriptive naming remains a future review question—not a tested improvement."}</p>
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
            <p>{"The checked guides do not document these Set Baseline controls or the two-selection rule. Those details come from supplied designs."}</p>
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
        </CaseDetails>
        {"\n  "}
        </CaseStoryLayout>
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
