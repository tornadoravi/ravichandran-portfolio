import React from 'react';

export default function PlanningWalkthrough() {
  return <div className="planning-walkthrough" role="img"
    aria-label="Illustrative planning example: a task with start and end dates becomes a Gantt bar, then connects to its assigned person. Not a product recording.">
    <div className="planning-example-top"><span>One task. A connected plan.</span><span>Illustrative example</span></div>
    <div className="planning-example-workspace">
      <div className="planning-task">
        <span className="planning-micro">Task</span>
        <h4>Prepare launch</h4>
        <div><span>Task ID</span><strong>T-104</strong></div>
        <div><span>Start</span><strong>Mon 12</strong></div>
        <div><span>End</span><strong>Thu 15</strong></div>
        <p>Task + dates</p>
      </div>
      <div className="planning-schedule">
        <span className="planning-micro">Schedule</span>
        <div className="planning-days">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => <span key={day}>{day}</span>)}</div>
        <div className="planning-lanes">
          <div className="planning-lane"><span className="planning-gantt-bar">Prepare launch</span></div>
          <div className="planning-lane"><span className="planning-support-bar">Review</span></div>
          <div className="planning-lane"><span className="planning-milestone">Launch ◆</span></div>
        </div>
        <div className="planning-assignment"><span className="planning-avatar">A</span><div>
          <span className="planning-micro">Resource</span><strong>Assigned to Alex</strong>
        </div><span className="planning-link" aria-hidden="true">↗</span></div>
      </div>
    </div>
  </div>;
}
