import React from 'react';
import { sitePath } from './site-path.js';

export default function ProductCover({ product }) {
  const analytics = product === 'analytics';
  const name = analytics ? 'Inforiver Analytics+' : 'PowerTable';
  const artwork = analytics ? 'analytics-insights-cover' : 'powertable-planning-cover';
  const description = analytics
    ? 'Concept illustration of cobalt bars, a trend line, and an ivory chart disc.'
    : 'Concept illustration of a calendar, task cards, and connected team tokens.';

  return (
    <div className={`cover-evidence product-cover-art product-cover-art--${product}`} role="img" aria-label={`${name} product cover`} aria-description={description}>
      <img
        className="product-cover-illustration"
        src={sitePath(`/assets/${artwork}.webp`)}
        srcSet={`${sitePath(`/assets/${artwork}-small.webp`)} 960w, ${sitePath(`/assets/${artwork}.webp`)} 1536w`}
        sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1050px) calc(100vw - 92px), 56vw"
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
        alt=""
      />
    </div>
  );
}
