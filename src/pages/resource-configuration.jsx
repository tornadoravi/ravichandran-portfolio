import React from 'react';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import ProjectIdentity from '../ProjectIdentity.jsx';
import { CaseDetails, CaseSnapshot, CaseContext } from '../CaseReview.jsx';

export default function ResourceConfigurationPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"}>
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/powertable.html#resource-features"}>{"← PowerTable / Gantt Resources"}</a>
          {"\n      "}
          <ProjectIdentity product="powertable" />
          <WorkspaceFeatureTabs workspace="resources" active="configuration" />
          {"\n      "}
          <h1>{"Resource Side Panel."}</h1>
          {"\n      "}
          <p className="case-summary">{"Four focused settings beside resource planning."}</p>
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
                <dd>{"Four configuration tab states"}</dd>
              </div>
              {"\n      "}
            </dl>
          </CaseContext>
          {"\n    "}
        </section>

        {"\n\n    "}
        <section id={"timeline"} className={"mapping-lead wrap"} aria-labelledby={"timeline-title"}>
          {"\n      "}
          <div className={"mapping-lead-copy"}>
            {"\n        "}
            <p className={"eyebrow"}>{"01 / Timeline"}</p>
            {"\n        "}
            <h2 id={"timeline-title"}>{"Start with the working context."}</h2>
            <p className="visual-takeaway">Keep capacity and styling separate from rules.</p>
            <details className="interface-notes">
              <summary>Screen notes</summary>
              {"\n        "}
              <p>
                <strong>{"Daily Capacity: 8 hrs."}</strong>
                {" Working Days groups the Work Week selector with Holidays & Exceptions. Color and Pattern provide separate styling controls."}
              </p>
              {"\n        "}
              <p>{"The shown state has Sunday and a +6 indicator, no selected exception dates, a Backward-Diagonal pattern, and mouse-wheel zoom switched Off."}</p>
              {"\n        "}
              <p>
                <strong>{"Configuration, not a conditional rule."}</strong>
                {" Edit Resource sets the view's scheduling and appearance options; the separate Format Rules experience defines conditions."}
              </p>
              {"\n        "}

              {"\n      "}
            </details>
            <a className={"text-link"} href={"#panel-walkthrough"}>
              {"Explore the other three tabs "}
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-preview"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-resource-config-timeline.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Timeline panel at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-resource-config-timeline.png"} width={"604"} height={"825"} fetchPriority={"high"} alt={"Edit Resource, Timeline tab: Work Week shows Sunday and +6, Daily Capacity is 8 hrs, Holidays and Exceptions has no selected dates, Pattern is Backward-Diagonal, mouse-wheel zoom is Off, and Reset to Default Styling is visible."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Design screen / Timeline panel crop. Resource names and workspace chrome excluded. "}
              <a className={"image-link"} href={"/assets/fabric-resource-config-timeline.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Original resolution ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n    "}
        </section>
        {"\n\n    "}
        <CaseSnapshot caseId="resourcePanel" />
        <CaseDetails>
        <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
          <a href={"#timeline"}>{"Timeline"}</a>
          <a href={"#milestone"}>{"Milestone"}</a>
          <a href={"#data-color"}>{"Data Color"}</a>
          <a href={"#label"}>{"Label"}</a>
          <a href={"#decisions"}>{"Design decisions"}</a>
          <a href={"#evidence"}>{"Evidence & sources"}</a>
        </nav>
        {"\n\n    "}
        <section id={"decisions"} className={"mapping-decisions wrap"} aria-labelledby={"decisions-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Design rationale / Interface analysis"}</p>
            <h2 id={"decisions-title"}>{"Separate what changes, retain the context."}</h2>
            <p>{"The original screens keep the schedule beside the editor. These focused crops expose the settings without repeating the full workspace."}</p>
          </div>
          {"\n      "}
          <ol className={"mapping-decision-list"}>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"01"}</span>
              <div>
                <h3>{"Group settings by the object being edited."}</h3>
                <p>{"Four tabs distinguish working context, milestone symbols, color, and labels. The trade-off is that settings across tabs cannot be compared at once."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02"}</span>
              <div>
                <h3>{"Separate task styling from resource summaries."}</h3>
                <p>{"Data Color and Label give bars and summary bars distinct controls. Their different meanings remain visible in the configuration hierarchy."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03"}</span>
              <div>
                <h3>{"Keep a consistent panel frame."}</h3>
                <p>{"Search, tab navigation, close, and Reset to Default Styling stay in place across the four states. Search results and reset behavior are not supplied."}</p>
              </div>
            </li>
            {"\n      "}
          </ol>
          {"\n    "}
        </section>
        {"\n\n    "}
        <details id={"panel-walkthrough"} className={"case-deep-dive"}>
          {"\n      "}
          <summary className={"wrap"}>
            <span>
              <strong>{"Explore Milestone, Data Color & Label"}</strong>
              <small>{"Three configuration tab states · original-resolution inspection"}</small>
            </span>
            <span className={"disclosure-symbol"} aria-hidden={"true"}><span>{"+"}</span></span>
          </summary>
          {"\n      "}
          <div className={"deep-dive-content"}>
            {"\n        "}
            <section id={"milestone"} className={"mapping-step wrap"} aria-labelledby={"milestone-title"}>
              {"\n          "}
              <div className={"mapping-step-copy"}>
                {"\n            "}
                <p className={"eyebrow"}>{"02 / Milestone"}</p>
                {"\n            "}
                <h2 id={"milestone-title"}>{"Keep the symbol and its fill distinct."}</h2>
                {"\n            "}
                <p>{"Shape displays a flag icon; Fill shows a purple swatch. This focused tab exposes two separate appearance choices without mixing them into timeline settings."}</p>
                {"\n            "}
                <p className={"fine-print"}>{"The shape picker and any upload interaction are not shown. This is a configuration state, not evidence of an applied milestone change."}</p>
                {"\n          "}
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                {"\n            "}
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-resource-config-milestone.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Milestone panel at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-resource-config-milestone.png"} width={"604"} height={"825"} loading={"lazy"} alt={"Edit Resource, Milestone tab selected: Shape shows a flag icon, Fill shows a purple swatch, and Reset to Default Styling remains at the panel footer."} />
                </a>
                {"\n            "}
                <figcaption>
                  {"Design screen / Milestone tab. "}
                  <a className={"image-link"} href={"/assets/fabric-resource-config-milestone.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
                {"\n          "}
              </figure>
              {"\n        "}
            </section>
            {"\n        "}
            <section id={"data-color"} className={"mapping-step wrap"} aria-labelledby={"data-color-title"}>
              {"\n          "}
              <div className={"mapping-step-copy"}>
                {"\n            "}
                <p className={"eyebrow"}>{"03 / Data Color"}</p>
                {"\n            "}
                <h2 id={"data-color-title"}>{"Differentiate tasks from summaries."}</h2>
                {"\n            "}
                <p>
                  {"Bars has Color by set to "}
                  <strong>{"All"}</strong>
                  {" with a blue Fill. Summary Bar has a separate brown Color swatch."}
                </p>
                {"\n            "}
                <p>{"Separate groups make the two styling targets explicit. This state does not show a column-based color configuration or a conditional threshold."}</p>
                {"\n            "}
                <p className={"fine-print"}>{"The supplied screens are tab states, not a before/after sequence or verified live-preview behavior."}</p>
                {"\n          "}
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                {"\n            "}
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-resource-config-data-color.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Data Color panel at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-resource-config-data-color.png"} width={"604"} height={"825"} loading={"lazy"} alt={"Edit Resource, Data Color tab: Bars group with Color by set to All and blue Fill; separate Summary Bar group with brown Color; Reset to Default Styling at the footer."} />
                </a>
                {"\n            "}
                <figcaption>
                  {"Design screen / Data Color tab. "}
                  <a className={"image-link"} href={"/assets/fabric-resource-config-data-color.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
                {"\n          "}
              </figure>
              {"\n        "}
            </section>
            {"\n        "}
            <section id={"label"} className={"mapping-step wrap"} aria-labelledby={"label-title"}>
              {"\n          "}
              <div className={"mapping-step-copy"}>
                {"\n            "}
                <p className={"eyebrow"}>{"04 / Label"}</p>
                {"\n            "}
                <h2 id={"label-title"}>{"Control the information on the bar."}</h2>
                {"\n            "}
                <p>
                  <strong>{"Enable Data Label"}</strong>
                  {" and "}
                  <strong>{"Adaptive label"}</strong>
                  {" are On. Based On is Auto; the bar-label font size is 12, with separate Text Color and Background Color controls."}
                </p>
                {"\n            "}
                <p>{"Summary Bar has its own font size of 12 and a black Text Color swatch. Task and summary labels have independent styling groups."}</p>
                {"\n            "}
                <p className={"fine-print"}>{"No responsive-label behavior, contrast result, or readability improvement is established by this still image."}</p>
                {"\n          "}
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                {"\n            "}
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-resource-config-label.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Label panel at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-resource-config-label.png"} width={"604"} height={"825"} loading={"lazy"} alt={"Edit Resource, Label tab: data labels On, Based On Auto, font size 12, text and background color controls, Adaptive label On; Summary Bar font size 12 with black text color."} />
                </a>
                {"\n            "}
                <figcaption>
                  {"Design screen / Label tab. "}
                  <a className={"image-link"} href={"/assets/fabric-resource-config-label.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
                {"\n          "}
              </figure>
              {"\n        "}
            </section>
            {"\n      "}
          </div>
          {"\n    "}
        </details>
        {"\n\n    "}
        <section id={"evidence"} className={"mapping-evidence wrap"} aria-labelledby={"evidence-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Official product context / Microsoft Learn"}</p>
            <h2 id={"evidence-title"}>{"Resource customization is documented."}</h2>
            <p>{"The Customize Resource Layout guide documents Timeline, Milestone, Data Color, and Label components, including daily capacity, working days, bar colors, and adaptive labels. Planning in Fabric establishes PowerTable's place in the suite. These are product references, not independent reviews of this design."}</p>
          </div>
          {"\n      "}
          <div className={"mapping-source-links"}>
            {"\n        "}
            <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-customize-resource-layout#customize-resource-layout-components"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Resource layout / Component settings "}
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
            <a className={"text-link"} href={"/gantt-configuration.html"}>
              {"Related workspace / Gantt Configuration "}
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
                {" this case belongs to the confirmed end-to-end resource Gantt UX/UI scope, with developer handoff and implementation review. It does not imply Microsoft employment or production-code ownership."}
              </p>
              <p>
                <strong>{"Evidence:"}</strong>
                {" four supplied Edit Resource tab states, cropped locally at native resolution. Resource names and account/workspace chrome are excluded; panel controls, spacing, colors, and values are unchanged. These are related settings, not mandatory workflow steps."}
              </p>
              <p>
                <strong>{"Configuration versus rules:"}</strong>
                {" the Edit Resource panel configures scheduling context and component appearance. Condition-based highlighting belongs to the separate Conditional Formatting case. No conditional-rule builder is shown in these four attachments."}
              </p>
              <p>
                <strong>{"Limits:"}</strong>
                {" no search result, expanded picker, changed setting, reset confirmation, persistence test, or before/after result is supplied. The Timeline state's +6 selections are not individually visible. Documentation also describes settings and actions not present in every supplied state; these are not added to the screenshots or attributed as unseen designs."}
              </p>
              <p>
                <strong>{"Validation:"}</strong>
                {" no independently verified feature-specific customer review, measured usability improvement, or business-impact metric is included. Documentation supports the capability, not release verification of this exact design. The portfolio is not an interactive settings application."}
              </p>
              <p>
                <strong>{"Handling:"}</strong>
                {" the originals are marked Confidential/Internal Only. Cropping is not publication clearance. Permission to publish these supplied screenshots has been confirmed."}
              </p>
              <p>
                <strong>{"Sources:"}</strong>
                {" Microsoft Learn Customize Resource Layout and Planning overview, reviewed November 10, 2026. The unchanged Fabric icon identifies the platform, not endorsement."}
              </p>
            </div>
          </details>
          {"\n    "}
        </section>
        {"\n    "}
        </CaseDetails>
        <a className={"next-project wrap review-next"} href={"/gantt-conditional-formatting.html"}>
          <span className={"eyebrow"}>{"Related resource feature / Condition-based highlighting"}</span>
          <span className={"next-title"}>
            {"Conditional"}
            <br />
            <em>{"Formatting."}</em>
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
