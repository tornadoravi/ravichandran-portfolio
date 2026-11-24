import { sitePath } from './site-path.js';
import React from 'react';

const workspaces = {
  analytics: {
    label: 'Analytics+ features',
    links: [
      ['storyboard', sitePath('/storyboard.html'), 'Storyboard'],
      ['gantt', sitePath('/gantt.html'), 'Gantt'],
      ['wizard', sitePath('/analytics.html'), 'Chart Wizard'],
      ['presentation', sitePath('/presentation.html'), 'Annotations'],
      ['kpi', sitePath('/kpi.html'), 'KPI Presets']
    ]
  },
  gantt: {
    label: 'PowerTable Gantt features',
    links: [
      ['mapping', sitePath('/column-mapping.html'), 'Column Mapping'],
      ['baselines', sitePath('/gantt-baselines.html'), 'Baselines'],
      ['backlog', sitePath('/gantt-backlog.html'), 'Backlog'],
      ['configuration', sitePath('/gantt-configuration.html'), 'Side Panel']
    ]
  },
  resources: {
    label: 'PowerTable Gantt Resources features',
    links: [
      ['formatting', sitePath('/gantt-conditional-formatting.html'), 'Conditional Formatting'],
      ['configuration', sitePath('/resource-configuration.html'), 'Side Panel']
    ]
  },
  crosstab: {
    label: 'PowerTable Cross-tab sections',
    sections: true,
    links: [
      ['contribution', '#case-overview', 'Contribution'],
      ['evidence', '#case-screens', 'Structure']
    ]
  }
};

export default function WorkspaceFeatureTabs({ workspace = 'gantt', active }) {
  const { label, links, sections } = workspaces[workspace];
  return (
    <div className="workspace-navigation">
      <div className="workspace-navigation-panel">
      <nav className={`workspace-feature-tabs${workspace === 'gantt' ? ' gantt-feature-tabs' : ''}`}
        aria-label={label} data-section-tabs={sections ? '' : undefined}>
        {links.map(([id, href, label]) => (
          <a key={id} href={href} aria-current={active === id ? 'page' : undefined}>
            {label}
          </a>
        ))}
      </nav>
      </div>
    </div>
  );
}
