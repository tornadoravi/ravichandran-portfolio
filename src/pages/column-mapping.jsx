import React from 'react';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import ProjectIdentity from '../ProjectIdentity.jsx';
import { CaseDetails, CaseSnapshot, CaseContext } from '../CaseReview.jsx';

export default function ColumnMappingPage() {
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
          <WorkspaceFeatureTabs active="mapping" />
          {"\n      "}
          <h1>{"Column Mapping & Configuration."}</h1>
          {"\n      "}
          <p className="case-summary">{"Connect tasks, time, resources, and costs."}</p>
          {"\n      "}
          <CaseContext role="End-to-end Gantt & resource UX/UI">
            <dl className={"metadata"}>
              {"\n        "}
              <div>
                <dt>{"Company"}</dt>
                <dd>{"Lumel Technologies"}</dd>
              </div>
              {"\n        "}
              <div>
                <dt>{"My role"}</dt>
                <dd>{"End-to-end Gantt & resource UX/UI"}</dd>
              </div>
              {"\n        "}
              <div>
                <dt>{"Delivery scope"}</dt>
                <dd>{"Developer handoff & implementation review"}</dd>
              </div>
              {"\n        "}
              <div>
                <dt>{"Evidence"}</dt>
                <dd>{"Five configuration design states"}</dd>
              </div>
              {"\n      "}
            </dl>
          </CaseContext>
          {"\n    "}
        </section>

        {"\n\n    "}
        <section id={"overview"} className={"mapping-lead wrap"} aria-labelledby={"mapping-overview-title"}>
          {"\n      "}
          <div className={"mapping-lead-copy"}>
            {"\n        "}
            <p className={"eyebrow"}>{"The configuration model"}</p>
            {"\n        "}
            <h2 id={"mapping-overview-title"}>
              {"One surface."}
              <br />
              {"Distinct data roles."}
            </h2>
            <p className="visual-takeaway">Task ID links time entries to the task.</p>
            <details className="interface-notes">
              <summary>Screen notes</summary>
              {"\n        "}
              <ul className="case-key-points">
              <li>{"Layout navigation stays on the left. Task, Time Entries, Resource, and Cost organize the mapping decisions across the top."}</li>
              <li>{"Here, a time-entry table connects logged hours to the task through a shared Task ID."}</li>
            </ul>
              {"\n        "}

              {"\n      "}
            </details>
            <a className={"text-link"} href={"#mapping-walkthrough"}>
              {"Explore all five screens "}
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-preview"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-mapping-time-entries.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View time-entry configuration crop at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-mapping-time-entries.png"} width={"780"} height={"588"} fetchPriority={"high"} alt={"Gantt Time Entries configuration with Direct Time Entry selected, Time Entries table, Task_Id, Hours_Logged, and enabled Save."} />
            </a>
            {"\n        "}
            <figcaption>
              {"My mapping UX/UI / Time Entries. Design screen, dialog-only crop. "}
              <a className={"image-link"} href={"/assets/fabric-mapping-time-entries.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Original resolution ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n    "}
        </section>
        {"\n\n    "}
        <CaseSnapshot caseId="mapping" />
        <CaseDetails caseId="mapping">
        <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
          <a href={"#overview"}>{"Overview"}</a>
          <a href={"#decisions"}>{"Design decisions"}</a>
          <a href={"#task-mapping"}>{"Task"}</a>
          <a href={"#time-mapping"}>{"Time entries"}</a>
          <a href={"#resource-mapping"}>{"Resource"}</a>
          <a href={"#cost-mapping"}>{"Cost"}</a>
          <a href={"#resource-layout"}>{"Resource layout"}</a>
          <a href={"#evidence"}>{"Evidence & sources"}</a>
        </nav>
        {"\n\n    "}
        <section id={"decisions"} className={"mapping-decisions wrap"} aria-labelledby={"decisions-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Design rationale / Reading the supplied interfaces"}</p>
            <h2 id={"decisions-title"}>{"Structure first. Dependencies made visible."}</h2>
            <p>{"The challenge: source columns alone do not explain how a planning view should interpret dates, effort, people, or costs."}</p>
          </div>
          {"\n      "}
          <ol className={"mapping-decision-list"}>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"01"}</span>
              <div>
                <h3>{"Separate the layout from the data role."}</h3>
                <p>{"Keep the layout visible; split mapping into focused tabs. Trade-off: navigation between domains."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02"}</span>
              <div>
                <h3>{"Expose the relationship, not just the field."}</h3>
                <p>{"Name both ID sources: current table and resource table. Clearer relationships cost extra label space."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03"}</span>
              <div>
                <h3>{"Explain a blocked state where it occurs."}</h3>
                <p>{"Explain the dependency: resource mapping enables Standard Cost and Usage Cost."}</p>
              </div>
            </li>
            {"\n      "}
          </ol>
          {"\n    "}
        </section>
        {"\n\n    "}
        <details id={"mapping-walkthrough"} className={"case-deep-dive"}>
          {"\n      "}
          <summary className={"wrap"}>
            <span>
              <strong>{"Explore the five configuration screens"}</strong>
              <small>{"Task structure, time entries, resource relationships, cost dependencies, and the Resource layout"}</small>
            </span>
            <span className={"disclosure-symbol"} aria-hidden={"true"}><span>{"+"}</span></span>
          </summary>
          {"\n      "}
          <div className={"deep-dive-content"}>
            {"\n        "}
            <section id={"task-mapping"} className={"mapping-step wrap"} aria-labelledby={"task-title"}>
              {"\n          "}
              <div className={"mapping-step-copy"}>
                <p className={"eyebrow"}>{"01 / Gantt · Task"}</p>
                <h2 id={"task-title"}>{"Establish task identity and timing."}</h2>
                <ul className="case-key-points">
              <li>{"Core mappings: Start Date, End Date/Duration, Task ID. Hierarchy alternatives: Parent ID or Multiple Column Hierarchy."}</li>
              <li>{"The selected Parent ID state pairs Parent_Id with Task_Name. Milestone and Progress are also visible."}</li>
            </ul>
                <p className={"fine-print"}>{"Native-size image; no enlargement. The shared-configuration banner is not proof of cross-view synchronization."}</p>
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen mapping-screen--small"}>
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-mapping-task.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View task mapping crop at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-mapping-task.png"} width={"312"} height={"235"} loading={"lazy"} alt={"Gantt Task configuration showing start and end dates, Task_Id, Parent ID hierarchy, Parent_Id, Task_Name, Milestone, Progress, Reset, and Save."} />
                </a>
                <figcaption>
                  {"Design screen / Task. Native 312 × 235 dialog crop. "}
                  <a className={"image-link"} href={"/assets/fabric-mapping-task.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
              </figure>
              {"\n        "}
            </section>
            {"\n\n        "}
            <section id={"time-mapping"} className={"mapping-step wrap"} aria-labelledby={"time-title"}>
              {"\n          "}
              <div className={"mapping-step-copy"}>
                <p className={"eyebrow"}>{"02 / Gantt · Time Entries"}</p>
                <h2 id={"time-title"}>{"Connect recorded effort to the task."}</h2>
                <ul className="case-key-points">
              <li>{"Direct entry: Time Entries → Task_Id → Hours_Logged. Time entry with Approvals is an alternative; its setup is not shown."}</li>
              <li>{"Save is enabled in this state. The approvals route is visible as an option, but its configuration is not shown."}</li>
            </ul>
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-mapping-time-entries.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View time-entry mapping crop at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-mapping-time-entries.png"} width={"780"} height={"588"} loading={"lazy"} alt={"Time Entries tab with Direct Time Entry selected and required Time Entry, Task ID column, and Actual Effort mappings filled."} />
                </a>
                <figcaption>
                  {"Design screen / Time Entries. "}
                  <a className={"image-link"} href={"/assets/fabric-mapping-time-entries.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
              </figure>
              {"\n        "}
            </section>
            {"\n\n        "}
            <section id={"resource-mapping"} className={"mapping-step wrap"} aria-labelledby={"resource-title"}>
              {"\n          "}
              <div className={"mapping-step-copy"}>
                <p className={"eyebrow"}>{"03 / Gantt · Resource"}</p>
                <h2 id={"resource-title"}>{"Make both sides of the relationship explicit."}</h2>
                <ul className="case-key-points">
              <li>{"Resource table: Employees. Match Assigned To in the current table with the resource table’s ID."}</li>
              <li>{"Resource ID and display mappings are incomplete; Save is disabled. A visible state, not a tested validation sequence."}</li>
            </ul>
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-mapping-resource.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View resource mapping crop at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-mapping-resource.png"} width={"780"} height={"588"} loading={"lazy"} alt={"Gantt Resource tab with Employees selected, Assigned To mapped from the current table, unfilled resource-table ID and display column, and disabled Save."} />
                </a>
                <figcaption>
                  {"Design screen / Resource relationship, incomplete state. "}
                  <a className={"image-link"} href={"/assets/fabric-mapping-resource.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
              </figure>
              {"\n        "}
            </section>
            {"\n\n        "}
            <section id={"cost-mapping"} className={"mapping-step wrap"} aria-labelledby={"cost-title"}>
              {"\n          "}
              <div className={"mapping-step-copy"}>
                <p className={"eyebrow"}>{"04 / Gantt · Cost"}</p>
                <h2 id={"cost-title"}>{"Name the prerequisite before asking for costs."}</h2>
                <ul className="case-key-points">
              <li>{"Resource mapping first → Standard Cost and Usage Cost become available. The banner explains the blocked selectors."}</li>
              <li>{"Fixed Cost is separate. This screen does not establish calculation formulas, currency handling, or post-mapping behavior."}</li>
            </ul>
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-mapping-cost.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View cost mapping crop at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-mapping-cost.png"} width={"778"} height={"586"} loading={"lazy"} alt={"Cost tab with a Resource mapping prerequisite banner, disabled Standard Cost and Usage Cost selectors, a separate Fixed Cost selector, and disabled Save."} />
                </a>
                <figcaption>
                  {"Design screen / Cost prerequisite state. "}
                  <a className={"image-link"} href={"/assets/fabric-mapping-cost.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
              </figure>
              {"\n        "}
            </section>
            {"\n\n        "}
            <section id={"resource-layout"} className={"mapping-step wrap"} aria-labelledby={"resource-layout-title"}>
              {"\n          "}
              <div className={"mapping-step-copy"}>
                <p className={"eyebrow"}>{"05 / Related view · Resource layout"}</p>
                <h2 id={"resource-layout-title"}>{"Keep the configuration language consistent across layouts."}</h2>
                <ul className="case-key-points">
              <li>{"Related Resource layout: Assigned To, dates, Estimated_hours, and filters. Task remains the active mapping tab."}</li>
              <li>{"Additional Mapping Options stays collapsed. This related layout is not a mandatory fifth step in Gantt setup."}</li>
            </ul>
              </div>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-mapping-resource-layout.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Resource layout mapping crop at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-mapping-resource-layout.png"} width={"779"} height={"586"} loading={"lazy"} alt={"Resource layout selected with Task tab active, Assigned To resource, start and end dates, Estimated_hours, filter columns, and collapsed Additional Mapping Options."} />
                </a>
                <figcaption>
                  {"Design screen / Resource layout, Task tab. "}
                  <a className={"image-link"} href={"/assets/fabric-mapping-resource-layout.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
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
            <p className={"eyebrow"}>{"Evidence & product context"}</p>
            <h2 id={"evidence-title"}>{"Documented capability. My design evidence, separately."}</h2>
            <p>{"Microsoft Learn documents required task/date fields and optional mappings. It supplies product context, not validation of these design states."}</p>
          </div>
          {"\n      "}
          <div className={"mapping-source-links"}>
            {"\n        "}
            <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-configure-gantt-layout"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Configure Gantt layout "}
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
                {" end-to-end Gantt and resource UX/UI within the PowerTable work, including developer handoff and implementation review. This is not a claim of Microsoft employment, suite-wide ownership, or production-code ownership."}
              </p>
              <p>
                <strong>{"Evidence:"}</strong>
                {" five supplied design states, cropped locally to their dialogs without repainting controls or changing values. The selected preview repeats the Time Entries state. The numbered walkthrough is a reading order, not a recorded task sequence or historical design iteration."}
              </p>
              <p>
                <strong>{"Status:"}</strong>
                {" the public Gantt guide supports core field mapping. It does not independently verify every Time Entries, Resource, or Cost state shown here, their release status, or their runtime behavior. No usability study, reduced setup time, or customer-impact metric is claimed."}
              </p>
              <p>
                <strong>{"Handling:"}</strong>
                {" the original attachments carry an internal-only marking. Dialog crops exclude surrounding workspace data; cropping is not publication clearance. Permission to publish these supplied screenshots has been confirmed."}
              </p>
              <p>
                <strong>{"Source review:"}</strong>
                {" official Microsoft Learn pages reviewed November 10, 2026. The Microsoft Fabric icon identifies the platform and is not an endorsement."}
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
