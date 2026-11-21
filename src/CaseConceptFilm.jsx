import React, { useEffect, useRef, useState } from 'react';
import CaseIllustration from './CaseIllustration.jsx';

const stages = ['challenge', 'design', 'evidence'];
const labels = ['The task', 'The decision', 'The evidence'];

export default function CaseConceptFilm({ caseId, facts }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const controls = useRef([]);

  useEffect(() => {
    if (!playing) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => setPlaying(false);
    const visibility = () => { if (document.hidden) stop(); };
    if (preference.matches || document.hidden) { stop(); return; }
    const timer = setTimeout(() => {
      if (active < stages.length - 1) setActive(value => value + 1);
      else stop();
    }, 3200);
    preference.addEventListener('change', stop);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('keydown', stop);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener('change', stop);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('keydown', stop);
    };
  }, [active, playing]);

  function choose(index) {
    setPlaying(false);
    setActive(index);
  }
  function move(event, index) {
    const next = event.key === 'ArrowRight' ? (index + 1) % 3
      : event.key === 'ArrowLeft' ? (index + 2) % 3
        : event.key === 'Home' ? 0 : event.key === 'End' ? 2 : null;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    controls.current[next].focus();
  }

  return <div className={`case-film${playing ? ' is-playing' : ''}`} role="group" aria-label="Illustrated case concept">
    <div className="case-film-top"><span>Concept film / 3 scenes</span><span>Original illustration &#183; Not a product recording</span></div>
    <div className="case-film-controls" role="group" aria-label="Concept scenes">
      {labels.map((label, index) => <button key={label} type="button" aria-pressed={active === index}
        ref={element => { controls.current[index] = element; }} onClick={() => choose(index)}
        onKeyDown={event => move(event, index)}>
        <span aria-hidden="true">0{index + 1}</span> {label}
      </button>)}
      <button className="case-film-play" type="button" aria-pressed={playing} onClick={event => {
        if (event.detail === 0) { choose(0); return; }
        if (playing) setPlaying(false);
        else if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { setActive(0); setPlaying(true); }
      }}>{playing ? 'Pause concept' : 'Play 10-second concept'} <span aria-hidden="true">{playing ? <>&#8545;</> : <>&#9655;</>}</span></button>
    </div>
    {stages.map((stage, index) => <div key={stage} className="case-film-panel" hidden={active !== index}>
      <div className="case-film-visual"><CaseIllustration caseId={caseId} stage={stage} /></div>
      <div className="case-film-copy">
        <span className="case-card-number">0{index + 1} / {labels[index]}</span>
        <h3>{facts[index][0]}</h3><p>{facts[index][1]}</p>
        <div key={`${active}-${playing}`} className="case-film-timeline" aria-hidden="true"><span /></div>
      </div>
    </div>)}
    <p className="case-film-status" role="status">Scene {active + 1} of 3{playing ? ' / Playing' : ' / Choose a scene to explore'}</p>
  </div>;
}
