import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import WalkthroughButton from './WalkthroughButton.jsx';
import WalkthroughGuide from './WalkthroughGuide.jsx';
import { useTheme } from './ThemeContext.jsx';
import { cueAt, narrationCues } from './walkthrough-timing.js';
import '../cod-film.css';

const audioFiles = import.meta.glob('../assets/narration/*.m4a', { eager: true, query: '?url', import: 'default' });
const emptyDemo = {};
const timeLabel = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export default function CaseFilmPlayer({
  ref, scenes, sections, clips, steps, Scene, title, description, entryNote, hint,
  voiceLabel, showTrigger = true, feedbackForScene, presentation = 'standard'
}) {
  const { pause: pauseMusic } = useTheme();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mediaStarted, setMediaStarted] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [volume, setVolume] = useState(0.65);
  const [cue, setCue] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [motionStarted, setMotionStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [beat, setBeat] = useState(0);
  const [message, setMessage] = useState('');
  const [demo, setDemo] = useState(emptyDemo);
  const [consent, setConsent] = useState(false);
  const dialog = useRef(null);
  const opener = useRef(null);
  const audio = useRef(null);
  const body = useRef(null);
  const elapsed = useRef(0);
  const bar = useRef(null);
  const clock = useRef(null);
  const captions = useRef(null);
  const buttons = useRef([]);
  const solutionButtons = useRef([]);
  const recordings = useMemo(() => {
    if (!clips || clips.length !== scenes.length || clips.some((clip, index) =>
      clip.id !== scenes[index].id || clip.text !== scenes[index].narration ||
      !Number.isFinite(clip.seconds) || clip.seconds <= 0 || !audioFiles[`../assets/narration/${clip.file}`])) return null;
    return clips.map(clip => ({ ...clip, src: audioFiles[`../assets/narration/${clip.file}`] }));
  }, [clips, scenes]);
  const durations = useMemo(() => scenes.map((scene, index) =>
    recordings?.[index].seconds ?? Math.max(8, scene.narration.split(/\s+/).length / 2.8)), [recordings, scenes]);
  const total = durations.reduce((sum, seconds) => sum + seconds, 0);
  const prior = durations.slice(0, active).reduce((sum, seconds) => sum + seconds, 0);
  const scene = scenes[active];
  const cues = useMemo(() => narrationCues(scene.narration), [scene.narration]);
  const solutionSection = sections.find(section => section.label === 'Solution');
  const screenScene = presentation === 'screens' && active >= solutionSection.start && active <= solutionSection.end;
  const seconds = durations[active];
  const updateClock = useCallback(position => {
    elapsed.current = Math.min(seconds, Math.max(0, position));
    if (bar.current) bar.current.style.transform = `scaleX(${(prior + elapsed.current) / total})`;
    if (clock.current) clock.current.textContent = `${timeLabel(prior + elapsed.current)} / ${timeLabel(total)}`;
    setCue(cueAt(cues, elapsed.current / seconds));
    setBeat(value => {
      const next = Math.min(2, Math.floor(elapsed.current / seconds * 3));
      return next === value ? value : next;
    });
  }, [seconds, prior, total, cues]);
  const goTo = useCallback((index, play = false) => {
    elapsed.current = 0;
    updateClock(0);
    if (body.current) body.current.scrollTop = 0;
    if (presentation === 'screens') {
      if (dialog.current) dialog.current.scrollTop = 0;
      setConsent(false);
    }
    if (audio.current) {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
    setBeat(0);
    setCue(0);
    setMessage('');
    setCompleted(false);
    setPlaying(play);
    setMediaStarted(false);
    setMotionStarted(play && !reduced);
    setActive(index);
  }, [reduced, updateClock, presentation]);
  const open = useCallback(trigger => {
    opener.current = trigger;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(reduce);
    setActive(0);
    elapsed.current = 0;
    setBeat(0);
    setCue(0);
    setCompleted(false);
    setMessage('');
    setDemo(emptyDemo);
    setConsent(false);
    setVoiceOn(Boolean(recordings));
    setMotionStarted(!reduce);
    setPlaying(!reduce);
    setMediaStarted(false);
    setOpened(true);
  }, [recordings]);
  useImperativeHandle(ref, () => ({ open }), [open]);

  useEffect(() => {
    if (!opened) return;
    dialog.current.showModal();
    document.body.classList.add('preview-open');
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => setPlaying(false);
    const visibility = () => { if (document.hidden) stop(); };
    const motion = () => { setReduced(preference.matches); setMotionStarted(false); stop(); };
    preference.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pagehide', stop);
    if (!recordings) console.error('Walkthrough narration is missing or out of date:', title);
    return () => {
      preference.removeEventListener('change', motion);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pagehide', stop);
      document.body.classList.remove('preview-open');
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    };
  }, [opened, recordings, title]);

  useEffect(() => {
    if (!opened) return;
    updateClock(0);
    if (!recordings) return;
    const media = audio.current;
    media.src = recordings[active].src;
    media.load();
    return () => {
      media.pause();
      media.removeAttribute('src');
      media.load();
    };
  }, [opened, active, recordings, updateClock]);

  useEffect(() => {
    if (opened && audio.current) audio.current.volume = volume;
  }, [opened, volume]);

  useEffect(() => {
    const current = captions.current?.querySelector('[aria-current="true"]');
    if (current) captions.current.scrollTop += current.getBoundingClientRect().top - captions.current.getBoundingClientRect().top;
  }, [cue, opened, playing, active]);

  useEffect(() => {
    if (!opened || !playing) return;
    if (document.hidden) { setPlaying(false); return; }
    let live = true;
    let timer;
    let interval;
    const media = audio.current;
    const finish = () => {
      if (!live) return;
      updateClock(seconds);
      if (active === scenes.length - 1) { setCompleted(true); setPlaying(false); }
      else if (reduced) setPlaying(false);
      else goTo(active + 1, true);
    };
    const fail = error => {
      if (!live) return;
      console.error('Walkthrough narration failed:', error);
      setPlaying(false);
      setMessage('This recording could not play. Retry this scene; the captions and scene controls remain available.');
    };
    pauseMusic();
    if (recordings) {
      media.onplaying = () => {
        if (!live) return;
        setMediaStarted(true);
        clearTimeout(timer);
        timer = setTimeout(() => fail('Recording completion timed out'), 120000);
      };
      media.ontimeupdate = () => { if (live) updateClock(media.currentTime); };
      media.onended = finish;
      media.onerror = () => fail(media.error || 'Recording failed to load');
      timer = setTimeout(() => fail('Recording did not start'), 15000);
      try { media.play().catch(fail); } catch (error) { fail(error); }
    } else {
      setMediaStarted(true);
      const started = performance.now();
      const position = elapsed.current;
      interval = setInterval(() => {
        updateClock(position + (performance.now() - started) / 1000);
        if (elapsed.current >= seconds) finish();
      }, 250);
    }
    return () => {
      live = false;
      setMediaStarted(false);
      clearTimeout(timer);
      clearInterval(interval);
      if (recordings) {
        media.onplaying = null;
        media.ontimeupdate = null;
        media.onended = null;
        media.onerror = null;
        media.pause();
      }
    };
  }, [opened, playing, active, recordings, seconds, reduced, goTo, pauseMusic, updateClock, scenes.length]);

  function toggle() {
    if (message && recordings) {
      audio.current.load();
      audio.current.currentTime = elapsed.current;
    }
    setMessage('');
    if (completed) { goTo(0, true); return; }
    if (!playing && elapsed.current >= seconds) {
      elapsed.current = 0;
      updateClock(0);
      if (audio.current) audio.current.currentTime = 0;
      setMotionStarted(false);
    } else if (!playing && !reduced) setMotionStarted(true);
    setPlaying(value => !value);
  }
  function moveSection(event, index) {
    const count = sections.length;
    const next = event.key === 'ArrowRight' ? (index + 1) % count
      : event.key === 'ArrowLeft' ? (index + count - 1) % count
        : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : null;
    if (next === null) return;
    event.preventDefault();
    goTo(sections[next].start);
    buttons.current[next].focus();
  }
  const pause = () => setPlaying(false);
  const feedback = feedbackForScene?.(scene, demo);
  return <>
    {showTrigger && <WalkthroughButton onClick={event => open(event.currentTarget)} />}
    <span id="case-play-hint" className="sr-only">{hint}</span>
    {entryNote && <p className="cod-film-entry-note">{entryNote}</p>}
    {opened && <dialog ref={dialog} className="case-player cod-film-player" data-presentation={presentation} aria-labelledby="cod-film-title" aria-describedby="cod-film-description"
      onClose={() => { setPlaying(false); setOpened(false); }}
      onKeyDown={event => { if (event.key === 'Tab') pause(); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current.close();
      }}>
      <header className="cod-film-header">
        <div><p className="case-card-number">Walkthrough</p><h2 id="cod-film-title">{title}</h2></div>
        <button type="button" autoFocus aria-label="Close cinematic walkthrough" onClick={() => dialog.current.close()}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="m4 4 8 8M12 4l-8 8" />
          </svg>
        </button>
        <p id="cod-film-description" className="sr-only">{description}</p>
      </header>
      <nav className="cod-film-nav" aria-label="Story sections" data-section-count={sections.length}>
        {sections.map((item, index) => <button key={item.label} type="button" ref={element => { buttons.current[index] = element; }}
          aria-label={`Go to section ${index + 1}: ${item.label}`} aria-current={active >= item.start && active <= item.end ? 'step' : undefined}
          onClick={() => goTo(item.start)} onKeyDown={event => moveSection(event, index)}>
          {item.label}
        </button>)}
      </nav>
      {active >= solutionSection.start && active <= solutionSection.end && <div className="case-player-solution-steps" role="group" aria-label="Solution steps" data-step-count={steps.length}>
        {steps.map((step, index) => <button type="button" key={step.title} aria-pressed={active === index + solutionSection.start}
          ref={element => { solutionButtons.current[index] = element; }} aria-controls="cod-film-scene"
          onClick={() => goTo(index + solutionSection.start)} onKeyDown={event => {
            const next = event.key === 'ArrowRight' ? (index + 1) % steps.length : event.key === 'ArrowLeft' ? (index + steps.length - 1) % steps.length
              : event.key === 'Home' ? 0 : event.key === 'End' ? steps.length - 1 : null;
            if (next === null) return;
            event.preventDefault();
            goTo(next + solutionSection.start);
            solutionButtons.current[next].focus();
          }}>0{index + 1} {step.title}</button>)}
      </div>}
      <div ref={body} className="cod-film-body" key={scene.id}>
        <section id="cod-film-scene" key={`${scene.id}-${motionStarted}`} className={`cod-film-stage ${scene.kind === 'incident' ? 'is-incident' : 'is-concept'}${screenScene ? ' is-screen' : ''}${motionStarted ? ' has-motion' : ''}`}
          data-scene={scene.id} data-beat={beat} data-playing={playing && mediaStarted} data-reduced={reduced} aria-labelledby="cod-film-scene-title">
          <div className={`cod-film-stage-heading${scene.solutionIndex !== undefined ? ' is-solution-heading' : ''}`}><p>{scene.disclosure || (scene.kind === 'incident' ? 'News-reported incident / illustrated reenactment' : 'Independent concept / no working service')}</p>
            <h3 id="cod-film-scene-title">{scene.heading}</h3>
          </div>
          <div className="cod-film-stage-content">
            <Scene scene={scene} seconds={seconds} beat={beat} playing={playing && mediaStarted} pause={pause} demo={demo} setDemo={setDemo} consent={consent} setConsent={setConsent}
              onSolutionStage={index => goTo(solutionSection.start + index)} close={() => dialog.current.close()} />
          </div>
          <div className="walkthrough-cues" aria-label="Visual explanation steps">
            <span aria-current="step">
              <span aria-hidden="true">0{beat + 1}</span>
              <strong className="walkthrough-current-cue" key={`${scene.id}-${beat}`}>{scene.beats[beat]}</strong>
            </span>
          </div>
        </section>
      </div>
      <footer className="cod-film-footer">
        <WalkthroughGuide speaking={playing && mediaStarted && voiceOn && volume > 0}>
          <div ref={captions} className="cod-film-captions" tabIndex="0" aria-label="Scene captions"
            data-following={playing && mediaStarted}>
            <span>0{active + 1} / {scene.label}</span>
            <p>{cues.map((item, index) => <span className="walkthrough-sentence" key={index}
              aria-current={cue === index ? 'true' : undefined}>{item.text}</span>)}</p>
          </div>
        </WalkthroughGuide>
        {feedback && <p className="cod-film-feedback" role="status">{feedback}</p>}
        <audio ref={audio} preload="none" muted={!voiceOn || volume === 0} hidden aria-label="Cinematic story narration" />
        <div className="cod-film-progress" aria-hidden="true"><span ref={bar} /></div>
        <div className="cod-film-position"><p role="status" className="cod-film-status">Scene {active + 1} of {scenes.length} / {completed ? 'Story complete' : playing ? (!mediaStarted ? 'Loading narration' : voiceOn && volume > 0 ? 'Narrating' : 'Playing muted') : reduced ? 'Manual mode — reduced motion' : 'Paused'}</p>
          <span ref={clock}>0:00 / {timeLabel(total)}</span></div>
        {message && <p className="case-player-error" role="alert">{message}</p>}
        {!recordings && <p className="case-player-error" role="alert">Recorded narration is missing or out of date. This is a captioned visual story until recordings are restored.</p>}
        <div className="case-player-controls">
          <button type="button" disabled={active === 0} onClick={() => goTo(active - 1)}>Back</button>
          <button className="case-player-toggle" type="button" onClick={toggle}>{playing ? 'Pause' : completed ? 'Replay story' : reduced ? 'Read this scene' : 'Play'}</button>
          <button type="button" aria-pressed={voiceOn} disabled={!recordings} onClick={() => setVoiceOn(value => !value)}>Voice {voiceOn ? 'on' : 'off'}</button>
          <button type="button" onClick={() => active === scenes.length - 1 ? dialog.current.close() : goTo(active + 1)}>{active === scenes.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
        <label className="walkthrough-volume">
          Volume
          <input type="range" min="0" max="100" step="5" value={Math.round(volume * 100)}
            disabled={!recordings} aria-label="Narration volume" aria-valuetext={`${Math.round(volume * 100)} percent`}
            onChange={event => {
              const next = Number(event.target.value) / 100;
              setVolume(next);
              if (next > 0) setVoiceOn(true);
            }} />
          <output>{Math.round(volume * 100)}%</output>
        </label>
        <p className="cod-film-footer-note sr-only">Self-hosted English narration / {voiceLabel}. Pause preserves your place. Example interactions pause the story; no data is sent or stored.</p>
      </footer>
    </dialog>}
  </>;
}
