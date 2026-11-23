import React, { useEffect, useId, useRef, useState } from 'react';
import { sitePath } from '../site-path.js';
import CaseStoryLayout from '../CaseStoryLayout.jsx';
import CodShieldIllustration from '../CodShieldIllustration.jsx';
import { Chapter, chapters, EvidenceScreen, ScreenWalkthrough } from '../CasePresentation.jsx';
import { CaseContext } from '../CaseReview.jsx';
import { WalkthroughButton } from '../CaseStudyPlayer.jsx';
import { codScreens } from '../cod-shield-story.js';
import CodFilmPlayer, { CodFilmTranscript } from '../CodFilmPlayer.jsx';
import { codFilmSources } from '../cod-film-story.js';
import CaseSolution from '../CaseSolution.jsx';
import CaseConceptFilm from '../CaseConceptFilm.jsx';
import CodPlatformStatus from '../CodPlatformStatus.jsx';
import CodPartnerExperience from '../CodPartnerExperience.jsx';
import { codPlatforms, createCodSync } from '../cod-platforms.js';

const screens = codScreens.map(screen => ({ ...screen, src: sitePath(screen.src) }));
const exampleHome = 'Example home · Unit 4B';
const previewStates = [
  ['home', 'Home', 'One managed case for the household. No protection is active.'],
  ['report', '1. Report', 'Report unwanted deliveries without an order ID.'],
  ['verify', 'Contact & unit', 'A phone check establishes contact, not residence or authority to restrict a home.'],
  ['pending', '2. Review pending', 'Protection is not active. Support must verify contact and connection to the exact home/unit.'],
  ['activate', '3. Verified', 'Hypothetical support approval unlocks a duration choice and household-impact consent.'],
  ['platforms', 'Platform status', 'This app manages its own COD restriction. Other apps need separate reports.'],
  ['activating', 'Activation pending', 'Enforcement acknowledgement is required. A request is not successful protection.'],
  ['active', '4. Active example', 'New COD dispatches would stop within participating services. Earlier parcel interception is requested, not guaranteed.'],
  ['removing', 'Removal pending', 'Do not promise normal COD has resumed until verified removal is acknowledged.'],
  ['ended', '5. Ended', 'Removal would require enforcement acknowledgement before normal COD resumes.'],
  ['help', 'Support & appeal', 'Accessible support and an accountable wrong-unit or household-dispute review. No appeal is sent here.']
];
const sources = [
  [codFilmSources[0].name, codFilmSources[0].url],
  ['Times of India', 'https://timesofindia.indiatimes.com/city/madurai/i-fall-at-your-feet-please-stop-placing-orders-madurai-influencer-asks-for-diwali-sweets-gets-phones-tv-fridge-on-cash-of-delivery/articleshow/134898721.cms'],
  [codFilmSources[1].name, codFilmSources[1].url],
  ['Business Today', 'https://www.businesstoday.in/latest/photo/asked-for-diwali-sweets-got-rs1-69-lakh-tv-indian-influencers-prank-turns-into-nightmare-561293-2026-10-13'],
  ['Gulf News', 'https://gulfnews.com/world/asia/india/madurai-influencer-begs-pranksters-to-stop-fake-cod-orders-worth-millions-1.500708804'],
  ['IBTimes UK', 'https://www.ibtimes.co.uk/indian-influencer-fake-cod-orders-1826401']
];
const safeguards = [
  ['What if the buyer and delivery numbers match?', 'Phone-number equality must not bypass active protection for a confidently matched unit. Without protection, use normal risk assessment: matching numbers establish neither residence nor consent.'],
  ['What if accounts or address spelling change?', 'Normalise destinations and consider available delivery-location evidence. Review uncertain matches rather than blocking an entire building. Some attempts will evade detection; no accuracy promise is made.'],
  ['What about neighbours and genuine household orders?', 'Restrict the exact unit, not a building or postcode. Explain the impact on genuine COD orders. Provide expiry, verified removal, household dispute handling, and a wrong-address appeal.'],
  ['Could someone maliciously block my home?', 'An OTP alone is insufficient. Verify the reporter’s connection to the home, request proportionate evidence, restrict reviewer access, minimise retention, and audit actions. Affected residents need a challenge route.'],
  ['What if a parcel has already shipped?', 'Request interception with clear operations instructions. Show actual acknowledgement and delivery status: a request does not guarantee that the parcel stops before reaching the door.'],
  ['What about prepaid orders and other retailers?', 'Each app would manage its own eligible COD orders and exact-unit restriction. Amazon cannot restrict Flipkart, Swiggy Instamart or Blinkit orders. Reports to other apps are separate. Prepaid orders and restaurant delivery remain outside this concept.'],
  ['What if an order changes, a hold expires, or systems fail?', 'Rerun checks when destination details change. Set deadlines and escalation paths, surface enforcement failures, and reconcile stale state. Never show protection as successful before acknowledgement or hold orders indefinitely.'],
  ['Does a refusal automatically punish the buyer?', 'No. Do not penalise the recipient or fine or ban buyers solely on a doorstep report. Investigate evidence, distinguish ordinary refusals from abuse, and preserve buyer review and appeal.']
];

function SectionHeading({ number, label, title }) {
  return <div className="case-section-heading">
    <p className="eyebrow">{number} / {label}</p><h2>{title}</h2>
  </div>;
}

