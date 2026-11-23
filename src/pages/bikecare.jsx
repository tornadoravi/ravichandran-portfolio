import React, { useRef, useState } from 'react';
import { sitePath } from '../site-path.js';
import { Chapter, readingChapters, EvidenceScreen, ScreenWalkthrough } from '../CasePresentation.jsx';
import CaseStudyPlayer from '../CaseStudyPlayer.jsx';
import WalkthroughEntry from '../WalkthroughEntry.jsx';
import CaseSolution from '../CaseSolution.jsx';
import CaseConceptFilm from '../CaseConceptFilm.jsx';
import CaseIllustration from '../CaseIllustration.jsx';
import { CaseContext } from '../CaseReview.jsx';
import { bikecareFacts, bikecareNarrative, bikecareScreens, bikecareEarlierScreens, bikecareResearch, bikecareScreenGroups, bikecareCoverage } from '../bikecare-story.js';
import { designTokens } from '../bikecare-ux-model.js';
import BikeCareApp from '../BikeCareApp.jsx';
import { BikeCareLogo, bikecarePhotography } from '../BikeCareBrand.jsx';
import { BikeCareIdentity, BikeCareSystemPreview, BikeCareCompetitivePosition, BikeCareArchitecture, BikeCareJourneyMap, BikeCareBusinessModel, BikeCareDesignDocumentation } from '../BikeCareProductStrategy.jsx';
import ProductCover from '../ProductCover.jsx';

const screens = bikecareScreens.map(screen => ({ ...screen, src: sitePath(screen.src) }));

