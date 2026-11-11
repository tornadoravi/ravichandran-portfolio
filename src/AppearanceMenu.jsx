import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext.jsx';

const choices = ['light', 'dark', 'system'];
const labels = { light: 'Light', dark: 'Dark', system: 'System' };

function ThemeIcon({ value }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {value === 'light' ? <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
    </> : value === 'dark' ? <path d="M20.5 13.2A8.6 8.6 0 0 1 10.8 3.5a8.6 8.6 0 1 0 9.7 9.7Z" /> : <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </>}
  </svg>;
}

export default function AppearanceMenu({ open, onOpenChange, onOpen }) {
  const { appearance, selectAppearance, ready } = useTheme();
  const control = useRef(null);
  const trigger = useRef(null);
  const items = useRef([]);
  const focusIndex = useRef(0);

  useEffect(() => {
    if (!open) return;
    items.current[focusIndex.current].focus();
    function outside(event) {
      if (!control.current.contains(event.target)) onOpenChange(false);
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open, onOpenChange]);

  function show(index) {
    focusIndex.current = index;
    onOpen();
    onOpenChange(true);
  }

  function close() {
    onOpenChange(false);
    trigger.current.focus();
  }

  function navigate(event) {
    const current = items.current.indexOf(document.activeElement);
    let next;
    if (event.key === 'ArrowDown') next = (current + 1) % choices.length;
    else if (event.key === 'ArrowUp') next = (current + choices.length - 1) % choices.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = choices.length - 1;
    else if (event.key === 'Escape' || event.key === 'Tab') {
      if (event.key === 'Escape') event.preventDefault();
      close();
      return;
    } else return;
    event.preventDefault();
    items.current[next].focus();
  }

  return <div className="appearance-control" ref={control}>
    <button className="appearance-trigger" type="button" ref={trigger} disabled={!ready} aria-label={`Appearance: ${labels[appearance]}`} title={`Change appearance (${labels[appearance]})`} aria-haspopup="menu" aria-expanded={open} aria-controls="appearance-menu" onClick={() => open ? close() : show(choices.indexOf(appearance))} onKeyDown={event => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      show(event.key === 'ArrowDown' ? 0 : choices.length - 1);
    }}>
      <ThemeIcon value={appearance} />
      <span className="appearance-chevron" aria-hidden="true">⌄</span>
    </button>
    <div id="appearance-menu" className="appearance-menu" role="menu" aria-label="Appearance" hidden={!open} onKeyDown={navigate}>
      {choices.map((value, index) => <button key={value} type="button" role="menuitemradio" aria-checked={appearance === value} tabIndex={-1} ref={element => { items.current[index] = element; }} onClick={() => { selectAppearance(value); close(); }}>
        <ThemeIcon value={value} /><span>{labels[value]}</span><span className="appearance-check" aria-hidden="true">{appearance === value ? '✓' : ''}</span>
      </button>)}
    </div>
  </div>;
}
