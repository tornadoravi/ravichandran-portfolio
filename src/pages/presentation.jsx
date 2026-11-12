import React from 'react';
import ProjectIdentity from '../ProjectIdentity.jsx';
import WorkspaceFeatureTabs from '../WorkspaceFeatureTabs.jsx';
import { CaseDetails, CaseContext, CaseFlow, CaseHighlights } from '../CaseReview.jsx';
import CaseStoryNav from '../CaseStoryNav.jsx';

export default function PresentationPage() {
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
          <WorkspaceFeatureTabs workspace="analytics" active="presentation" />
          {"\n      "}
          <h1>{"Annotations & Presentation."}</h1>
          {"\n      "}
          <p className="case-summary">{"Explain the insight without leaving the report."}</p>
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
                <dd>{"Data context & presentation"}</dd>
              </div>
              {"\n      "}
            </dl>
          </CaseContext>
          {"\n    "}
        </section>

        {"\n\n    "}
        <section className="presentation-summary case-snapshot wrap" aria-labelledby="presentation-summary-title">
          <CaseStoryNav caseId="presentation" />
          <h2 id="presentation-summary-title" className="visual-story-title">Put the explanation beside the data.</h2>
          <CaseHighlights caseId="presentation" facts={[
            'A chart can show the change without explaining it.',
            'Keep explanations and presentation controls beside the data.',
            'Nine design screens; release status is not verified here.'
          ]} />
        </section>
        <CaseDetails title="View design screens & walkthrough">
        <section id="design-screens" className={"case-evidence wrap"} aria-labelledby={"screens-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Design screens / 01–03"}</p>
            <h2 id={"screens-title"}>{"Prepare the report for presentation."}</h2>
            <p>{"Nine design screens: setup, annotation styling, playback controls, chart callouts. Supplied order, not as a recording of every interaction."}</p>
          </div>
          {"\n      "}
          <div className={"presentation-gallery"}>
            {"\n        "}
            <figure className={"detail-figure screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Screen / 01"}</span>
                <h3>{"Presentation disabled"}</h3>
              </div>
              <a className={"product-screenshot native-shot"} href={"/assets/presentation-screen-01.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View supplied presentation screen 01 full-size (opens in a new tab)"}>
                <img src={"/assets/presentation-screen-01.png"} width={"1707"} height={"830"} loading={"lazy"} alt={"Analytics+ Advanced panel with Enable Present switched off, numbered annotation markers, and a report-level comments region."} />
              </a>
              <figcaption>
                {"Design screen · Enable Present is off; an instructional callout identifies the setting. "}
                <a className={"image-link"} href={"/assets/presentation-screen-01.png"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View full-size ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
            </figure>
            {"\n        "}
            <figure className={"detail-figure screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Screen / 02"}</span>
                <h3>{"Enable presentation"}</h3>
              </div>
              <a className={"product-screenshot native-shot"} href={"/assets/presentation-screen-02.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View supplied presentation screen 02 full-size (opens in a new tab)"}>
                <img src={"/assets/presentation-screen-02.png"} width={"1707"} height={"830"} loading={"lazy"} alt={"Enable Present switched on in the Advanced panel, with a blue Present button above the numbered comments."} />
              </a>
              <figcaption>
                {"Design screen · The enabled state shows a Present action within the comments region. "}
                <a className={"image-link"} href={"/assets/presentation-screen-02.png"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View full-size ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
            </figure>
            {"\n        "}
            <figure className={"detail-figure screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Screen / 03"}</span>
                <h3>{"Format the presentation"}</h3>
              </div>
              <a className={"product-screenshot native-shot"} href={"/assets/presentation-screen-03.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View supplied presentation screen 03 full-size (opens in a new tab)"}>
                <img src={"/assets/presentation-screen-03.png"} width={"1707"} height={"830"} loading={"lazy"} alt={"Expanded Enable Present settings showing text formatting and a Template Style selector alongside the report."} />
              </a>
              <figcaption>
                {"Design screen · Expanded presentation settings expose text formatting and the template-style selector. "}
                <a className={"image-link"} href={"/assets/presentation-screen-03.png"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View full-size ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
            </figure>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section className={"case-brief wrap"} aria-label={"Detailed contribution summary"}>
          {"\n      "}
          <div>
            <h2>{"Design challenge"}</h2>
            <p>{"Connect an observation, its explanation, and the audience’s focus without losing the report context."}</p>
          </div>
          {"\n      "}
          <div>
            <h2>{"My contribution"}</h2>
            <p>{"Annotations, presentation mode, and slideshow interactions within my Analytics+ design work."}</p>
          </div>
          {"\n      "}
          <div>
            <h2>{"Evidence & status"}</h2>
            <p>{"Nine supplied full-resolution design screens, two concept illustrations, and official references. Inspect each at 1707 × 830."}</p>
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <details id={"user-flow"} className={"flow-disclosure wrap"}>
          {"\n      "}
          <summary>{"Explore the annotation and presentation user flow"}</summary>
          {"\n      "}
          <nav className={"flow-overview"} aria-label={"Presentation user flow"}>
            {"\n        "}
            <a className={"flow-stage"} href={"#overview"}>
              <span className={"flow-number"}>{"01"}</span>
              <span>
                <strong>{"Choose the visual context"}</strong>
                <small>{"Start with the report, chart, or specific data point being discussed."}</small>
              </span>
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
            {"\n        "}
            <a className={"flow-stage"} href={"#annotations"}>
              <span className={"flow-number"}>{"02"}</span>
              <span>
                <strong>{"Add an annotation"}</strong>
                <small>{"Connect the explanation to a data point or the wider canvas."}</small>
              </span>
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
            {"\n        "}
            <a className={"flow-stage"} href={"#comments"}>
              <span className={"flow-number"}>{"03"}</span>
              <span>
                <strong>{"Review the comments"}</strong>
                <small>{"Consider individual annotations and the consolidated comments view."}</small>
              </span>
              <span aria-hidden={"true"}>{"↓"}</span>
            </a>
            {"\n        "}
            <a className={"flow-stage"} href={"#presentation"}>
              <span className={"flow-number"}>{"04"}</span>
              <span>
                <strong>{"Present the data story"}</strong>
                <small>{"Bring attention to the relevant visual and its explanation."}</small>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            {"\n        "}
            <p className={"flow-caption"}>{"Illustrative flow—not recorded clicks. Authoring annotations and presenting to an audience are different contexts."}</p>
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
          <a href={"#annotations"}>{"Annotations"}</a>
          <a href={"#comments"}>{"Comments"}</a>
          <a href={"#presentation"}>{"Presentation"}</a>
          <a href={"#reflection"}>{"Reflection"}</a>
          <a href={"#references"}>{"References"}</a>
        </nav>
        {"\n    "}
        <section id={"business-case"} className={"editorial-section wrap"} aria-label={"Business case"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"Business case"}</span>
            <h2>
              {"Help the audience"}
              <br />
              <em>{"understand the meaning."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            <p className={"large-copy"}>{"Support the explanation of data, not only its display."}</p>
            <CaseFlow steps={[["Reference","A data point or the whole report"],["Explain","Attach the observation"],["Focus","Guide the audience"]]} />
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
            <p>{"Communication challenges grounded in the confirmed scope and documented capabilities."}</p>
          </div>
          {"\n      "}
          <ol className={"solution-grid"} role={"list"}>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"01 / Pain point"}</span><h3>{"An explanation needs a reference."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Distinguish data-point notes from report-wide explanations."}</p>
              <a className={"text-link"} href={"#annotations"}>
                {"See annotations "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"02 / Pain point"}</span><h3>{"Notes need a shared reading context."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Connect notes through the documented Comments pane—not full-panel ownership."}</p>
              <a className={"text-link"} href={"#comments"}>
                {"See comments context "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </li>
            <li>
              <div className="solution-problem"><span className={"small-index"}>{"03 / Pain point"}</span><h3>{"A dense report divides attention."}</h3></div>
              <p className={"solution-highlight"}><strong>{"Solution highlight"}</strong>{"Guide attention from the report overview to the relevant observation."}</p>
              <a className={"text-link"} href={"#presentation"}>
                {"See presentation intent "}
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
            <h2 id={"concept-title"}>{"Reference. Explanation. Attention."}</h2>
          </div>
          {"\n      "}
          <div className={"concept-map"}>
            {"\n        "}
            <a className={"concept-node"} href={"#annotations"}>
              <span className={"small-index"}>{"Reference"}</span>
              <strong>{"Data context"}</strong>
              <span>{"A particular data point or the wider canvas."}</span>
            </a>
            {"\n        "}
            <a className={"concept-node"} href={"#comments"}>
              <span className={"small-index"}>{"Meaning"}</span>
              <strong>{"Explanation"}</strong>
              <span>{"Individual annotations and the consolidated comments context."}</span>
            </a>
            {"\n        "}
            <a className={"concept-node"} href={"#presentation"}>
              <span className={"small-index"}>{"Communication"}</span>
              <strong>{"Audience focus"}</strong>
              <span>{"Present the relevant visual together with its explanation."}</span>
            </a>
            {"\n      "}
          </div>
          {"\n      "}
          <figcaption>{"Original explanatory diagram, not a product screenshot or verified playback sequence. It explains the relationship between the three capabilities; the detailed illustrations below use fictional content."}</figcaption>
          {"\n    "}
        </figure>
        {"\n\n    "}
        <section id={"overview"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"01 / Overview"}</span>
            <h2>
              {"A chart shows the data."}
              <br />
              <em>{"The story needs context."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"Data storytelling connects what the audience can see with what the presenter needs to explain."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"My scope: annotations, presentation mode, slideshow interactions. Connect explanations to visuals and guide audience attention."}</li>
              <li>
              {"Report creation, layout, and templates are covered in the separate "}
              <a className={"text-link"} href={"/storyboard.html"}>
                {"Storyboard authoring case "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              {". Its six screenshots remain authoring evidence, not presentation-mode screenshots."}
            </li>
            </ul>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"annotations"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"02 / Annotations"}</span>
            <h2>
              {"Explain the point."}
              <br />
              <em>{"Preserve its reference."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"An explanation is useful only when its relationship to the visual is clear."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"Keep the observation beside its reference. Distinguish one data point from the whole report."}</li>
              <li>{"Documentation covers canvas/data-point annotations, rich text, and indicators—not my ownership of every setting."}</li>
            </ul>
            {"\n        "}
            <div className={"two-column"}>
              <div>
                <span className={"small-index"}>{"SPECIFIC OBSERVATION"}</span>
                <h3>{"Point-level meaning"}</h3>
                <p>{"Keep the intended data reference recognizable when explaining a particular value or contrast."}</p>
              </div>
              <div>
                <span className={"small-index"}>{"WIDER CONTEXT"}</span>
                <h3>{"Report-level meaning"}</h3>
                <p>{"Give broader explanations a clear place without implying that they describe one data point."}</p>
              </div>
            </div>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <figure className={"detail-figure wrap screenshot-scene"}>
          {"\n      "}
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Concept illustration / 01"}</span>
            <h3>{"Connect the observation to its explanation"}</h3>
          </div>
          {"\n      "}
          <a className={"product-screenshot"} href={"/assets/annotation-context.svg"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View conceptual annotation illustration full-size (opens in a new tab)"}>
            <img src={"/assets/annotation-context.svg"} data-visual-kind={"illustration"} width={"1040"} height={"580"} loading={"lazy"} alt={"Conceptual illustration, not a product screenshot: markers on a fictional regional chart connect individual data points to explanatory notes and wider report context."} />
          </a>
          {"\n      "}
          <figcaption>
            {"Original conceptual illustration · Fictional content, not a product screenshot or Figma capture. "}
            <a className={"image-link"} href={"/assets/annotation-context.svg"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View illustration full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
          {"\n    "}
        </figure>
        {"\n\n    "}
        <section id={"comments"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"03 / Comments"}</span>
            <h2>
              {"Individual notes."}
              <br />
              <em>{"A connected explanation."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"The report needs a way to make its explanations understandable together."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"All comments consolidates element-level and dashboard annotations. This is documented annotation behavior—not an assumed threaded discussion system."}</li>
              <li>{"Keep each consolidated note connected to its source. The concept illustration shows this relationship—not an exact product layout."}</li>
              <li>{"Comments-panel capabilities provide product context; my contribution here covers annotations, presentation mode, and slideshow interactions."}</li>
            </ul>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section className={"wrap"} aria-labelledby={"annotation-screens-title"}>
          {"\n      "}
          <div className={"case-section-heading"}>
            <p className={"eyebrow"}>{"Design screens / 04–07"}</p>
            <h2 id={"annotation-screens-title"}>{"From the report to a chart."}</h2>
            <p>{"Supplied states: template choice, enlarged chart, playback guidance, contextual annotation. Their order is not a verified action sequence."}</p>
          </div>
          {"\n      "}
          <div className={"presentation-gallery"}>
            {"\n        "}
            <figure className={"detail-figure screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Screen / 04"}</span>
                <h3>{"Choose a callout style"}</h3>
              </div>
              <a className={"product-screenshot native-shot"} href={"/assets/presentation-screen-04.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View supplied presentation screen 04 full-size (opens in a new tab)"}>
                <img src={"/assets/presentation-screen-04.png"} width={"1707"} height={"830"} loading={"lazy"} alt={"Presentation settings with four blue callout-style previews open and a Present button above the report comments."} />
              </a>
              <figcaption>
                {"Design screen · Callout-style choices are shown alongside guidance for starting presentation. "}
                <a className={"image-link"} href={"/assets/presentation-screen-04.png"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View full-size ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
            </figure>
            {"\n        "}
            <figure className={"detail-figure screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Screen / 05"}</span>
                <h3>{"Focus on the monthly chart"}</h3>
              </div>
              <a className={"product-screenshot native-shot"} href={"/assets/presentation-screen-05.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View supplied presentation screen 05 full-size (opens in a new tab)"}>
                <img src={"/assets/presentation-screen-05.png"} width={"1707"} height={"830"} loading={"lazy"} alt={"Enlarged Actuals and Plan by Month chart with monthly columns and a deviation strip, surrounded by the Power BI interface."} />
              </a>
              <figcaption>
                {"Design screen · A single monthly chart fills the report canvas while Power BI panels remain visible. "}
                <a className={"image-link"} href={"/assets/presentation-screen-05.png"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View full-size ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
            </figure>
            {"\n        "}
            <figure className={"detail-figure screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Screen / 06"}</span>
                <h3>{"Playback and return controls"}</h3>
              </div>
              <a className={"product-screenshot native-shot"} href={"/assets/presentation-screen-06.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View supplied presentation screen 06 full-size (opens in a new tab)"}>
                <img src={"/assets/presentation-screen-06.png"} width={"1707"} height={"830"} loading={"lazy"} alt={"Monthly chart with Back to storyboard, a playback toolbar, and yellow guidance callouts describing cursor and toolbar visibility."} />
              </a>
              <figcaption>
                {"Design screen · Playback controls and Back to storyboard appear with instructional hover guidance; this static screen does not demonstrate playback behavior. "}
                <a className={"image-link"} href={"/assets/presentation-screen-06.png"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View full-size ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
            </figure>
            {"\n        "}
            <figure className={"detail-figure screenshot-scene"}>
              <div className={"figure-label"}>
                <span className={"eyebrow"}>{"Screen / 07"}</span>
                <h3>{"Keep the explanation with the data"}</h3>
              </div>
              <a className={"product-screenshot native-shot"} href={"/assets/presentation-screen-07.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View supplied presentation screen 07 full-size (opens in a new tab)"}>
                <img src={"/assets/presentation-screen-07.png"} width={"1707"} height={"830"} loading={"lazy"} alt={"Monthly Actuals and Plan chart with a blue annotation callout pointing to the February column."} />
              </a>
              <figcaption>
                {"Design screen · A blue callout connects the explanation to the February column. "}
                <a className={"image-link"} href={"/assets/presentation-screen-07.png"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"View full-size ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
              </figcaption>
            </figure>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"presentation"} className={"editorial-section wrap walkthrough-step"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"04 / Presentation"}</span>
            <h2>
              {"From the overview"}
              <br />
              <em>{"to the point that matters."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"Presentation changes the question from “What can I configure?” to “What should the audience follow?”"}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"My presentation/slideshow contribution focused on guiding the explanation, rather than asking viewers to interpret everything at once."}</li>
              <li>{"Animated annotations and Present are vendor-documented capabilities—not recordings of my prototype or proof the concept sequence shipped."}</li>
              <li>{"Report overview → relevant region → observation. Concept diagram only; no invented shortcuts, controls, or transition timing."}</li>
            </ul>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n    "}
        <div className={"presentation-gallery wrap"}>
          {"\n      "}
          <figure className={"detail-figure screenshot-scene"}>
            <div className={"figure-label"}>
              <span className={"eyebrow"}>{"Screen / 08"}</span>
              <h3>{"Compare quarterly performance"}</h3>
            </div>
            <a className={"product-screenshot native-shot"} href={"/assets/presentation-screen-08.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View supplied presentation screen 08 full-size (opens in a new tab)"}>
              <img src={"/assets/presentation-screen-08.png"} width={"1707"} height={"830"} loading={"lazy"} alt={"Actuals and Plan by Quarter small-multiple waterfall charts for Enterprise, Business, SuperMarket, and Mid size."} />
            </a>
            <figcaption>
              {"Design screen · Four quarterly waterfall charts provide a small-multiple comparison. "}
              <a className={"image-link"} href={"/assets/presentation-screen-08.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"View full-size ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
          </figure>
          {"\n      "}
          <figure className={"detail-figure screenshot-scene"}>
            <div className={"figure-label"}>
              <span className={"eyebrow"}>{"Screen / 09"}</span>
              <h3>{"Callout within small multiples"}</h3>
            </div>
            <a className={"product-screenshot native-shot"} href={"/assets/presentation-screen-09.png"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View supplied presentation screen 09 full-size (opens in a new tab)"}>
              <img src={"/assets/presentation-screen-09.png"} width={"1707"} height={"830"} loading={"lazy"} alt={"Quarterly small-multiple waterfall charts with a blue annotation callout pointing into the Enterprise chart."} />
            </a>
            <figcaption>
              {"Design screen · A blue annotation callout is positioned within the Enterprise chart. "}
              <a className={"image-link"} href={"/assets/presentation-screen-09.png"} target={"_blank"} rel={"noopener noreferrer"}>
                {"View full-size ↗"}
                <span className={"sr-only"}>{" (opens in a new tab)"}</span>
              </a>
            </figcaption>
          </figure>
          {"\n    "}
        </div>
        {"\n    "}
        <figure className={"detail-figure wrap screenshot-scene"}>
          {"\n      "}
          <div className={"figure-label"}>
            <span className={"eyebrow"}>{"Concept / 02"}</span>
            <h3>{"Focus the audience without losing the wider story"}</h3>
          </div>
          {"\n      "}
          <a className={"product-screenshot"} href={"/assets/presentation-focus.svg"} target={"_blank"} rel={"noopener noreferrer"} aria-label={"View conceptual presentation illustration full-size (opens in a new tab)"}>
            <img src={"/assets/presentation-focus.svg"} data-visual-kind={"illustration"} width={"1040"} height={"580"} loading={"lazy"} alt={"Conceptual presentation illustration, not a product screenshot: a report overview connects to an enlarged fictional chart region with one explanatory note."} />
          </a>
          {"\n      "}
          <figcaption>
            {"Original conceptual illustration · A design principle, not demonstrated product playback or a Figma capture. "}
            <a className={"image-link"} href={"/assets/presentation-focus.svg"} target={"_blank"} rel={"noopener noreferrer"}>
              {"View illustration full-size ↗"}
              <span className={"sr-only"}>{" (opens in a new tab)"}</span>
            </a>
          </figcaption>
          {"\n    "}
        </figure>
        {"\n\n    "}
        <section id={"reflection"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"05 / Reflection"}</span>
            <h2>
              {"The explanation"}
              <br />
              <em>{"is part of the experience."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <p className={"large-copy"}>{"The visual and the narrative should support each other."}</p>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"Annotation = reference. Comments = connected explanation. Presentation = audience focus. Keep the visual and narrative aligned."}</li>
            </ul>
            {"\n        "}
            <details className={"evidence-note"}>
              <summary>{"Role, delivery & evidence"}</summary>
              <div className={"note"}>
                <p>
                  <strong>{"Role:"}</strong>
                  {" annotations, presentation mode, and slideshow interactions. Comments documentation is product context."}
                </p>
                <p>
                  <strong>{"Evidence:"}</strong>
                  {" nine design screens and two separately labeled concept illustrations. Screens document design states, not recorded playback or every intermediate transition."}
                </p>
                <p>
                  <strong>{"Review:"}</strong>
                  {" broader Analytics+ requirements walkthroughs and implementation reviews. Feature-specific user-study results and customer-impact measurements are not included."}
                </p>
              </div>
            </details>
            {"\n      "}
          </div>
          {"\n    "}
        </section>
        {"\n\n    "}
        <section id={"references"} className={"editorial-section wrap"}>
          {"\n      "}
          <div className={"section-label"}>
            <span className={"eyebrow"}>{"06 / References"}</span>
            <h2>
              {"Product context."}
              <br />
              <em>{"Clear source boundaries."}</em>
            </h2>
          </div>
          {"\n      "}
          <div className={"section-copy"}>
            {"\n        "}
            <ul className="case-key-points">
              <li>{"The sources below describe product capabilities. They are vendor documentation, not independent customer reviews or proof of personal design ownership."}</li>
            </ul>
            {"\n        "}
            <div className={"note"}>
              {"\n          "}
              <span className={"eyebrow"}>{"Official feature references"}</span>
              {"\n          "}
              <p>
                <a href={"https://docs.inforiver.com/analytics+/storyboard/annotations"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"Analytics+ annotation and presentation guide ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
                {" covers annotation creation, All comments, the Comments pane, and animated annotations."}
              </p>
              {"\n          "}
              <p>
                <a href={"https://inforiver.com/analytics-plus/faq/"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"Analytics+ FAQ ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
                {" explains canvas and data-point annotation context."}
              </p>
              {"\n          "}
              <p>
                <a href={"https://store-ap.inforiver.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                  {"Analytics+ template store ↗"}
                  <span className={"sr-only"}>{" (opens in a new tab)"}</span>
                </a>
                {" is catalogue context, not an annotation or presentation review."}
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
