import React from 'react';

export default function GanttPage() {
  return (
    <>
      {"\n  "}
      {"\n  "}
      {"\n  "}
      <main id={"main"}>
        {"\n    "}
        <section className={"case-hero wrap"}>
          {"\n      "}
          <a className={"back-link"} href={"/analytics-plus.html#features"}>{"← Inforiver Analytics+ features"}</a>
          {"\n      "}
          <p className={"eyebrow"}>{"02 / Inforiver Analytics+ feature"}</p>
          {"\n      "}
          <h1>
            {"Gantt for Power BI."}
            <br />
            <em>{"From fields to a timeline."}</em>
          </h1>
          {"\n      "}
          <p className={"case-summary"}>
            {"A clear starting point, guidance for mapping data,"}
            <br className={"desktop-break"} />
            {" and task detail connected to its place in time."}
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
          {"\n    "}
        </section>
        {"\n\n    "}
        <div className={"wizard-gallery case-evidence wrap"}>
          {"\n      "}
          <figure className={"detail-figure screenshot-scene"}>
            {"\n        "}
            <div className={"figure-label"}>
              <span className={"eyebrow"}>{"Screenshot / 01"}</span>
              <h3>{"A dedicated Gantt starting point"}</h3>
            </div>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/gantt-entry.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt entry screenshot full-size (opens in a new tab)"}>
              <img src={"/assets/gantt-entry.png"} width={"440"} height={"355"} fetchPriority={"high"} alt={"Analytics+ landing screen with Gantt selected alongside Charts, Cards, Tables, and Storyboard, plus the instruction to add data fields before building a chart."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Product screenshot · Gantt selected within Analytics+. "}
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
              <h3>{"Explain where the fields belong"}</h3>
            </div>
            {"\n        "}
            <a className={"product-screenshot native-shot"} href={"/assets/gantt-data-mapping.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View Gantt data-mapping guidance full-size (opens in a new tab)"}>
              <img src={"/assets/gantt-data-mapping.png"} width={"455"} height={"310"} alt={"Data-mapping help dialog illustrating date and actual-start and actual-end fields being added to Gantt/Network fields in Power BI."} />
            </a>
            {"\n        "}
            <figcaption>
              {"Product screenshot · Guidance for the Power BI field well. "}
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
        <section className={"case-brief wrap"} aria-label={"Case study at a glance"}>
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
            <p>{"The timeline depends on fields being available and assigned meaningful roles. The objective is clear entry, useful mapping guidance, and configuration beside the resulting report."}</p>
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
            {"\n        "}
            <li>
              <span className={"small-index"}>{"01 / Pain point"}</span>
              <h3>{"The intended view must be clear."}</h3>
              <p>{"A task-and-timeline report needs a recognizable starting point among the product’s other analysis options."}</p>
              <p className={"solution-highlight"}>
                <strong>{"Solution highlight"}</strong>
                {"Present Gantt as its own entry option alongside Charts, Cards, Tables, and Storyboard."}
              </p>
              <a className={"text-link"} href={"#entry"}>
                {"See the Gantt entry "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"02 / Pain point"}</span>
              <h3>{"Adding fields and assigning roles differ."}</h3>
              <p>{"A field in the Power BI field well still needs a meaning such as actual start, actual end, or progress."}</p>
              <p className={"solution-highlight"}>
                <strong>{"Solution highlight"}</strong>
                {"Bridge the field-well guidance and Pivot data role assignment, explaining both layers of setup."}
              </p>
              <a className={"text-link"} href={"#mapping"}>
                {"See data mapping "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            {"\n        "}
            <li>
              <span className={"small-index"}>{"03 / Pain point"}</span>
              <h3>{"Configuration needs a visible result."}</h3>
              <p>{"Field settings are difficult to interpret in isolation from the task rows and timeline they shape."}</p>
              <p className={"solution-highlight"}>
                <strong>{"Solution highlight"}</strong>
                {"Keep Pivot data beside the Gantt workspace, connecting task detail to its date-axis context."}
              </p>
              <a className={"text-link"} href={"#timeline"}>
                {"See the timeline "}
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
            <p>{"In Analytics+ for Power BI, that relationship spans two places: the Power BI field well and the visual’s Pivot data configuration. The setup needs to explain both where data is added and how each field is used."}</p>
            {"\n        "}
            <p>
              {"This case follows Gantt selection, the data-mapping help state, and the populated workspace. It is separate from my "}
              <a className={"text-link"} href={"/powertable.html"}>
                {"PowerTable work in Microsoft Fabric "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              {"."}
            </p>
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
            <p>{"The landing screen presents Gantt alongside Charts, Cards, Tables, and Storyboard. In the supplied state, Gantt is selected and grouped under Projects, distinguishing the task-and-timeline route from general analysis and presentation."}</p>
            {"\n        "}
            <p>{"The field instruction and inactive Build chart control communicate that setup is still required. Choosing a view is a starting point, not evidence that the underlying data is ready."}</p>
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
            <p>{"The Data-mapping dialog shows date fields moving into Gantt/Network fields in Power BI. Its instruction explicitly names the Gantt fields destination, making the requirement more concrete than a generic request to add data."}</p>
            {"\n        "}
            <p>{"The next layer is role assignment inside Pivot data: start date, end date, progress, and other Gantt-specific roles. Adding a field to Power BI and assigning its meaning within the visual are related but distinct actions."}</p>
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
            <p>{"The populated workspace places Pivot data and field-role settings on the left, with task rows and timeline bars alongside them. The date axis spans years, quarters, and months, while task names and group labels remain visible in the grid."}</p>
            {"\n        "}
            <p>{"The screenshot shows actual-start, actual-end, and progress mappings. The planned-date, milestone, and connector slots are also visible, but their presence is not a demonstration of configured behavior. The walkthrough stays focused on the setup and timeline states shown."}</p>
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
            <p>{"The sequence makes three questions visible: Which view am I creating? Where should the fields go? How do those fields become a timeline? The interface connects those questions through a dedicated entry, mapping guidance, and configuration beside the resulting view."}</p>
            {"\n        "}
            <p>{"One next refinement: align the entry instruction’s “Chart fields” wording with the mapping guidance’s “Gantt fields.” That is a terminology recommendation from these screens, not a change shown as implemented."}</p>
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
        <a className={"next-project wrap"} href={"/analytics.html"}>
          <span className={"eyebrow"}>{"Next feature / Chart Wizard"}</span>
          <span className={"next-title"}>
            {"Start with the question."}
            <br />
            <em>{"Find the right visual."}</em>
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
