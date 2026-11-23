import React, { useState } from 'react';

const ratings = ['Very dissatisfied', 'Dissatisfied', 'Okay', 'Satisfied', 'Very satisfied'];

export default function BikeCareServiceFeedback({ job, existing, onSave, onSkip, preview = false }) {
  const [rating, setRating] = useState(preview ? 2 : 0);
  const [comment, setComment] = useState(preview ? 'The noise returned after servicing. Please ask the workshop to review it.' : '');
  const [followUp, setFollowUp] = useState(preview);
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    if (!rating) { setError('Choose a service rating, or skip for now.'); return; }
    if (followUp && comment.trim().length < 10) { setError('Describe the issue in at least ten characters so the workshop can review it.'); return; }
    setError(''); onSave({ rating, comment: comment.trim(), followUp });
  }
  return <>
    <article className="bikecare-app-card"><span className="bikecare-status" data-tone="success">Service record confirmed</span>
      <h4>{job.workshop}</h4><p className="bikecare-small">{job.id} / Record v{job.revision}. Your work acknowledgement is not a satisfaction rating. Payment stays separate.</p></article>
    {existing ? <article className="bikecare-app-card"><h4>Feedback already saved.</h4><p>{existing.rating} / 5 — {ratings[existing.rating - 1]}</p>
      <p className="bikecare-small">One response per confirmed record in this demo. No public review or workshop message was sent.</p>
      <button onClick={onSkip}>Back to service receipt</button></article> : <form className="bikecare-form" onSubmit={submit} noValidate>
      <fieldset className="bikecare-rating"><legend>How was your service?</legend><div>
        {ratings.map((label, index) => <label key={label} data-selected={rating >= index + 1}>
          <input type="radio" name="service-rating" value={index + 1} checked={rating === index + 1} onChange={() => { setRating(index + 1); setError(''); }}
            aria-label={`${index + 1} star${index ? 's' : ''}: ${label}`} />
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1 6.2-5.6-3-5.6 3 1-6.2L2.9 9.6l6.3-.9Z" /></svg>
        </label>)}
      </div><p className="bikecare-small" aria-live="polite">{rating ? `${rating} / 5 — ${ratings[rating - 1]}` : 'Choose 1–5. Feedback is optional.'}</p></fieldset>
      <label>Tell us about the service (optional)<textarea rows={2} maxLength={600} value={comment} placeholder="Use fictional details in this demo"
        onChange={event => setComment(event.target.value)} /></label>
      <label className="bikecare-checkbox"><input type="checkbox" checked={followUp} onChange={event => setFollowUp(event.target.checked)} />Request workshop follow-up for an unresolved issue.</label>
      {error && <p className="bikecare-app-alert" role="alert">{error}</p>}
      <p className="bikecare-small">{followUp ? 'A separate, trackable demo complaint will be created. This does not promise a refund or reinspection.' : 'Your rating never changes the original service facts. Nothing is publicly posted or sent.'}</p>
      <button className="bikecare-primary" type="submit">Save service feedback</button>
      <button type="button" onClick={onSkip}>Skip for now</button>
    </form>}
  </>;
}
