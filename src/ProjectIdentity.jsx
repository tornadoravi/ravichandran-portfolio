import { sitePath } from './site-path.js';
import React from 'react';

export default function ProjectIdentity({ product, compact = true }) {
  const analytics = product === 'analytics';
  const portfolio = product === 'portfolio';
  return (
    <div className={`project-identity${compact ? ' project-identity--compact' : ''}`} role="group" aria-label="Employer and product platform">
      <div className="identity-company">
        <span className="identity-label">Designed at</span>
        <img className="brand-image" src={sitePath("/assets/lumel-logo.svg")} width="787" height="360" alt="Lumel Technologies" />
      </div>
      <div className="identity-platform">
        <span className="identity-platform-label">Built for</span>
        <img className="brand-image microsoft-wordmark" src={sitePath("/assets/microsoft-logo.png")} width="216" height="46" alt="Microsoft" />
        <span className="identity-product">
          <img className="brand-image" src={analytics ? sitePath('/assets/microsoft-power-bi.svg') : sitePath('/assets/microsoft-fabric.svg')} width="24" height="24" alt="" />
          {portfolio ? 'Fabric & Power BI' : analytics ? 'Analytics+ · Power BI' : 'PowerTable · Fabric'}
        </span>
      </div>
    </div>
  );
}
