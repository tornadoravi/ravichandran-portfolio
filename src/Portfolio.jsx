import { sitePath } from './site-path.js';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import Header from './Header.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import { initializePortfolioEffects } from './portfolio-effects.js';
import { initializePortfolioNavigation } from './navigation.js';

export default function Portfolio({ Page, page }) {
  const [route, setRoute] = useState({ Page, page, title: '' });
  useEffect(() => initializePortfolioEffects(), [route]);
  useEffect(() => initializePortfolioNavigation(next => {
    flushSync(() => setRoute(next));
  }), []);
  const CurrentPage = route.Page;
  return <ThemeProvider>
    <Header page={route.page} />
    <CurrentPage key={route.page} />
    <audio id="portfolio-ambience" src={sitePath("/assets/soundroom-roja.mp3")} preload="none" loop />
    <span className="sr-only" role="status" aria-live="polite">{route.title}</span>
  </ThemeProvider>;
}
