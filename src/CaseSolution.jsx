import React from 'react';
import { caseSolutions } from './case-solutions.js';

export default function CaseSolution({ caseId, detailed = false }) {
  const solution = caseSolutions[caseId];
  if (!solution) throw new Error(`Unknown case solution: ${caseId}`);
  return <section className="case-solution" aria-labelledby={`solution-${caseId}-title`}>
    <p className="case-card-number">The solution / explained for the reader</p>
    <h3 id={`solution-${caseId}-title`}>The idea and its value.</h3>
    <p className="case-solution-idea">{solution.idea}</p>
    <p className="case-solution-example"><strong>Example situation</strong>{solution.example}</p>
    <p className="case-solution-value"><strong>Designed to help</strong>{solution.value}</p>
    {detailed && <dl className="case-solution-details">
      <div><dt>Example use</dt><dd>{solution.example}</dd></div>
      <div><dt>How the solution works</dt><dd>{solution.approach}</dd></div>
      <div><dt>Why this approach</dt><dd>{solution.reason}</dd></div>
      <div><dt>What the evidence supports</dt><dd>{solution.evidence}</dd></div>
    </dl>}
  </section>;
}
