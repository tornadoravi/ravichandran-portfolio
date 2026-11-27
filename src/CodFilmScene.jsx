import React from 'react';
import { codFilmSources } from './cod-film-story.js';
import CodPartnerScreen from './CodPartnerScreen.jsx';
import { codPlatforms, createCodSync } from './cod-platforms.js';

function arrivalDelay(element, index, seconds) {
  if (element) element.style.animationDelay = `${index * .14}s`;
}

function Actor({ index = 0, seconds, children }) {
  return <g className="cod-film-arrival" ref={element => arrivalDelay(element, index, seconds)}>{children}</g>;
}

function Home() {
  return <g stroke="#f4f2ee" strokeWidth="3" strokeLinejoin="round">
    <path d="m335 220 115-95 115 95" fill="none" />
    <path d="M355 206v166h190V206l-95-78Z" fill="#35312d" />
    <rect x="422" y="283" width="55" height="89" rx="5" fill="#e8c4a0" />
    <path d="M377 232h30v35h-30Zm116 0h30v35h-30Z" fill="#e8c4a0" />
  </g>;
}

function Resident() {
  return <g>
    <circle cx="451" cy="223" r="25" fill="#e8c4a0" />
    <path d="M427 220q-5-34 23-34t26 34q-15-8-28-16-5 11-21 16" fill="#24211e" />
    <path d="M414 313v-47q37-35 75 0v47" fill="#f4f2ee" />
    <path d="m434 264 18 20 17-20" fill="none" stroke="#c5a585" strokeWidth="2" />
  </g>;
}

function Parcel({ x, y, width = 95 }) {
  return <g transform={`translate(${x} ${y})`} fill="#e8c4a0" stroke="#191715" strokeWidth="3">
    <rect width={width} height="65" rx="5" />
    <path d={`M0 18h${width}M${width / 2} 0v65`} />
  </g>;
}

function IncidentArt({ id, seconds }) {
  return <svg className="cod-film-camera cod-film-art" viewBox="0 0 900 420" role="img"
    aria-label={id === 'veeramani' ? 'Original illustrated reenactment: a creator, a home, and a request for sweets; not a likeness of Veeramani.'
      : 'Illustrative repeated deliveries and calls reaching a home; not footage or an actual parcel count.'}>
    <path d="M100 372h700" stroke="#62564b" strokeWidth="2" />
    <Home />
    <Resident />
    {id === 'veeramani' ? <>
      <Actor seconds={seconds}>
        <g transform="translate(145 160)">
          <rect width="150" height="136" rx="18" fill="#f4f2ee" />
          <text x="75" y="35" textAnchor="middle" fill="#24211e" fontSize="17">Diwali sweets?</text>
          <rect x="27" y="57" width="96" height="53" rx="8" fill="#d8ae82" />
          {[44, 74, 104].map(x => <circle key={x} cx={x} cy="82" r="13" fill="#f4d0a7" />)}
        </g>
      </Actor>
      <Actor index={1} seconds={seconds}>
        <g transform="translate(618 154)" stroke="#e8c4a0" fill="#24211e" strokeWidth="3">
          <rect width="112" height="180" rx="16" />
          <path d="M34 15h44" />
          <text x="56" y="63" textAnchor="middle" fill="#f4f2ee" stroke="none" fontSize="16">Creator</text>
          <text x="56" y="89" textAnchor="middle" fill="#e8c4a0" stroke="none" fontSize="14">Madurai</text>
          <path d="M22 118h68M22 137h50" />
        </g>
      </Actor>
      <Actor index={2} seconds={seconds}><Parcel x={260} y={308} /></Actor>
    </> : <>
      <Actor seconds={seconds}><Parcel x={180} y={307} width={128} /></Actor>
      <Actor index={1} seconds={seconds}><Parcel x={589} y={307} width={130} /><Parcel x={618} y={242} /></Actor>
      <Actor index={2} seconds={seconds}>
        <g fill="#f4f2ee">
          <rect x="121" y="136" width="186" height="70" rx="14" />
          <text x="214" y="179" textAnchor="middle" fill="#24211e" fontSize="19">Another call</text>
          <rect x="585" y="133" width="213" height="70" rx="14" />
          <text x="691" y="176" textAnchor="middle" fill="#24211e" fontSize="18">Another explanation</text>
        </g>
      </Actor>
    </>}
  </svg>;
}

