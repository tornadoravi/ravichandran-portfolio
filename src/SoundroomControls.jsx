import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext.jsx';

export default function SoundroomControls({ open, onOpenChange, onOpen }) {
  const { mode, ready, playing, starting, volume, status, playbackError, selectMode, changeVolume, start, pause } = useTheme();
  const control = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (!open) return;
    function outside(event) {
      if (!control.current.contains(event.target)) onOpenChange(false);
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open, onOpenChange]);
  const playLabel = starting ? 'Starting...' : playing ? 'Pause ambience' : 'Play ambience';
  return <div className="sound-control" data-soundroom="" ref={control} hidden={!ready} onKeyDown={event => {
    if (event.key !== 'Escape' || !open) return;
    event.preventDefault();
    event.stopPropagation();
    onOpenChange(false);
    trigger.current.focus();
  }} onBlur={event => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) onOpenChange(false);
  }}>
    <button className="sound-settings-trigger" type="button" ref={trigger} aria-label="Sound settings" title={playing ? 'Music is playing' : 'Sound settings'} aria-expanded={open} aria-controls="sound-settings" data-playing={playing} onClick={() => {
      if (!open) onOpen();
      onOpenChange(!open);
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="3" y="12" width="4" height="8" rx="2" /><rect x="17" y="12" width="4" height="8" rx="2" /></svg>
      <span className="sound-playing-dot" hidden={!playing} aria-hidden="true" />
    </button>
    <div id="sound-settings" className="sound-settings-menu" role="region" aria-label="Sound settings" hidden={!open}>
    <p className="sound-settings-heading">Listening</p>
    <aside className="listening-room" aria-label="Portfolio listening modes">
    <div className="listening-modes" role="group" aria-label="Listening mode">
      <button type="button" data-mode="focus" aria-label="Focus Mode" aria-pressed={mode === 'focus'} aria-controls="soundroom-panel" onClick={() => selectMode('focus')}>Focus</button>
      <button type="button" data-mode="soundroom" aria-label="Soundroom Mode" aria-pressed={mode === 'soundroom'} aria-controls="soundroom-panel" onClick={() => selectMode('soundroom')}>Soundroom</button>
    </div>
    <div id="soundroom-panel" className="soundroom-panel" hidden={mode !== 'soundroom'}>
      <button type="button" className="ambience-play" aria-pressed={playing} title={playLabel} disabled={starting} onClick={playing ? pause : start}><span className="play-label sr-only">{playLabel}</span></button>
      <div className="soundroom-volume"><label htmlFor="ambience-volume">Volume</label><input id="ambience-volume" type="range" min="0" max="100" value={volume} onChange={event => changeVolume(Number(event.target.value))} /><output htmlFor="ambience-volume">{volume}%</output></div>
    </div>
    <p className="soundroom-status" role="status" aria-live="polite">{status}</p>
    </aside>
    </div>
    <p className="sound-settings-error" role="alert" hidden={open || !playbackError}>{playbackError ? status : ''}</p>
  </div>;
}
