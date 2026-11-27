import React, { useId, useState } from 'react';
import { BikeCareLogo } from './BikeCareBrand.jsx';
import { bikecareResearch, bikecareScreens } from './bikecare-story.js';
import { sitePath } from './site-path.js';
import { bikecareThemes, designTokens } from './bikecare-ux-model.js';

export function BikeCareIdentity() {
  return <section className="bikecare-strategy-section" aria-labelledby="bikecare-identity-title">
    <p className="case-card-number">01 / Product identity</p>
    <h3 id="bikecare-identity-title">BikeCare. A clear name for continuous care.</h3>
    <div className="bikecare-identity-board">
      <div className="bikecare-identity-main"><BikeCareLogo /><p>Local service.<br />Care that stays with your bike.</p><span>Independent workshops / Indian two-wheelers</span></div>
      <div className="bikecare-identity-variants">
        <div className="bikecare-identity-sample is-dark"><BikeCareLogo /><span>Dark surface</span></div>
        <div className="bikecare-identity-sample is-mono"><BikeCareLogo /><span>One-colour document mark</span></div>
      </div>
    </div>
    <div className="bikecare-strategy-grid">
      <article><h4>Why this name</h4><p>“Bike” names the familiar everyday category; the product explicitly includes motorcycles, scooters, mopeds and EVs. “Care” extends beyond booking: approval, service records, reminders and recovery.</p></article>
      <article><h4>Why this mark</h4><p>Two linked loops represent rider and workshop continuity. The small check represents record acknowledgement, not safe riding, genuine parts or verified mechanical quality. No manufacturer badge is borrowed.</p></article>
      <article><h4>How it is used</h4><p>Keep the icon at least 32px with 8px clear space. Use the wordmark for first contact, the icon only in an established context. Never stretch it or attach verification claims. Naming and trademark clearance remain uncompleted.</p></article>
    </div>
    <p className="bikecare-strategy-note"><strong>Brand voice:</strong> calm, specific and accountable. Say “Estimate approved”, not “Everything verified”; “Review requested”, not “Refund completed”. One name and one promise connect every workspace.</p>
  </section>;
}

