import React from 'react';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';

export default function GanttBacklogPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"}>
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/powertable.html#gantt-features"}>{"← PowerTable case study"}</a>
          {"\n      "}
          <p className={"eyebrow platform-pill"}>
            <img src={"/assets/microsoft-fabric.svg"} width={"24"} height={"24"} alt={""} />
            {"PowerTable / Gantt / Microsoft Fabric"}
          </p>
          <WorkspaceFeatureTabs active="backlog" />
          {"\n      "}
          <h1>
            {"Gantt Backlog."}
            <br />
            {"Keep unscheduled work in view."}
          </h1>
          {"\n      "}
          <p className={"case-summary"}>
            {"Make an empty panel actionable, then keep the task list manageable."}
            <br className={"desktop-break"} />
            {" A dedicated backlog beside the Gantt schedule."}
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
              <dd>{"Two backlog design states"}</dd>
            </div>
            {"\n      "}
          </dl>
          {"\n    "}
        </section>
        {"\n\n    "}
        <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
          <a href={"#empty-state"}>{"Empty state"}</a>
          <a href={"#backlog-list"}>{"Task list"}</a>
          <a href={"#pending-changes"}>{"Pending changes"}</a>
          <a href={"#decisions"}>{"Design decisions"}</a>
          <a href={"#evidence"}>{"Evidence & sources"}</a>
        </nav>
        {"\n\n    "}
        <section className={"mapping-evidence wrap"} aria-labelledby={"backlog-states-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Design evidence / Two panel states"}</p>
            <h2 id={"backlog-states-title"}>{"A clear start. A manageable list."}</h2>
            <p>{"The empty state explains the next action. The populated state introduces search and row controls. These are supplied states, not a recorded creation sequence."}</p>
          </div>
          {"\n      "}
          <div className={"backlog-state-grid"}>
            {"\n        "}
            <section id={"empty-state"} className={"backlog-state"} aria-labelledby={"empty-state-title"}>
              {"\n          "}
              <p className={"eyebrow"}>{"01 / Empty backlog"}</p>
              {"\n          "}
              <h3 id={"empty-state-title"}>
                {"Explain the absence."}
                <br />
                {"Offer the next step."}
              </h3>
              {"\n          "}
              <p>
                {"“No Task Available” is paired with an instruction and "}
                <strong>{"+ Add Task"}</strong>
                {". The panel gives an explicit starting point instead of leaving the empty area unexplained."}
              </p>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                {"\n            "}
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-backlog-empty.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View empty backlog panel at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-backlog-empty.png"} width={"350"} height={"550"} fetchPriority={"high"} alt={"Backlog Tasks panel with an empty-state illustration, No Task Available message, instruction to create a backlog task, and + Add Task button."} />
                </a>
                {"\n            "}
                <figcaption>
                  {"Design screen / Empty panel crop from the first screen. "}
                  <a className={"image-link"} href={"/assets/fabric-backlog-empty.png"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Original resolution ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </figcaption>
                {"\n          "}
              </figure>
              {"\n        "}
            </section>
            {"\n        "}
            <section id={"backlog-list"} className={"backlog-state"} aria-labelledby={"backlog-list-title"}>
              {"\n          "}
              <p className={"eyebrow"}>{"02 / Populated backlog"}</p>
              {"\n          "}
              <h3 id={"backlog-list-title"}>
                {"Keep the list compact."}
                <br />
                {"Keep actions nearby."}
              </h3>
              {"\n          "}
              <p>
                <strong>{"Backlog List (1)"}</strong>
                {" contains T0011, with edit and delete icons. Search and "}
                <strong>{"+ New Task"}</strong>
                {" remain above the list; the task form itself is not supplied."}
              </p>
              {"\n          "}
              <figure className={"detail-figure mapping-screen"}>
                {"\n            "}
                <a className={"product-screenshot native-shot"} href={"/assets/fabric-backlog-list.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View populated backlog panel at original resolution (opens in a new tab)"}>
                  <img src={"/assets/fabric-backlog-list.png"} width={"350"} height={"550"} fetchPriority={"high"} alt={"Backlog Tasks panel with Search, Backlog List (1), + New Task, and a T0011 row with edit and delete icons."} />
                </a>
                {"\n            "}
                <figcaption>
                  {"Design screen / One-item panel crop from the second screen. "}
                  <a className={"image-link"} href={"/assets/fabric-backlog-list.png"} target={"_blank"} rel={"noopener noreferrer"}>
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
        </section>
        {"\n\n    "}
        <section id={"pending-changes"} className={"mapping-step backlog-pending wrap"} aria-labelledby={"pending-title"}>
          {"\n      "}
          <div className={"mapping-step-copy"}>
            {"\n        "}
            <p className={"eyebrow"}>{"03 / Same second state · Change controls"}</p>
            {"\n        "}
            <h2 id={"pending-title"}>{"A visible item is not proof of a saved record."}</h2>
            {"\n        "}
            <p>
              {"The second screen also shows "}
              <strong>{"Preview Changes (1)"}</strong>
              {", Save to Database, and Discard Changes. This crop preserves that distinction between the current view and a save action."}
            </p>
            {"\n        "}
            <p className={"fine-print"}>{"No save confirmation or database result is supplied. The change count does not establish which fields changed or prove that T0011 was persisted."}</p>
            {"\n      "}
          </div>
          {"\n      "}
          <figure className={"detail-figure mapping-screen"}>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/fabric-backlog-pending.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View pending-change controls at original resolution (opens in a new tab)"}>
              <img src={"/assets/fabric-backlog-pending.png"} width={"500"} height={"40"} loading={"lazy"} alt={"Toolbar detail showing Save to Database, Preview Changes (1), and Discard Changes in the populated backlog screen."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Design screen / Toolbar detail from the second screen, not a third state. "}
              <a className={"image-link"} href={"/assets/fabric-backlog-pending.png"} target={"_blank"} rel={"noopener noreferrer"}>
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
            <h2 id={"decisions-title"}>{"Support the work before it reaches the schedule."}</h2>
          </div>
          {"\n      "}
          <ol className={"mapping-decision-list"}>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"01"}</span>
              <div>
                <h3>{"Make the first action explicit."}</h3>
                <p>{"The empty-state message and Add Task button work together. Loading, permission, and error states are not supplied and should not be confused with this empty state."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02"}</span>
              <div>
                <h3>{"Retain creation alongside management."}</h3>
                <p>{"The populated panel keeps New Task, search, and row actions together. The identifier-only row is compact; task recognizability at scale remains a review question, not a measured finding."}</p>
              </div>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03"}</span>
              <div>
                <h3>{"Distinguish local changes from persistence."}</h3>
                <p>{"Preview, save, and discard controls expose separate choices. The screenshots do not establish validation, conflict handling, or success feedback after saving."}</p>
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
            <h2 id={"evidence-title"}>{"Backlog is documented. The source scope still matters."}</h2>
            <p>
              {"Microsoft Learn's "}
              <strong>{"Resource layout"}</strong>
              {" guide documents backlog tasks without start and end dates, later scheduling through editing, and Save to Database. This is related PowerTable product documentation—not a reproduction of every control or a verification of this supplied Gantt design."}
            </p>
          </div>
          {"\n      "}
          <div className={"mapping-source-links"}>
            {"\n        "}
            <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-manage-tasks-resource#create-a-backlog-task"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Create a backlog task / Resource layout "}
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
                {" backlog sits within the confirmed end-to-end PowerTable Gantt UX/UI scope, including developer handoff and implementation review. This does not imply Microsoft employment or production-code ownership."}
              </p>
              <p>
                <strong>{"Evidence:"}</strong>
                {" two supplied screenshot states, presented as three native-resolution crops. The first provides the empty panel; the second provides the one-item list and change toolbar. The creation form and interaction between these states are not supplied. Product controls and values are unchanged."}
              </p>
              <p>
                <strong>{"Limits:"}</strong>
                {" the screenshots do not establish T0011's underlying dates, task-form fields, search behavior, deletion confirmation, drag-and-drop scheduling, permissions, save persistence, or a completed scheduling flow. This is a screenshot-led design case, not an interactive backlog application."}
              </p>
              <p>
                <strong>{"Sources:"}</strong>
                {" Microsoft Learn overview and Resource layout task-management guide reviewed November 10, 2026. The guide supports the backlog concept and resource-layout workflow, not every detail of this task-based Gantt panel or its release status. No independently verified feature-specific customer review, usability result, or impact metric is included."}
              </p>
              <p>
                <strong>{"Handling:"}</strong>
                {" the original attachments are marked Confidential/Internal Only. Crops exclude account/workspace chrome and the surrounding project task grid. Cropping is not publication clearance. Permission to publish these supplied screenshots has been confirmed."}
              </p>
              <p>
                <strong>{"Platform:"}</strong>
                {" the unchanged Fabric icon identifies the platform, not endorsement. Azure DevOps backlogs, Intelligence charts, and Analytics+ Gantt are not substituted as feature evidence."}
              </p>
            </div>
          </details>
          {"\n    "}
        </section>
        {"\n    "}
        <a className={"next-project wrap review-next"} href={"/gantt-conditional-formatting.html"}>
          <span className={"eyebrow"}>{"Related PowerTable feature"}</span>
          <span className={"next-title"}>
            {"Gantt Resources"}
            <br />
            <em>{"Conditional Formatting."}</em>
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
