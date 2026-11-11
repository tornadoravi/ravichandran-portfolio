import React from 'react';

const workspaces = {
  analytics: {
    label: 'Analytics+ features',
    links: [
      ['storyboard', '/storyboard.html', 'Storyboard'],
      ['gantt', '/gantt.html', 'Gantt'],
      ['wizard', '/analytics.html', 'Chart Wizard'],
      ['presentation', '/presentation.html', 'Annotations'],
      ['kpi', '/kpi.html', 'KPI Presets']
    ]
  },
  gantt: {
    label: 'PowerTable Gantt features',
    links: [
      ['mapping', '/column-mapping.html', 'Column Mapping'],
      ['baselines', '/gantt-baselines.html', 'Baselines'],
      ['backlog', '/gantt-backlog.html', 'Backlog'],
      ['configuration', '/gantt-configuration.html', 'Side Panel']
    ]
  },
  resources: {
    label: 'PowerTable Gantt Resources features',
    links: [
      ['formatting', '/gantt-conditional-formatting.html', 'Conditional Formatting'],
      ['configuration', '/resource-configuration.html', 'Side Panel']
    ]
  },
  crosstab: {
    label: 'PowerTable Cross-tab sections',
    sections: true,
    links: [
      ['contribution', '#contribution', 'Overview'],
      ['configuration', '#configuration', 'Structure'],
      ['evidence', '#evidence', 'Evidence']
    ]
  }
};

export default function WorkspaceFeatureTabs({ workspace = 'gantt', active }) {
  const { label, links, sections } = workspaces[workspace];
  return (
    <nav className={`workspace-feature-tabs${workspace === 'gantt' ? ' gantt-feature-tabs' : ''}`}
      aria-label={label} data-section-tabs={sections ? '' : undefined}>
      {links.map(([id, href, label]) => (
        <a key={id} href={href} aria-current={active === id ? 'page' : undefined}>
          {label}
        </a>
      ))}
    </nav>
  );
}
