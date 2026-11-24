import React from 'react';
import CaseStoryNav from './CaseStoryNav.jsx';
import CasePresentation, { CaseEndcap } from './CasePresentation.jsx';

export default function CaseStoryLayout({ caseId, children }) {
  if (!['spatial', 'codShield'].includes(caseId)) {
    return <div className="case-presentation-layout">
      <CasePresentation caseId={caseId}>{children}</CasePresentation>
      <CaseEndcap caseId={caseId} />
    </div>;
  }
  return <div className="case-story-layout wrap">
    <CaseStoryNav caseId={caseId} />
    <div className="case-story-content">{children}</div>
  </div>;
}