export function BikeCareSystemPreview() {
  const [theme, setTheme] = useState('light');
  const [note, setNote] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [result, setResult] = useState('');
  const fieldId = useId();
  function checkExample(event) {
    event.preventDefault();
    const invalid = note.trim().length < 10;
    setFieldError(invalid ? 'Add at least 10 characters of fictional workshop context.' : '');
    setResult(invalid ? '' : 'Example field accepted. Nothing saved or sent.');
  }
  return <section className="bikecare-strategy-section" aria-labelledby="bikecare-theme-title">
    <h4 id="bikecare-theme-title">Signal. Clear care, without visual noise.</h4>
    <p>Deep ink establishes the record; care teal identifies the next deliberate action. Quiet neutral surfaces keep forms and records readable. Status colours have separate meanings, not brand decoration.</p>
    <div className="bikecare-strategy-controls" role="group" aria-label="Preview design-system theme">
      {['light', 'dark'].map(value => <button key={value} type="button" aria-pressed={theme === value} onClick={() => setTheme(value)}>Preview {value} theme</button>)}
    </div>
    <div className="bikecare-system-board" data-product-theme={theme}>
      <div className="bikecare-system-example">
        <BikeCareLogo /><p className="bikecare-system-caption">Illustrative component composition / Not a service record</p>
        <h4>Understand before you approve.</h4>
        <div className="bikecare-system-record"><span>Estimate / Example</span><strong>₹885.00</strong><p>Parts, labour and illustrative tax are itemised before approval.</p><span className="bikecare-system-status">Rider review pending</span></div>
        <a className="bikecare-system-action" href={sitePath('/assets/bikecare-mobile-estimate.webp')} target="_blank" rel="noopener noreferrer">Inspect estimate design ↗</a>
        <p className="bikecare-system-caption">Approval is not payment. Colour is never the only status cue.</p>
      </div>
      <dl className="bikecare-system-palette">
        {[...designTokens.map(([name, , , token]) => [token, name]), ['success', 'Acknowledged record'], ['info', 'Information']].map(([token, label]) => <div key={token}><dt><i className={`bikecare-palette-${token}`} aria-hidden="true" />{label}</dt><dd>{bikecareThemes[theme][`--bc-${token}`]}</dd></div>)}
      </dl>
      <div className="bikecare-component-lab" aria-label="Signal component examples">
        <article>
          <p className="bikecare-system-caption">01 / Hierarchy and rhythm</p>
          <h4>Read the record.<br />Then decide.</h4>
          <p>System sans unifies first contact and detailed tasks. Tabular figures keep ₹885.00 and ₹1,085.00 aligned.</p>
          <dl><div><dt>Type scale</dt><dd>32 / 26 / 18 / 16 / 14 / 12px</dd></div><div><dt>Spacing</dt><dd>4 / 8 / 12 / 16 / 24 / 32px</dd></div><div><dt>Shape</dt><dd>12px controls / 18px cards</dd></div></dl>
        </article>
        <article>
          <p className="bikecare-system-caption">02 / Inputs and recovery</p>
          <h4>Labels stay visible.</h4>
          <form onSubmit={checkExample} noValidate>
            <label htmlFor={fieldId}>Example workshop note</label>
            <input id={fieldId} value={note} placeholder="Use fictional text" aria-invalid={Boolean(fieldError)}
              aria-describedby={`${fieldId}-hint${fieldError ? ` ${fieldId}-error` : ''}`}
              onChange={event => { setNote(event.target.value); setFieldError(''); setResult(''); }} />
            <p id={`${fieldId}-hint`} className="bikecare-system-caption">At least 10 characters. Component demo only.</p>
            {fieldError && <p id={`${fieldId}-error`} className="bikecare-component-error" role="alert">{fieldError}</p>}
            {result && <p className="bikecare-component-success" role="status">{result}</p>}
            <button className="bikecare-primary" type="submit">Check example field</button>
            <button type="button" disabled>Unavailable example</button>
          </form>
        </article>
        <article>
          <p className="bikecare-system-caption">03 / Meaning before colour</p>
          <h4>One label per state.</h4>
          <div className="bikecare-component-states">
            <span className="bikecare-status" data-tone="info">Review pending</span>
            <span className="bikecare-status" data-tone="warning">Care due</span>
            <span className="bikecare-status" data-tone="success">Record acknowledged</span>
            <span className="bikecare-status" data-tone="error">Needs correction</span>
          </div>
          <p>Orange is an action, amber is attention, red is recovery, green is acknowledgement. None certifies mechanical safety or parts authenticity.</p>
          <a className="bikecare-system-action is-secondary" href={sitePath('/assets/bikecare-mobile-documents.webp')} target="_blank" rel="noopener noreferrer">Inspect private document design ↗</a>
        </article>
      </div>
    </div>
    <div className="bikecare-strategy-grid">
      <article><h4>Why this direction</h4><p>Deep ink and quiet neutral surfaces provide a clear workshop identity. A restrained teal action stays distinct without colouring every record. This is a design hypothesis to test, not evidence that a colour creates trust or improves conversion.</p></article>
      <article><h4>Why these components</h4><p>System sans, structured cards and less-rounded actions replace the editorial onboarding style. Persistent labels, unknown-model entry, versioned estimates and independent payment/rating states keep important distinctions visible.</p></article>
      <article><h4>Motion stays useful</h4><p>120ms press feedback acknowledges touch. Keyboard selection is immediate; reduced motion removes scaling. No decorative animation delays reading a bill or confirming a decision.</p></article>
    </div>
  </section>;
}

