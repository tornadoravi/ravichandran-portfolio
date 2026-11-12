import React from 'react';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import ProjectIdentity from '../ProjectIdentity.jsx';
import { CaseDetails, CaseSnapshot, CaseContext } from '../CaseReview.jsx';

export default function GanttConfigurationPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"} className="design-review">
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/powertable.html#gantt-features"}>{"← PowerTable / Gantt"}</a>
          {"\n      "}
          <ProjectIdentity product="powertable" />
          <WorkspaceFeatureTabs active="configuration" />
          {"\n      "}
          <h1>{"Gantt Side Panel."}</h1>
          {"\n      "}
          <p className="case-summary">{"Five focused tabs, without leaving the schedule."}</p>
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
                <dd>{"Five configuration tab states"}</dd>
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
            <h2 id={"timeline-title"}>{"Define the working context first."}</h2>
            <p className="visual-takeaway">Separate working time, dependencies, and visual styling.</p>
            <details className="interface-notes">
              <summary>Screen notes</summary>
              {"\n        "}
              <ul className="case-key-points">
              <li>
                <strong>{"Daily Capacity: 8 hrs."}</strong>
                {" Working Days groups Work Week and Holidays & Exceptions. Color and Pattern provide separate controls for the timeline treatment."}
              </li>
              <li>{"Shown: Sunday +6, no exception dates, Backward-Diagonal pattern, mouse-wheel zoom Off."}</li>
              <li>
                <strong>{"Five tabs, one editor."}</strong>
                {" Edit Gantt includes a dedicated Dependency tab alongside Timeline, Milestone, Data Color, and Label. This is separate from field mapping and the Resource Configuration panel."}
              </li>
            </ul>
              {"\n        "}

              {"\n      "}
            </details>
            <a className={"text-link"} href={"#panel-walkthrough"}>
              {"Explore the other four tabs "}
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-preview"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-gantt-config-timeline.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt Timeline panel at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-gantt-config-timeline.png"} width={"602"} height={"823"} fetchPriority={"high"} alt={"Edit Gantt, Timeline tab: Sunday and +6 in Work Week, Daily Capacity 8 hrs, no selected exception dates, Backward-Diagonal pattern, mouse-wheel zoom Off, and Reset to Default Styling."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Design screen / Timeline panel crop. Task data and workspace chrome excluded. "}
              <a className={"image-link"} href={"/assets/fabric-gantt-config-timeline.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Original resolution ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n    "}
        </section>
        {"\n\n    "}
        <CaseSnapshot caseId="ganttPanel" />
        <CaseDetails caseId="ganttPanel">
        <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
          <a href={"#timeline"}>{"Timeline"}</a>
          <a href={"#milestone"}>{"Milestone"}</a>
          <a href={"#dependency"}>{"Dependency"}</a>
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
            <h2 id={"decisions-title"}>{"Separate scheduling behavior from appearance."}</h2>
            <p>{"Task grid and timeline stay beside the panel. These are design interpretations—not usability-study findings."}</p>
          </div>
          {"\n      "}
          <ol className={"mapping-decision-list"}>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"01"}</span>
              <div>
                <h3>{"Give dependencies their own context."}</h3>
                <p>{"Dependency tab: connector styling, Auto Scheduling On, Successor Off. Runtime effects are not demonstrated."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02"}</span>
              <div>
                <h3>{"Keep a consistent editing frame."}</h3>
                <p>{"Search, five tabs, close, and Reset stay fixed. Focused contexts reduce clutter but hide other tabs’ settings."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03"}</span>
              <div>
                <h3>{"Distinguish the rule from the rendering."}</h3>
                <p>{"Solid Type and Stroke 2 describe connector appearance, not its scheduling relationship."}</p>
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
              <strong>{"Explore Milestone, Dependency, Data Color & Label"}</strong>
              <small>{"Four configuration tab states · original-resolution inspection"}</small>
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
                <h2 id={"milestone-title"}>{"Make the event marker configurable."}</h2>
                {"\n            "}
                <ul className="case-key-points">
              <li>{"Under Default, Shape displays a flag and Fill shows a purple swatch. Symbol and color have independent controls."}</li>
            </ul>
                {"\n            "}
                <p className={"fine-print"}>{"“Default” is a group label, not evidence that these exact values are factory defaults. Shape picker and applied changes are not shown."}</p>
                {"\n          "}
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                {"\n            "}
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-gantt-config-milestone.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt Milestone panel at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-gantt-config-milestone.png"} width={"602"} height={"823"} loading={"lazy"} alt={"Edit Gantt, Milestone tab selected: Default group, Shape with a flag icon, purple Fill, and Reset to Default Styling at the footer."} />
                </a>
                {"\n            "}
                <figcaption>
                  {"Design screen / Milestone tab. "}
                  <a className={"image-link"} href={"/assets/fabric-gantt-config-milestone.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
                {"\n          "}
              </figure>
              {"\n        "}
            </section>
            {"\n        "}
            <section id={"dependency"} className={"mapping-step wrap"} aria-labelledby={"dependency-title"}>
              {"\n          "}
              <div className={"mapping-step-copy"}>
                {"\n            "}
                <p className={"eyebrow"}>{"03 / Dependency"}</p>
                {"\n            "}
                <h2 id={"dependency-title"}>{"Keep the connector and schedule controls distinct."}</h2>
                {"\n            "}
                <ul className="case-key-points">
              <li>
                  {"Connector shows a dark Color, Type set to "}
                  <strong>{"solid"}</strong>
                  {", and Stroke "}
                  <strong>{"2"}</strong>
                  {". Auto Scheduling is "}
                  <strong>{"On"}</strong>
                  {"; Successor is "}
                  <strong>{"Off"}</strong>
                  {", each in a separate group."}
                </li>
              <li>{"Settings are not a demonstration of rescheduling. Successor Off does not establish that the tasks have no successors."}</li>
            </ul>
                {"\n            "}
                <p className={"fine-print"}>{"No changed dates, dependency-type selection, cycle handling, or scheduling-conflict state is supplied."}</p>
                {"\n          "}
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                {"\n            "}
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-gantt-config-dependency.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt Dependency panel at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-gantt-config-dependency.png"} width={"602"} height={"823"} loading={"lazy"} alt={"Edit Gantt, Dependency tab: Connector dark Color, Type solid, Stroke 2; Auto Scheduling On and Successor Off in separate groups; Reset to Default Styling visible."} />
                </a>
                {"\n            "}
                <figcaption>
                  {"Design screen / Dependency tab. "}
                  <a className={"image-link"} href={"/assets/fabric-gantt-config-dependency.png"} target={"_blank"} rel={"noopener noreferrer"}>
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
                <p className={"eyebrow"}>{"04 / Data Color"}</p>
                {"\n            "}
                <h2 id={"data-color-title"}>{"Set the task-bar treatment."}</h2>
                {"\n            "}
                <ul className="case-key-points">
              <li>
                  {"Bars has Color by set to "}
                  <strong>{"All"}</strong>
                  {" with a blue Fill. This supplied tab does not show the separate Summary Bar controls found in the Resource Configuration case."}
                </li>
            </ul>
                {"\n            "}
                <p className={"fine-print"}>{"Alternative modes and thresholds are not shown. Tab states are not a before/after sequence or verified live preview."}</p>
                {"\n          "}
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                {"\n            "}
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-gantt-config-data-color.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt Data Color panel at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-gantt-config-data-color.png"} width={"602"} height={"823"} loading={"lazy"} alt={"Edit Gantt, Data Color tab selected: Bars group with Color by All and blue Fill, and Reset to Default Styling at the footer."} />
                </a>
                {"\n            "}
                <figcaption>
                  {"Design screen / Data Color tab. "}
                  <a className={"image-link"} href={"/assets/fabric-gantt-config-data-color.png"} target={"_blank"} rel={"noopener noreferrer"}>
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
                <p className={"eyebrow"}>{"05 / Label"}</p>
                {"\n            "}
                <h2 id={"label-title"}>{"Control what the task bar says."}</h2>
                {"\n            "}
                <ul className="case-key-points">
              <li>
                  {"Enable Data Label is "}
                  <strong>{"On"}</strong>
                  {", Based On is "}
                  <strong>{"Auto"}</strong>
                  {", and Font Size is "}
                  <strong>{"12"}</strong>
                  {". Text Color shows a dark swatch; Background Color has a separate control."}
                </li>
              <li>{"Adaptive label and summary-label controls are not shown. Resource-specific controls are not carried into this case."}</li>
            </ul>
                {"\n            "}
                <p className={"fine-print"}>{"The still image does not establish responsive-label behavior, text contrast, or a readability improvement."}</p>
                {"\n          "}
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                {"\n            "}
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-gantt-config-label.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt Label panel at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-gantt-config-label.png"} width={"602"} height={"823"} loading={"lazy"} alt={"Edit Gantt, Label tab: Enable Data Label On, Based On Auto, Font Size 12, dark Text Color swatch, separate Background Color, and Reset to Default Styling."} />
                </a>
                {"\n            "}
                <figcaption>
                  {"Design screen / Label tab. "}
                  <a className={"image-link"} href={"/assets/fabric-gantt-config-label.png"} target={"_blank"} rel={"noopener noreferrer"}>
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
            <h2 id={"evidence-title"}>{"Gantt context, with clear evidence boundaries."}</h2>
            <p>{"Microsoft Learn documents Gantt capabilities—not the exact Edit Gantt panel or its Auto Scheduling and Successor behavior."}</p>
          </div>
          {"\n      "}
          <div className={"mapping-source-links"}>
            {"\n        "}
            <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-concept-gantt"} target={"_blank"} rel={"noopener noreferrer"}>
              {"PowerTable / Gantt concepts "}
              <span aria-hidden={"true"}>{"↗"}</span>
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
            {"\n        "}
            <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/overview"} target={"_blank"} rel={"noopener noreferrer"}>
              {"What is planning in Fabric? "}
              <span aria-hidden={"true"}>{"↗"}</span>
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
            {"\n      "}
          </div>
          {"\n      "}
          <details className={"evidence-note"}>
            <summary>{"Scope, delivery & source limitations"}</summary>
            <div className={"note"}>
              <p>
                <strong>{"My contribution:"}</strong>
                {" this case belongs to the confirmed end-to-end PowerTable Gantt UX/UI scope, with developer handoff and implementation review. It does not imply Microsoft employment or production-code ownership."}
              </p>
              <p>
                <strong>{"Evidence:"}</strong>
                {" five supplied Edit Gantt tab states, in attachment order, cropped locally at native resolution. Task names, task data, account controls, and workspace chrome are excluded; panel controls, spacing, colors, and values are unchanged. The tabs are related settings, not mandatory workflow steps."}
              </p>
              <p>
                <strong>{"Limits:"}</strong>
                {" no search results, expanded pickers, changed settings, reset confirmation, persistence test, automatic rescheduling result, or before/after evidence is supplied. The Timeline state's +6 selections are not individually visible. No business-impact metric or usability result is claimed."}
              </p>
              <p>
                <strong>{"Product distinction:"}</strong>
                {" this is Gantt, not Gantt Resources. Resource-only summary and adaptive-label controls are not inferred. Resource layout and Intelligence Gantt documentation are not substituted for evidence of this exact panel."}
              </p>
              <p>
                <strong>{"Public references:"}</strong>
                {" no exact-panel public guide or independently verified feature-specific customer review was verified in this pass. General Gantt documentation is linked as context, not a customer endorsement or release verification. The portfolio is not an interactive scheduling tool."}
              </p>
              <p>
                <strong>{"Handling:"}</strong>
                {" the originals are marked Confidential/Internal Only. Cropping is not publication clearance. Permission to publish these supplied screenshots has been confirmed."}
              </p>
              <p>
                <strong>{"Sources:"}</strong>
                {" Microsoft Learn PowerTable Gantt concepts and Planning overview, reviewed November 10, 2026. The unchanged Fabric icon identifies the platform, not endorsement."}
              </p>
            </div>
          </details>
          {"\n    "}
        </section>
        {"\n    "}
        </CaseDetails>
        <a className={"next-project wrap review-next"} href={"/resource-configuration.html"}>
          <span className={"eyebrow"}>{"Related resource feature"}</span>
          <span className={"next-title"}>{"Resource Configuration."}</span>
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
