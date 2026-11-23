import React, { useId } from 'react';
import CodPlatformStatus from './CodPlatformStatus.jsx';
import { codPartnerStages, createCodSync } from './cod-platforms.js';

export default function CodPartnerScreen({ partner, stage, consent, setConsent, showStage, titleRef, ready = true, onOpenDemo, onPreviewFailure, scrollable = false, statuses }) {
  const inputId = useId();
  const specification = codPartnerStages[stage];
  if (!specification) throw new Error(`Unknown COD partner stage: ${stage}`);
  const [stageId, , heading] = specification;
  return <div className="cod-partner-phone" role="region" aria-label={`${partner.name} COD Shield placement concept`}>
    <div className="cod-partner-system" aria-hidden="true"><span>9:41</span><span>4G ▰</span></div>
    <div className="cod-partner-header"><strong>{partner.name}</strong><span>{partner.help}</span></div>
    <div className="cod-partner-body" data-integration-stage={stageId} tabIndex={scrollable ? 0 : undefined}
      role={scrollable ? 'region' : undefined} aria-label={scrollable ? 'App screen content' : undefined}>
      <p className="cod-partner-demo-label">COD SHIELD / PROPOSED FEATURE</p>
      <h3 ref={titleRef} tabIndex="-1">{heading}</h3>
      {stageId === 'entry' && <>
        <div className="cod-partner-help-topic"><strong>An order I placed</strong><p>Ordinary order support stays separate.</p></div>
        <div className="cod-partner-feature">
          <svg viewBox="0 0 36 36" aria-hidden="true"><path d="m18 3-12 5v10c0 8 12 15 12 15s12-7 12-15V8ZM11 17l5 5 10-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
          <h4>Unwanted COD deliveries?</h4>
          <p>COD Shield · Report repeated deliveries to your home, even without a shopping account or order ID.</p>
          <span className="cod-partner-feature-tag">New support topic / concept</span>
        </div>
        <button className="cod-partner-primary" type="button" disabled={!ready} onClick={() => showStage(1)}>Report without an order</button>
      </>}
      {stageId === 'report' && <>
        <p>One household incident—not a separate complaint for every parcel or buyer account.</p>
        <label htmlFor={`${inputId}-unit`}>Affected home and unit</label>
        <input id={`${inputId}-unit`} type="text" value="Example home / Unit 4B" readOnly />
        <label htmlFor={`${inputId}-order`}>Order ID (optional)</label>
        <input id={`${inputId}-order`} type="text" value="" placeholder="Not needed to start" readOnly />
        <div className="cod-partner-help-topic"><strong>Repeated unwanted deliveries</strong><p>Fictional example: a resident keeps receiving COD parcels they never ordered.</p></div>
        <button className="cod-partner-primary" type="button" disabled={!ready} onClick={() => showStage(2)}>Continue to household review</button>
      </>}
      {stageId === 'review' && <>
        <p className="cod-partner-state">No protection is active</p>
        <ol className="cod-review-steps">
          <li><strong>Confirm safe contact</strong><span>No OTP or message is sent in this design preview.</span></li>
          <li><strong>Verify connection to Unit 4B</strong><span>An authorised reviewer needs proportionate evidence.</span></li>
          <li><strong>Prevent a wrong household block</strong><span>A contact code or shared address is not enough.</span></li>
        </ol>
        <button className="cod-partner-primary" type="button" disabled={!ready} onClick={() => showStage(3)}>Demo: preview approved review</button>
        <p className="fine-print">Illustrative approval only. No resident is verified.</p>
      </>}
      {stageId === 'consent' && <>
        <p className="cod-partner-state">Illustrative review approved</p>
        <div className="cod-partner-help-topic"><strong>Example home / Unit 4B</strong><p>Proposed duration: 7 days. Restrict the verified unit, not one buyer account. Automatic expiry and verified early removal are required.</p></div>
        <p>Proposed request: restrict eligible COD orders in {partner.name} only. Other apps are unaffected and need their own reports.</p>
        <label className="cod-partner-consent"><input type="checkbox" disabled={!ready} checked={consent} onChange={event => setConsent(event.target.checked)} /><span>I agree to temporary COD protection in {partner.name}. I understand genuine household COD orders in this app are affected.</span></label>
        <p>Do not share this restriction with competing apps. Prepaid orders remain outside this proposal.</p>
        <button className="cod-partner-primary" type="button" disabled={!ready || !consent} onClick={() => showStage(4)}>Request temporary protection</button>
      </>}
      {stageId === 'sync' && <>
        <p>Example CS-1042 / Unit 4B. Waiting for {partner.name} to confirm its own restriction. No competitor is involved.</p>
        {onPreviewFailure && <button type="button" onClick={onPreviewFailure}>Demo: preview confirmation failure</button>}
        <CodPlatformStatus platforms={[partner]} statuses={statuses || createCodSync('pending', [partner])} />
        <p className="cod-partner-state" role="status">{statuses ? 'Confirmation failed in this demo. Protection is not active.' : 'Waiting for this app to confirm. No actual protection or connection.'}</p>
        <button className="cod-partner-primary" type="button" onClick={onOpenDemo || (() => showStage(0))}>{onOpenDemo ? 'Try this app’s working flow' : 'Back to this app’s feature entry'}</button>
        <button type="button" disabled={!ready} onClick={() => showStage(0)}>Restart this placement preview</button>
      </>}
      <p className="cod-partner-footer-note">Original app-inspired mockup. Not affiliated with {partner.name}.</p>
    </div>
    <div className="cod-partner-bottom-nav" aria-hidden="true"><span>Home</span><span>Orders</span><strong>Help</strong></div>
  </div>;
}
