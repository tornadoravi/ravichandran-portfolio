import React from 'react';
import CaseStoryNav from './CaseStoryNav.jsx';
import CasePresentation, { CaseEndcap, CaseEvidencePreview, promoteCaseDecisions } from './CasePresentation.jsx';

export default function CaseStoryLayout({ caseId, children }) {
  if (!['spatial', 'codShield'].includes(caseId)) {
    const { decisionStory, evidence } = ['planning', 'analyticsSuite'].includes(caseId)
      ? { decisionStory: null, evidence: children }
      : promoteCaseDecisions(children);
    return <div className="case-presentation-layout">
      <CasePresentation caseId={caseId} decisionStory={decisionStory}>{evidence}</CasePresentation>
      <details id="full-case-evidence" className="full-case-evidence">
        <CaseEvidencePreview caseId={caseId} compact={['planning', 'analyticsSuite'].includes(caseId)}>{evidence}</CaseEvidencePreview>
        <div className="case-story-layout wrap">
          <CaseStoryNav caseId={caseId} />
          <div className="case-story-content">{evidence}</div>
        </div>
      </details>
      <CaseEndcap caseId={caseId} />
    </div>;
  }
  return <div className="case-story-layout wrap">
    <CaseStoryNav caseId={caseId} />
    <div className="case-story-content">{children}</div>
  </div>;
}
