import React from 'react';
import { useTheme } from './ThemeContext.jsx';

export default function SoundroomControls() {
  const { mode, ready, playing, starting, volume, status, selectMode, changeVolume, start, pause } = useTheme();
  const playLabel = starting ? 'Starting...' : playing ? 'Pause ambience' : 'Play ambience';
  return <aside className="listening-room" data-soundroom="" aria-label="Portfolio listening modes" hidden={!ready}>
    <div className="listening-modes" role="group" aria-label="Listening mode">
      <button type="button" data-mode="focus" aria-pressed={mode === 'focus'} aria-controls="soundroom-panel" onClick={() => selectMode('focus')}>Focus Mode</button>
      <button type="button" data-mode="soundroom" aria-pressed={mode === 'soundroom'} aria-controls="soundroom-panel" onClick={() => selectMode('soundroom')}>Soundroom Mode</button>
    </div>
    <div id="soundroom-panel" className="soundroom-panel" hidden={mode !== 'soundroom'}>
      <button type="button" className="ambience-play" aria-pressed={playing} title={playLabel} disabled={starting} onClick={playing ? pause : start}><span className="play-label sr-only">{playLabel}</span></button>
      <div className="soundroom-volume"><label htmlFor="ambience-volume">Volume</label><input id="ambience-volume" type="range" min="0" max="100" value={volume} onChange={event => changeVolume(Number(event.target.value))} /><output htmlFor="ambience-volume">{volume}%</output></div>
    </div>
    <p className={`soundroom-status${mode === 'focus' ? ' sr-only' : ''}`} role="status" aria-live="polite">{status}</p>
  </aside>;
}