function RecipientPrototype({ partner, onStageChange }) {
  const platform = partner || codPlatforms[0];
  const platforms = [platform];
  const prototypeId = useId();
  const warningId = `${prototypeId}-warning`;
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(partner ? 'report' : 'home');
  const [caseStep, setCaseStep] = useState('report');
  const [contactChecked, setContactChecked] = useState(false);
  const [address, setAddress] = useState(exampleHome);
  const [orderId, setOrderId] = useState('');
  const [duration, setDuration] = useState('7');
  const [endingReason, setEndingReason] = useState('early');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [sync, setSync] = useState(() => createCodSync('unconnected', platforms));
  const addressInput = useRef(null);
  const title = useRef(null);
  const previousStep = useRef('home');
  useEffect(() => { setReady(true); }, []);
  useEffect(() => { onStageChange?.(caseStep); }, [caseStep, onStageChange]);
  useEffect(() => {
    if (previousStep.current !== step) {
      title.current.focus({ preventScroll: true });
      previousStep.current = step;
    }
  }, [step]);
  const showStep = next => {
    setStep(next);
    if (!['home', 'help', 'platforms'].includes(next)) setCaseStep(next);
    setConsent(false);
    setError('');
  };
  const restart = () => {
    setAddress(exampleHome);
    setOrderId('');
    setDuration('7');
    setEndingReason('early');
    setContactChecked(false);
    setSync(createCodSync('unconnected', platforms));
    setCaseStep('report');
    showStep('home');
  };
  const requestSupport = () => {
    if (!address.trim()) {
      setError('Enter an example home and unit.');
      addressInput.current.focus();
      return;
    }
    setAddress(address.trim());
    setContactChecked(false);
    showStep('verify');
  };
  const beginActivation = () => {
    setEndingReason('early');
    setSync(createCodSync('pending', platforms));
    showStep('activating');
  };
  const beginRemoval = reason => {
    setEndingReason(reason);
    setSync(createCodSync('removal-pending', platforms));
    showStep('removing');
  };
  const updatePlatform = (id, status) => {
    if (id !== platform.id) throw new Error(`Unexpected platform for this app: ${id}`);
    const next = { ...sync, [id]: status };
    setSync(next);
    setError('');
    if (status === 'failed') setError(`${platform.name} demo confirmation failed. Protection is not active. Retry or contact support.`);
    if (status === 'removal-failed') setError(`${platform.name} demo ${endingReason === 'expiry' ? 'expiry confirmation' : 'removal'} failed. Normal COD resumption is not confirmed in this app.`);
    if (next[platform.id] === 'confirmed') showStep('active');
    if (next[platform.id] === 'removed') showStep('ended');
  };
  const removing = caseStep === 'removing';
  const expired = endingReason === 'expiry';
  const syncActions = ['activating', 'removing'].includes(caseStep) ? {
    onConfirm: id => updatePlatform(id, removing ? 'removed' : 'confirmed'),
    onFail: id => updatePlatform(id, removing ? 'removal-failed' : 'failed'),
    onRetry: id => updatePlatform(id, removing ? 'removal-pending' : 'pending')
  } : {};
  const acknowledged = Number(sync[platform.id] === (removing || caseStep === 'ended' ? 'removed' : 'confirmed'));
  return <div className={`cod-recipient-demo${partner ? ' cod-recipient--embedded' : ''}`}>
    {!partner && <div className="cod-demo-intro">
      <p className="eyebrow">Interactive concept / Example data only</p>
      <h3>A complete mobile-app journey.</h3>
      <p>Amazon example: one case. Other apps need separate reports.</p>
      <p className="fine-print" id={warningId}>Demo only. No verification, submissions or storage. Use example data; reload resets everything.</p>
      <div className="cod-preview-buttons" role="group" aria-label="Preview recipient states">
        {previewStates.map(([id, label]) => <button type="button" key={id} disabled={!ready} aria-pressed={step === id} onClick={() => {
          setAddress(exampleHome);
          setOrderId('');
          setDuration('7');
          setEndingReason('early');
          setContactChecked(false);
          setSync(createCodSync(
            id === 'active' ? 'confirmed' : id === 'platforms' ? 'failed' : id === 'activating' ? 'pending' : id === 'removing' ? 'removal-pending' : id === 'ended' ? 'removed' : 'unconnected', platforms));
          setCaseStep(id === 'platforms' ? 'activating' : ['home', 'help'].includes(id) ? 'report' : id);
          showStep(id);
        }}>{label}</button>)}
      </div>
      <p className="fine-print">Samples only, bypassing the demo journey. Real activation requires authorised verification.</p>
      <details className="cod-sample-states">
        <summary>Read the eleven mobile-app states</summary>
        <ol>{previewStates.map(([id, label, description]) => <li key={id}><strong>{label}</strong><p>{description}</p></li>)}</ol>
      </details>
      <noscript><p className="cod-notice">JavaScript is needed for the interactive demo. The sample states and all case-study sections remain readable above and below.</p></noscript>
    </div>}
    <div>
      {partner && <p className="fine-print" id={warningId}>Working local demo. Use example data only; no verification, submissions, storage or platform connection.</p>}
      <div className="cod-phone" role="region" aria-label={partner ? `${partner.name} working COD Shield prototype` : 'Recipient concept prototype'} aria-describedby={warningId}>
        <div className="cod-phone-system" aria-hidden="true"><span>9:41</span><i /><span>4G ▰</span></div>
        <div className="cod-phone-header"><strong>{platform.name}</strong><span>COD SHIELD / DEMO</span></div>
        <div className="cod-phone-body">
          {step === 'home' && <>
            <p className="eyebrow">One household. One support case.</p>
            <h3 ref={title} tabIndex="-1">Your home. One managed incident.</h3>
            <div className="cod-address-card"><strong>{address}</strong><p>{caseStep === 'active' ? 'Demo protection example' : caseStep === 'removing' ? expired ? 'Demo expiry awaiting confirmation' : 'Demo removal awaiting acknowledgement' : caseStep === 'activating' ? 'Demo activation awaiting acknowledgement' : 'No protection is active.'}</p></div>
            <p>Unwanted deliveries should not create a new approval task for every parcel.</p>
            <div className="cod-notice"><strong>Report once</strong><p>Review the exact unit, understand household impact, then choose temporary protection.</p></div>
            <button type="button" disabled={!ready} onClick={() => showStep('platforms')}>View protection status</button>
            <button className="cod-primary" type="button" disabled={!ready} onClick={() => showStep(caseStep)}>Open my case</button>
            <p className="fine-print">Mobile-app concept only. No app installation, support request or delivery restriction.</p>
          </>}
          {step === 'report' && <>
            <p className="eyebrow">One incident. One report.</p>
            <h3 ref={title} tabIndex="-1">Orders I never placed</h3>
            <p>Different buyers. One home. One report.</p>
            <label htmlFor={`${prototypeId}-address`}>Affected home and unit</label>
            <input ref={addressInput} id={`${prototypeId}-address`} type="text" required maxLength="100" autoComplete="off" disabled={!ready} value={address} aria-invalid={Boolean(error)} aria-describedby={error ? `${prototypeId}-address-error` : undefined} onChange={event => { setAddress(event.target.value); setError(''); }} />
            {error && <p id={`${prototypeId}-address-error`} className="cod-input-error" role="alert">{error}</p>}
            <label htmlFor={`${prototypeId}-order`}>Order ID (optional)</label>
            <input id={`${prototypeId}-order`} type="text" maxLength="60" autoComplete="off" placeholder="Not needed to report" disabled={!ready} value={orderId} onChange={event => setOrderId(event.target.value)} />
            <p className="cod-notice">No shopping account or order ID is needed. Official phone support is another proposed route.</p>
            <button className="cod-primary" type="button" disabled={!ready} onClick={requestSupport}>Request support</button>
            <p className="fine-print">Demo only. No request sent.</p>
          </>}
          {step === 'pending' && <>
            <p className="cod-state-badge">Protection not active yet</p>
            <h3 ref={title} tabIndex="-1">We are reviewing your report</h3>
            <p>Support would verify your connection to the affected home.</p>
            <ol className="cod-review-steps">
              <li><strong>Report received</strong><span>Example case CS-1042</span></li>
              <li><strong>Verify contact and home/unit</strong><span>Pending support review</span></li>
              <li><strong>Choose protection after approval</strong><span>Unavailable until verification clears</span></li>
            </ol>
            <p className="cod-notice">A phone OTP alone does not establish residence. Evidence must be proportionate.</p>
            <button type="button" onClick={() => showStep('activate')}>Demo: simulate support approval</button>
            <p className="fine-print">This prototype button does not verify a real address.</p>
          </>}
          {step === 'verify' && <>
            <p className="cod-state-badge">Protection not active yet</p>
            <h3 ref={title} tabIndex="-1">Contact is not proof of residence.</h3>
            <div className="cod-address-card"><strong>{address}</strong><p>Example case CS-1042</p></div>
            <ol className="cod-review-steps">
              <li><strong>Agree on safe contact</strong><span>No repeated notifications for every parcel.</span></li>
              <li><strong>Confirm contact</strong><span>An OTP alone cannot authorise a household block.</span></li>
              <li><strong>Review the exact unit</strong><span>Authorised support would assess proportionate evidence.</span></li>
            </ol>
            <button type="button" onClick={() => setContactChecked(true)}>Demo: preview contact check</button>
            {contactChecked && <p className="cod-notice" role="status">Contact check illustrated. No code was sent and nobody was verified.</p>}
            <button className="cod-primary" type="button" disabled={!contactChecked} onClick={() => showStep('pending')}>Continue to residence review</button>
            <p className="fine-print">This separate step prevents a contact check from being presented as residence verification.</p>
          </>}
          {step === 'activate' && <>
            <p className="cod-state-badge">Illustrative verification approved</p>
            <h3 ref={title} tabIndex="-1">Protect this home temporarily</h3>
            <div className="cod-address-card"><strong>{address}</strong><p>Exact household delivery unit</p></div>
            <label htmlFor={`${prototypeId}-duration`}>Illustrative duration</label>
            <select id={`${prototypeId}-duration`} value={duration} onChange={event => setDuration(event.target.value)}><option value="7">7 days</option><option value="3">3 days</option></select>
            <p className="cod-notice">Proposed scope: eligible COD orders in {platform.name} only. Genuine household COD orders in this app are affected. Other apps need separate reports.</p>
            <label className="cod-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} /><span>I understand this affects my household and will tell other household members.</span></label>
            <button className="cod-primary" type="button" disabled={!consent} onClick={beginActivation}>Activate COD protection</button>
            <p className="fine-print">Illustrative scope: automatic expiry, verified early removal, and no prepaid coverage.</p>
          </>}
          {step === 'platforms' && <>
            <p className="eyebrow">This app only / concept</p>
            <h3 ref={title} tabIndex="-1">{platform.name} protection status</h3>
            <p>This case applies only to {platform.name}. No restriction or case is shared with competing apps.</p>
            <p className="cod-notice" role="status">{acknowledged ? 'This app confirmed the change in this demo.' : 'This app has not confirmed the change yet.'}</p>
            <CodPlatformStatus platforms={platforms} statuses={sync} removing={removing} expiry={expired} {...syncActions} />
            {error && <p className="cod-input-error" role="alert">{error}</p>}
            <button className="cod-primary" type="button" onClick={() => showStep(caseStep)}>Back to my case</button>
            <p className="fine-print">Names describe a proposed integration model. No partnership, login, API, order access or delivery sync exists.</p>
          </>}
          {step === 'activating' && <>
            <p className="cod-state-badge">Protection not active yet</p>
            <h3 ref={title} tabIndex="-1">Activation is awaiting acknowledgement.</h3>
            <div className="cod-address-card"><strong>{address}</strong><p>Example duration: {duration} days</p></div>
            <p role="status">Waiting for {platform.name} to confirm. COD protection is not active yet in this app.</p>
            <CodPlatformStatus platforms={platforms} statuses={sync} {...syncActions} />
            <button className="cod-primary" type="button" onClick={() => updatePlatform(platform.id, 'confirmed')}>Demo: acknowledge enforcement</button>
            <p className="fine-print">Simulates this app’s confirmation only.</p>
            <button type="button" onClick={() => updatePlatform(platform.id, 'failed')}>Demo: preview acknowledgement failure</button>
            {error && <p className="cod-input-error" role="alert">{error}</p>}
            <p className="fine-print">Both success and failure are fictional states. No delivery system is connected.</p>
          </>}
          {step === 'active' && <>
            <p className="cod-state-badge">COD protection active · Demo</p>
            <h3 ref={title} tabIndex="-1">Your home. Fewer interruptions.</h3>
            <div className="cod-address-card"><strong>{address}</strong><p>Example duration: {duration} days</p></div>
            <CodPlatformStatus platforms={platforms} statuses={sync} />
            <div className="cod-notice"><strong>New COD orders in {platform.name}</strong><p>Confidently matched orders to this verified unit would stop before dispatch in this app, regardless of the buyer account or phone number.</p></div>
            <div className="cod-notice"><strong>Earlier parcels</strong><p>Interception requested. Stopping an existing delivery is not guaranteed.</p></div>
            <p>No approval call for each blocked attempt.</p>
            <button type="button" onClick={() => beginRemoval('early')}>End demo protection</button>
            <button type="button" onClick={() => beginRemoval('expiry')}>Demo: advance {duration} days to expiry</button>
            <p className="fine-print">No actual protection has been activated. Other retailers and prepaid orders need separate handling.</p>
          </>}
          {step === 'removing' && <>
            <p className="cod-state-badge">{expired ? 'Period elapsed · Demo' : 'Removal acknowledgement pending'}</p>
            <h3 ref={title} tabIndex="-1">{expired ? 'Period elapsed. Confirming expiry.' : 'Removal requested. Not complete yet.'}</h3>
            <p>{expired ? `The example clock advanced ${duration} days. ${platform.name} should automatically expire its agreed restriction; no new household approval is required. Confirmation is pending, not an extension of the chosen period.` : 'This app’s support would verify removal and wait for its enforcement system to acknowledge it.'}</p>
            <p className="cod-notice">Do not promise normal COD has resumed while acknowledgement is pending.</p>
            <p role="status">{expired ? 'Expiry' : 'Removal'} is awaiting confirmation in this app.</p>
            <CodPlatformStatus platforms={platforms} statuses={sync} removing expiry={expired} {...syncActions} />
            {error && <p className="cod-input-error" role="alert">{error}</p>}
            <button className="cod-primary" type="button" onClick={() => updatePlatform(platform.id, 'removed')}>{expired ? 'Demo: acknowledge automatic expiry' : 'Demo: acknowledge verified removal'}</button>
            <p className="fine-print">Simulates {expired ? 'automatic expiry' : 'verified removal'} in {platform.name} only.</p>
            <p className="fine-print">No identity check or restriction removal is performed by this prototype.</p>
          </>}
          {step === 'ended' && <>
            <p className="cod-state-badge">Demo protection ended</p>
            <h3 ref={title} tabIndex="-1">Normal COD can resume.</h3>
            <p>{expired ? `${platform.name} confirmed the agreed expiry in this demo. The temporary restriction is not renewed automatically.` : 'In this app, removal would take effect only after its enforcement system acknowledges the change.'}</p>
            <p className="cod-notice">If harassment continues, contact your incident support owner.</p>
            <CodPlatformStatus platforms={platforms} statuses={sync} expiry={expired} />
            <button className="cod-primary" type="button" onClick={restart}>Restart the demo</button>
            <p className="fine-print">This prototype did not change any delivery settings.</p>
          </>}
          {step === 'help' && <>
            <p className="eyebrow">Support, disputes and appeal</p>
            <h3 ref={title} tabIndex="-1">Challenge a wrong restriction.</h3>
            <div className="cod-notice"><strong>Wrong unit or household dispute</strong><p>An accountable support owner would review the evidence and provide a verified correction or removal route.</p></div>
            <p>Buyer appeal, an accessible web case page and official phone support remain part of the proposed service.</p>
            <details><summary>Read the example appeal route</summary><p>Confirm the exact unit, minimise evidence collection, investigate the restriction and show an acknowledged outcome. A shared address is not proof of abuse.</p></details>
            <button className="cod-primary" type="button" onClick={() => showStep(caseStep)}>Back to my case</button>
            <p className="fine-print">No phone call, message, appeal or support ticket is sent.</p>
          </>}
        </div>
        <nav className="cod-phone-nav" aria-label="Mobile concept navigation">
          {[['home', 'Home'], [caseStep, 'My case'], ['platforms', 'Status'], ['help', 'Help']].map(([target, label]) => <button key={label} type="button" disabled={!ready} aria-pressed={step === target} onClick={() => showStep(target)}>{label}</button>)}
        </nav>
      </div>
      <p className="cod-demo-status fine-print" role="status">Preview: {expired && step === 'removing' ? 'Expiry confirmation pending' : expired && step === 'ended' ? 'Expiry confirmed' : previewStates.find(([id]) => id === step)[1].replace(/^\d\. /, '')}</p>
    </div>
  </div>;
}

