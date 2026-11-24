import React from 'react';
import CaseFilmPlayer from './CaseFilmPlayer.jsx';
import CodFilmScene from './CodFilmScene.jsx';
import { codFilmScenes, codFilmSections, codFilmSources, codFilmSolutionSteps } from './cod-film-story.js';
import filmAudio from './cod-film-audio.json';

export function CodFilmTranscript() {
  return <details className="cod-film-transcript">
    <summary>Read the cinematic story and sources</summary>
    <p>Original illustrated reenactments and article summaries, not footage, newspaper scans, or Veeramani's likeness.</p>
    <ol>{codFilmScenes.map(scene => <li key={scene.id}><strong>{scene.label}</strong><p>{scene.narration}</p></li>)}</ol>
    <p>News coverage supports the reported incident, not the proposed service's effectiveness. No personal contact details are reproduced.</p>
    <ul>{codFilmSources.map(source => <li key={source.name}><a href={source.url} target="_blank" rel="noopener noreferrer">
      {source.name} / {source.date}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>
  </details>;
}

const feedbackForScene = (scene, demo) => scene.id === 'verify' && demo.report
  ? 'Example incident CS-1042. No support request was sent.'
  : scene.id === 'protect' && demo.review ? 'Review checks explored. No identity or household has been verified.'
    : scene.id === 'sync' && demo.protect ? 'Protection request example only. No actual service is activated.' : null;

export default function CodFilmPlayer({ ref }) {
  return <CaseFilmPlayer ref={ref} scenes={codFilmScenes} sections={codFilmSections}
    clips={filmAudio.scenes} steps={codFilmSolutionSteps} Scene={CodFilmScene} voiceLabel={filmAudio.label} presentation="screens"
    title="From a reported story to a proposed solution."
    description="Original reenactments and source summaries, not footage or a newspaper scan. The solution is unlaunched and untested."
    hint="Cinematic illustrated story, recorded narration, and captions. Reported incident followed by an untested concept."
    feedbackForScene={feedbackForScene} />;
}
