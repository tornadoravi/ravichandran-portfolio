import React from 'react';
import { sitePath } from './site-path.js';
import '../walkthrough-guide.css';

export default function WalkthroughGuide({ speaking = false, children }) {
  return <div className="walkthrough-guide" data-speaking={speaking}>
    <div className="walkthrough-guide-character" aria-hidden="true">
      <img src={sitePath('/assets/studio-mascot-peach.webp')} width="160" height="176" alt="" decoding="async" />
      <span className="walkthrough-guide-levels"><span /><span /><span /></span>
    </div>
    <div className="walkthrough-guide-caption">{children}</div>
  </div>;
}
