import React, { useState } from 'react';
import { bikecareThemes, daysAfter, designTokens, supportCategories, supportOutcomes, validateTicket } from './bikecare-ux-model.js';
import { sitePath } from './site-path.js';

export function BikeCareNotifications({ reminder, today, setToday, preferences, setPreferences, permission, setPermission, snooze, setSnooze, onService }) {
  const [read, setRead] = useState(false);
  return <>
    <article className="bikecare-app-card"><span className="bikecare-status" data-tone={reminder.status === 'Service due' ? 'warning' : 'info'}>{reminder.status}</span>
      <p>{snooze && snooze > today ? `Reminder snoozed until ${snooze}. Service guidance is unchanged.` : 'Date and distance come from the latest jointly confirmed service, never a guessed interval.'}</p>
      <details className="bikecare-invoice-details"><summary>Demo clock: {today}</summary><p className="bikecare-small">No OS notification or message is sent.</p>
        <button onClick={() => setToday(daysAfter(today, 1))}>Advance demo date one day</button></details>
    </article>
    <div className="bikecare-field-pair"><label className="bikecare-checkbox"><input type="checkbox" checked={preferences.inApp} onChange={event => setPreferences(previous => ({ ...previous, inApp: event.target.checked }))} />In-app care cues</label>
      <label className="bikecare-checkbox"><input type="checkbox" checked={preferences.push} onChange={event => setPreferences(previous => ({ ...previous, push: event.target.checked }))} />Push preference / demo</label></div>
    <article className="bikecare-app-card"><strong>Permission: {permission}</strong>
      <p className="bikecare-small">{permission === 'Denied' ? 'OS permission denied in this scenario. In-app reminders are available if enabled; no repeated permission prompt.' : 'Permission states are simulated. Preferences are not consent for marketing.'}</p>
      <div className="bikecare-inline-actions"><button onClick={() => setPermission('Granted')}>Preview allowed</button><button onClick={() => setPermission('Denied')}>Preview denied</button></div>
    </article>
    {preferences.inApp ? <article className="bikecare-app-card">
      <strong>{read ? 'Read care cue' : 'Unread care cue'}</strong><p>{reminder.status === 'Guidance needed' ? 'Ask for a maintenance date/distance. Unknown guidance stays unknown.' : snooze && snooze > today ? 'Reminder paused. The due state remains visible above.' : `${reminder.status}: review your care guidance.`}</p>
      <div className="bikecare-inline-actions"><button onClick={() => setRead(value => !value)}>{read ? 'Mark unread' : 'Mark read'}</button>
        <button disabled={reminder.status === 'Guidance needed'} onClick={() => setSnooze(snooze && snooze > today ? '' : daysAfter(today, 3))}>{snooze && snooze > today ? 'Resume care cue' : 'Snooze three days'}</button></div>
    </article> : <p className="bikecare-small">In-app cues are disabled. No care reminder is being displayed in the inbox. Restore the preference above to see it.</p>}
    <button className="bikecare-primary" onClick={onService}>Open service guidance</button>
  </>;
}

