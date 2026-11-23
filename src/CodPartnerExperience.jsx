import React, { useCallback, useEffect, useRef, useState } from 'react';
import CodPartnerScreen from './CodPartnerScreen.jsx';
import { codPlatforms, codPartnerStages as stages } from './cod-platforms.js';

const flowStages = { home: 0, report: 1, verify: 2, pending: 2, activate: 3, activating: 4, active: 4, removing: 4, ended: 4, platforms: 4 };

export default function CodPartnerExperience({ renderPrototype }) {
  const [ready, setReady] = useState(false);
  const [partnerId, setPartnerId] = useState('amazon');
  const [stage, setStage] = useState(0);
  const [consent, setConsent] = useState(false);
  const [working, setWorking] = useState(false);
  const [started, setStarted] = useState(false);
  const title = useRef(null);
  const previousView = useRef('amazon:0');
  const partner = codPlatforms.find(item => item.id === partnerId);
  useEffect(() => { setReady(true); }, []);
  useEffect(() => {
    const view = `${partnerId}:${stage}`;
    if (previousView.current !== view && title.current) title.current.focus({ preventScroll: true });
    previousView.current = view;
  }, [partnerId, stage]);
  const showStage = index => {
    setStage(index);
    setConsent(false);
  };
  const updateFlowStage = useCallback(step => {
    if (step !== 'help') setStage(flowStages[step]);
  }, []);
  return <div className={`cod-partner-experience cod-partner--${partner.id}`}>
    <p className="eyebrow">Suggested app placements / Original concept designs</p>
    <p className="fine-print">App-inspired colours and layouts, not exact current app screens or approved features. No connection, verification or submission. Use example data only.</p>
    <p className="fine-print">Separate feature concepts: the selected app manages only its own COD orders. Switching previews does not sync reports.</p>
    <div className="cod-partner-tabs" role="group" aria-label="Choose a proposed partner app">
      {codPlatforms.map(item => <button key={item.id} type="button" disabled={!ready} aria-pressed={partnerId === item.id}
        onClick={() => { setPartnerId(item.id); setStarted(false); showStage(0); }}>{item.name}</button>)}
    </div>
    <div className="cod-partner-tabs" role="group" aria-label="App presentation mode">
      <button type="button" disabled={!ready} aria-pressed={!working} onClick={() => { setWorking(false); setStarted(false); showStage(0); }}>Explore screens</button>
      <button type="button" disabled={!ready || !renderPrototype} aria-pressed={working} onClick={() => { setWorking(true); setStarted(false); showStage(0); }}>Try working flow</button>
    </div>
    <p className="fine-print">Changing app or mode resets the local demo. Screen previews bypass steps; the working flow keeps validation and consent gates.</p>
    <div className="cod-partner-layout">
      <div className="cod-partner-rationale">
        <p className="eyebrow">Recommended primary trigger</p>
        <h3>{partner.placement}</h3>
        <p>{partner.reason}</p>
        <details className="cod-partner-placement-list">
          <summary>Read all four proposed placement routes</summary>
          <ul>{codPlatforms.map(item => <li key={item.id}><strong>{item.name}</strong><p>{item.placement}</p></li>)}</ul>
        </details>
        <div className="cod-notice"><strong>Why not checkout?</strong><p>The person being targeted is not necessarily the buyer. Start outside an order, without a shopping account or order ID. Keep accessible web and official phone support as alternatives.</p></div>
        <div className="cod-notice"><strong>Secondary trigger</strong><p>A proposed “I did not order this” shortcut in recipient-facing delivery help should open or recover the same case—not create a new approval request for every parcel.</p></div>
        <ol className="cod-partner-flow">
          {stages.map(([id, label], index) => <li key={id} aria-current={stage === index ? 'step' : undefined}><span>0{index + 1}</span>{label}</li>)}
        </ol>
        <p className="fine-print">Suggested information architecture, not a claim about each platform’s current navigation. Partner access and COD eligibility require approval.</p>
      </div>
      <div>
        {!working && <><div className="cod-partner-stage-buttons" role="group" aria-label="Preview integration stages">
          {stages.map(([id, label], index) => <button key={id} type="button" disabled={!ready} aria-pressed={stage === index}
            onClick={() => showStage(index)}>0{index + 1} / {label}</button>)}
        </div>
        <p className="fine-print">Stage selectors preview designs and bypass the simulated journey.</p></>}
        {working && started ? renderPrototype(partner, updateFlowStage) : <CodPartnerScreen partner={partner} stage={working ? 0 : stage} ready={ready} consent={consent}
          setConsent={setConsent} showStage={working ? () => { setStarted(true); showStage(1); } : showStage} titleRef={title}
          onOpenDemo={() => { setWorking(true); setStarted(true); showStage(1); }} />}
        {working && started && <button type="button" onClick={() => { setStarted(false); showStage(0); }}>Back to the app entry</button>}
        <p className="fine-print" role="status">{partner.name} / Step {stage + 1} of 5 / {working ? 'Working local demo' : 'Design preview only'}</p>
      </div>
    </div>
    <noscript><p>JavaScript is needed to change the partner or stage. Proposed primary placements: Amazon Customer Service, Flipkart Help Centre, Swiggy Instamart Help &amp; Support, and Blinkit Help. Each starts outside an order.</p></noscript>
  </div>;
}
