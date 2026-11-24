import React from 'react';
import WalkthroughButton from './WalkthroughButton.jsx';
import caseAudio from './case-film-audio.json';
import codAudio from './cod-film-audio.json';

export default function WalkthroughEntry({ caseId, onClick, readHref, readLabel = 'View screens', children }) {
  const clips = caseId === 'codShield' ? codAudio.scenes : caseAudio.cases[caseId];
  const seconds = Math.round(clips?.reduce((total, clip) => total + clip.seconds, 0));
  const duration = seconds ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` : null;
  return <div className="case-watch-entry">
      <div className="case-hero-actions">
        {onClick && <WalkthroughButton onClick={onClick} />}
        {children}
        {readHref && <a className="case-read-link" href={readHref}>{readLabel} <span aria-hidden="true">↓</span></a>}
      </div>
      <p className="walkthrough-entry-note">{duration && `${duration} · `}Voiceover + captions</p>
  </div>;
}