export function BikeCareCompetitivePosition() {
  const comparisons = [
    ['GarageMate', 'Independent workshop operations', 'Digital job cards, assignments, billing, customer/vehicle history and service follow-ups.', 'These are baseline capabilities, not BikeCare inventions. Study how a rider can understand and challenge the workshop record.'],
    ['Hero App', 'Hero owner and authorised network', 'Registered-vehicle lookup, last/next service dates, maintenance schedules, dealer discovery and booking.', 'Keep manual historic vehicle entry and independent servicing visible; never imply automatic OEM data or warranty access.'],
    ['Royal Enfield App', 'Connected brand-owner experience', 'Service history, appointment changes, shopping and registration for Royal Enfield rides/events.', 'Care and rides can coexist. Test cross-brand continuity and separate public/company ride review rather than claiming community is novel.']
  ];
  return <section className="bikecare-strategy-section" aria-labelledby="bikecare-competition-title">
    <p className="case-card-number">Competitive positioning / Sources rechecked 22 Nov 2026</p>
    <h3 id="bikecare-competition-title">Compete on continuity, not feature count.</h3>
    <table className="bikecare-research-table"><thead><tr><th scope="col">Product / orientation</th><th scope="col">Published strengths</th><th scope="col">BikeCare response</th></tr></thead><tbody>
      {comparisons.map(([name, orientation, strengths, response]) => <tr key={name}><th scope="row"><a href={bikecareResearch.find(source => source.name === name).url} target="_blank" rel="noopener noreferrer">{name}</a><small className="bikecare-table-context">{orientation}</small></th><td>{strengths}</td><td>{response}</td></tr>)}
    </tbody></table>
    <div className="bikecare-positioning"><span>Positioning hypothesis</span><p>For riders who service at independent workshops, BikeCare connects understandable approvals with a portable care record, supplied reminders and accountable follow-up.</p></div>
    <p className="bikecare-strategy-note">This is a comparison of published capabilities, not hands-on competitor testing. An undocumented feature is not marked absent. Cross-workshop continuity is a proposed direction, not a shipped integration or a proven exclusive advantage. OEM connected diagnostics and mature workshop reporting are not replaced.</p>
  </section>;
}

const architecture = [
  ['Rider workspace', 'Understand and decide', [['Home', 'Bike context, mileage, next care'], ['Service', 'Estimate, confirmation, feedback'], ['History', 'Confirmed records, resale preview'], ['Shop', 'Fit, seller, pickup order'], ['More', 'Garage, private documents, notifications, rides, help']]],
  ['Workshop workspace', 'Handover without ambiguity', [['Advisor', 'Intake, job card, revised estimate'], ['Mechanic', 'Approved work and supplied guidance'], ['Billing', 'Itemised invoice and separate receipts'], ['Support', 'Request review and proposed response']]],
  ['Shared record model', 'Connect, never conflate', [['Vehicle', 'Brand/model/year + separate registration/chassis'], ['Service', 'Job ID, revision, recorded work'], ['Money', 'Invoice total, receipts, balance'], ['Care', 'Confirmed history, date/km guidance'], ['Recovery', 'Feedback consent, request timeline']]]
];

export function BikeCareArchitecture() {
  return <section id="bikecare-architecture" className="bikecare-strategy-section" aria-labelledby="bikecare-architecture-title">
    <p className="case-card-number">02 / Product architecture</p>
    <h3 id="bikecare-architecture-title">Two workspaces. One connected care record.</h3>
    <p>Information architecture and responsibility boundaries—not a backend or deployment diagram. Vehicle identity is the entry point; a job ID and revision connect the handovers. Parts and rides are supporting modules, not prerequisites for servicing.</p>
    <figure className="bikecare-product-map" aria-label="BikeCare product design architecture map">
      <figcaption>Product design architecture / Relationships and privacy boundaries</figcaption>
      <div className="bikecare-map-entry"><strong>Rider account</strong><span>Access and recovery / Fictional persona</span></div>
      <span className="bikecare-map-connector">owns the garage and private vault ↓</span>
      <div className="bikecare-map-branches">
        <div><strong>Vehicle garage</strong><p>Manufacturer → model → year → variant → powertrain</p><span>Registration and chassis remain distinct.</span></div>
        <div className="bikecare-map-private"><strong>Private document vault</strong><p>Rider → licence<br />Selected vehicle → insurance and RC</p><span>Not shared with staff, resale or public rides.</span></div>
      </div>
      <span className="bikecare-map-connector">selected vehicle connects care; documents do not gate service ↓</span>
      <div className="bikecare-map-entry"><strong>Service record / Job ID + revision</strong><span>Advisor → rider approval → mechanic → billing → rider review</span></div>
      <span className="bikecare-map-connector">joint confirmation feeds history, not payment or satisfaction ↓</span>
      <div className="bikecare-map-branches">
        <div><strong>Care continuity</strong><p>Confirmed history → supplied reminder → private resale preview</p><span>No unknown interval or full-history guarantee.</span></div>
        <div><strong>Recovery</strong><p>Optional feedback → requested follow-up → support timeline</p><span>Accept, escalate or reopen; facts stay unchanged.</span></div>
      </div>
      <div className="bikecare-map-supporting"><strong>Supporting modules</strong><span>Parts: fit/seller/pickup order • Rides: eligibility/join review/private meetup</span></div>
    </figure>
    <div className="bikecare-architecture-grid">{architecture.map(([name, purpose, modules]) => <article key={name}>
      <header><span>{purpose}</span><h4>{name}</h4></header>
      <dl>{modules.map(([label, detail]) => <div key={label}><dt>{label}</dt><dd>{detail}</dd></div>)}</dl>
    </article>)}</div>
    <ol className="bikecare-record-rail" aria-label="Shared service-record handovers">
      {['Advisor prepares', 'Rider approves', 'Mechanic records', 'Billing invoices', 'Rider confirms'].map((label, index) => <li key={label}><span>0{index + 1}</span><strong>{label}</strong></li>)}
    </ol>
    <p className="bikecare-strategy-note"><strong>State boundaries:</strong> extra work returns to approval; corrections hold the record. Only jointly confirmed work enters history. Payment does not confirm work; a rating does not close a complaint. Resale previews minimise identity instead of exposing the full job card.</p>
    <p className="fine-print">The prototype switches fictional personas and retains records only in page memory. The vault uses synthetic samples, not actual secure storage. Future workshop tenancy, encrypted document storage, retention/access controls, imported-record provenance and identity checks need separate design and operational validation.</p>
  </section>;
}

