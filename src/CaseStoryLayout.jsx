import React from 'react';
import CaseStoryNav from './CaseStoryNav.jsx';
import CasePresentation, { CaseEndcap, CaseEvidencePreview } from './CasePresentation.jsx';

export default function CaseStoryLayout({ caseId, children }) {
  if (caseId !== 'spatial') return <div className="case-presentation-layout">
    <CasePresentation caseId={caseId}>{children}</CasePresentation>
    <details id="full-case-evidence" className="full-case-evidence">
      <CaseEvidencePreview caseId={caseId}>{children}</CaseEvidencePreview>
      <div className="case-story-layout wrap">
        <CaseStoryNav caseId={caseId} />
        <div className="case-story-content">{children}</div>
      </div>
    </details>
    <CaseEndcap caseId={caseId} />
  </div>;
  return <div className="case-story-layout wrap">
    <CaseStoryNav caseId={caseId} />
    <div className="case-story-content">{children}</div>
  </div>;
}
