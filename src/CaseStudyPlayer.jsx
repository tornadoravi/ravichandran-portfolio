import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import CaseIllustration from './CaseIllustration.jsx';
import { useTheme } from './ThemeContext.jsx';
import { createCaseNarration } from './case-narration.js';
import recordedVoice from './case-audio.json';
import { sitePath } from './site-path.js';

const audioFiles = import.meta.glob('../assets/narration/*.m4a', { eager: true, query: '?url', import: 'default' });

export function WalkthroughButton({ className = 'case-play-button', onClick }) {
  const { ready } = useTheme();
  return <button className={className} type="button"
    hidden={!ready || typeof HTMLDialogElement === 'undefined' || typeof HTMLDialogElement.prototype.showModal !== 'function'}
    aria-haspopup="dialog" aria-describedby="case-play-hint" onClick={onClick}>
    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M8 5 19 12 8 19Z" /></svg>
    Walkthrough
  </button>;
}

export default function CaseStudyPlayer({ ref, caseId, name, narrative, facts, screen, evidenceNote, showTrigger = true }) {
  const { pause: pauseMusic } = useTheme();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [message, setMessage] = useState('');
  const dialog = useRef(null);
  const opener = useRef(null);
  const audio = useRef(null);
  const official = screen?.src.includes('official');
  const steps = useMemo(() => [
    { label: 'Context', guide: "Let's start with the context.", title: name, copy: narrative.purpose, note: `Designed for ${narrative.audience}. My role: ${narrative.role}`, stage: 'challenge' },
    { label: 'Problem', guide: "Here's the problem behind the work.", title: facts[0][0], copy: facts[0][1], stage: 'challenge' },
    { label: 'Decisions', guide: "Let's unpack the design decisions.", title: 'What I designed', copy: narrative.goal, decisions: narrative.steps, stage: 'design' },
    { label: 'Evidence', title: screen ? (official ? 'The product in context' : 'A closer look at the design') : 'A clearly scoped contribution',
      copy: screen ? (official ? 'Official product context, not a claim of whole-product authorship.' : 'An original design state, not a product recording or proof of release.')
        : 'Dedicated design screens were not supplied. This concept explains my contribution without fabricating a final interface.',
      guide: "Let's take a closer look at the evidence.", stage: 'design', screen },
    { label: 'Delivery', guide: "Here's the delivery and its scope.", title: facts[2][0], copy: facts[2][1], note: evidenceNote, stage: 'evidence' }
  ], [name, narrative, facts, screen, official, evidenceNote]);
  const step = steps[active];
  const narration = useMemo(() => createCaseNarration({
    caseId, problem: facts[0][1], hasScreen: Boolean(screen), official
  }), [caseId, facts, screen, official]);

  const recordings = useMemo(() => {
    const saved = recordedVoice.cases[caseId];
    if (!saved) return null;
    if (saved.length !== narration.length || saved.some((item, index) =>
      item.text !== narration[index] || !audioFiles[`../assets/narration/${item.file}`])) return null;
    return saved.map(item => audioFiles[`../assets/narration/${item.file}`]);
  }, [caseId, narration]);
  const voiceAvailable = Boolean(recordings);
  useEffect(() => {
    if (opened && !voiceAvailable) console.error('Recorded walkthrough narration is missing or out of date:', caseId);
  }, [opened, voiceAvailable, caseId]);

  useEffect(() => {
    if (!opened) return;
    const element = dialog.current;
    element.showModal();
    document.body.classList.add('preview-open');
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => setPlaying(false);
    const visibility = () => { if (document.hidden) stop(); };
    const motion = () => {
      setReducedMotion(preference.matches);
      stop();
    };
    preference.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pagehide', stop);
    return () => {
      preference.removeEventListener('change', motion);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pagehide', stop);
      document.body.classList.remove('preview-open');
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    };
  }, [opened]);

  useEffect(() => {
    if (!opened || !playing) return;
    if (document.hidden) { setPlaying(false); return; }
    let live = true;
    let timer;
    let media;
    const text = narration[active];
    const advance = () => {
      if (!live) return;
      if (reducedMotion) setPlaying(false);
      else if (active < steps.length - 1) setActive(index => index + 1);
      else {
        setPlaying(false);
        setCompleted(true);
      }
    };
    const fail = error => {
      if (!live) return;
      console.error('Case study narration failed:', error);
      setPlaying(false);
      setMessage('Voice playback could not finish. Try playing this step again, or turn voice off.');
    };
    if (voiceOn) {
      if (!recordings) {
        setPlaying(false);
        setMessage('Recorded narration is unavailable. Turn voice off to continue visually.');
        return;
      }
      pauseMusic();
      media = audio.current;
      media.src = recordings[active];
      media.onplaying = () => {
        if (!live) return;
        clearTimeout(timer);
        timer = setTimeout(() => fail('Audio completion timed out'), 120000);
      };
      media.onended = () => {
        if (!live) return;
        clearTimeout(timer);
        timer = setTimeout(advance, 450);
      };
      media.onerror = () => fail(media.error || 'Recorded audio failed to load');
      timer = setTimeout(() => fail('Audio did not start'), 15000);
      try {
        media.play().catch(fail);
      } catch (error) {
        fail(error);
      }
    } else if (!reducedMotion) {
      const duration = Math.max(6500, Math.min(18000, text.split(/\s+/).length * 320));
      timer = setTimeout(advance, duration);
    } else setPlaying(false);
    return () => {
      live = false;
      clearTimeout(timer);
      if (media) {
        media.onplaying = null;
        media.onended = null;
        media.onerror = null;
        media.pause();
        media.removeAttribute('src');
        media.load();
      }
    };
  }, [opened, playing, active, narration, steps.length, voiceOn, recordings, reducedMotion, pauseMusic]);

  const start = useCallback(trigger => {
    opener.current = trigger;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setActive(0);
    setCompleted(false);
    setMessage('');
    setVoiceOn(voiceAvailable);
    setReducedMotion(reduce);
    setPlaying(!reduce);
    setOpened(true);
  }, [voiceAvailable]);
  useImperativeHandle(ref, () => ({ open: start }), [start]);
  function choose(index) {
    setPlaying(false);
    setCompleted(false);
    setMessage('');
    setActive(index);
  }
  function toggle() {
    setMessage('');
    if (completed) {
      setActive(0);
      setCompleted(false);
    }
    setPlaying(value => !value);
  }
  function close() {
    dialog.current.close();
  }

  return <>
    {showTrigger && <WalkthroughButton onClick={event => start(event.currentTarget)} />}
    <span className="case-play-hint sr-only" id="case-play-hint">Guided visuals + recorded English narration.</span>
    {opened && <dialog className="case-player" ref={dialog} aria-labelledby="case-player-title" aria-describedby="case-player-description"
      onClose={() => { setPlaying(false); setOpened(false); }}
      onKeyDown={event => { if (event.key === 'Tab') setPlaying(false); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
      }}>
      <header className="case-player-header">
        <div><p className="case-card-number">Guided case study / {name}</p><h2 id="case-player-title">The story behind the design.</h2></div>
        <button type="button" autoFocus aria-label="Close case study walkthrough" onClick={close}>Close <span aria-hidden="true">&#215;</span></button>
        <p id="case-player-description">Five steps: context, problem, decisions, evidence, and delivery.</p>
      </header>
      <nav className="case-player-steps" aria-label="Walkthrough steps">
        {steps.map((item, index) => <button key={item.label} type="button"
          aria-label={`Go to step ${index + 1}: ${item.label}`} aria-current={index === active ? 'step' : undefined}
          onClick={() => choose(index)}><span>0{index + 1}</span><span>{item.label}</span></button>)}
      </nav>
      <div className="case-player-body" key={active}>
        <figure className={`case-player-visual${step.screen ? ' has-screen' : ''}`}>
          {step.screen ? <>
            <a href={step.screen.src} target="_blank" rel="noopener noreferrer" aria-label="View original screen (opens in a new tab)" onClick={() => setPlaying(false)}>
              <img src={step.screen.src} alt={step.screen.alt} width={step.screen.width} height={step.screen.height} decoding="async" onError={() => {
                console.error('Case study screen failed to load:', step.screen.src);
                setPlaying(false);
                setMessage('The original screen could not load. Use its source link to open it directly.');
              }} />
            </a>
            <figcaption>{step.screen.caption}</figcaption>
          </> : <>
            <CaseIllustration caseId={caseId} stage={step.stage} />
            <figcaption>Original concept illustration / not a product recording.</figcaption>
          </>}
        </figure>
        <section className="case-player-copy" aria-labelledby="case-player-step-title">
          <div className="case-player-guide">
            <img src={sitePath('/assets/studio-mascot-peach.webp')} width="160" height="176" alt="" decoding="async" />
            <div><span>Studio companion</span><p>{step.guide}</p></div>
          </div>
          <p className="case-card-number">0{active + 1} / {step.label}</p>
          <h3 id="case-player-step-title">{step.title}</h3>
          <p>{step.copy}</p>
          {step.decisions && <ol>{step.decisions.map(([title, detail]) => <li key={title}><strong>{title}</strong><span>{detail}</span></li>)}</ol>}
          {step.note && <p className="case-player-note">{step.note}</p>}
        </section>
      </div>
      <footer className="case-player-footer">
        <audio ref={audio} preload="none" aria-label="Recorded walkthrough narration" hidden />
        <progress value={completed ? steps.length : active + 1} max={steps.length} aria-label="Case study progress" />
        <p className="case-player-status" role="status">Step {active + 1} of {steps.length} / {completed ? 'Walkthrough complete' : playing ? (voiceOn ? 'Narrating' : 'Playing') : reducedMotion ? 'Manual mode — reduced motion' : 'Paused — play restarts this step'}</p>
        {message && <p className="case-player-error" role="alert">{message}</p>}
        {!voiceAvailable && <p className="case-player-voice-note">Recorded narration is missing or out of date here. The visual walkthrough still works.</p>}
        <div className="case-player-controls">
          <button type="button" onClick={() => choose(active - 1)} disabled={active === 0}>Back</button>
          <button className="case-player-toggle" type="button" onClick={toggle} disabled={reducedMotion && !voiceOn}>
            {playing ? 'Pause' : completed ? 'Replay' : reducedMotion ? 'Read this step' : 'Play from here'}
          </button>
          <button type="button" aria-pressed={voiceOn} disabled={!voiceAvailable && !voiceOn} onClick={() => {
            setMessage('');
            setVoiceOn(value => !value);
          }}>
            {voiceAvailable || voiceOn ? `Voice ${voiceOn ? 'on' : 'off'}` : 'Voice unavailable'}
          </button>
          <button type="button" onClick={() => active === steps.length - 1 ? close() : choose(active + 1)}>{active === steps.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
        <p className="case-player-voice-note">
          {voiceAvailable ? `Recorded English narration / ${recordedVoice.label}.` : 'Recorded English narration unavailable.'}
          {' '}Soundroom pauses during narration. Generated locally; no live speech API or browser voice.
        </p>
      </footer>
    </dialog>}
  </>;
}