export default function CodFilmScene({ scene, seconds, beat, pause, demo, setDemo, consent, setConsent, onSolutionStage }) {
  if (['veeramani', 'burden'].includes(scene.id)) return <IncidentArt id={scene.id} seconds={seconds} />;
  if (scene.id === 'coverage') return <div className="cod-film-news">
    {codFilmSources.map((source, index) => <article className="cod-film-source cod-film-arrival" key={source.name}
      ref={element => arrivalDelay(element, index, seconds)}>
      <p className="cod-film-source-label">Source digest / original summary</p>
      <h3>{source.name}</h3><p className="cod-film-source-date">{source.date}</p>
      <p>{source.summary}</p>
      <a href={source.url} target="_blank" rel="noopener noreferrer" onClick={pause}>Read the article <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
    </article>)}
  </div>;
  if (scene.id === 'opportunity') return <div className="cod-film-dispatch">
    {['Order & packing', 'Travel', 'Doorstep refusal'].map((label, index) => <div key={label}
      className={`cod-film-process cod-film-arrival${beat === index ? ' is-emphasised' : ''}`}
      ref={element => arrivalDelay(element, index, seconds)}>
      <span>0{index + 1}</span><strong>{label}</strong>
      <p>{['Proposed review point', 'Effort already spent', 'The resident explains again'][index]}</p>
    </div>)}
    <p className="cod-film-process-note">Design question: intervene before dispatch, not after every doorstep visit.</p>
  </div>;
  if (scene.id === 'scope') return <div className="cod-film-scope">
    <h3>People first. Less avoidable work.</h3>
    <p>Designed to help targeted households report once, cut avoidable packing and travel, and give support teams one managed incident. Proposed benefits, not measured results.</p>
    <div>{['Households: fewer interruptions', 'Delivery teams: fewer wasted trips', 'Platforms: less repeat support work'].map((label, index) => <span
      className="cod-film-arrival" key={label} ref={element => arrivalDelay(element, index, seconds)}>{label}</span>)}</div>
  </div>;
  const stage = ['placement', 'report', 'verify', 'protect', 'sync'].indexOf(scene.id);
  if (stage < 0) throw new Error(`Unknown COD film scene: ${scene.id}`);
  const partner = codPlatforms.find(item => item.id === (demo.partnerId || 'amazon'));
  if (!partner) throw new Error(`Unknown COD film partner: ${demo.partnerId}`);
  return <div className={`cod-partner-experience cod-film-partner-solution cod-partner--${partner.id}`}>
    <div className="cod-film-screen-context">
      <h3>{scene.heading}</h3>
      <div className="cod-partner-tabs" role="group" aria-label="Walkthrough partner apps">
      {codPlatforms.map(item => <button key={item.id} type="button" aria-pressed={partner.id === item.id} onClick={() => {
        pause(); setConsent(false); setDemo({ partnerId: item.id });
      }}>{item.name}</button>)}
      </div>
      <p className="cod-film-example-warning">{stage === 0 ? partner.placement : `${partner.name} / Step ${stage + 1} of 5 / App-inspired concept, not a real service`}</p>
    </div>
    <CodPartnerScreen partner={partner} stage={stage} consent={consent} scrollable
      setConsent={value => { pause(); setConsent(value); setDemo(previous => ({ ...previous, protect: false, confirmationFailed: false })); }}
      showStage={next => {
        pause();
        setDemo(value => ({ ...value, ...(next === 2 ? { report: true } : next === 3 ? { review: true } : next === 4 ? { protect: true, confirmationFailed: false } : {}) }));
        onSolutionStage(next);
      }}
      statuses={stage === 4 && demo.confirmationFailed ? createCodSync('failed', [partner]) : undefined}
      onPreviewFailure={stage === 4 ? () => {
        pause(); setDemo(value => ({ ...value, confirmationFailed: true }));
      } : undefined} />
  </div>;
}
