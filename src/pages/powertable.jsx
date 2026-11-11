import React from 'react';

export default function PowertablePage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"}>
        {"\n    "}
        <section className={"case-hero wrap"}>
          <a className={"back-link"} href={"/#work"}>{"← Selected work"}</a>
          <p className={"eyebrow platform-pill"}>
            <img src={"/assets/microsoft-fabric.svg"} width={"24"} height={"24"} alt={""} />
            {"01 / PowerTable · Microsoft Fabric"}
          </p>
          <h1>
            {"Designing Connected"}
            <br />
            <em>{"Planning Experiences."}</em>
          </h1>
          <p className={"case-summary"}>
            {"End-to-end Gantt and resource UX/UI in Microsoft Fabric."}
            <br className={"desktop-break"} />
            {" Connecting tasks, timelines, and capacity."}
          </p>
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
        </section>
        {"\n    "}
        <figure className={"detail-figure screenshot-scene case-evidence powertable-product-overview product-overview wrap"}>
          {"\n      "}
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Product overview / Microsoft Fabric"}</span>
            <h2>{"PowerTable in action."}</h2>
          </div>
          <p className={"product-overview-copy"}>{"No-code data apps for managing data, approvals, and project plans in Microsoft Fabric."}</p>
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
        <section className={"case-brief case-brief--compact wrap"} aria-label={"Case study at a glance"}>
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
              {"; cross-tab contributions."}
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
        <section id={"workspaces"} className={"workspace-directory wrap"} aria-labelledby={"workspaces-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"PowerTable / Three areas"}</p>
            <h2 id={"workspaces-title"}>{"My feature work."}</h2>
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
                <img src={"/assets/fabric-gantt-configuration.png"} width={"1912"} height={"1038"} loading={"lazy"} alt={"PowerTable Gantt configuration screen with task mappings over the planning timeline."} />
                <figcaption>{"My Gantt configuration UX/UI"}</figcaption>
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
                <img src={"/assets/fabric-conditional-timeline.png"} width={"1076"} height={"732"} loading={"lazy"} alt={"Gantt Resources timeline showing conditional-formatting colors across the resource plan."} />
                <figcaption>{"My resource conditional-formatting UX/UI"}</figcaption>
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
                <div className={"structure-map"} role={"img"} aria-label={"Concept diagram: rows and columns organize measures into summary and detail."}>
                  <span>{"Columns"}</span>
                  <span>{"Rows"}</span>
                  <strong>{"Measures"}</strong>
                  <span>{"Summary + detail"}</span>
                </div>
                <figcaption>{"Original concept diagram"}</figcaption>
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
                <p>{"PowerTable combines no-code, writeback-enabled data management with planning experiences in Microsoft Fabric. The objective is a coherent relationship between task detail, time, and resource availability."}</p>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
            <section id={"platform-context"} className={"platform-context wrap"} aria-labelledby={"platform-title"}>
              {"\n      "}
              <div className={"case-section-heading"}>
                <p className={"eyebrow"}>{"Product context / Microsoft Learn"}</p>
                <h2 id={"platform-title"}>{"What is planning in Fabric?"}</h2>
                <p>{"Microsoft Fabric is the wider data platform. Planning brings budgets, forecasts, scenarios, and operational data into that governed environment. PowerTable is its structured-data and data-application component; this case focuses on my planning UX/UI work, not the entire suite."}</p>
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
              <p className={"fine-print"}>{"A product relationship, not a mandatory setup sequence. Current Microsoft documentation calls this component “PowerTable sheets.” The supplied screen uses “PowerTable.” Neither the suite description nor the Microsoft icon implies ownership of all Fabric planning capabilities."}</p>
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
                <p>{"Compare the decisions people need to make, rather than count features. Microsoft Project is an adjacent scheduling reference; Fabric and PowerTable documentation establish the platform and product baseline."}</p>
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
                {"\n        "}
                <li>
                  <span className={"small-index"}>{"01 / Pain point"}</span>
                  <h3>{"A task row does not show the whole plan."}</h3>
                  <p>{"Task details need to remain connected to timing, timescale, and broader plan comparisons."}</p>
                  <p className={"solution-highlight"}>
                    <strong>{"Solution highlight"}</strong>
                    {"Design task creation and editing alongside a Gantt canvas, timeline navigation, columns, and comparison scope."}
                  </p>
                  <a className={"text-link"} href={"#gantt"}>
                    {"See Gantt design scope "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </li>
                {"\n        "}
                <li>
                  <span className={"small-index"}>{"02 / Pain point"}</span>
                  <h3>{"Assignments need capacity context."}</h3>
                  <p>{"A list of tasks alone does not explain who can take on work or how assignments relate to workload."}</p>
                  <p className={"solution-highlight"}>
                    <strong>{"Solution highlight"}</strong>
                    {"Connect resource assignments, backlog, summary bars, time tracking, and capacity visibility within resource Gantt design."}
                  </p>
                  <a className={"text-link"} href={"#resources"}>
                    {"See resource planning "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </li>
                {"\n        "}
                <li>
                  <span className={"small-index"}>{"03 / Pain point"}</span>
                  <h3>{"Summary and detail need different views."}</h3>
                  <p>{"Planning information needs a configurable structure rather than one fixed arrangement of all data."}</p>
                  <p className={"solution-highlight"}>
                    <strong>{"Solution highlight"}</strong>
                    {"Contribute cross-tab configuration for rows, columns, measures, and contextual settings that shape summary and detail."}
                  </p>
                  <a className={"text-link"} href={"#crosstab"}>
                    {"See cross-tab contribution "}
                    <span aria-hidden={"true"}>{"→"}</span>
                  </a>
                </li>
                {"\n      "}
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
                <p>{"I designed Gantt and resource Gantt experiences end to end, and contributed to cross-tab layout and data configuration."}</p>
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
                <p className={"flow-caption"}>{"Illustrative planning journey based on confirmed design scope, not a tested task sequence or a claim that every feature shipped. Resource and cross-tab views are related perspectives, not mandatory steps. Resource earned-value and baseline-planning work remained exploratory."}</p>
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
                <p>{"The design scope included the Gantt canvas, task creation and editing, timeline and timescale controls, column configuration, navigation, baseline comparison, effort tracking, and export."}</p>
                <p>{"The intent was to support movement between task detail and the broader plan. A connected canvas gives task information and timeline context a shared place, while configuration makes room for different planning needs."}</p>
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
                <p>{"The earlier Layout Configuration screen keeps Gantt selected in the view navigation and groups mappings under Tasks, Time Entries, Resource, and Cost. In the visible Tasks tab, start date, end date/duration, and Task ID carry required markers."}</p>
                <div className={"two-column"}>
                  <div>
                    <span className={"small-index"}>{"STRUCTURE"}</span>
                    <h3>{"Dates, identity, hierarchy"}</h3>
                    <p>{"Parent ID and Multiple Column Hierarchy are alternative hierarchy choices. Milestone, progress, dependency, and estimated effort have their own mapping controls."}</p>
                  </div>
                  <div>
                    <span className={"small-index"}>{"DISCLOSURE"}</span>
                    <h3>{"Core first, more when needed"}</h3>
                    <p>{"Filter columns and the expanded Additional mapping options area separate further settings from the core roles. Reset and Next remain visible in this earlier screen; the new supplied states use Save."}</p>
                  </div>
                </div>
                <p>{"The information banner describes a configuration shared across Gantt, Resource, Calendar, and Kanban layouts. That message explains the intended relationship; the supplied evidence does not verify cross-view synchronization or the completed save behavior."}</p>
                <a className={"text-link"} href={"/column-mapping.html"}>
                  {"Explore Column Mapping & Configuration "}
                  <span aria-hidden={"true"}>{"→"}</span>
                </a>
              </div>
              {"\n    "}
            </section>
            {"\n    "}
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
                <p>{"My resource Gantt scope included workspace and navigation, summary bars, resource assignment, backlog, time-tracking interactions, and capacity and workload visibility."}</p>
                <p>{"The design intent was to help people connect outstanding work with resource availability and see how assignments fit into a broader plan. This describes the purpose of the design, not a measured improvement in allocation or productivity."}</p>
                <div className={"note"}>
                  <span className={"eyebrow"}>{"Exploration, not a shipped claim"}</span>
                  <p>{"Earned-value and baseline-planning work for resource Gantt was exploratory. It is separate from the baseline-comparison design scope of the Gantt experience and is not presented as released functionality."}</p>
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
                <p>{"Alongside the Gantt work, I contributed to cross-tab layout and data configuration: rows, columns, measures, contextual settings, and the presentation of summarized and detailed information."}</p>
                <p>{"The intent was to make the relationship between configuration and the resulting view understandable, so people can shape a useful perspective on their data without losing its structure."}</p>
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
                <p>{"My involvement covered developer handoff, interaction and visual clarification, and implementation reviews. The goal was to keep the agreed workflow and interface behavior understandable as the experience moved from design into the build."}</p>
                <div className={"two-column"}>
                  <div>
                    <span className={"small-index"}>{"HANDOFF"}</span>
                    <h3>{"Make decisions explicit"}</h3>
                    <p>{"Explain the intended flow, control hierarchy, and state relationships so implementation questions can be resolved with the design context in view."}</p>
                  </div>
                  <div>
                    <span className={"small-index"}>{"IMPLEMENTATION REVIEW"}</span>
                    <h3>{"Review against the intent"}</h3>
                    <p>{"Work with engineering on interaction and visual details rather than treat the final design screen as the end of the contribution."}</p>
                  </div>
                </div>
                <p className={"fine-print"}>{"This describes my design-delivery scope, not production-code ownership. No handoff documents, QA logs, release records, or before-and-after performance results are supplied here."}</p>
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
                <p>{"Tasks depend on time. Assignments depend on capacity. Data views depend on configuration. Designing across those layers means considering transitions and shared context, not only individual screens."}</p>
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
                <p>
                  <a className={"text-link"} href={"https://lumel.com/powertable/"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"PowerTable — official Lumel product page "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </p>
                <p>
                  {"The opening product overview is paraphrased from Lumel’s official PowerTable page. Its screenshot comes from the "}
                  <a href={"https://docs.powertable.com/explore-powertable/layout-views/gantt-chart-view"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"official Gantt Chart View documentation ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {", re-encoded as WebP without cropping or added callouts. This is product context, not evidence that I designed every capability shown."}
                </p>
                <p>
                  <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/overview"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"What is planning in Fabric? "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </p>
                <p>
                  <a className={"text-link"} href={"https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-overview"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"PowerTable sheets in planning "}
                    <span aria-hidden={"true"}>{"↗"}</span>
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                </p>
                <p>{"Microsoft Learn provides current product context, not evidence that I designed the entire planning suite or that each design shown here shipped. The competitive comparison also cites Microsoft Project's official task and scheduling guidance."}</p>
                <p>
                  <a href={"https://www.linkedin.com/feed/update/urn:li:activity:7270117667141742592/"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Lumel’s public announcement about the Microsoft planning collaboration ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {" provides company-level context. It is not independent user research, an endorsement of my work, or evidence of my individual contribution."}
                </p>
                <p>
                  {"The unchanged Microsoft Fabric icon comes from "}
                  <a href={"https://learn.microsoft.com/en-us/fabric/fundamentals/icons"} target={"_blank"} rel={"noopener noreferrer"}>
                    {"Microsoft's official icon collection ↗"}
                    <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                  </a>
                  {" and identifies the actual platform, not Microsoft Office. It is not a custom PowerTable logo or an endorsement."}
                </p>
                <p>{"The Layout Configuration image is the supplied design screen, cropped to remove account and tenant chrome. It is not taken from Microsoft Learn. The process and connected-planning diagrams are original portfolio illustrations; their fictional sample data is not customer evidence."}</p>
                <p className={"fine-print"}>{"No interviews, competitor test results, usability improvements, adoption figures, or business impact metrics are invented. Analytics+ Gantt for Power BI remains a separate feature story."}</p>
              </div>
            </section>
            {"\n      "}
          </div>
          {"\n    "}
        </details>
        {"\n    "}
        <a className={"next-project wrap review-next"} href={"/analytics-plus.html"}>
          <span className={"eyebrow"}>{"Next / About 1 minute · Inforiver Analytics+"}</span>
          <span className={"next-title"}>
            {"From data"}
            <br />
            <em>{"to a clear story."}</em>
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