const journeys = [
  { id: 'setup', name: 'Access & vehicle', goal: 'Get into the right workspace with the right two-wheeler.',
    steps: [['splash', 'Rider', 'Continue from the branded design introduction; no timed loading is simulated.'], ['landing', 'Rider', 'Choose rider or workshop entry; replay the introduction if needed.'], ['rider-login', 'Rider', 'Enter the fictional account; signup is available.'], ['otp', 'Rider', 'Verify the demo code, with resend and expiry recovery.'], ['vehicle-brand', 'Rider', 'Choose category, manufacturer and dependent model.'], ['vehicle-year', 'Rider', 'Add year, variant and powertrain; unknown is allowed.'], ['vehicle-details', 'Rider', 'Add separate fictional registration and chassis numbers; unknown/unregistered stays valid.'], ['profile', 'Rider', 'Review the saved identity before starting care.']],
    decision: 'Known model? Use the filtered suggestion. Unlisted or historic? Enter the document name manually; do not invent a catalogue match.',
    recovery: 'Wrong/expired code offers retry. Staff have a separate recovery route. Duplicate identifiers return to the existing vehicle; a new profile starts with empty confirmed history.' },
  { id: 'documents', name: 'Private documents', goal: 'Keep fictional rider/vehicle documents organised without confusing them with verified evidence.',
    steps: [['documents', 'Rider', 'Open the private vault from More or the vehicle profile.'], ['document-add', 'Rider', 'Select licence, insurance or RC and a synthetic sample.'], ['document-detail', 'Rider', 'Inspect scope, expiry and revision; replacement updates only this entry.'], ['document-expiry', 'Rider', 'Review expired or upcoming date cues; unknown remains unknown.'], ['document-delete', 'Rider', 'Confirm deletion or keep the sample; service records do not change.']],
    decision: 'Licence? Scope to rider. Insurance/RC? Scope to the selected bike. Existing entry? Replace explicitly, never silently duplicate. Document dates do not prove coverage or legal permission.',
    recovery: 'Cancel keeps the existing document. Deletion removes its cue, not bike/history. Staff and support cannot open the vault. No real personal files, government verification or cloud storage are accepted.' },
  { id: 'service', name: 'Service handovers', goal: 'Approve the right work, then keep an understandable record.',
    steps: [['jobcard', 'Service advisor', 'Record intake, complaint, condition and estimate.'], ['estimate', 'Rider', 'Review line items and approve this revision.'], ['record', 'Mechanic', 'Record approved work, actual parts and supplied guidance.'], ['bill', 'Billing staff', 'Issue the itemised invoice without assuming payment.'], ['payment', 'Billing staff', 'Record receipts; partial payment leaves a balance.'], ['review', 'Rider', 'Confirm the recorded work or request a correction.'], ['service-feedback', 'Rider', 'Rate optionally; request follow-up only with consent.']],
    decision: 'Extra work? Revise the estimate and obtain fresh rider approval before completion. Incorrect record? Hold it for correction instead of adding it to history.',
    recovery: 'Unpaid and jointly confirmed can coexist. A low rating alone creates no complaint. Skip feedback and return from the receipt; a requested remedy has its own support timeline.' },
  { id: 'care', name: 'Reminders & resale', goal: 'Carry confirmed care forward without claiming a complete history.',
    steps: [['history', 'Rider', 'Read jointly confirmed services for the selected bike.'], ['reminder', 'Rider', 'See supplied date or distance guidance.'], ['notifications', 'Rider', 'Read, snooze or change optional care notifications.'], ['share', 'Rider', 'Inspect an identity-minimised resale preview.']],
    decision: 'Supplied date or mileage reached? Show due care. No reliable interval? Show guidance needed rather than inventing a schedule.',
    recovery: 'Snoozing does not erase the due state. Denied push permission keeps the optional in-app route. Unconfirmed/imported records and ownership transfer are not silently verified.' },
  { id: 'parts', name: 'Parts purchase', goal: 'Check fit and provenance before a pickup order.',
    steps: [['shop', 'Rider', 'Browse the reviewed demo supplier catalogue.'], ['product', 'Rider', 'Inspect bike fit, stock, part identity and terms.'], ['cart', 'Rider', 'Review quantity and separate seller collection.'], ['order', 'Rider', 'Inspect the unpaid pickup order; payment is separate.'], ['product-issue', 'Rider', 'Request help for the specific product issue.']],
    decision: 'Pending seller, unknown fit or insufficient stock? Block checkout with a reason; supplier documents are not proof that a part is genuine.',
    recovery: 'Cancellation does not imply money returned. Product problems enter seller/support review; collection, real inventory and refund execution are not connected in this design.' },
  { id: 'rides', name: 'Motorcycle rides', goal: 'Understand the group before sharing a place or meetup.',
    steps: [['rides', 'Rider', 'Choose public, brand/club or company motorcycle rides.'], ['ride', 'Rider', 'Review organiser, eligibility and approximate area.'], ['request', 'Rider', 'Request a place, withdraw or report a concern.'], ['organise', 'Organiser', 'Create a future motorcycle ride with explicit capacity.'], ['manage', 'Organiser', 'Review membership, approve/decline and handle cancellation.']],
    decision: 'Eligible and space available? Request review—not instant verified membership. Private meetup details belong behind the approved-participant boundary.',
    recovery: 'Past dates and invalid capacities fail explicitly. Withdrawal, cancellation and report/block are visible. Employment, strangers and real moderation are not verified by this prototype.' },
  { id: 'help', name: 'Complaints & recovery', goal: 'Make a problem trackable without promising an unperformed remedy.',
    steps: [['help', 'Rider', 'Choose service, product, payment, account or ride context.'], ['complaint', 'Rider', 'Describe the problem and linked service.'], ['ticket', 'Rider', 'Read the open request and its timeline.'], ['support-review', 'Support agent', 'Propose the appropriate review or reconciliation.'], ['support-resolved', 'Rider', 'Accept, escalate or reopen the response.']],
    decision: 'Satisfied with the response? The rider may close it. Not satisfied? Escalate or reopen; support cannot self-confirm the rider’s acceptance.',
    recovery: 'Keep the original timeline and work facts. A reinspection, moderation action or refund proposal is not proof it happened. No real mailbox, emergency response or SLA is promised.' }
];

