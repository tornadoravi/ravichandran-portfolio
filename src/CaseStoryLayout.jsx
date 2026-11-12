import React from 'react';
import CaseStoryNav from './CaseStoryNav.jsx';

export default function CaseStoryLayout({ caseId, children }) {
  return <div className="case-story-layout wrap">
    <CaseStoryNav caseId={caseId} />
    <div className="case-story-content">{children}</div>
  </div>;
}