export default function BikeCarePage() {
  const player = useRef(null);
  const [screenGroup, setScreenGroup] = useState('care');
  return <><main id="main" className="design-review bikecare-study">
    <section className="case-hero wrap">
      <a className="back-link" href={sitePath('/#project-bikecare')}>All case studies</a>
      <p className="eyebrow">Self-initiated UX/UI design / Clickable concept</p>
      <h1>BikeCare</h1>
      <p className="case-summary">Local service. Timely care. A history for resale.</p>
      <CaseContext role="UX/UI concept / Not launched">
      <dl className="cod-case-meta">
        <div><dt>Design focus</dt><dd>Care first. Parts and rides support it.</dd></div>
        <div><dt>Experience</dt><dd>Four service roles + support recovery</dd></div>
        <div><dt>Design output</dt><dd>{screens.length} mobile screens + clickable flows</dd></div>
        <div><dt>Research</dt><dd>Public-source desk research; fieldwork pending</dd></div>
      </dl>
      </CaseContext>
      <p className="cod-scope-note">UX/UI design only, not a production application. Brand-style job cards for independent shops; no manufacturer affiliation or actual supplier verification.</p>
      <nav className="bikecare-strategy-index" aria-label="BikeCare case-study deliverables">
        <a href="#case-overview">Read the complete case study</a>
        <a href="#bikecare-prototype">Try the clickable prototype</a>
        <a href={sitePath('/assets/bikecare-design-system.md')} download>Download the Signal design-system guide</a>
      </nav>
    </section>
    <div className="case-presentation-layout">
        <WalkthroughEntry caseId="bikecare" readHref="#case-overview"><CaseStudyPlayer ref={player} caseId="bikecare" name="BikeCare" narrative={bikecareNarrative}
          facts={bikecareFacts} screen={screens[0]} evidenceNote={bikecareFacts[2][1]} concept /></WalkthroughEntry>
      <div className="case-presentation-hero">
        <div className="case-hero-preview"><ProductCover product="bikecare" /></div>
      </div>
      <div className="case-chapters">
        <aside className="case-fast-read" aria-label="Case in 30 seconds">
          <p className="case-card-number">The idea</p>
          <dl>
            <div><dt>Scenario</dt><dd>Local servicing leaves care and resale records disconnected.</dd></div>
            <div className="case-my-work"><dt>My approach</dt><dd>Separate estimate approval, work, billing and rider review.</dd></div>
            <div><dt>Supporting areas</dt><dd>Parts and motorcycle rides.</dd></div>
          </dl>
        </aside>
        <nav className="case-chapter-nav" aria-label="Case study chapters" data-section-tabs="">
          {readingChapters.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <Chapter index={0} title="What is BikeCare?" description="A UX/UI concept connecting independent-workshop servicing, rider-approved records and care reminders.">
          <p className="case-audience-line"><strong>Designed for</strong> Riders and independent workshop teams.</p>
          <details className="case-reading-details"><summary>Brand identity and product-design foundations</summary>
          <nav className="bikecare-strategy-index" aria-label="BikeCare product design foundations">
            <a href="#bikecare-identity-title">Identity & logo</a><a href="#bikecare-competition-title">Competitor analysis</a>
            <a href="#bikecare-system-title">Design system</a><a href="#bikecare-architecture">Architecture</a>
            <a href="#bikecare-user-flows">User flows</a><a href="#bikecare-business-model-title">Business model</a>
          </nav>
          <BikeCareIdentity /></details>
        </Chapter>
        <Chapter index={1} title={bikecareFacts[0][0]} description={bikecareFacts[0][1]}>
          <details className="case-reading-details"><summary>Research, competitor comparisons and market context</summary>
          <p>I noticed that bike servicing is not limited to authorised Honda, Yamaha or Hero centres. My idea makes the local service visit useful later: remember the next service and keep a record when selling the bike.</p>
          <p>When was the bike serviced? What work was done? When should it return? What can a future buyer inspect? A shared service record connects these questions without requiring an authorised service centre.</p>
          <CaseIllustration caseId="bikecare" stage="challenge" />
          <h3>Research before adding features.</h3>
          <p>Public product pages already document job cards, reminders, service history and motorcycle events. The opportunity is a coherent rider-to-local-workshop journey, not a claim that these features are new.</p>
          <table className="bikecare-research-table"><thead><tr><th scope="col">Public source</th><th scope="col">Documented feature</th><th scope="col">Design response</th></tr></thead>
            <tbody>{bikecareResearch.map(source => <tr key={source.name}><th scope="row"><a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a></th>
              <td>{source.finding}</td><td>{source.decision}</td></tr>)}</tbody></table>
          <p className="bikecare-research-note"><strong>Research boundary:</strong> public-source desk research, not tested competitor usability or primary user research. The local-mechanic scenario is my observation. Next research should include local-service riders, advisors, mechanics and billers, anonymised job cards/bills, and task-based prototype sessions. No interviews, quotes or usability scores are fabricated.</p>
          <BikeCareCompetitivePosition />
          <h3>Market context, not an inflated TAM.</h3>
          <table className="bikecare-research-table"><thead><tr><th scope="col">Dated primary source</th><th scope="col">What it reports</th><th scope="col">What it does not prove</th></tr></thead><tbody>
            <tr><th scope="row"><a href="https://www.siam.in/pressrelease-details.aspx?mpgid=48&pgidtrail=50&pid=579" target="_blank" rel="noopener noreferrer">SIAM / 15 Apr 2025</a></th><td>FY2024–25: 19,607,332 domestic two-wheelers sold; 9.1% annual growth.</td><td>Annual sales are not the installed vehicle population, motorcycle-only demand or BikeCare adoption.</td></tr>
            <tr><th scope="row"><a href="https://www.acma.in/uploads/press-release/Press%20Release%20FY25.pdf" target="_blank" rel="noopener noreferrer">ACMA / 8 Jul 2025</a></th><td>FY2024–25 automotive-component aftermarket: ₹99,948 crore; 6% growth.</td><td>All-vehicle aftermarket value includes segments beyond two-wheelers and is not BikeCare service revenue or addressable market.</td></tr>
          </tbody></table>
          <p>These are explicitly dated market snapshots, not a 2026 forecast. A large two-wheeler market supports studying care continuity, but local-shop usage, willingness to pay, vehicle age and app access need field research. No TAM/SAM/SOM, installed-base estimate or market-share target is invented.</p>
          <h3>Where to start, and where not to compete.</h3>
          <p>The initial segment is riders who use independent workshops and need repeat-care records. Advisors and billers are adoption partners; mechanics should not inherit administrative tasks. GarageMate already addresses workshop operations, while Hero and Royal Enfield offer brand ecosystems. BikeCare proposes cross-workshop rider continuity, not a replacement for manufacturer diagnostics, dealer warranties or mature workshop software.</p>
          <p>Vintage/discontinued motorcycles, scooters, mopeds and EVs make inclusion important. Manufacturer → model → year → variant is a document-led sequence, not an exhaustive database claim. The prototype accepts 1970–present entries and unlisted models; all combinations remain rider-entered until reliable model-year and variant data exists.</p>
          </details>
        </Chapter>
        <Chapter index={2} title="Four responsibilities. One service journey.">
          <div className="case-design-cards">{[
            ['Approve service', 'Approve the estimate before work. Keep mechanic completion, billing and payment separate.'],
            ['Preserve history', 'Only jointly confirmed records inform reminders and a privacy-conscious resale preview.'],
            ['Parts and rides', 'Check parts provenance; review ride membership and keep exact meetup details private.']
          ].map(([title, description], index) => <article key={title}>
            <span className="case-card-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p>
          </article>)}</div>
          <details className="case-reading-details"><summary>Workspace responsibilities and permissions</summary>
          <table className="bikecare-research-table"><thead><tr><th scope="col">Workspace</th><th scope="col">Owns</th><th scope="col">Does not own</th></tr></thead><tbody>
            <tr><th scope="row">Rider</th><td>Estimate approval, record review, own bike history, purchases and ride requests.</td><td>Workshop completion or staff billing.</td></tr>
            <tr><th scope="row">Service advisor</th><td>Complaint, intake, job card, estimate and revised approval request.</td><td>Mechanic confirmation or payment receipt.</td></tr>
            <tr><th scope="row">Mechanic</th><td>Approved work, recorded parts and supplied maintenance guidance.</td><td>Unapproved extras or issuing bills.</td></tr>
            <tr><th scope="row">Billing staff</th><td>Itemised invoice, separate receipt and payment state.</td><td>Mechanical work or supplier self-approval.</td></tr>
            <tr><th scope="row">Support agent</th><td>Review a request and propose a next step; retain its timeline.</td><td>Editing service facts, collecting money, self-closing the rider’s complaint or executing refunds.</td></tr>
          </tbody></table>
          <p>Rider navigation starts with Home, Service and History; Shop is supporting, while More groups rides, vehicles, reminders and help. Staff use Jobs, Job card, Work and Bill; More contains supplier checks and support. Five destinations preserve comfortable targets on small phones instead of crowding every feature into the bottom bar.</p>
          <p className="fine-print">Design tradeoff: supplier checks and organiser review add friction, but a green badge must not imply genuine parts, verified employment or safe strangers without evidence.</p>
          </details>
          <details className="case-reading-details"><summary>Product architecture and workshop responsibilities</summary><BikeCareArchitecture /></details>
          <details className="case-reading-details"><summary>Signal design system, components and documentation</summary>
          <section aria-labelledby="bikecare-system-title">
            <h3 id="bikecare-system-title">BikeCare design system / Signal.</h3>
            <div className="bikecare-brand-rationale"><BikeCareLogo />
              <p><strong>Identity rationale:</strong> two linked care loops connect the rider and workshop; the small check refers to record acknowledgement, never verified safety. The original mark works at 32px without copying a manufacturer logo. Signal orange identifies brand and deliberate actions; graphite anchors the records. Amber remains a separate attention state.</p></div>
            <p>A custom system with Google-level polish as a quality benchmark—not Material Design, Google authorship or certification. Quiet surfaces and one primary action reduce competition around important decisions. Typography uses the device’s system sans so long model names, bill totals and errors remain legible without an extra font download.</p>
            <table className="bikecare-research-table"><thead><tr><th scope="col">Foundation</th><th scope="col">Value / reason</th></tr></thead><tbody>
              {designTokens.map(([name, value, reason]) => <tr key={name}><th scope="row">{name}</th><td><code>{value}</code> / {reason}</td></tr>)}
              <tr><th scope="row">Typography</th><td>System sans throughout: 32px welcome, 26px task headings, 18px card headings, 16px fields, 14px/21px compact reading copy and 12px secondary copy. Numeric totals use tabular figures; labels never rely on placeholder text.</td></tr>
              <tr><th scope="row">Spacing & shape</th><td>4px spacing grid, 12px control radius and 18px card radius. More structured actions replace the earlier pills; restrained borders separate dense records without turning every item into a floating card.</td></tr>
              <tr><th scope="row">Components & states</th><td>Labelled searchable comboboxes with keyboard navigation, manufacturer-dependent model choices and manual entry. Vehicle context, forms, estimate, invoice, rating, request timeline and navigation share semantic tokens. Default, focus, pressed, disabled, empty, warning, error, confirmed and illustrative loading states are distinct.</td></tr>
              <tr><th scope="row">Dark theme</th><td>Graphite canvas #14191d, surface #20282e, ink #f4f7f9 and soft orange action #ffac7a with dark label #2d1b12. Semantic contrast is checked independently; this is not inversion or a claim of reduced eye strain.</td></tr>
              <tr><th scope="row">Interaction</th><td>Minimum 44px controls, 16px fields, visible focus, native form keyboards, safe-area padding and independent phone scrolling. 120ms press feedback; reduced motion removes scaling. No delayed navigation or unnecessary animation.</td></tr>
            </tbody></table>
            <p>Light prioritises daytime records and bills; dark is an optional preference. Due, pending and disputed states retain explanatory wording in both themes. Theme changes do not turn a supplier review into product verification or a payment into rider agreement.</p>
            <BikeCareSystemPreview />
            <BikeCareDesignDocumentation />
          </section></details>
        </Chapter>
        <Chapter index={3} title="From local service to lasting history.">
          <CaseSolution caseId="bikecare" compact />
          <details className="case-reading-details"><summary>Explore the illustrated workflow</summary><CaseConceptFilm caseId="bikecare" /></details>
          <details className="case-reading-details"><summary>Seven journey maps, supporting flows and recovery decisions</summary>
          <ol className="case-context-path" aria-label="BikeCare service-record flow">
            <li><span>01 / Advisor + rider</span><strong>Intake, estimate and approval</strong></li>
            <li><span>02 / Mechanic + billing</span><strong>Record work, issue bill, separate payment</strong></li>
            <li><span>03 / Rider</span><strong>Review, remember care and preview resale</strong></li>
          </ol>
          <BikeCareJourneyMap />
          <h3>Parts with provenance, not just a buy button.</h3>
          <p>Local workshops and separate authorised dealers can supply products under a genuine-parts-only policy. Supplier identity and authorisation documents need review before listing. The buyer still checks bike fit, part identity, packaging and manufacturer-specific authenticity evidence. Pending suppliers stay blocked; reviewed documents do not certify each product.</p>
          <h3>A motorcycle community, not a general feed.</h3>
          <p>Riders can create public trips with people they do not yet know; motorcycle brands/clubs and company employee groups can organise bike rides. Eligibility, join approval, withdrawal, cancellation and report/block controls stay visible. Public pages show an approximate area, not private contact details or an exact meetup. Company membership needs review, not a self-declared verification badge.</p>
          <h3>EV care must not inherit petrol assumptions.</h3>
          <p>Powertrain is separate from brand and vehicle category. EV profiles use optional battery capacity and connector details, not engine capacity. Intake records charge/condition; the demo records tyre/brake inspection and a qualified-EV-service referral, not a completed battery repair. No guessed battery-health score, oil filter, warranty authorisation, charger compatibility or trip-range promise.</p>
          <h3>Recovery is part of the product.</h3>
          <p>Code expiry, staff recovery and manual vehicle entry are not dead ends. Care cues can be read, snoozed or disabled; a denied push permission preserves the optional in-app path. Service dissatisfaction, product issues, payment discrepancies, account help, community complaints and feedback become trackable demo requests. Support proposes a response; the rider can accept, escalate or reopen it. Complaint closure never rewrites mechanical history or simulates a refund as money received.</p>
          <h3>Confirmation is not satisfaction.</h3>
          <p>After the rider confirms completed work, BikeCare automatically offers optional service feedback. A 1–5 rating has no preselected answer. Skip now and return from the receipt; a low score never silently creates a complaint. An explicit follow-up choice creates a separate service-linked request, whose support timeline remains independent of the original work, invoice and payment.</p>
          </details>
          <details id="bikecare-prototype" className="bikecare-product-demo case-reading-details">
            <summary>Try the clickable UX/UI design</summary>
            <p>Use fictional data. Switch between Rider, Advisor, Mechanic, Billing and Support to follow one service record. Shop and Rides demonstrate supporting journeys.</p>
            <details className="case-reading-details"><summary>Prototype guide and simulated-data boundaries</summary>
            <p>Begin at the branded splash, continue to welcome and explore rider access or workshop sign-in. Replay introduction is available on welcome, with no forced loading delay. For the complete service scenario: Service advisor prepares the job card → Rider approves → Mechanic completes → Billing staff issues the invoice → Rider confirms and receives the optional feedback prompt. Shop and Rides demonstrate supporting journeys.</p>
            <p>Rider More opens vehicle/EV setup, the fictional document vault, notifications, support and the live product theme. Vehicle setup separates registration and chassis numbers; only fictional inputs should be used. Licence, insurance and RC samples support add/view/replace/delete and date cues without real upload or verification.</p>
            <p>Access can be explored normally or skipped explicitly for design review. Switch to Support agent to propose a response, then back to Rider to close or reopen the request. Staff cannot open private rider documents.</p>
            </details>
            <BikeCareApp />
            <p className="fine-print">The working flow needs JavaScript. The mobile design screens below are rendered into the page for reading without it. Accounts, payments, supplier review and ride decisions are simulated; no real application is being built.</p>
          </details>
        </Chapter>
        <Chapter index={4} title="See the complete mobile design." description={`${screens.length} original prototype frames. Choose a collection; inspect a full-size screen.`}>
          <nav className="bikecare-screen-collections" aria-label="BikeCare screen collections">
            {bikecareScreenGroups.map(([id, label]) => <button key={id} aria-pressed={screenGroup === id} onClick={() => setScreenGroup(id)}>{label}</button>)}
          </nav>
          <ScreenWalkthrough key={screenGroup} screens={screens.filter(screen => screen.group === screenGroup)} />
          <noscript><details className="case-reading-details"><summary>All original full-size design screens</summary><ul>{screens.map(screen => <li key={screen.id}><a href={screen.src}>{screen.label}</a></li>)}</ul></details></noscript>
          <p className="fine-print">Complete 390 x 844 original interface frames with fictional data. Vehicle photos are credited current-product references, not proof of a selected year/trim. The concept does not claim live manufacturer checks, legal invoices, real purchases or organised trips.</p>
          <details className="bikecare-earlier"><summary>Official motorcycle and EV image sources</summary>
            <p>Manufacturer product photography is used as attributed reference material in this non-affiliated design concept, not original BikeCare photography. No permission for commercial redistribution is claimed; obtain appropriate rights before production use. Unmatched vehicles show an honest empty state.</p>
            <ul>{bikecarePhotography.map(photo => <li key={photo.file}><a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.name} / Official manufacturer page</a></li>)}</ul>
          </details>
          <details className="case-reading-details"><summary>Scenario coverage and implementation boundaries</summary>
          <h3>Scenario coverage, with named limits.</h3>
          <p>“All possible scenarios” cannot be honestly guaranteed. This checklist distinguishes connected normal/recovery paths from services and data that the UX prototype does not implement.</p>
          <table className="bikecare-research-table"><thead><tr><th scope="col">Journey</th><th scope="col">Clickable design coverage</th><th scope="col">Explicit limits</th></tr></thead><tbody>
            {bikecareCoverage.map(([journey, coverage, limits]) => <tr key={journey}><th scope="row">{journey}</th><td>{coverage}</td><td>{limits}</td></tr>)}
          </tbody></table></details>
          <details className="bikecare-earlier"><summary>Earlier booking exploration / separate source evidence</summary>
            <p>The supplied garage, care-booking and tracking prototype preceded this service-record product. These unchanged captures are earlier exploration, not screens of the new mobile app.</p>
            {bikecareEarlierScreens.map(screen => <EvidenceScreen key={screen.id} screen={{ ...screen, src: sitePath(screen.src) }} />)}
          </details>
        </Chapter>
        <Chapter index={5} label="Business case" title="Useful beyond the service visit.">
          <div className="case-outcome" role="group" aria-label="BikeCare intended business benefits">
            <span className="case-outcome-status">Intended product value</span>
            <h3>Care remembered. <em>History carried forward.</em></h3>
            <p className="case-outcome-description">Designed to help riders remember care, workshops manage handovers and buyers inspect service history. Adoption and resale benefits remain untested.</p>
            <details className="case-reading-details"><summary>Business model and validation priorities</summary>
            <div className="case-design-cards">
              <article><h4>Riders</h4><p>A next-service cue and less reliance on memory.</p></article>
              <article><h4>Local mechanics</h4><p>Clearer service handovers and a reason for follow-up visits.</p></article>
              <article><h4>Resale buyers</h4><p>Inspect recorded care instead of relying only on a verbal claim.</p></article>
              <article><h4>Workshop staff</h4><p>Less ambiguity between approval, completion, invoice and payment.</p></article>
              <article><h4>Parts suppliers</h4><p>Relevant purchases from reviewed workshops and authorised dealers.</p></article>
              <article><h4>Motorcycle groups</h4><p>Bike-specific discovery and clear organiser/member expectations.</p></article>
            </div>
            <BikeCareBusinessModel />
            <h3>Risks and validation priorities.</h3>
            <p>Incorrect model-year/variant data, counterfeit parts, false service records, staff workload, data minimisation, bill/tax obligations and a costly support operation could undermine trust. Brand-specific maintenance, EV competence and community safety need separate review. Validate smartphone access, language/literacy needs and accessibility with real riders and staff before adding languages, automation or scale. No prototype test substitutes for fieldwork, physical-device checks or legal/operational review.</p>
            <p className="case-outcome-note">Both-party confirmation is not a quality certificate, complete vehicle history, warranty approval or resale valuation. A pilot should assess approval comprehension, missed handovers, reminder usefulness, parts-check confidence and community request clarity. Workshop adoption, repeat purchases, safer rides and resale gains remain hypotheses. No business outcomes or primary-research results are claimed.</p>
            </details>
          </div>
          <a className="text-link" href={sitePath('/#project-bikecare')}>Back to all case studies</a>
        </Chapter>
      </div>
      <section className="case-endcap" aria-labelledby="case-endcap-title">
        <span className="case-endcap-badge">End of case study / BikeCare</span>
        <h2 id="case-endcap-title">Thanks for reading!</h2>
        <nav aria-label="Continue exploring case studies">
          <a className="case-endcap-back" href={sitePath('/#project-bikecare')}>All case studies</a>
        </nav>
      </section>
    </div>
  </main>
    <footer className="site-footer wrap">
      <a className="wordmark" href={sitePath('/')}>Ravichandran V<span className="accent">.</span></a>
      <p>Mobile UX/UI design / Simulated accounts, care, shopping and rides.</p>
      <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  </>;
}