export function BikeCareJourneyMap() {
  const [selection, setSelection] = useState({ id: 'service', step: 0 });
  const journey = journeys.find(item => item.id === selection.id);
  const [screenId, owner, task] = journey.steps[selection.step];
  const screen = bikecareScreens.find(item => item.id === screenId);
  return <section id="bikecare-user-flows" className="bikecare-strategy-section" aria-labelledby="bikecare-user-flows-title">
    <p className="case-card-number">03 / User flows</p>
    <h3 id="bikecare-user-flows-title">Follow the decision, not just the screens.</h3>
    <p>Select a journey, then inspect each handover. Every step links to an actual prototype design frame; decision and recovery paths explain what happens when the happy path breaks.</p>
    <ol className="bikecare-end-to-end-map" aria-label="Start-to-end rider experience map">
      {['Splash, welcome and access', 'Vehicle identity', 'Private documents / Optional', 'Approved service and bill', 'Rider review and feedback', 'Care, resale and recovery'].map((label, index) => <li key={label}><span>0{index + 1}</span><strong>{label}</strong>{index < 5 && <b aria-hidden="true">→</b>}</li>)}
    </ol>
    <div className="bikecare-strategy-controls" role="group" aria-label="Choose a BikeCare user flow">{journeys.map(item => <button type="button" key={item.id} aria-pressed={journey.id === item.id} onClick={() => setSelection({ id: item.id, step: 0 })}>{item.name}</button>)}</div>
    <div className="bikecare-flow-map" role="region" aria-label={`${journey.name} user flow`}>
      <p className="bikecare-flow-goal"><strong>Goal</strong> {journey.goal}</p>
      <ol className="bikecare-flow-steps">{journey.steps.map(([id, role], index) => <li key={id}><button type="button" aria-current={selection.step === index ? 'step' : undefined} onClick={() => setSelection({ ...selection, step: index })}><span>{String(index + 1).padStart(2, '0')} / {role}</span><strong>{bikecareScreens.find(item => item.id === id).label}</strong></button></li>)}</ol>
      <div className="bikecare-flow-evidence">
        <figure><img key={screen.id} src={sitePath(screen.src)} width={screen.width} height={screen.height} alt={screen.alt} loading="lazy" /><figcaption><a href={sitePath(screen.src)} target="_blank" rel="noopener noreferrer">Inspect {screen.label.toLowerCase()} at full size ↗</a></figcaption></figure>
        <div><p className="case-card-number">Step {selection.step + 1} of {journey.steps.length} / {owner}</p><h4>{screen.label}</h4><p>{task}</p><p>{screen.takeaway}</p>
          <div className="bikecare-flow-branch"><strong>Decision / alternate path</strong><p>{journey.decision}</p></div>
          <div className="bikecare-flow-branch"><strong>Recovery / limits</strong><p>{journey.recovery}</p></div>
          <div className="bikecare-strategy-controls" role="group" aria-label="Move through the user flow">
            <button type="button" disabled={selection.step === 0} onClick={() => setSelection({ ...selection, step: selection.step - 1 })}>Previous step</button>
            <button type="button" disabled={selection.step === journey.steps.length - 1} onClick={() => setSelection({ ...selection, step: selection.step + 1 })}>Next step</button>
          </div>
        </div>
      </div>
    </div>
    <p className="fine-print">These are explorable UX flow maps, not real service execution. The connected fictional role-switching prototype follows below. EV-specific care and all named exclusions remain in the screen/coverage collections.</p>
  </section>;
}

