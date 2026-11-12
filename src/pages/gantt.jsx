import React from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import { CaseDetails, CaseSnapshot, CaseContext, CaseFlow } from '../CaseReview.jsx';

export default function GanttPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"} className="design-review">
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/analytics-plus.html#features"}>{"← Inforiver Analytics+ features"}</a>
          {"\n      "}
          <ProjectIdentity product="analytics" />
          <WorkspaceFeatureTabs workspace="analytics" active="gantt" />
          {"\n      "}
          <h1>{"Gantt for Power BI."}</h1>
          {"\n      "}
          <p className="case-summary">{"Turn mapped task fields into a readable timeline."}</p>
          {"\n      "}
          <CaseContext role="Feature UX/UI · Handoff & implementation review">
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
                <dd>{"Entry, data mapping & timeline"}</dd>
              </div>
              {"\n      "}
            </dl>
          </CaseContext>
          {"\n    "}
        </section>

        {"\n\n    "}
        <div className={"wizard-gallery case-evidence wrap"}>
          {"\n      "}
          <figure className={"detail-figure screenshot-scene"}>
            {"\n        "}
            <div className={"figure-label"}>
              <span className={"eyebrow"}>{"Screenshot / 01"}</span>
              <h3>{"Choose Gantt."}</h3>
            </div>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/gantt-entry.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt entry screenshot full-size (opens in a new tab)"}>
              <img src={"/assets/gantt-entry.png"} width={"440"} height={"355"} fetchPriority={"high"} alt={"Analytics+ landing screen with Gantt selected alongside Charts, Cards, Tables, and Storyboard, plus the instruction to add data fields before building a chart."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Product screenshot · Analytics+ Gantt. "}
              <a className={"image-link"} href={"/assets/gantt-entry.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"View full-size ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n      "}
          <figure className={"detail-figure screenshot-scene"}>
            {"\n        "}
            <div className={"figure-label"}>
              <span className={"eyebrow"}>{"Screenshot / 02"}</span>
              <h3>{"Map the fields."}</h3>
            </div>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/gantt-data-mapping.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt data-mapping guidance full-size (opens in a new tab)"}>
              <img src={"/assets/gantt-data-mapping.png"} width={"455"} height={"310"} alt={"Data-mapping help dialog illustrating date and actual-start and actual-end fields being added to Gantt/Network fields in Power BI."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Product screenshot · Power BI field mapping. "}
              <a className={"image-link"} href={"/assets/gantt-data-mapping.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"View full-size ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
            {"\n      "}
          </figure>
          {"\n    "}
        </div>
        {"\n\n    "}
        <CaseSnapshot caseId="gantt" />
        <CaseDetails caseId="gantt">
        <section className={"case-brief wrap"} aria-label={"Detailed contribution summary"}>
          {"\n      "}
          <div>
            <h2>{"Design challenge"}</h2>
            <p>{"Connect report fields to the task, date, and progress roles needed for a meaningful Gantt view."}</p>
          </div>
          {"\n      "}
          <div>
            <h2>{"Case focus"}</h2>
            <p>{"Gantt entry, data-mapping guidance, and a workspace that keeps field configuration beside the timeline."}</p>
          </div>
          {"\n      "}
          <div>
            <h2>{"Evidence"}</h2>
            <p>{"Three product screenshots documenting the visible setup states. Interface values are not portfolio impact metrics."}</p>
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <details id={"user-flow"} className={"flow-disclosure wrap"}>
          {"\n      "}
          <summary>{"Explore the Gantt setup user flow"}</summary>
          {"\n      "}
          <nav className={"flow-overview"} aria-label={"Power BI Gantt setup flow"}>
            {"\n        "}
            <a className={"flow-stage"} href={"#entry"}>
              <span className={"flow-number"}>{"01"}</span>
              <span>
                <strong>{"Choose Gantt"}</strong>
                <small>{"Enter the project-view option within Analytics+."}</small>
              </span>
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
            {"\n        "}
            <a className={"flow-stage"} href={"#mapping"}>
              <span className={"flow-number"}>{"02"}</span>
              <span>
                <strong>{"Understand the data mapping"}</strong>
                <small>{"Add date fields to the Power BI field well, then assign their roles."}</small>
              </span>
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
            {"\n        "}
            <a className={"flow-stage"} href={"#timeline"}>
              <span className={"flow-number"}>{"03"}</span>
              <span>
                <strong>{"Read tasks against time"}</strong>
                <small>{"Keep task rows, mapped fields, and the date axis in view."}</small>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            {"\n        "}
            <p className={"flow-caption"}>{"A walkthrough of the supplied states, not a recording of every intermediate action."}</p>
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
          <a href={"#entry"}>{"Gantt entry"}</a>
          <a href={"#mapping"}>{"Data mapping"}</a>
          <a href={"#timeline"}>{"Timeline"}</a>
          <a href={"#reflection"}>{"Reflection"}</a>
        </nav>
        {"\n    "}
        <section id={"business-case"} className={"editorial-section wrap"} aria-label={"Business case"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"Business case"}</span>
            <h2>
              {"Make project data"}
              <br />
              <em>{"readable in time."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            <p className={"large-copy"}>{"Turn task and date fields into an understandable project view."}</p>
            <CaseFlow steps={[["Choose Gantt","Start with project reporting"],["Map fields","Assign task and date roles"],["Read the timeline","Keep configuration beside the view"]]} />
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <section id={"solutions"} className={"solution-section wrap"} aria-labelledby={"solutions-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Design rationale"}</p>
            <h2 id={"solutions-title"}>{"Pain points & solution highlights."}</h2>
            {"      "}
            <p>{"Setup challenges visible in the supplied states, paired with the interface decisions that address them."}</p>
          </div>
          {"\n      "}
          <ol className={"solution-grid"} role={"list"}>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"01 / Pain point"}</span><h3>{"The intended view must be clear."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Give project reporting a dedicated Gantt entry."}</p>
              <a className={"text-link"} href={"#entry"}>
                {"See the Gantt entry "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"02 / Pain point"}</span><h3>{"Adding fields and assigning roles differ."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Add fields in Power BI; assign their roles in Pivot data."}</p>
              <a className={"text-link"} href={"#mapping"}>
                {"See data mapping "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"03 / Pain point"}</span><h3>{"Configuration needs a visible result."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Keep field configuration beside task rows and timeline bars."}</p>
              <a className={"text-link"} href={"#timeline"}>
                {"See the timeline "}
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
            <h2 id={"concept-title"}>{"Fields become roles. Roles shape the timeline."}</h2>
          </div>
          {"\n      "}
          <div className={"concept-map"}>
            {"\n        "}
            <a className={"concept-node"} href={"#mapping"}>
              <span className={"small-index"}>{"Power BI"}</span>
              <strong>{"Available fields"}</strong>
              <span>{"Make task and date information available to the visual."}</span>
            </a>
            {"\n        "}
            <a className={"concept-node"} href={"#mapping"}>
              <span className={"small-index"}>{"Analytics+ / Pivot data"}</span>
              <strong>{"Role mapping"}</strong>
              <span>{"Identify start, end, progress, and display roles."}</span>
            </a>
            {"\n        "}
            <a className={"concept-node"} href={"#timeline"}>
              <span className={"small-index"}>{"Report view"}</span>
              <strong>{"Task + time"}</strong>
              <span>{"Relate the task grid to bars on a shared date axis."}</span>
            </a>
            {"\n      "}
          </div>
          {"\n      "}
          <figcaption>{"Original explanatory diagram, not a product screenshot. It distinguishes field availability from role assignment; empty planned-date, milestone, and connector slots are not treated as configured features."}</figcaption>
          {"\n    "}
        </figure>
        {"\n\n    "}
        <section id={"overview"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"01 / Overview"}</span>
            <h2>
              {"Before the timeline,"}
              <br />
              <em>{"make the setup clear."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"A Gantt view starts with a relationship between tasks, dates, and the fields that describe them."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"Two setup layers: add data in Power BI’s field well; assign meaning in Pivot data."}</li>
              <li>
              {"This case follows Gantt selection, the data-mapping help state, and the populated workspace. It is separate from my "}
              <a className={"text-link"} href={"/powertable.html"}>
                {"PowerTable work in Microsoft Fabric "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              {"."}
            </li>
            </ul>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"entry"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"02 / Gantt entry"}</span>
            <h2>
              {"Give project work"}
              <br />
              <em>{"its own starting point."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"Make the intended view explicit before asking people to configure it."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"Gantt sits under Projects, alongside Charts, Cards, Tables, and Storyboard. A distinct route for task-and-time reporting."}</li>
              <li>{"Field guidance + inactive Build chart = setup still required. Choosing Gantt does not mean data is ready."}</li>
            </ul>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"mapping"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"03 / Data mapping"}</span>
            <h2>
              {"Bridge the field well"}
              <br />
              <em>{"and the visual."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"Explain the destination, not just the missing information."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"The mapping dialog names the destination: Gantt/Network fields in Power BI."}</li>
              <li>{"Then assign start, end, progress, and other roles in Pivot data. Adding fields and assigning meaning are distinct."}</li>
            </ul>
            {"\n        "}
            <div className={"two-column"}>
              <div>
                <span className={"small-index"}>{"POWER BI / FIELD WELL"}</span>
                <h3>{"Make the fields available"}</h3>
                <p>{"Add the relevant task and date data to the visual’s field parameters."}</p>
              </div>
              <div>
                <span className={"small-index"}>{"ANALYTICS+ / PIVOT DATA"}</span>
                <h3>{"Give each field a role"}</h3>
                <p>{"Map available fields to the start, end, progress, and display configuration."}</p>
              </div>
            </div>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"timeline"} className={"editorial-section wrap walkthrough-step"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"04 / Timeline workspace"}</span>
            <h2>
              {"Keep the task detail."}
              <br />
              <em>{"Add the time context."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"The configuration and the resulting view should be understandable together."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"Pivot data sits beside task rows and timeline bars. Years, quarters, and months preserve time context."}</li>
              <li>{"Actual-start, actual-end, and progress are mapped. Planned dates, milestones, and connectors are visible slots—not demonstrated configured behavior."}</li>
            </ul>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene"}>
          {"\n      "}
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Screenshot / 03"}</span>
            <h3>{"Field roles beside the task-and-timeline view"}</h3>
          </div>
          {"\n      "}
          <a className={"product-screenshot"} href={"/assets/gantt-timeline.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Power BI Gantt timeline full-size (opens in a new tab)"}>
            <img src={"/assets/gantt-timeline.png"} width={"1406"} height={"786"} loading={"lazy"} alt={"Analytics+ Gantt workspace with Pivot data and start, end, and progress mappings on the left, task names in a grid, and blue task bars across a year, quarter, and month timeline."} />
          </a>
          {"\n      "}
          <figcaption>
            {"Product screenshot · Analytics+ Gantt visual, cropped without browser, account, or surrounding Power BI workspace chrome. Use inspection to read the field settings at original resolution. "}
            <a className={"image-link"} href={"/assets/gantt-timeline.png"} target={"_blank"} rel={"noopener noreferrer"}>
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
            <span className={"eyebrow"}>{"05 / Reflection & references"}</span>
            <h2>
              {"Clarity begins"}
              <br />
              <em>{"before the chart."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"The setup experience is part of the visualization experience."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"Three setup questions: Which view? Where do fields go? How do they become a timeline?"}</li>
              <li>{"Next refinement: align “Chart fields” with “Gantt fields.” A recommendation, not a change shown as implemented."}</li>
            </ul>
            {"\n        "}
            <details className={"evidence-note"}>
              <summary>{"Role, delivery & evidence"}</summary>
              <div className={"note"}>
                <p>
                  <strong>{"Role:"}</strong>
                  {" Analytics+ Gantt entry, field mapping, and task/timeline UX/UI, separate from PowerTable's Fabric planning work."}
                </p>
                <p>
                  <strong>{"Evidence:"}</strong>
                  {" three product states. This is report setup, not demonstrated writeback scheduling. Formal usability results and customer-impact measurements are not included."}
                </p>
              </div>
            </details>
            {"\n        "}
            <div className={"note"}>
              {"\n          "}
              <span className={"eyebrow"}>{"Official product references"}</span>
              {"\n          "}
              <p>
                <a href={"https://docs.inforiver.com/analytics+/gantt-chart"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"Analytics+ Gantt setup documentation "}
                  <span aria-hidden={"true"}>{"↗"}</span>
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
                {" describes selecting Gantt, adding task and date fields in Power BI, and assigning roles in Pivot data."}
              </p>
              {"\n          "}
              <p>
                <a href={"https://inforiver.com/analytics-plus/gantt-chart/"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"Inforiver’s Gantt feature overview "}
                  <span aria-hidden={"true"}>{"↗"}</span>
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
                {" provides broader product context. These are vendor documentation, not independent customer reviews or proof of personal impact."}
              </p>
              {"\n          "}
              <p>
                {"The "}
                <a href={"https://store-ap.inforiver.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"Analytics+ template store "}
                  <span aria-hidden={"true"}>{"↗"}</span>
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
                {" is catalogue context, not a Gantt review page."}
              </p>
              {"\n        "}
            </div>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        </CaseDetails>
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