export function BikeCareSupport({ role, canRequest, guest, scene, tickets, selectedId, setSelectedId, onCreate, onUpdate, contexts }) {
  const [stage, setStage] = useState(['ticket', 'support-review', 'support-resolved'].includes(scene) ? 'ticket' : ['complaint', 'product-issue', 'feedback'].includes(scene) ? 'create' : 'home');
  const [error, setError] = useState('');
  const [draft, setDraft] = useState({ category: guest ? 'Account / sign-in' : scene === 'product-issue' ? 'Product issue' : scene === 'feedback' ? 'Feedback' : 'Service not satisfactory',
    subject: guest ? 'Help with demo access' : scene === 'product-issue' ? 'Part needs seller review' : 'Service needs another look',
    description: 'Please review the issue and proposed next step with the relevant workshop or seller.' });
  const [response, setResponse] = useState(supportOutcomes[0]);
  const ticket = tickets.find(item => item.id === selectedId);
  const agent = role === 'support';
  function create(event) {
    event.preventDefault();
    const invalid = validateTicket(draft);
    if (invalid) { setError(invalid); return; }
    onCreate({ ...draft, context: contexts[draft.category] || '' }); setStage('ticket'); setError('');
  }
  function update(patch, note) { onUpdate(ticket.id, patch, note); setError(''); }
  return <>
    <p className="bikecare-small">Help / Complaints / Feedback. Reserved demo contact: help@bikecare.example.test. Nothing is emailed, uploaded or submitted outside this page.</p>
    {error && <p className="bikecare-app-alert" role="alert">{error}</p>}
    {stage === 'home' && <>
      <article className="bikecare-app-card"><h4>{agent ? 'Support review queue' : 'What needs attention?'}</h4>
        <p>Service dissatisfaction, a product issue, payment/bill mismatch, account help, ride concerns or feedback.</p>
        {canRequest && <button className="bikecare-primary" onClick={() => setStage('create')}>Create a demo support request</button>}
      </article>
      <div className="bikecare-ride-list">{tickets.map(item => <button className="bikecare-ride-card" key={item.id} onClick={() => { setSelectedId(item.id); setStage('ticket'); }}>
        <strong>{item.id} / {item.subject}</strong><span>{item.category} / {item.status}</span>
      </button>)}</div>
      {!tickets.length && <p>No requests yet. Describe an issue to preview its recovery journey.</p>}
      <details className="bikecare-invoice-details"><summary>Support boundaries and privacy</summary><p>Do not enter real credentials, payment credentials, personal documents or private ride locations. Support cannot rewrite a service record, certify a part, approve a refund or provide emergency response.</p></details>
    </>}
    {stage === 'create' && canRequest && <form className="bikecare-form" onSubmit={create} noValidate>
      <label>Issue category<select value={draft.category} onChange={event => setDraft(previous => ({ ...previous, category: event.target.value }))}>{(guest ? ['Account / sign-in', 'Feedback'] : supportCategories).map(category => <option key={category}>{category}</option>)}</select></label>
      <label>Subject<input value={draft.subject} maxLength={100} onChange={event => setDraft(previous => ({ ...previous, subject: event.target.value }))} /></label>
      <label>Describe the issue<textarea rows={3} maxLength={1000} value={draft.description} onChange={event => setDraft(previous => ({ ...previous, description: event.target.value }))} /></label>
      <p className="bikecare-small">Context: {contexts[draft.category] || 'Account / general help'}. A service complaint does not erase the original record or turn acknowledgement into satisfaction. A product request is not a refund.</p>
      <button className="bikecare-primary" type="submit">Submit demo request</button>
      <button type="button" onClick={() => setStage('home')}>Cancel request draft</button>
    </form>}
    {stage === 'ticket' && ticket && <>
      <article className="bikecare-app-card"><span className="bikecare-status" data-tone={ticket.status === 'Closed' ? 'success' : 'warning'}>{ticket.id} / {ticket.status}</span>
        <h4>{ticket.subject}</h4><p>{ticket.description}</p><p className="bikecare-small">{ticket.category} / {ticket.context || 'General help'}</p>
        {ticket.outcome && <p><strong>Proposed next step:</strong> {ticket.outcome}</p>}
      </article>
      <details className="bikecare-invoice-details"><summary>Request timeline ({ticket.timeline.length})</summary><ol>{ticket.timeline.map((note, index) => <li key={index}>{note}</li>)}</ol></details>
      {agent && ticket.status !== 'Closed' && <>
        <label>Support response<select value={response} onChange={event => setResponse(event.target.value)}>{supportOutcomes.map(outcome => <option key={outcome}>{outcome}</option>)}</select></label>
        <button className="bikecare-primary" onClick={() => update({ status: 'Response proposed', outcome: response }, 'Support agent proposed a next step / No action executed')}>Propose demo response</button>
      </>}
      {canRequest && ticket.status === 'Response proposed' && <button className="bikecare-primary" onClick={() => update({ status: 'Closed' }, 'Demo rider accepted the response / No refund or service execution')}>Accept response and close</button>}
      {canRequest && !['Closed', 'Escalated'].includes(ticket.status) && <button onClick={() => update({ status: 'Escalated' }, 'Demo rider requested escalation / No real moderation or complaint sent')}>Escalate unresolved issue</button>}
      {canRequest && ticket.status === 'Closed' && <button onClick={() => update({ status: 'Open', outcome: '' }, 'Demo rider reopened the request; original timeline retained')}>Reopen the issue</button>}
      <p className="bikecare-small">Only the support persona proposes a response. Only the rider accepts it. Refunds, reinspection, warranty and moderation remain requests—not completed provider actions.</p>
      <button onClick={() => setStage('home')}>All support requests</button>
    </>}
  </>;
}

export function BikeCareSystem({ theme, setTheme, onLogout }) {
  const [exampleBusy, setExampleBusy] = useState(false);
  return <>
    <article className="bikecare-app-card"><h4>BikeCare / Signal</h4><p className="bikecare-small">Calm teal actions. Clear records. A custom system informed by Material design principles, not authored or endorsed by Google.</p>
      <label>Product theme<select value={theme} onChange={event => setTheme(event.target.value)}><option value="light">Light</option><option value="dark">Dark</option></select></label></article>
    <div className="bikecare-token-grid">{designTokens.map(([name, , , token]) => <article key={name}><i className={`bikecare-swatch bikecare-palette-${token}`} aria-hidden="true" /><strong>{name}</strong><span>{bikecareThemes[theme][`--bc-${token}`]}</span></article>)}</div>
    <article className="bikecare-app-card"><h4>Readable by default.</h4><p className="bikecare-small">System sans. 16px fields. 4px grid. 12px controls / 18px cards. 44px targets and focus.</p>
      <div className="bikecare-inline-actions"><button className="bikecare-primary" aria-busy={exampleBusy} onClick={() => setExampleBusy(value => !value)}>{exampleBusy ? 'Finish demo loading' : 'Primary example'}</button><button disabled>Disabled example</button></div>
      {exampleBusy && <p className="bikecare-small" role="status">Illustrative loading state / No network request. Finish the demo state to reset.</p>}</article>
    <div className="bikecare-inline-actions">
      <a className="bikecare-source-link" href={sitePath('/assets/bikecare-design-system.md')} download aria-label="Download design-system explanation">System guide (.md)</a>
      <button aria-label="Sign out of demo workspace" onClick={onLogout}>Sign out</button>
    </div>
  </>;
}