export function BikeCareDesignDocumentation() {
  return <section id="bikecare-design-documentation" className="bikecare-strategy-section" aria-labelledby="bikecare-documentation-title">
    <p className="case-card-number">Design-system documentation / Decision rules</p>
    <h3 id="bikecare-documentation-title">Signal / Design decisions and usage rules.</h3>
    <p>The explanation document covers both themes, component geometry and dropdown behaviour, role boundaries, seven end-to-end journeys, business/research rationale and deliverable locations. A separate backlog identifies unresolved production scenarios rather than claiming every edge case is implemented.</p>
    <a className="bikecare-document-download" href={sitePath('/assets/bikecare-design-system.md')} download>Download the design-system explanation (.md)</a>
    <table className="bikecare-research-table"><thead><tr><th scope="col">Rule</th><th scope="col">Usage and reason</th><th scope="col">Edge state</th></tr></thead><tbody>
      <tr><th scope="row">Product photography</th><td>Neutral motorcycle card with contained official imagery; no unrelated ring, fake progress or arbitrary bike replacement.</td><td>No exact reference? Show a named empty state. Photo does not validate model year.</td></tr>
      <tr><th scope="row">Theme and hierarchy</th><td>Deep ink, quiet neutral canvas and care-teal actions. System sans throughout, 12px controls and 18px cards establish a clear functional identity.</td><td>Dark uses its own teal/text pair, not inversion. Status labels remain explicit; brand colour does not establish verification.</td></tr>
      <tr><th scope="row">Action hierarchy</th><td>One filled primary action; outlined secondary action; muted disabled state. Separate brand, attention, error and acknowledgement tokens.</td><td>Disabled does not explain itself: show the unmet condition beside important actions. Destructive changes require confirmation.</td></tr>
      <tr><th scope="row">Layout and reading</th><td>4px spacing grid, 16px fields and tabular numeric totals. Dense records keep labelled groups; long names wrap rather than truncate identity.</td><td>Scroll lengthy content independently; preserve reachable navigation. Test zoom, keyboards, focus and real devices before release.</td></tr>
      <tr><th scope="row">Identity fields</th><td>Manufacturer/model suggestions accept manual entry. Registration, chassis and optional label are separate; never infer one from another.</td><td>Unknown/unregistered is allowed; duplicate normalised numbers require opening the existing profile.</td></tr>
      <tr><th scope="row">Document components</th><td>Type + scope + date status + action. Synthetic detail previews carry a clear “DEMO” watermark, revision and explicit replacement/deletion.</td><td>No file picker or real personal number. Dates can be unknown or expired without a fake verified badge.</td></tr>
      <tr><th scope="row">Interaction and recovery</th><td>44px targets, 16px fields, visible focus, labelled errors, immediate keyboard selection and 120ms press feedback.</td><td>Cancel preserves the current record. Reduced motion removes scaling; destructive actions require confirmation.</td></tr>
    </tbody></table>
    <p className="bikecare-strategy-note"><strong>Privacy design:</strong> rider documents are not workshop attachments, public identity or resale evidence. The prototype proves navigation and state design only. Real storage would require explicit consent, access control, encryption, deletion/retention policy and legal review; none is implied by a “vault” label.</p>
  </section>;
}

