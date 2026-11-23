import React, { useState } from 'react';
import { documentKey, documentStatus, documentTypes, sampleDocument, validateDocument } from './bikecare-documents.js';
import { daysAfter } from './bikecare-ux-model.js';

export default function BikeCareDocuments({ bike, documents, setDocuments, today, setToday, scene }) {
  const [stage, setStage] = useState(scene === 'document-add' ? 'add' : scene === 'document-detail' ? 'detail' : scene === 'document-delete' ? 'delete' : 'home');
  const [type, setType] = useState('Insurance');
  const [draft, setDraft] = useState({ type: 'Insurance', sample: scene === 'document-add', expiry: '2026-12-10' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const key = documentKey(type, bike.id);
  const document = documents[key];
  function open(next, selected = type) {
    setType(selected); setStage(next); setError(''); setMessage('');
    if (next === 'add' || next === 'replace') {
      const previous = documents[documentKey(selected, bike.id)];
      setDraft({ type: selected, sample: false, expiry: previous?.expiry || '' });
    }
  }
  function save(event) {
    event.preventDefault();
    const invalid = validateDocument(draft);
    if (invalid) { setError(invalid); return; }
    const target = documentKey(draft.type, bike.id);
    if (stage === 'add' && documents[target]) { setError('This document already exists. Open it and choose Replace sample.'); return; }
    const revision = (documents[target]?.revision || 0) + 1;
    setDocuments(previous => ({ ...previous, [target]: sampleDocument(draft.type, bike.id, draft.expiry, revision) }));
    setType(draft.type); setStage('detail'); setError('');
    setMessage(stage === 'replace' ? 'Sample replaced. The previous version is no longer in this demo vault.' : 'Fictional sample added. Nothing uploaded.');
  }
  const status = documentStatus(document, today);
  return <section className="bikecare-document-vault" aria-label="Fictional rider document vault">
    <p className="bikecare-small">Fictional samples only. No upload or secure storage. Reload clears the vault.</p>
    {error && <p className="bikecare-app-alert" role="alert">{error}</p>}
    {message && <p className="bikecare-app-message" role="status">{message}</p>}
    {stage === 'home' && <>
      <p className="bikecare-small">Licence: rider. Insurance/RC: {bike.name}. Private; never shared with staff.</p>
      <div className="bikecare-document-list">{documentTypes.map(item => {
        const saved = documents[documentKey(item, bike.id)];
        const state = documentStatus(saved, today);
        return <article className="bikecare-app-card" key={item}>
          <div className="bikecare-document-heading"><svg className="bikecare-document-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 6h9l5 5v15H10zM19 6v6h5M13 17h8M13 21h6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg><h4>{item}</h4></div>
          <span className="bikecare-status" data-tone={state.tone}>{state.label}</span>
          <p className="bikecare-small">{item === 'Driving licence' ? 'Rider / All bikes' : 'Selected vehicle'}{saved?.expiry ? ` / ${saved.expiry}` : ''}</p>
          <button aria-label={saved ? `View ${item}` : `Add ${item} sample`} onClick={() => open(saved ? 'detail' : 'add', item)}>{saved ? 'View' : 'Add'}</button>
        </article>;
      })}</div>
      <details className="bikecare-invoice-details"><summary>Expiry scenario controls</summary>
        <p className="bikecare-small">Demo date: {today}. Dates do not prove coverage or permission to ride.</p>
        <button onClick={() => setToday(daysAfter(today, 30))}>Advance document demo 30 days</button>
      </details>
    </>}
    {['add', 'replace'].includes(stage) && <form className="bikecare-form" onSubmit={save} noValidate>
      <h4>{stage === 'replace' ? 'Replace fictional sample' : 'Add fictional document'}</h4>
      <label>Document type<select value={draft.type} disabled={stage === 'replace'} onChange={event => { setDraft({ type: event.target.value, sample: false, expiry: '' }); setError(''); }}>{documentTypes.map(item => <option key={item}>{item}</option>)}</select></label>
      <div className="bikecare-document-preview"><strong>DEMO / NOT A LEGAL DOCUMENT</strong><span>Synthetic sample / No personal data</span></div>
      <label className="bikecare-checkbox"><input type="checkbox" checked={draft.sample} onChange={event => setDraft(previous => ({ ...previous, sample: event.target.checked }))} />Use the fictional sample</label>
      <label>Document expiry date (optional)<input type="date" value={draft.expiry} onChange={event => setDraft(previous => ({ ...previous, expiry: event.target.value }))} /></label>
      <p className="bikecare-small">Unknown or expired is allowed. No official verification or renewal.</p>
      <button className="bikecare-primary" type="submit">{stage === 'replace' ? 'Confirm replacement' : 'Save fictional document'}</button>
      <button type="button" onClick={() => open(stage === 'replace' ? 'detail' : 'home')}>Cancel document changes</button>
    </form>}
    {stage === 'detail' && document && <>
      <h4>{document.type}</h4>
      <div className="bikecare-document-preview"><strong>DEMO / NOT A LEGAL DOCUMENT</strong><p>{document.reference}</p><span>Fictional sample / Version {document.revision}</span></div>
      <span className="bikecare-status" data-tone={status.tone}>{status.label}</span>
      <dl className="bikecare-record-details"><div><dt>Belongs to</dt><dd>{document.scope === 'rider' ? 'Demo rider / All bikes' : bike.name}</dd></div><div><dt>Expiry</dt><dd>{document.expiry || 'Not supplied'}</dd></div></dl>
      <p className="bikecare-small">Private to rider. Not included in job cards, invoices, rides or resale. A date is not licence, insurance or RC verification.</p>
      <div className="bikecare-inline-actions"><button onClick={() => open('replace')}>Replace sample</button><button onClick={() => open('delete')}>Delete sample</button></div>
      <button onClick={() => open('home')}>Back to document vault</button>
    </>}
    {stage === 'delete' && document && <article className="bikecare-app-card">
      <h4>Delete this sample?</h4><p>{document.type} / {document.reference}</p>
      <p className="bikecare-small">Only this fictional vault entry and its expiry cue are removed. Vehicle identity and service records stay unchanged. This cannot be undone.</p>
      <button className="bikecare-primary" onClick={() => {
        setDocuments(previous => { const next = { ...previous }; delete next[key]; return next; });
        setStage('home'); setMessage('Fictional sample deleted. Service records are unchanged.');
      }}>Confirm document deletion</button>
      <button onClick={() => open('detail')}>Keep document</button>
    </article>}
  </section>;
}