function CodShieldEvidence() {
  return <CaseStoryLayout caseId="codShield">
        <section id="incident" className="cod-section">
          <SectionHeading number="01" label="Context" title="A request for sweets became an attack on his doorstep." />
          <div className="cod-context-grid">
            <div><p>News reports describe Veeramani, a creator from Madurai, sharing contact details hoping for Diwali sweets. Strangers allegedly used them to send expensive cash-on-delivery orders he never placed.</p><p>Answering calls, refusing parcels, and explaining the situation became repeated work for the resident. Delivery workers were drawn into the disruption too.</p></div>
            <figure className="cod-scene"><CodShieldIllustration /><figcaption>Original concept illustration, not a likeness of Veeramani or evidence of a working service.</figcaption></figure>
          </div>
          <dl className="cod-reported-stats">
            <div><dt>500+</dt><dd>Orders linked to his address, according to his claim reported by <a href={sources[5][1]} target="_blank" rel="noopener noreferrer">IBTimes UK<span className="sr-only"> (opens in a new tab)</span></a>.</dd></div>
            <div><dt>15</dt><dd>Orders in half an hour, he said in a video quoted by <a href={sources[0][1]} target="_blank" rel="noopener noreferrer">The Indian Express<span className="sr-only"> (opens in a new tab)</span></a>.</dd></div>
            <div><dt>₹1.69L</dt><dd>Reported price of one unwanted television, not a measured loss or product outcome.</dd></div>
          </dl>
          <details id="coverage" className="cod-coverage">
            <summary>News sources and evidence boundaries</summary>
            <p>Coverage cited by the original concept. These are news accounts, not independently audited order records; several draw on the same videos or reporting.</p>
            <ul>{sources.map(([name, url]) => <li key={name}><a href={url} target="_blank" rel="noopener noreferrer">{name} ↗<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>
            <p>Viral tank and heavy-machinery claims were not confirmed deliveries. Coverage does not establish the contact details entered for each order or any platform’s internal checks. It supports the incident account, not this proposal’s effectiveness.</p>
          </details>
        </section>
        <section id="problem" className="cod-section">
          <SectionHeading number="02" label="Problem" title="The attacker places the order. The victim does the work." />
          <p>One parcel looks like a transaction. Many parcels can become a coordinated attack on a household. Refusal at the doorstep happens after packing, travel, and interruption.</p>
          <ol className="cod-flow" aria-label="Existing harm journey">
            <li><strong>Stranger orders</strong><span>Uses an exposed address</span></li><li><strong>Seller fulfils</strong><span>Packing and transport begin</span></li><li><strong>Driver arrives</strong><span>Time and travel already spent</span></li><li><strong>Resident refuses</strong><span>The disruption has happened</span></li>
          </ol>
          <div className="cod-cards">
            <article><h3>Resident</h3><p>Refusing a parcel does not undo the call, visit, or pressure.</p></article>
            <article><h3>Delivery partner</h3><p>The person at the door should not have to investigate who ordered.</p></article>
            <article><h3>Platform</h3><p>Incident-level review is an opportunity, not a claim about existing systems.</p></article>
          </div>
        </section>
        <section id="decisions" className="cod-section">
          <SectionHeading number="03" label="Design decisions" title="More verification can still mean more harassment." />
          <div className="cod-cards">
            <article><h3>Buyer OTP</h3><p>An attacker can verify their own phone and still use someone else’s address.</p></article>
            <article><h3>Per-order approval</h3><p>A hundred requests become a hundred interruptions. Buyer-entered contact details may reach the attacker.</p></article>
            <article><h3>Taking an advance</h3><p>Friction is not certainty. A harasser may pay while genuine COD buyers leave.</p></article>
          </div>
          <p className="cod-scope-note">Review the order pattern and verify the affected unit. Do not rely solely on whether two phone numbers differ, or give the recipient another inbox to manage.</p>
        </section>
        <section id="solution" className="cod-section">
          <SectionHeading number="04" label="Proposed service" title="Recognise the attack. Protect the home." />
          <p>Within each app: bounded review of suspicious order clusters, and temporary COD protection after one verified report. No app controls competitors’ orders.</p>
          <div className="cod-cards">
            <article><p className="eyebrow">01 / Detect</p><h3>Look across orders.</h3><p>Combine unusual bursts, related buying activity, and verified abuse history. No single signal proves harassment.</p></article>
            <article><p className="eyebrow">02 / Review</p><h3>Hold before packing.</h3><p>Use a defined deadline. Release legitimate orders and give buyers clear status and a review route.</p></article>
            <article><p className="eyebrow">03 / Protect</p><h3>Act on one report.</h3><p>Verify the resident’s connection to the exact unit, explain the household trade-off, then offer temporary protection.</p></article>
          </div>
        </section>
        <section id="prototype-notes" className="cod-section">
          <SectionHeading number="05" label="Recipient prototype" title="One report, not a queue of approvals." />
          <p>The interactive example keeps reporting, review, consent, and removal separate. No real verification or delivery settings are implemented.</p>
          <a className="text-link" href="#prototype">Try the recipient prototype above ↗</a>
        </section>
        <section id="access" className="cod-section">
          <SectionHeading number="06" label="Access" title="No app should mean no less protection." />
          <div className="cod-cards">
            <article><h3>Phone support</h3><p>An agent records one incident, explains verification, and provides a case reference. No call about every order.</p></article>
            <article><h3>Accessible web</h3><p>A simple case page shows verification, scope, expiry, and support contact. No shopping account or order ID needed to start.</p></article>
            <article><h3>Contact control</h3><p>Agree on a safe contact method. Limit interruptions across all channels together, rather than replacing calls with message spam.</p></article>
          </div>
        </section>
        <section id="operations" className="cod-section">
          <SectionHeading number="07" label="Operations" title="Support manages the incident. The resident does not manage the queue." />
          <ol className="case-key-points">
            <li><strong>Spot or receive the incident.</strong> A suspicious cluster prompts review, or the resident reports once. Early orders may escape detection.</li>
            <li><strong>Verify and explain.</strong> Confirm the exact unit and discuss household impact before temporary protection.</li>
            <li><strong>Enforce upstream.</strong> Stop new COD dispatches under protection. Seek interception for parcels already travelling.</li>
            <li><strong>Inform, not occupy.</strong> Provide a case update and an exit route. Investigate abusive buyers separately.</li>
          </ol>
          <div className="cod-operations">
            <p className="eyebrow">Safety operations / Illustrative example</p><h3>Possible delivery attack</h3>
            <p>Masked destination · Unit 4B. All values below are fictional prototype data.</p>
            <dl><div><dt>Related orders under review</dt><dd>24 (example)</dd></div><div><dt>Dispatch status</dt><dd>Held for review</dd></div><div><dt>Resident protection</dt><dd>Pending verification</dd></div><div><dt>Recipient calls per order</dt><dd>Not requested</dd></div></dl>
            <p className="fine-print">A shared address alone is not evidence of abuse. Review before enforcement.</p>
            <details><summary>Show example review decision</summary><p>Example only: a reviewer confirms some orders are legitimate and releases them. Other linked orders remain held for time-bounded investigation; buyer appeal stays available.</p></details>
          </div>
        </section>
        <section id="safeguards" className="cod-section">
          <SectionHeading number="08" label="Safeguards" title="Protection must not become another way to hurt someone." />
          <p>No universal block, perfect address match, or promise to prevent every first attempt.</p>
          {safeguards.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}
        </section>
        <section id="measures" className="cod-section">
          <SectionHeading number="09" label="Proposed measures" title="Measure relief. Not confirmation clicks." />
          <p>Expected benefits and proposed measures for each app’s own operations, not results from a launch.</p>
          <div className="cod-cards cod-metrics">
            <article><p className="eyebrow">North star</p><h3>Unwanted doorstep visits</h3><p>Measure after effective protection using recipient reports and delivery events where available.</p></article>
            <article><p className="eyebrow">Recipient burden</p><h3>Contacts per incident</h3><p>Count interruptions across app, SMS, WhatsApp, and phone together.</p></article>
            <article><p className="eyebrow">Operations</p><h3>Time to effective protection</h3><p>Report-to-enforcement delay and the proportion intercepted before packing or dispatch.</p></article>
            <article><p className="eyebrow">Guardrail</p><h3>Wrong blocks and delays</h3><p>Wrong-unit restrictions, genuine-order disruption, appeals, and overdue reviews.</p></article>
          </div>
          <p className="cod-scope-note">Set thresholds from a measured baseline and controlled pilot. No savings, accuracy rates, or conversion gains have been established. Intended benefits must be balanced against genuine-buyer disruption and seller fulfilment costs.</p>
        </section>
        <section id="reflection" className="cod-section">
          <SectionHeading number="10" label="Reflection" title="Build the safety service before the safety dashboard." />
          <div className="cod-cards">
            <article><h3>Start manually.</h3><p>Pilot one support path within an integrated network: reporting, verified unit-level protection, dispatch enforcement, and interception tracking.</p></article>
            <article><h3>Learn before automating.</h3><p>Observe detection signals, false positives, and reviewer capacity before introducing bounded automated holds.</p></article>
            <article><h3>Expand responsibly.</h3><p>Courier cooperation requires privacy, appeals, and accountability. Do not create an unrestricted residential blacklist.</p></article>
          </div>
          <div className="cod-scope-note"><strong>Research still needed</strong><p>Interview affected residents, household members, delivery partners, and support agents. Test household-impact understanding, offline access, verification burden, shared-building errors, and removal. No interviews or usability studies are claimed.</p></div>
          <p>The resident should report the harm once. The platform should do the repeated work.</p>
          <p className="fine-print">The supplied concept cites <a href="https://claude.ai/artifact/Vo2KHKtrdQvUg82ELXwVvs" target="_blank" rel="noopener noreferrer">COD Rescue<span className="sr-only"> (opens in a new tab)</span></a> as a presentation reference. COD Shield provides an alternative proposal, original wording, illustration, and demo; no real safety service is implemented.</p>
          <a className="text-link" href={sitePath('/#project-cod-shield')}>Back to all case studies ↗</a>
        </section>
  </CaseStoryLayout>;
}

export default function CodShieldPage() {
  const player = useRef(null);
  return <>
    <main id="main" className="design-review cod-study">
      <section className="case-hero wrap">
        <a className="back-link" href={sitePath('/#project-cod-shield')}>← All case studies</a>
        <p className="eyebrow">Independent concept / Trust &amp; safety</p>
        <h1>COD Shield</h1>
        <p className="case-summary">One report per app. Fewer unwanted deliveries.</p>
        <CaseContext role="Self-initiated concept · Unlaunched">
          <dl className="cod-case-meta">
            <div><dt>Approach</dt><dd>News-informed UX proposal</dd></div>
            <div><dt>Scope</dt><dd>Service flow, prototype, safeguards</dd></div>
            <div><dt>Access</dt><dd>Mobile concept, web, phone support</dd></div>
            <div><dt>Evidence</dt><dd>No interviews or usability studies</dd></div>
          </dl>
        </CaseContext>
        <p className="cod-scope-note">Not launched or user-tested. Separate feature concepts for Amazon, Flipkart, Swiggy Instamart and Blinkit. No affiliation or cross-app sync.</p>
      </section>
      <div className="case-presentation-layout">
        <div className="case-presentation-hero">
          <div className="case-hero-preview"><EvidenceScreen screen={screens[0]} eager /></div>
          <a className="case-read-link" href="#case-overview">Read the concept case study <span aria-hidden="true">↓</span></a>
          <div className="case-player-entry">
            <CodFilmPlayer ref={player} />
          </div>
        </div>
        <div className="case-chapters">
          <aside className="case-fast-read" aria-label="Case in 30 seconds">
            <p className="case-card-number">Independent exploration / not shipped product work</p>
            <dl>
              <div><dt>Problem</dt><dd>Unwanted orders turn a household into a repeated delivery stop.</dd></div>
              <div className="case-my-work"><dt>Design focus</dt><dd>One report per app, verified unit-level protection, that app’s confirmation, and a clear exit.</dd></div>
              <div><dt>Evidence</dt><dd>News-informed concept. No tested outcomes.</dd></div>
            </dl>
          </aside>
          <nav className="case-chapter-nav" aria-label="Case study chapters" data-section-tabs="">
            {chapters.map(([id, label], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{index === 5 ? 'Business case' : label}</a>)}
            <WalkthroughButton className="case-walkthrough-tab" onClick={event => player.current?.open(event.currentTarget)} />
          </nav>
          <Chapter index={0} title="What is COD Shield?" description="A proposed support service for unwanted cash-on-delivery orders. Report once, verify the home, and temporarily stop new COD dispatches.">
            <p className="case-audience-line"><strong>Designed for</strong> Residents, delivery partners, and support teams.</p>
            <div className="cod-film-context">
              <h3>Before the concept: Veeramani's reported story.</h3>
              <p>News reports described the Madurai creator asking for Diwali sweets, then facing unwanted COD orders, repeated visits, and calls. Delivery workers were caught in the disruption too. The cinematic Walkthrough follows this reported incident into the design question and proposed service.</p>
              <div className="cod-film-context-links">{codFilmSources.map(source => <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer">
                {source.name} ↗<span className="sr-only"> (opens in a new tab)</span></a>)}</div>
              <CodFilmTranscript />
            </div>
          </Chapter>
          <Chapter index={1} title="Refusing a parcel happens too late." description="Packing, travel, calls, and doorstep disruption have already happened. The resident should not have to investigate every order.">
            <div className="case-gap-grid">
              {[
                ['Resident burden', 'Repeated refusals', 'One managed case'],
                ['Delivery effort', 'Doorstep investigation', 'Upstream review']
              ].map(([label, harm, proposal]) => <article className="case-gap-card" key={label}>
                <span className="case-card-number">{label}</span>
                <div><p><small>Reported harm</small>{harm}</p><span className="case-gap-arrow" aria-hidden="true">→</span><p><small>Proposed direction</small><strong>{proposal}</strong></p></div>
              </article>)}
            </div>
            <p className="fine-print">Concept comparison, not observed user research or measured improvement.</p>
          </Chapter>
          <Chapter index={2} title="Three decisions shape the service.">
            <div className="case-design-cards">
              {[
                ['One incident', 'Replace per-order approvals with one supported report. Limit updates across all contact channels.'],
                ['Exact household', 'Verify the affected unit. A phone OTP alone does not establish residence or consent.'],
                ['Temporary, reversible', 'Explain genuine-order impact, set expiry, and provide verified removal and appeals.']
              ].map(([title, description], index) => <article key={title}><span className="case-card-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}
            </div>
          </Chapter>
          <Chapter index={3} title="One app. One case. Its own COD orders.">
            <ol className="case-context-path" aria-label="Proposed service journey">
              <li><span>01 / Report</span><strong>No order ID needed</strong></li>
              <li><span>02 / Verify</span><strong>Review the exact unit</strong></li>
              <li><span>03 / Confirm</span><strong>This app’s protection only</strong></li>
            </ol>
            <p className="fine-print">Review clusters before packing. Release legitimate orders within a deadline; confirm protection per platform.</p>
            <details className="cod-scope-note">
              <summary>100+ orders, different buyers: covered?</summary>
              <p>Illustrative scenario, not a verified count for Veeramani: 120 unwanted Amazon COD orders from different accounts target one home. The resident reports one incident to Amazon; support verifies the exact unit, not the buying accounts.</p>
              <p>After household consent and Amazon’s confirmation, a temporary 3- or 7-day restriction would apply to confidently matched new Amazon COD orders for that unit, regardless of the buyer account or phone number. It also affects genuine household COD orders in Amazon. Uncertain unit matches need review; neighbours must not be blocked.</p>
              <p>The app should expire its restriction at the agreed deadline and support verified early removal. Already-dispatched parcels need interception, which is not guaranteed. Prepaid orders remain outside coverage. Flipkart, Swiggy Instamart and Blinkit require separate reports and decisions; Amazon cannot restrict their orders. This proposal has not solved the real incident or activated any protection.</p>
            </details>
            <CaseSolution caseId="codShield" />
            <CaseConceptFilm caseId="codShield" />
            <details className="cod-scope-note"><summary>Separate apps. No shared blacklist.</summary><p>Each app needs its own COD eligibility policy, exact-unit review, enforcement, expiry and appeal. A report or restriction in one app does not change another app’s orders.</p></details>
          </Chapter>
          <Chapter index={4} title="Walk through the mobile-app experience." description="Eleven Amazon feature screens, plus separate app versions. Consent, protection, removal and appeal; no live service.">
            <ScreenWalkthrough screens={screens} diagramId="codShield" />
            <details className="cod-partner-placement">
              <summary>App-inspired placements &amp; flow</summary>
              <span id="partner-placement" className="case-bookmark" />
              <CodPartnerExperience renderPrototype={(partner, onStageChange) =>
                <RecipientPrototype key={partner.id} partner={partner} onStageChange={onStageChange} />} />
            </details>
            <details className="cod-live-demo">
              <summary>Try the interactive prototype</summary>
              <span id="prototype" className="case-bookmark" />
              <RecipientPrototype />
            </details>
          </Chapter>
          <Chapter index={5} label="Business case" title="Help people. Reduce avoidable delivery work.">
            <div className="case-outcome" role="group" aria-label="COD Shield business case">
              <span className="case-outcome-status">Intended benefits</span>
              <h3>Protect people. <em>Reduce avoidable work.</em></h3>
              <p className="case-outcome-description">For households: fewer interruptions. For delivery teams: fewer wasted trips. For sellers and platforms: less wasted fulfilment and repeat support.</p>
              <p className="case-outcome-note">Proposed benefits, not measured results. Pilot: unwanted visits, failed-delivery effort, repeat contacts, and wrong-unit restrictions.</p>
            </div>
          </Chapter>
        </div>
        <details id="full-case-evidence" className="full-case-evidence">
          <summary className="case-evidence-summary" aria-label="Explore full evidence and sources">
            <span className="case-evidence-intro">
              <span className="case-card-number">Behind the concept</span>
              <span className="case-evidence-title">Explore the thinking behind the proposal.</span>
              <span className="case-evidence-description">Incident coverage, alternatives, operations, safeguards, and proposed measures.</span>
              <span className="case-evidence-topics"><span><b>01</b>Sources</span><span><b>02</b>Trade-offs</span><span><b>03</b>Safeguards</span></span>
              <span className="case-evidence-action"><span className="evidence-closed-label">Explore the evidence</span><span className="evidence-open-label">Close the evidence</span><span className="case-evidence-chevron" aria-hidden="true">↓</span></span>
            </span>
            <span className="case-evidence-previews" aria-hidden="true">
              {[screens[0], screens[2]].map(screen => <span className="case-evidence-thumbnail" key={screen.id}>
                <span className="case-evidence-thumbnail-image"><img src={screen.src} alt="" width={screen.width} height={screen.height} loading="lazy" decoding="async" /></span>
                <span className="case-evidence-caption">Concept / {screen.label}</span>
              </span>)}
            </span>
          </summary>
          <CodShieldEvidence />
        </details>
        <section className="case-endcap" aria-labelledby="case-endcap-title">
          <span className="case-endcap-badge">End of case study / COD Shield</span>
          <h2 id="case-endcap-title">Thanks for reading!</h2>
          <nav aria-label="Continue exploring case studies">
            <a className="case-endcap-back" href={sitePath('/#project-cod-shield')}>← All case studies</a>
            <a className="case-endcap-next" href={sitePath('/analytics.html')}>Next: Chart Wizard →</a>
          </nav>
        </section>
      </div>
    </main>
    <footer className="site-footer wrap">
      <a className="wordmark" href={sitePath('/')}>Ravichandran V<span className="accent">.</span></a>
      <p>Independent concept · Not a shipped product.</p>
      <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  </>;
}
