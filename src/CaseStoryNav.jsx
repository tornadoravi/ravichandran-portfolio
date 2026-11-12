import React, { useEffect, useState } from 'react';

const screens = {
  mapping: '#mapping-walkthrough',
  baselines: '#comparison',
  backlog: '#empty-state',
  formatting: '#timeline',
  ganttPanel: '#panel-walkthrough',
  resourcePanel: '#panel-walkthrough',
  storyboard: '#templates',
  gantt: '#mapping',
  wizard: '#browse-chart',
  presentation: '#design-screens',
  kpi: '#variance'
};

const productChapters = {
  planning: [
    ['Context', '#design-focus'], ['Decision', '#story-decision'], ['Flow', '#story-flow'],
    ['Browse features', '#workspaces'], ['Full evidence', '#study-details']
  ],
  analyticsSuite: [
    ['Context', '#review-brief'], ['Decision', '#solutions'], ['Flow', '#concept'],
    ['Browse features', '#features'], ['Full evidence', '#evidence-notes']
  ],
  crosstab: [
    ['Problem', '#story-problem'], ['Decision', '#story-decision'], ['Flow', '#story-flow'],
    ['Contribution', '#contribution-notes'], ['Evidence', '#evidence']
  ],
  spatial: [
    ['Launch', '#spatial-launch'], ['Enter', '#spatial-entry'], ['Explore', '#spatial-report']
  ]
};

export default function CaseStoryNav({ caseId }) {
  const [hash, setHash] = useState('');
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    window.addEventListener('popstate', update);
    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('popstate', update);
    };
  }, []);

  const chapters = productChapters[caseId] || (screens[caseId] && [
    ['Problem', '#story-problem'], ['Decision', '#story-decision'], ['Flow', '#story-flow'],
    ['Screens', screens[caseId]],
    ['Evidence', ['storyboard', 'gantt', 'wizard', 'presentation', 'kpi'].includes(caseId) ? '#reflection' : '#evidence']
  ]);
  if (!chapters) throw new Error(`Unknown story navigation: ${caseId}`);
  const label = caseId === 'planning' ? 'PowerTable quick navigation'
    : caseId === 'analyticsSuite' ? 'Analytics+ quick navigation' : 'The visual story';
  return <nav className="case-story-nav" aria-label={label}>
    <p className="story-index-label">The visual story</p>
    <ol>
      {chapters.map(([title, target], index) => <li key={target}>
        <a href={target} aria-current={hash === target ? 'location' : undefined}>
          <span className="story-chapter-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span>{title}</span>
        </a>
      </li>)}
    </ol>
  </nav>;
}
