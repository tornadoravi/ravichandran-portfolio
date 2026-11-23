import React, { useEffect, useRef, useState } from 'react';
import CaseSolutionScene from './CaseSolutionScene.jsx';
import { caseSolutions, solutionSteps } from './case-solutions.js';

export default function CaseConceptFilm({ caseId }) {
  const solution = caseSolutions[caseId];
  const steps = solutionSteps[caseId];
  if (!solution || !steps) throw new Error(`Unknown concept explanation: ${caseId}`);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const controls = useRef([]);
  const words = [steps[active].title, steps[active].action, steps[active].response, steps[active].why].join(' ').split(/\s+/).length;
  const duration = Math.max(6000, Math.min(30000, Math.ceil(words / 200 * 60000)));

  useEffect(() => {
    if (!playing) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => setPlaying(false);
    const visibility = () => { if (document.hidden) stop(); };
    if (preference.matches || document.hidden) { stop(); return; }
    const timer = setTimeout(() => {
      if (active < steps.length - 1) setActive(value => value + 1);
      else stop();
    }, duration);
    preference.addEventListener('change', stop);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('keydown', stop);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener('change', stop);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('keydown', stop);
    };
  }, [active, playing, duration]);

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

  return <div className={`case-film${playing ? ' is-playing' : ''}`} role="group" aria-label="Step-by-step solution illustration">
    <div className="case-film-top"><span>Solution walkthrough / {steps.length} steps</span><span>Original illustration &#183; Not a product recording</span></div>
    <div className="case-film-controls" role="group" aria-label="Solution steps">
      {steps.map((step, index) => <button key={step.title} type="button" aria-pressed={active === index}
        ref={element => { controls.current[index] = element; }} onClick={() => choose(index)}
        onKeyDown={event => move(event, index)}>
        <span aria-hidden="true">0{index + 1}</span> {step.title}
      </button>)}
      <button className="case-film-play" type="button" aria-pressed={playing} onClick={event => {
        if (event.detail === 0) { choose(0); return; }
        if (playing) setPlaying(false);
        else if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { setActive(0); setPlaying(true); }
      }}>{playing ? 'Pause concept' : 'Play concept'} <span aria-hidden="true">{playing ? <>&#8545;</> : <>&#9655;</>}</span></button>
    </div>
    {steps.map((step, index) => <div key={step.title} className="case-film-panel" hidden={active !== index}>
      <div className="case-film-visual"><CaseSolutionScene steps={steps} active={index} /></div>
      <div className="case-film-copy">
        <span className="case-card-number">Step 0{index + 1} / {step.title}</span>
        <h3>{step.title}</h3>
        <dl className="case-film-step-details">
          <div><dt>What the user does</dt><dd>{step.action}</dd></div>
          <div><dt>What the design makes clear</dt><dd>{step.response}</dd></div>
          <div><dt>Why this step matters</dt><dd>{step.why}</dd></div>
        </dl>
        <div key={`${active}-${playing}`} className="case-film-timeline" aria-hidden="true"><span ref={element => {
          if (element) element.style.animationDuration = `${duration}ms`;
        }} /></div>
      </div>
    </div>)}
    <p className="case-film-status" role="status">Step {active + 1} of {steps.length}{playing ? ' / Playing' : ' / Choose a step to explore'}</p>
    <p className="case-film-scope"><strong>Evidence & scope</strong> {solution.evidence}</p>
  </div>;
}
