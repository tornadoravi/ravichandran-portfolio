import React from 'react';

const features = [
  ['mapping', '/column-mapping.html', 'Column Mapping'],
  ['baselines', '/gantt-baselines.html', 'Baselines'],
  ['backlog', '/gantt-backlog.html', 'Backlog'],
  ['configuration', '/gantt-configuration.html', 'Side Panel']
];

export default function GanttFeatureTabs({ active }) {
  return (
    <nav className="gantt-feature-tabs" aria-label="PowerTable Gantt features">
      {features.map(([id, href, label]) => (
        <a key={id} href={href} aria-current={active === id ? 'page' : undefined}>
          {label}
        </a>
      ))}
    </nav>
  );
}
