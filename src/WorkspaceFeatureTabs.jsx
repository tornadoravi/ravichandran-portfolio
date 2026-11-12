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
  const current = sections ? 'Cross-tab' : links.find(([id]) => id === active)?.[2];
  return (
    <details className="workspace-navigation">
      <summary>
        <span className="workspace-current">{workspace === 'analytics' ? 'Analytics+' : 'PowerTable'}{current && ` / ${current}`}</span>
        <span className="workspace-browse-label">Browse features <span aria-hidden="true" /></span>
      </summary>
      <div className="workspace-navigation-panel">
      {workspace !== 'analytics' && <nav className="workspace-switcher" aria-label="PowerTable workspaces">
        {[
          ['gantt', '/column-mapping.html', 'Gantt'],
          ['resources', '/gantt-conditional-formatting.html', 'Resources'],
          ['crosstab', '/crosstab.html', 'Cross-tab']
        ].map(([id, href, name]) => (
          <a key={id} href={href} aria-current={workspace === id ? 'true' : undefined}>{name}</a>
        ))}
      </nav>}
      <nav className={`workspace-feature-tabs${workspace === 'gantt' ? ' gantt-feature-tabs' : ''}`}
        aria-label={label} data-section-tabs={sections ? '' : undefined}>
        {links.map(([id, href, label]) => (
          <a key={id} href={href} aria-current={active === id ? 'page' : undefined}>
            {label}
          </a>
        ))}
      </nav>
      </div>
    </details>
  );
}
