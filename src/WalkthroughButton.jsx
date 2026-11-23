import React from 'react';
import { useTheme } from './ThemeContext.jsx';

export default function WalkthroughButton({ className = 'case-play-button', onClick }) {
  const { ready } = useTheme();
  return <button className={className} type="button"
    hidden={!ready || typeof HTMLDialogElement === 'undefined' || typeof HTMLDialogElement.prototype.showModal !== 'function'}
    aria-haspopup="dialog" aria-describedby="case-play-hint" onClick={onClick}>
    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M8 5 19 12 8 19Z" /></svg>
    Walkthrough
  </button>;
}
