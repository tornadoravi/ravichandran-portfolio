import React from 'react';
import CaseStoryLayout from '../CaseStoryLayout.jsx';
import ProjectIdentity from '../ProjectIdentity.jsx';
import { CaseContext, CaseFlow } from '../CaseReview.jsx';
import CaseFocus from '../CaseFocus.jsx';

export default function PowertablePage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"} className="design-review planning-review">
        {"\n    "}
        <section className={"case-hero wrap"}>
          <a className={"back-link"} href={"/#work"}>{"← Selected work"}</a>
          <ProjectIdentity product="powertable" />
          <h1>{"PowerTable."}</h1>
          <p className="case-summary">{"Complex planning. Connected workflows."}</p>
          <CaseContext role="End-to-end Gantt & resource UX/UI · Cross-tab contribution">
            <dl className={"metadata"}>
              <div>
                <dt>{"Company"}</dt>
                <dd>{"Lumel Technologies"}</dd>
              </div>
              <div>
                <dt>{"Role"}</dt>
                <dd>
                  {"Product Designer · "}
                  <strong className={"scan-emphasis"}>{"End-to-end UX/UI"}</strong>
                </dd>
              </div>
              <div>
                <dt>{"Scope"}</dt>
                <dd>{"Competitive analysis, developer handoff & implementation review"}</dd>
              </div>
              <div>
                <dt>{"Duration"}</dt>
                <dd>{"1.5 years on PowerTable"}</dd>
              </div>
            </dl>
          </CaseContext>
        </section>
        <CaseStoryLayout caseId="planning">
        {"\n    "}
        <figure className={"detail-figure screenshot-scene case-evidence powertable-product-overview product-overview wrap"}>
          {"\n      "}
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Product overview / Microsoft Fabric"}</span>
            <h2>{"PowerTable in action."}</h2>
          </div>
          <p className={"product-overview-copy"}>{"No-code data apps and planning in Microsoft Fabric."}</p>
          {"\n      "}
          <a className={"product-screenshot"} href={"/assets/powertable-official-gantt.webp"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View official PowerTable Gantt workspace full-size (opens in a new tab)"}>
            <img src={"/assets/powertable-official-gantt.webp"} width={"2944"} height={"1570"} fetchPriority={"high"} alt={"Official PowerTable workspace in Microsoft Fabric, with a task table beside a Gantt timeline showing progress bars, milestones, and dependency connectors."} />
          </a>
          {"\n      "}
          <figcaption>
            {"Official product screenshot · PowerTable in Microsoft Fabric. "}
            <a className={"image-link"} href={"https://docs.powertable.com/explore-powertable/layout-views/gantt-chart-view"} target={"_blank"} rel={"noopener noreferrer"}>
              {"Source: PowerTable documentation ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
            {" "}
            <a className={"image-link"} href={"/assets/powertable-official-gantt.webp"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
          {"\n    "}
        </figure>
        {"\n    "}
        <CaseFocus story="planning" />
        <section id={"workspaces"} className={"workspace-directory wrap"} aria-labelledby={"workspaces-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"PowerTable / Three areas"}</p>
            <h2 id={"workspaces-title"}>{"My feature work."}</h2>
            <p>{"Official product previews. "}<a className={"text-link"} href={"#workspace-sources"}>{"Image sources →"}</a></p>
          </div>
          {"\n      "}
          <div className={"workspace-grid"}>
            {"\n        "}
            <section id={"gantt-features"} className={"workspace-group album-card"} aria-labelledby={"gantt-features-title"}>
              {"\n          "}
              <p className={"eyebrow"}>{"01 / Tasks & timelines"}</p>
              {"\n          "}
              <h2 id={"gantt-features-title"}>{"Gantt"}</h2>
              {"\n          "}
              <p className={"album-description"}>{"Map the data. Configure the plan. Track the work."}</p>
              {"\n          "}
              <figure className={"workspace-preview"}>
                <img src={"/assets/powertable-official-gantt.webp"} width={"2944"} height={"1570"} loading={"lazy"} alt={"Official PowerTable Gantt implementation with task rows, timeline bars, milestones, and dependency connectors."} />
                <figcaption>{"Official product example · Gantt"}</figcaption>
              </figure>
              {"\n          "}
              <a className={"text-link"} href={"/column-mapping.html"}>
                {"Explore Gantt "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              {"\n        "}
            </section>
            {"\n        "}
            <section id={"resource-features"} className={"workspace-group album-card album-card--lilac"} aria-labelledby={"resource-features-title"}>
              {"\n          "}
              <p className={"eyebrow"}>{"02 / People & workload"}</p>
              {"\n          "}
              <h2 id={"resource-features-title"}>{"Gantt Resources"}</h2>
              {"\n          "}
              <p className={"album-description"}>{"Make workload and formatting rules easier to read."}</p>
              {"\n          "}
              <figure className={"workspace-preview"}>
                <img src={"/assets/powertable-official-resource.webp"} width={"2304"} height={"1118"} loading={"lazy"} alt={"Official PowerTable Resource layout showing assignees and their assigned tasks across a quarterly timeline."} />
                <figcaption>{"Official product example · Resources"}</figcaption>
              </figure>
              {"\n          "}
              <a className={"text-link"} href={"/gantt-conditional-formatting.html"}>
                {"Explore Gantt Resources "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              {"\n        "}
            </section>
            {"\n        "}
            <section id={"crosstab-features"} className={"workspace-group album-card album-card--peach"} aria-labelledby={"crosstab-features-title"}>
              {"\n          "}
              <p className={"eyebrow"}>{"03 / Summary & detail"}</p>
              {"\n          "}
              <h2 id={"crosstab-features-title"}>{"Cross-tab"}</h2>
              {"\n          "}
              <p className={"album-description"}>{"Shape the same data into summary and detail."}</p>
              {"\n          "}
              <figure className={"workspace-preview"}>
                <img src={"/assets/powertable-official-crosstab.webp"} width={"2304"} height={"892"} loading={"lazy"} alt={"Official PowerTable Cross-tab implementation with product categories, year-quarter-month column hierarchies, profit and units sold, and totals."} />
                <figcaption>{"Official product example · Cross-tab"}</figcaption>
              </figure>
              {"\n          "}
              <a className={"text-link"} href={"/crosstab.html"}>
                {"Explore Cross-tab "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              {"\n        "}
            </section>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <details id={"study-details"} className={"case-deep-dive powertable-story"}>
          {"\n      "}
          <summary className={"wrap"}>
            <span>
              <strong>{"Behind the design"}</strong>
              <small>{"Optional detail: context, design decisions, and delivery."}</small>
            </span>
            <span className={"story-toggle"} aria-hidden={"true"} />
          </summary>
          {"\n      "}
          <div className={"deep-dive-content"}>
            <section className={"case-brief case-brief--compact wrap"} aria-label={"Detailed contribution summary"}>
              <div>
                <h2>{"Design challenge"}</h2>
                <p>
                  {"Connect "}
                  <strong>{"task detail, time, and capacity"}</strong>
                  {" inside Fabric."}
                </p>
              </div>
              <div>
                <h2>{"My contribution"}</h2>
                <p>
                  <strong>{"End-to-end Gantt and resource UX/UI"}</strong>
                  {" using the Microsoft Fabric design system; cross-tab contribution."}
                </p>
              </div>
              <div>
                <h2>{"Evidence & status"}</h2>
                <p>
                  {"Task, time-entry, resource, and cost configuration screens. Resource earned-value and baseline planning "}
                  <strong>{"remain explorations."}</strong>
                </p>
              </div>
            </section>
            {"\n    "}
            <nav className={"case-nav wrap"} aria-label={"Case study sections"}>
              <a href={"#business-case"}>{"Context & role"}</a>
              <a href={"#competitive-analysis"}>{"Design decisions"}</a>
              <a href={"#overview"}>{"Feature scope"}</a>
              <a href={"#delivery"}>{"Delivery & sources"}</a>
            </nav>
            {"\n    "}
            <section id={"business-case"} className={"editorial-section wrap"} aria-label={"Business case"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"Business case"}</span>
                <h2>
                  {"Keep the work, time,"}
                  <br />
                  <em>{"and capacity connected."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
            <p className={"large-copy"}>{"Support planning decisions without separating the task from its wider context."}</p>
            <CaseFlow steps={[["Task","What needs doing"],["Time","When it belongs"],["Capacity","Who can take it on"]]} />
          </div>
              {"\n    "}
            </section>
            {"\n    "}
            <section id={"platform-context"} className={"platform-context wrap"} aria-labelledby={"platform-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Product context / Microsoft Learn"}</p>
                <h2 id={"platform-title"}>{"What is planning in Fabric?"}</h2>
                <p>{"Fabric is the platform; planning is the wider suite; PowerTable handles structured data. My scope is planning UX/UI."}</p>
              </div>
              {"\n      "}
              <ol className={"platform-stack"} aria-label={"Fabric planning product context"}>
                {"\n        "}
                <li>
                  <img src={"/assets/microsoft-fabric.svg"} width={"48"} height={"48"} alt={""} />
                  <span className={"eyebrow"}>{"The platform"}</span>
                  <h3>{"Microsoft Fabric"}</h3>
                  <p>{"The data and analytics environment in which the planning experience lives."}</p>
                </li>
                {"\n        "}
                <li>
                  <span className={"eyebrow"}>{"The planning suite"}</span>
                  <h3>{"Planning in Fabric"}</h3>
                  <p>{"Planning, PowerTable, and Intelligence capabilities connect plans, operational data, and insights."}</p>
                </li>
                {"\n        "}
                <li>
                  <span className={"eyebrow"}>{"My product context"}</span>
                  <h3>{"PowerTable"}</h3>
                  <p>{"No-code table applications with an Excel-like editing experience, writeback, and project-planning capabilities."}</p>
                </li>
                {"\n      "}
              </ol>
              {"\n      "}
              <p className={"fine-print"}>{"Product relationships, not setup steps. Documentation calls it “PowerTable sheets”; the supplied screen says “PowerTable.” Neither implies suite ownership."}</p>
              {"\n      "}
              <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/overview"} target={"_blank"} rel={"noopener noreferrer"}>
                {"Read “What is planning in Fabric?” "}
                <span aria-hidden={"true"}>{"↗"}</span>
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
              {"\n    "}
            </section>
            {"\n    "}
            <section id={"role"} className={"editorial-section wrap"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"My role & ownership"}</span>
                <h2>
                  {"From the planning problem"}
                  <br />
                  <em>{"to the implementation detail."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"I handled end-to-end UX/UI for Gantt and resource Gantt, staying involved through developer handoff and implementation review."}</p>
                <div className={"principles"}>
                  {"\n        "}
                  <div>
                    <span>{"01"}</span>
                    <h3>{"Define the workflow"}</h3>
                    <p>{"Translate requirements into task, timeline, and resource journeys. Clarify the information needed to configure a useful planning view."}</p>
                  </div>
                  {"\n        "}
                  <div>
                    <span>{"02"}</span>
                    <h3>{"Compare the patterns"}</h3>
                    <p>{"Use competitive analysis and adjacent planning patterns to frame hierarchy, configuration, and the relationship between task detail and time."}</p>
                  </div>
                  {"\n        "}
                  <div>
                    <span>{"03"}</span>
                    <h3>{"Design the UX/UI"}</h3>
                    <p>{"Develop user flows, interaction states, interface layouts, and visual hierarchy across Gantt and resource planning; contribute to cross-tab configuration."}</p>
                  </div>
                  {"\n        "}
                  <div>
                    <span>{"04"}</span>
                    <h3>{"Carry the design through"}</h3>
                    <p>{"Communicate the intended behavior to developers, clarify interaction and visual details, and review implementation against the design."}</p>
                  </div>
                  {"\n      "}
                </div>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <section id={"competitive-analysis"} className={"analytics-comparison wrap"} aria-labelledby={"comparison-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Competitive analysis / Planner & configurator perspectives"}</p>
                <h2 id={"comparison-title"}>{"Can people configure the plan and understand the work?"}</h2>
                <p>{"Compare planning decisions, not feature counts. Microsoft Project supplies an adjacent scheduling reference; Fabric documentation establishes product context."}</p>
              </div>
              {"\n      "}
              <div className={"comparison-table-wrap"} tabIndex={"0"} role={"region"} aria-label={"Planning workflow comparison"}>
                {"\n        "}
                <table className={"comparison-table"}>
                  <caption>{"Task-led public-documentation comparison · reviewed November 2026"}</caption>
                  <thead>
                    <tr>
                      <th scope={"col"}>{"Person & goal"}</th>
                      <th scope={"col"}>{"Documented reference pattern"}</th>
                      <th scope={"col"}>{"Design response in this case"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {"\n          "}
                    <tr>
                      <th scope={"row"}>
                        <span className={"comparison-person"}>{"Plan configurator"}</span>
                        {"Give existing data a planning meaning."}
                      </th>
                      <td>
                        <strong>{"PowerTable sheets"}</strong>
                        {" builds table apps from database tables and semantic models with an Excel-like editing experience. This is the product baseline, not a competing tool. "}
                        <a href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-overview"} target={"_blank"} rel={"noopener noreferrer"}>
                          {"Microsoft Learn ↗"}
                          <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                        </a>
                      </td>
                      <td>
                        {"Keep start/end dates, Task ID, hierarchy, and optional roles together in Layout Configuration. Required markers distinguish the core mappings. "}
                        <a href={"#gantt-configuration"}>{"See the supplied configuration →"}</a>
                      </td>
                    </tr>
                    {"\n          "}
                    <tr>
                      <th scope={"row"}>
                        <span className={"comparison-person"}>{"Project planner"}</span>
                        {"Read tasks, hierarchy, and timing together."}
                      </th>
                      <td>
                        <strong>{"Microsoft Project desktop"}</strong>
                        {" documents tasks, subtasks, dependency links, and Gantt views as connected scheduling concepts. This is an adjacent product reference, not a tested head-to-head benchmark. "}
                        <a href={"https://support.microsoft.com/en-us/project/basic-tasks-in-project-2"} target={"_blank"} rel={"noopener noreferrer"}>
                          {"Microsoft Project guidance ↗"}
                          <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                        </a>
                      </td>
                      <td>
                        {"Keep the task grid and timeline connected, with date, hierarchy, and dependency mappings expressed in the setup. A visible mapping is not proof of scheduling behavior. "}
                        <a href={"#gantt"}>{"See Gantt design scope →"}</a>
                      </td>
                    </tr>
                    {"\n          "}
                    <tr>
                      <th scope={"row"}>
                        <span className={"comparison-person"}>{"Resource planner"}</span>
                        {"Relate the work to available capacity."}
                      </th>
                      <td>
                        <strong>{"PowerTable sheets"}</strong>
                        {" lists project Gantt charts, resource allocation, and time tracking among its planning capabilities. Public capability descriptions do not establish which individual designs shipped. "}
                        <a href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-overview"} target={"_blank"} rel={"noopener noreferrer"}>
                          {"PowerTable planning capabilities ↗"}
                          <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                        </a>
                      </td>
                      <td>
                        {"Design resource assignment, backlog, and capacity visibility as related perspectives. Keep resource earned-value and baseline-planning explorations distinct. "}
                        <a href={"#resources"}>{"See resource planning →"}</a>
                      </td>
                    </tr>
                    {"\n        "}
                  </tbody>
                </table>
                {"\n      "}
              </div>
              {"\n      "}
              <p className={"comparison-takeaway"}>
                <strong>{"My design point of view:"}</strong>
                {" configuring a plan and reading it are different tasks. Make the data relationships clear first, then keep the work, time, and capacity connected."}
              </p>
              {"\n      "}
              <p className={"fine-print"}>{"Comparison basis: task-led pattern review using current public product documentation."}</p>
              {"\n    "}
            </section>
            {"\n    "}
            <figure id={"process"} className={"concept-model wrap"} aria-labelledby={"process-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Design process / Original illustration"}</p>
                <h2 id={"process-title"}>{"One design thread, from requirements to review."}</h2>
              </div>
              {"\n      "}
              <div className={"concept-map analytics-process"}>
                {"\n        "}
                <a className={"concept-node"} href={"#role"}>
                  <span className={"small-index"}>{"01 / Understand"}</span>
                  <strong>{"Frame the task"}</strong>
                  <span>{"Requirements, planning roles, and the existing workflow."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#competitive-analysis"}>
                  <span className={"small-index"}>{"02 / Compare"}</span>
                  <strong>{"Find patterns"}</strong>
                  <span>{"Task hierarchy, setup, timeline, and resource perspectives."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#gantt-configuration"}>
                  <span className={"small-index"}>{"03 / Design"}</span>
                  <strong>{"Connect the flow"}</strong>
                  <span>{"Interaction states, UI hierarchy, and configuration."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#delivery"}>
                  <span className={"small-index"}>{"04 / Handoff"}</span>
                  <strong>{"Explain intent"}</strong>
                  <span>{"Behavior, visual detail, and developer clarification."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#delivery"}>
                  <span className={"small-index"}>{"05 / Review"}</span>
                  <strong>{"Check the build"}</strong>
                  <span>{"Implementation feedback with product and engineering."}</span>
                </a>
                {"\n      "}
              </div>
              <figcaption>{"Original illustration of my design workflow."}</figcaption>
              {"\n    "}
            </figure>
            {"\n    "}
            <section id={"solutions"} className={"solution-section wrap"} aria-labelledby={"solutions-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Design rationale"}</p>
                <h2 id={"solutions-title"}>{"Pain points & solution highlights."}</h2>
                {"      "}
                <p>{"Planning challenges addressed by the confirmed Gantt, resource Gantt, and cross-tab design scope."}</p>
              </div>
              {"\n      "}
              <ol className={"solution-grid"} role={"list"}>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"01 / Pain point"}</span><h3>{"A task row does not show the whole plan."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Keep task editing beside timeline navigation, columns, and baseline comparison."}</p>
              <a className={"text-link"} href={"#gantt"}>
                    {"See Gantt design scope "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"02 / Pain point"}</span><h3>{"Assignments need capacity context."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Connect assignments, backlog, time tracking, and capacity visibility."}</p>
              <a className={"text-link"} href={"#resources"}>
                    {"See resource planning "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"03 / Pain point"}</span><h3>{"Summary and detail need different views."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Expose rows, columns, measures, and contextual configuration."}</p>
              <a className={"text-link"} href={"#crosstab"}>
                    {"See cross-tab contribution "}
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
                <h2 id={"concept-title"}>{"Three perspectives on connected work."}</h2>
              </div>
              {"\n      "}
              <div className={"concept-map is-connected"}>
                {"\n        "}
                <a className={"concept-node"} href={"#gantt"}>
                  <span className={"small-index"}>{"Work + time"}</span>
                  <strong>{"The plan"}</strong>
                  <span>{"Task detail connected to the Gantt timeline."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#resources"}>
                  <span className={"small-index"}>{"People + workload"}</span>
                  <strong>{"Capacity"}</strong>
                  <span>{"Assignments, backlog, and resource visibility."}</span>
                </a>
                {"\n        "}
                <a className={"concept-node"} href={"#crosstab"}>
                  <span className={"small-index"}>{"Data perspective"}</span>
                  <strong>{"Summary + detail"}</strong>
                  <span>{"Rows, columns, and measures shape the information view."}</span>
                </a>
                {"\n      "}
              </div>
              {"\n      "}
              <figcaption>{"Original explanatory diagram, not a product screenshot. Connections express the intended relationship between planning views."}</figcaption>
              {"\n    "}
            </figure>
            {"\n    "}
            <section id={"overview"} className={"editorial-section wrap"}>
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"01 / Overview"}</span>
                <h2>
                  {"Planning is"}
                  <br />
                  <em>{"a connected activity."}</em>
                </h2>
              </div>
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"PowerTable is a no-code, writeback-enabled product for data and master data management in Microsoft Fabric."}</p>
                <ul className="case-key-points">
              <li>{"I designed Gantt and resource Gantt experiences end to end, and contributed to cross-tab layout and data configuration."}</li>
            </ul>
              </div>
            </section>
            {"\n    "}
            <details id={"user-flow"} className={"flow-disclosure wrap"}>
              {"\n      "}
              <summary>{"How the planning views connect"}</summary>
              {"\n      "}
              <nav className={"flow-overview"} aria-label={"PowerTable planning user flow"}>
                {"\n        "}
                <a className={"flow-stage"} href={"#overview"}>
                  <span className={"flow-number"}>{"01"}</span>
                  <span>
                    <strong>{"Understand the planning context"}</strong>
                    <small>{"Work with task, timeline, resource, and structured-data needs."}</small>
                  </span>
                  <span aria-hidden={"true"}>{"↓"}</span>
                </a>
                {"\n        "}
                <a className={"flow-stage"} href={"#gantt"}>
                  <span className={"flow-number"}>{"02"}</span>
                  <span>
                    <strong>{"Create or review the plan"}</strong>
                    <small>{"Connect task detail, timescale, and the Gantt canvas."}</small>
                  </span>
                  <span aria-hidden={"true"}>{"↓"}</span>
                </a>
                {"\n        "}
                <a className={"flow-stage"} href={"#resources"}>
                  <span className={"flow-number"}>{"03"}</span>
                  <span>
                    <strong>{"Consider resource capacity"}</strong>
                    <small>{"Relate assignments, backlog, and workload within resource Gantt design scope."}</small>
                  </span>
                  <span aria-hidden={"true"}>{"↓"}</span>
                </a>
                {"\n        "}
                <a className={"flow-stage"} href={"#crosstab"}>
                  <span className={"flow-number"}>{"04"}</span>
                  <span>
                    <strong>{"Review the data perspective"}</strong>
                    <small>{"Configure rows, columns, and measures for summary or detail."}</small>
                  </span>
                  <span aria-hidden={"true"}>{"↗"}</span>
                </a>
                {"\n        "}
                <p className={"flow-caption"}>{"Illustrative journey—not a tested sequence or release record. Resource and Cross-tab are related views; resource baseline/earned-value work remained exploratory."}</p>
                {"\n      "}
              </nav>
              {"\n    "}
            </details>
            {"\n    "}
            <section id={"gantt"} className={"editorial-section wrap"}>
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"02 / Gantt experience"}</span>
                <h2>
                  {"The task and timeline."}
                  <br />
                  <em>{"In the same picture."}</em>
                </h2>
              </div>
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"Make the relationship between the work and its timing easier to follow."}</p>
                <ul className="case-key-points">
              <li>{"Scope: task editing, timeline controls, columns, navigation, baseline comparison, effort tracking, and export."}</li>
              <li>{"Keep task details beside the timeline. Use configuration to accommodate different planning needs."}</li>
            </ul>
                <div className={"two-column"}>
                  <div>
                    <span className={"small-index"}>{"WORK DETAIL"}</span>
                    <h3>{"Create, edit, configure"}</h3>
                    <p>{"Task interactions and column settings shape the information people need to work with."}</p>
                  </div>
                  <div>
                    <span className={"small-index"}>{"PLAN CONTEXT"}</span>
                    <h3>{"Navigate, compare, track"}</h3>
                    <p>{"Timescale, baseline comparison, and effort-tracking design keep the wider planning context in view."}</p>
                  </div>
                </div>
              </div>
            </section>
            {"\n    "}
            <section id={"gantt-configuration"} className={"editorial-section wrap"}>
              {"\n      "}
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"Gantt / Configuration design"}</span>
                <h2>
                  {"Start with the fields."}
                  <br />
                  <em>{"Make their roles clear."}</em>
                </h2>
              </div>
              {"\n      "}
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"The setup connects source columns to the meaning a planning view needs."}</p>
                <ul className="case-key-points">
              <li>{"Four mapping domains: Tasks, Time Entries, Resource, Cost. Required task fields: start, end/duration, and Task ID."}</li>
            </ul>
                <div className={"two-column"}>
                  <div>
                    <span className={"small-index"}>{"STRUCTURE"}</span>
                    <h3>{"Dates, identity, hierarchy"}</h3>
                    <p>{"Choose Parent ID or Multiple Column Hierarchy. Map milestones, progress, dependencies, and effort separately."}</p>
                  </div>
                  <div>
                    <span className={"small-index"}>{"DISCLOSURE"}</span>
                    <h3>{"Core first, more when needed"}</h3>
                    <p>{"Core mappings first; filter and additional options separate. This earlier screen uses Reset/Next; newer states use Save."}</p>
                  </div>
                </div>
                <ul className="case-key-points">
              <li>{"The banner describes four related layouts; it does not verify cross-view synchronization or completed saves."}</li>
            </ul>
                <a className={"text-link"} href={"/column-mapping.html"}>
                  {"Explore Column Mapping & Configuration "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <figure className={"detail-figure wrap screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"My design evidence / Gantt configuration"}</span>
                <h3>{"Mapping data to the plan."}</h3>
              </div>
              <a className={"product-screenshot"} href={"/assets/fabric-gantt-configuration.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View my Gantt Layout Configuration design screen full-size (opens in a new tab)"}>
                <img src={"/assets/fabric-gantt-configuration.png"} width={"1912"} height={"1038"} loading={"lazy"} alt={"My supplied PowerTable Layout Configuration design screen with required task-field mappings and additional mapping options."} />
              </a>
              <figcaption>{"Layout Configuration design screen · Personal feature evidence, separate from the official product previews above."}</figcaption>
            </figure>
            <figure className={"detail-figure wrap gantt-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"A shared planning canvas"}</span>
                <h3>
                  {"Details on the left."}
                  <br />
                  {"Direction on the right."}
                </h3>
              </div>
              <div className={"product-illustration"} data-illustration={"planning"}>{""}</div>
              <figcaption>{"Conceptual Gantt illustration · Sample tasks and dates are fictional, not customer data."}</figcaption>
            </figure>
            {"\n    "}
            <section id={"resources"} className={"editorial-section wrap"}>
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"03 / Resource Gantt"}</span>
                <h2>
                  {"Beyond the task."}
                  <br />
                  <em>{"The people doing it."}</em>
                </h2>
              </div>
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"A plan needs a view of resources as well as a view of time."}</p>
                <ul className="case-key-points">
              <li>{"My resource Gantt scope included workspace and navigation, summary bars, resource assignment, backlog, time-tracking interactions, and capacity and workload visibility."}</li>
              <li>{"Design intent: connect outstanding work with resource availability. Allocation and productivity improvements were not measured."}</li>
            </ul>
                <div className={"note"}>
                  <span className={"eyebrow"}>{"Exploration, not a shipped claim"}</span>
                  <p>{"Resource earned-value and baseline planning remained exploratory—not released functionality or the Gantt baseline-comparison scope."}</p>
                </div>
              </div>
            </section>
            {"\n    "}
            <figure className={"detail-figure wrap resource-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Capacity in context"}</span>
                <h3>
                  {"Connect the backlog"}
                  <br />
                  {"to the bigger picture."}
                </h3>
              </div>
              <div className={"product-illustration"} data-illustration={"resources"}>{""}</div>
              <figcaption>{"Conceptual resource-planning illustration · Fictional teams, capacity values, and assignments."}</figcaption>
            </figure>
            {"\n    "}
            <section id={"crosstab"} className={"editorial-section wrap"}>
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"04 / Cross-tab contribution"}</span>
                <h2>
                  {"Structured data."}
                  <br />
                  <em>{"Flexible perspectives."}</em>
                </h2>
              </div>
              <div className={"section-copy"}>
                <ul className="case-key-points">
              <li>{"Cross-tab contribution: rows, columns, measures, contextual settings, and summary/detail layouts."}</li>
              <li>{"Make the connection between configuration and the resulting view visible."}</li>
            </ul>
                <div className={"flow-strip"} aria-label={"Cross-tab configuration dimensions"}>
                  <div>
                    <span>{"01"}</span>
                    <strong>{"Rows"}</strong>
                  </div>
                  <span aria-hidden={"true"}>{"/"}</span>
                  <div>
                    <span>{"02"}</span>
                    <strong>{"Columns"}</strong>
                  </div>
                  <span aria-hidden={"true"}>{"/"}</span>
                  <div>
                    <span>{"03"}</span>
                    <strong>{"Measures"}</strong>
                  </div>
                </div>
              </div>
            </section>
            {"\n    "}
            <section id={"delivery"} className={"editorial-section wrap"}>
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"Developer handoff & implementation"}</span>
                <h2>
                  {"Keep the design intent"}
                  <br />
                  <em>{"intact through delivery."}</em>
                </h2>
              </div>
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"The design work continues when engineering starts implementing it."}</p>
                <ul className="case-key-points">
              <li>{"Developer handoff, interaction clarification, visual checks, and implementation review—not production-code ownership."}</li>
            </ul>
                <div className={"two-column"}>
                  <div>
                    <span className={"small-index"}>{"HANDOFF"}</span>
                    <h3>{"Make decisions explicit"}</h3>
                    <p>{"Explain flow, control hierarchy, and state relationships during handoff."}</p>
                  </div>
                  <div>
                    <span className={"small-index"}>{"IMPLEMENTATION REVIEW"}</span>
                    <h3>{"Review against the intent"}</h3>
                    <p>{"Resolve interaction and visual details with engineering during implementation."}</p>
                  </div>
                </div>
                <p className={"fine-print"}>{"No handoff files, QA logs, release records, or performance comparisons are supplied."}</p>
                <a className={"text-link"} href={"/about.html#recommendations"}>
                  {"Read colleague feedback on collaboration "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </div>
            </section>
            {"\n    "}
            <section id={"reflection"} className={"editorial-section wrap"}>
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"Reflection"}</span>
                <h2>
                  {"Different views."}
                  <br />
                  <em>{"One connected system."}</em>
                </h2>
              </div>
              <div className={"section-copy"}>
                <p className={"large-copy"}>{"The core design challenge was keeping the connections visible."}</p>
                <ul className="case-key-points">
              <li>{"Task → time. Assignment → capacity. Configuration → data view. Keep those relationships visible across the system."}</li>
            </ul>
                <details className={"evidence-note"}>
                  <summary>{"Role, delivery & evidence"}</summary>
                  <div className={"note"}>
                    <p>
                      <strong>{"Role:"}</strong>
                      {" end-to-end Gantt and resource UX/UI, cross-tab configuration contributions, developer handoff, and implementation review—not production-code ownership."}
                    </p>
                    <p>
                      <strong>{"Evidence:"}</strong>
                      {" the opening screenshot provides official product context. The linked feature cases show supplied mapping and configuration design states; historical iteration records and customer-outcome measurements are not included. The planning-canvas artwork remains conceptual."}
                    </p>
                    <p>
                      <strong>{"Status:"}</strong>
                      {" resource earned-value and baseline planning remained exploratory. The configuration screens document visible mappings, not verified cross-view behavior or release status for every designed capability."}
                    </p>
                    <p>
                      <strong>{"Comparison:"}</strong>
                      {" current public-documentation review, not a reproduced historical research artifact or customer study."}
                    </p>
                  </div>
                </details>
              </div>
            </section>
            {"\n    "}
            <section id={"references"} className={"editorial-section wrap"}>
              <div className={"section-label"}>
                <span className={"eyebrow"}>{"Sources & credits"}</span>
                <h2>
                  {"Product context."}
                  <br />
                  <em>{"Design evidence, separately."}</em>
                </h2>
              </div>
              <div className={"section-copy"}>
                <ul className="case-key-points">
              <li>
                  <a className={"text-link"} href={"https://lumel.com/powertable/"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"PowerTable — official Lumel product page "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </li>
              <li>
                  {"The opening product overview is paraphrased from Lumel’s official PowerTable page. Its screenshot comes from the "}
                  <a href={"https://docs.powertable.com/explore-powertable/layout-views/gantt-chart-view"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"official Gantt Chart View documentation ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {", re-encoded as WebP without cropping or added callouts. This is product context, not evidence that I designed every capability shown."}
                </li>
            </ul>
                <div id={"workspace-sources"}>
                  <h3>{"Workspace screenshot sources."}</h3>
                  <p>{"Official product views, checked 11 November 2026—not proof of my ownership or release records for each supplied design."}</p>
                  <p>
                    <a href={"https://docs.powertable.com/explore-powertable/layout-views/gantt-chart-view"} target={"_blank"} rel={"noopener noreferrer"}>{"Gantt · PowerTable documentation ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                    {" · "}
                    <a href={"/assets/powertable-official-gantt.webp"} target={"_blank"} rel={"noopener noreferrer"}>{"View Gantt full-size ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                  </p>
                  <p>
                    <a href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-configure-resource-overview"} target={"_blank"} rel={"noopener noreferrer"}>{"Resource layout · Microsoft Learn ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                    {" · "}
                    <a href={"/assets/powertable-official-resource.webp"} target={"_blank"} rel={"noopener noreferrer"}>{"View Resources full-size ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                  </p>
                  <p>
                    <a href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-configure-crosstab-layout"} target={"_blank"} rel={"noopener noreferrer"}>{"Cross-tab layout · Microsoft Learn ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                    {" · "}
                    <a href={"/assets/powertable-official-crosstab.webp"} target={"_blank"} rel={"noopener noreferrer"}>{"View Cross-tab full-size ↗"}<span className={"sr-only"}>{" (opens in a new tab)"}</span></a>
                  </p>
                  <p>{"Original dimensions and UI retained; WebP compression only. Supplied design evidence stays separate. Cross-tab remains contribution-level work."}</p>
                </div>
                <ul className="case-key-points">
              <li>
                  <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/overview"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"What is planning in Fabric? "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </li>
              <li>
                  <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-overview"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"PowerTable sheets in planning "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </li>
              <li>{"Microsoft Learn supplies current product context, not suite ownership or release proof. Scheduling comparisons cite Microsoft Project guidance."}</li>
              <li>
                  <a href={"https://www.linkedin.com/feed/update/urn:li:activity:7270117667141742592/"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Lumel’s public announcement about the Microsoft planning collaboration ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {" provides company-level context. It is not independent user research, an endorsement of my work, or evidence of my individual contribution."}
                </li>
              <li>
                  {"The unchanged Microsoft Fabric icon comes from "}
                  <a href={"https://learn.microsoft.com/en-us/fabric/fundamentals/icons"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Microsoft's official icon collection ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {" and identifies the actual platform, not Microsoft Office. It is not a custom PowerTable logo or an endorsement."}
                </li>
              <li>{"Layout Configuration is a supplied design crop, not Microsoft Learn imagery. Portfolio diagrams use fictional data—not customer evidence."}</li>
            </ul>
                <p className={"fine-print"}>{"No research, usability gains, adoption, or business-impact metrics are invented. Analytics+ Gantt remains a separate Power BI story."}</p>
              </div>
            </section>
            {"\n      "}
          </div>
          {"\n    "}
        </details>
        {"\n    "}
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
