import React, { useEffect } from 'react';
import Header from './Header.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import { initializePortfolioEffects } from './portfolio-effects.js';

export default function Portfolio({ Page, page }) {
  useEffect(() => initializePortfolioEffects(), []);
  return <ThemeProvider><Header page={page} /><Page /></ThemeProvider>;
}
