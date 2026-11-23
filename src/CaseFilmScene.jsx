import React, { useState } from 'react';
import CaseIllustration from './CaseIllustration.jsx';
import CaseSolutionScene from './CaseSolutionScene.jsx';
import CaseSolutionScreen from './CaseSolutionScreen.jsx';
import { solutionSteps } from './case-solutions.js';
import { bikecareScreens } from './bikecare-story.js';
import { sitePath } from './site-path.js';

function BikeCareSolutionEvidence({ index, pause }) {
  const options = [['jobcard', 'estimate', 'splash', 'landing', 'vehicle-brand', 'vehicle-details', 'documents'], ['record', 'bill', 'review', 'service-feedback'], ['shop', 'ride']][index];
  const [selected, setSelected] = useState(options[0]);
  const screen = bikecareScreens.find(item => item.id === selected);
  return <div className="bikecare-solution-evidence" data-solution-step={index + 1}>
    <div className="bikecare-solution-picks" role="group" aria-label="Solution design screens">
      {options.map(id => <button key={id} aria-pressed={selected === id} onClick={() => { pause(); setSelected(id); }}>
        {bikecareScreens.find(item => item.id === id).label}</button>)}
    </div>
    <a className="case-film-source-screen" href={sitePath(screen.src)} target="_blank" rel="noopener noreferrer" onClick={pause}
      aria-label={`Inspect ${screen.label.toLowerCase()} design (opens in a new tab)`}>
      <img src={sitePath(screen.src)} alt={screen.alt} width={screen.width} height={screen.height} />
    </a><p>Actual prototype screen / Fictional data. Open the full frame to inspect details.</p>
  </div>;
}

export default function CaseFilmScene({ scene, seconds, beat, pause }) {
  if (scene.solutionIndex !== undefined) {
    const step = scene.steps[scene.solutionIndex];
    return <div className="case-film-explanation">
      <div className="case-film-illustration">
        {scene.caseId === 'bikecare' ? <BikeCareSolutionEvidence key={scene.solutionIndex} index={scene.solutionIndex} pause={pause} />
          : scene.screen ? <CaseSolutionScreen screen={scene.screen} pause={pause} step={scene.solutionIndex} />
            : <CaseSolutionScene steps={scene.steps} active={scene.solutionIndex} animated seconds={seconds} />}
        <p>{scene.value}</p>
      </div>
      <dl id="case-player-solution-detail" className="case-film-detail">
        {[
          ['What the user does', step.action],
          ['What the design makes clear', step.response],
          ['Why this step matters', step.why]
        ].map(([label, copy], index) => <div key={label} className={index === beat ? 'is-emphasised' : undefined}>
          <dt>{label}</dt><dd>{copy}</dd>
        </div>)}
      </dl>
    </div>;
  }
  return <div className="case-film-explanation">
    <div className="case-film-illustration">
      {scene.screen ? <a className="case-film-source-screen" href={scene.screen.src}
        target="_blank" rel="noopener noreferrer" onClick={pause} aria-label="Inspect original evidence (opens in a new tab)">
        <img src={scene.screen.src} alt={scene.screen.alt} width={scene.screen.width} height={scene.screen.height} />
      </a> : scene.caseId === 'spatial'
        ? <CaseSolutionScene steps={solutionSteps.spatial} active={scene.stage === 'evidence' ? 2 : 0} animated seconds={seconds} />
        : <div className="cod-film-arrival"><div className="cod-film-camera"><CaseIllustration caseId={scene.caseId} stage={scene.stage} /></div></div>}
      {scene.screen && <>
        {scene.screen.caption && <p onClick={event => { if (event.target.closest('a')) pause(); }}>{scene.screen.caption}</p>}
        <p>Open the original evidence. This is not a video of the product.</p>
      </>}
    </div>
    <div className="case-film-copy">
      <p>{scene.copy}</p>
      {scene.note && <p>{scene.note}</p>}
      {scene.evidence && <p>{scene.evidence}</p>}
      {scene.decisions && <details onToggle={pause}>
        <summary>Design decisions behind the solution</summary>
        <ol>{scene.decisions.map(([title, copy]) => <li key={title}><strong>{title}</strong><p>{copy}</p></li>)}</ol>
      </details>}
    </div>
  </div>;
}
