import React, { createContext, useContext, useId } from 'react';

const PaintContext = createContext(null);

export function PaperSheet({ className = '', ...props }) {
  const paint = useContext(PaintContext);
  if (!paint) throw new Error('PaperSheet requires an IllustrationSurface');
  return <rect {...props} className={`illustration-paper ${className}`} fill={`url(#${paint.paper})`} filter={`url(#${paint.shadow})`} />;
}

export default function IllustrationSurface({ children }) {
  const id = useId();
  const paint = { paper: `${id}-paper`, accent: `${id}-accent`, sand: `${id}-sand`, shadow: `${id}-shadow` };
  return <PaintContext.Provider value={paint}><g className="illustration-surface">
    <defs>
      <linearGradient id={paint.paper} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="var(--art-white)" /><stop offset="1" stopColor="var(--art-paper-bottom)" />
      </linearGradient>
      <linearGradient id={paint.accent} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="var(--art-accent-top)" /><stop offset="1" stopColor="var(--art-accent)" />
      </linearGradient>
      <linearGradient id={paint.sand} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="var(--art-sand-soft)" /><stop offset="1" stopColor="var(--art-sand)" />
      </linearGradient>
      <filter id={paint.shadow} x="-20%" y="-20%" width="150%" height="155%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="var(--art-shadow-ink)" floodOpacity=".1" />
      </filter>
    </defs>
    {typeof children === 'function' ? children(paint) : children}
  </g></PaintContext.Provider>;
}
