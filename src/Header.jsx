import { sitePath } from './site-path.js';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeContext.jsx';
import AppearanceMenu from './AppearanceMenu.jsx';
import SoundroomControls from './SoundroomControls.jsx';

export default function Header({ page }) {
  const { mode, ready } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [greetingOpen, setGreetingOpen] = useState(false);
  const brand = useRef(null);
  const header = useRef(null);
  const menuButton = useRef(null);
  const home = page === 'index';
  const about = page === 'about';
  const greeting = !home ? 'Hello! Let’s explore the thinking behind the work.'
    : mode === 'soundroom' ? 'Good music. Thoughtful work. Pick a card to explore.'
    : 'Hello! Pick a project card. Let’s explore the work.';

  useEffect(() => {
    setMenuOpen(false);
    setAppearanceOpen(false);
    setSoundOpen(false);
    setGreetingOpen(false);
  }, [page]);

  useEffect(() => {
    const events = new AbortController();
    document.addEventListener('click', event => {
      if (!brand.current.contains(event.target)) setGreetingOpen(false);
      if (!header.current.contains(event.target)) setMenuOpen(false);
    }, { signal: events.signal });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      setGreetingOpen(false);
      if (menuOpen) menuButton.current.focus();
      setMenuOpen(false);
    }, { signal: events.signal });
    const desktop = matchMedia('(min-width: 701px)');
    desktop.addEventListener('change', () => setMenuOpen(false), { signal: events.signal });
    return () => events.abort();
  }, [menuOpen]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header reference-header wrap" ref={header}>
      <div className="header-brand" ref={brand}>
        <button className="companion-button" type="button" data-companion="" aria-label="Say hello to the studio companion" aria-expanded={greetingOpen} aria-controls="companion-greeting" disabled={!ready} onClick={() => { setAppearanceOpen(false); setSoundOpen(false); setMenuOpen(false); setGreetingOpen(open => !open); }}><img className="studio-mascot soundroom-companion" src={sitePath('/assets/studio-mascot-peach.webp')} width="160" height="176" alt="" decoding="async" /></button>
        <a className="wordmark" href={sitePath("/")} aria-label="Ravichandran V home">Ravichandran<span className="accent"> V.</span></a>
        <p id="companion-greeting" className="companion-greeting" role="status" hidden={!greetingOpen}>{greetingOpen ? greeting : ''}</p>
      </div>
      <button className="menu-toggle" ref={menuButton} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => { setAppearanceOpen(false); setSoundOpen(false); setGreetingOpen(false); setMenuOpen(open => !open); }}>Menu <span aria-hidden="true">+</span></button>
      <nav id="main-nav" className={menuOpen ? 'is-open' : undefined} aria-label="Main navigation" onClick={event => { if (event.target.closest('a')) setMenuOpen(false); }}>
        <a href={sitePath("/")} aria-current={home ? 'page' : undefined}>Home</a>
        <a href={sitePath("/about.html")} aria-current={about ? 'page' : undefined}>About</a>
        <a className="mobile-resume" href={sitePath("/assets/ravichandran-resume.pdf")} target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span><span className="sr-only"> (PDF, opens in a new tab)</span></a>
        <span className="nav-note">Product design for enterprise software</span>
      </nav>
      <div className="header-contacts">
        <a href={sitePath("/assets/ravichandran-resume.pdf")} target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span><span className="sr-only"> (PDF, opens in a new tab)</span></a>
        <SoundroomControls open={soundOpen} onOpenChange={setSoundOpen} onOpen={() => { setAppearanceOpen(false); setMenuOpen(false); setGreetingOpen(false); }} />
        <AppearanceMenu open={appearanceOpen} onOpenChange={setAppearanceOpen} onOpen={() => { setSoundOpen(false); setMenuOpen(false); setGreetingOpen(false); }} />
      </div>
    </header>
  </>;
}
