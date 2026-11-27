import React, { useEffect, useState } from 'react';
import CaseIllustration from './CaseIllustration.jsx';
import CaseSolutionScene, { SolutionGlyph } from './CaseSolutionScene.jsx';
import CaseSolutionScreen from './CaseSolutionScreen.jsx';
import { solutionSteps } from './case-solutions.js';
import { bikecareScreens } from './bikecare-story.js';
import { sitePath } from './site-path.js';
import { explainCaseScreen } from './case-screen-context.js';
import PlanningWalkthrough from './PlanningWalkthrough.jsx';

function BikeCareSolutionEvidence({ index, beat, playing, pause }) {
  const options = [['jobcard', 'estimate'], ['review', 'service-feedback', 'history', 'reminder'], ['supplier', 'shop', 'ride']][index];
  const sequence = [['jobcard', 'estimate', 'estimate'], ['review', 'service-feedback', 'history'], ['supplier', 'ride', 'ride']][index];
  const [picked, setPicked] = useState(null);
  useEffect(() => { if (playing) setPicked(null); }, [playing]);
  const selected = picked || sequence[beat];
  const screen = bikecareScreens.find(item => item.id === selected);
  return <div className="bikecare-solution-evidence" data-solution-step={index + 1}>
    <div className="bikecare-solution-picks" role="group" aria-label="Solution design screens">
      {options.map(id => <button key={id} aria-pressed={selected === id} onClick={() => { pause(); setPicked(id); }}>
        {bikecareScreens.find(item => item.id === id).label}</button>)}
    </div>
    <a className="case-film-source-screen" href={sitePath(screen.src)} target="_blank" rel="noopener noreferrer" onClick={pause}
      aria-label={`Inspect ${screen.label.toLowerCase()} design (opens in a new tab)`}>
      <img src={sitePath(screen.src)} alt={screen.alt} width={screen.width} height={screen.height} />
    </a><p><span className="case-screen-explanation">{explainCaseScreen(screen.src)}</span>
      Original concept / Fictional data.</p>
  </div>;
}

function EvidenceComposition({ scene, pause }) {
  if (scene.guided) return <div className="case-evidence-composition walkthrough-source-reveal">
    <CaseSolutionScreen screen={scene.screen} pause={pause} step={scene.solutionIndex} />
  </div>;
  return <div className="case-evidence-composition">
    <div className="case-evidence-mount">
      <div className="case-evidence-mount-label"><span>Design evidence</span><span>0{scene.solutionIndex + 1} / 03</span></div>
      <CaseSolutionScreen screen={scene.screen} pause={pause} step={scene.solutionIndex} />
    </div>
    <p className="case-evidence-focus"><span aria-hidden="true">↳</span><span><strong>On this screen</strong>{scene.screen.focus || scene.screen.label}</span></p>
    <ol className="case-evidence-sequence" aria-label="Design workflow">
      {scene.steps.map((step, index) => <li key={step.title} aria-current={index === scene.solutionIndex ? 'step' : undefined}>
        <span className="case-evidence-glyph" aria-hidden="true"><svg viewBox="-4 -4 44 44" focusable="false"><SolutionGlyph icon={step.icon} /></svg><span>0{index + 1}</span></span><strong>{step.title}</strong>
      </li>)}
    </ol>
  </div>;
}

export default function CaseFilmScene({ scene, seconds, beat, playing, pause }) {
  if (scene.solutionIndex !== undefined) {
    const step = scene.steps[scene.solutionIndex];
    return <div className={`case-film-explanation${scene.guided ? ' is-guided' : ''}`}>
      <div className="case-film-illustration">
        {scene.caseId === 'bikecare' ? <BikeCareSolutionEvidence key={scene.solutionIndex} index={scene.solutionIndex} beat={beat} playing={playing} pause={pause} />
          : scene.screen ? <EvidenceComposition scene={scene} pause={pause} />
            : <CaseSolutionScene steps={scene.steps} active={scene.solutionIndex} animated seconds={seconds} />}
        {!scene.guided && <p>{scene.value}</p>}
      </div>
      {!scene.guided && <dl id="case-player-solution-detail" className="case-film-detail">
        {[
          ['What the user does', step.action],
          ['What the design makes clear', step.response],
          ['Why this step matters', step.why]
        ].map(([label, copy], index) => <div key={label} className={index === beat ? 'is-emphasised' : undefined}>
          <dt>{label}</dt><dd>{copy}</dd>
        </div>)}
      </dl>}
    </div>;
  }
  return <div className={`case-film-explanation${scene.guided ? ' is-guided' : ''}`}>
    <div className="case-film-illustration">
      {scene.caseId === 'powertable' && ['context', 'problem'].includes(scene.id)
        ? <PlanningWalkthrough />
        : scene.screen ? <a className="case-film-source-screen" href={scene.screen.src}
        target="_blank" rel="noopener noreferrer" onClick={pause} aria-label="Inspect original evidence (opens in a new tab)">
        <img src={scene.screen.src} alt={scene.screen.alt} width={scene.screen.width} height={scene.screen.height} />
      </a> : scene.caseId === 'spatial'
        ? <CaseSolutionScene steps={solutionSteps.spatial} active={scene.stage === 'evidence' ? 2 : 0} animated seconds={seconds} />
        : <div className="cod-film-arrival"><div className="cod-film-camera"><CaseIllustration caseId={scene.caseId} stage={scene.stage} /></div></div>}
      {scene.screen && <>
        <p onClick={event => { if (event.target.closest('a')) pause(); }}>
          <span className="case-screen-explanation">{scene.screen.explanation || explainCaseScreen(scene.screen.src)}</span>
          {scene.screen.caption}
        </p>
        {!scene.guided && <p>Open the original evidence. This is not a video of the product.</p>}
      </>}
    </div>
    {!scene.guided && <div className="case-film-copy">
      <p>{scene.copy}</p>
      {scene.note && <p>{scene.note}</p>}
      {scene.evidence && <p>{scene.evidence}</p>}
      {scene.decisions && <details onToggle={pause}>
        <summary>Design decisions behind the solution</summary>
        <ol>{scene.decisions.map(([title, copy]) => <li key={title}><strong>{title}</strong><p>{copy}</p></li>)}</ol>
      </details>}
    </div>}
  </div>;
}
