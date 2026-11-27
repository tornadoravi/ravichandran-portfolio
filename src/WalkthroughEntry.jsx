import React from 'react';
import WalkthroughButton from './WalkthroughButton.jsx';

export default function WalkthroughEntry({ onClick, readHref, readLabel = 'View screens', children }) {
  return <div className="case-watch-entry">
      <div className="case-hero-actions">
        {onClick && <WalkthroughButton onClick={onClick} />}
        {children}
        {readHref && <a className="case-read-link" href={readHref}>{readLabel} <span aria-hidden="true">↓</span></a>}
      </div>
  </div>;
}
