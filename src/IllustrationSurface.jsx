import React, { createContext, useContext, useId } from 'react';

const PaintContext = createContext(null);

export function PaperSheet({ className = '', ...props }) {
  const paint = useContext(PaintContext);
  if (!paint) throw new Error('PaperSheet requires an IllustrationSurface');
  return <rect {...props} className={`illustration-paper ${className}`} fill={`url(#${paint.paper})`} filter={`url(#${paint.shadow})`} />;
}

export default function IllustrationSurface({ children }) {
  const id = useId();
  const paint = { paper: `${id}-paper`, green: `${id}-green`, sand: `${id}-sand`, shadow: `${id}-shadow` };
  return <PaintContext.Provider value={paint}><g className="illustration-surface">
    <defs>
      <linearGradient id={paint.paper} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#ffffff" /><stop offset="1" stopColor="#f9fbfa" />
      </linearGradient>
      <linearGradient id={paint.green} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#91a89b" /><stop offset="1" stopColor="#668577" />
      </linearGradient>
      <linearGradient id={paint.sand} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#e0d8c6" /><stop offset="1" stopColor="#b5a88b" />
      </linearGradient>
      <filter id={paint.shadow} x="-20%" y="-20%" width="150%" height="155%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#334e43" floodOpacity=".12" />
      </filter>
    </defs>
    {typeof children === 'function' ? children(paint) : children}
  </g></PaintContext.Provider>;
}