export function BikeCareBusinessModel() {
  return <section className="bikecare-strategy-section" aria-labelledby="bikecare-business-model-title">
    <p className="case-card-number">04 / Business model and validation</p>
    <h3 id="bikecare-business-model-title">Earn workshop adoption before expanding the ecosystem.</h3>
    <div className="bikecare-strategy-grid">
      <article><h4>Customer and payer</h4><p>Riders benefit from continuity; independent workshop operators are the proposed subscription buyers. Start with shops willing to document handovers, not everyone who owns a two-wheeler.</p></article>
      <article><h4>Value exchange</h4><p>Test a workshop subscription for clearer handovers and follow-up. Keep basic rider records and complaint access outside a paywall. Pricing, willingness to pay and retention are unvalidated.</p></article>
      <article><h4>Cost and incentives</h4><p>Assess onboarding, staff time, support, data/storage and optional message costs against recurring revenue. Catalogue fees must not reward unnecessary servicing or let paid placement outrank fit.</p></article>
    </div>
    <ol className="bikecare-pilot-stages">
      <li><span>01 / Discover</span><h4>Observe the local visit</h4><p>Research riders, advisors, mechanics and billers. Map anonymised job cards, revisions and recovery. Establish baseline time, comprehension and staff workload before setting targets.</p></li>
      <li><span>02 / Test the core</span><h4>Bound the workshop pilot</h4><p>Test intake → approval → work → invoice → confirmation with returning riders. Include partial payments, disputed work, manual vehicles and qualified EV referrals.</p></li>
      <li><span>03 / Gate expansion</span><h4>Prove the support capacity</h4><p>Expand only if core use and follow-up are useful without unacceptable workload. Parts need supplier/fit operations; public/company rides need membership and moderation capability.</p></li>
    </ol>
    <table className="bikecare-research-table"><thead><tr><th scope="col">Validation question</th><th scope="col">Measure to collect</th><th scope="col">Countermeasure / decision</th></tr></thead><tbody>
      <tr><th scope="row">Can staff adopt the handover?</th><td>Time per job, incomplete handovers and rider-reviewed records among eligible issued records.</td><td>Track duplicated paperwork and staff burden. Simplify the core if recording work takes longer without clearer decisions.</td></tr>
      <tr><th scope="row">Does the rider understand approval?</th><td>Observed distinction between estimate approval, work confirmation, payment and satisfaction; correction/reapproval task completion.</td><td>Observe mistaken approvals and backtracking. Revise labels and sequencing before adding automation.</td></tr>
      <tr><th scope="row">Are care reminders useful?</th><td>Responses to supplied due guidance, reminder opt-outs and rider-reported usefulness among eligible participants.</td><td>Watch nuisance frequency and stale odometers. A click is not proof of a completed or necessary service.</td></tr>
      <tr><th scope="row">Is recovery economically sustainable?</th><td>Unresolved requests, reopened complaints, resolution acceptance and handling time per issue.</td><td>Include support cost and pressure to close requests. An accepted response is not proof of mechanical repair.</td></tr>
    </tbody></table>
    <p className="bikecare-strategy-note"><strong>Success remains a hypothesis:</strong> no fabricated conversion, revenue, market share or resale uplift. Pilot size and pass/fail thresholds follow baseline research. A small, usable care workflow is preferable to a national marketplace that cannot resolve problems.</p>
  </section>;
}
