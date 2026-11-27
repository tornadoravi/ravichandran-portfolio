import test from 'node:test';
import assert from 'node:assert/strict';
import { cueAt, narrationCues } from '../src/walkthrough-timing.js';

test('sentence cues preserve the complete transcript and follow elapsed narration', () => {
  const text = "Map the task. Now give the task its start and end dates. That's the schedule.";
  const cues = narrationCues(text);
  assert.equal(cues.map(cue => cue.text).join(''), text);
  assert.equal(cues.length, 3);
  assert.equal(cueAt(cues, 0), 0);
  assert.equal(cueAt(cues, cues[1].start), 1);
  assert.equal(cueAt(cues, 1), 2);
  assert.ok(cues[1].end - cues[1].start > cues[0].end - cues[0].start);
});

test('long spoken sentences become readable subtitle phrases without losing words', () => {
  const text = `${Array.from({ length: 41 }, (_, index) => `word${index}`).join(' ')}.`;
  const cues = narrationCues(text);
  assert.equal(cues.length, 3);
  assert.equal(cues.map(cue => cue.text).join(''), text);
  for (const cue of cues) assert.ok(cue.text.trim().split(/\s+/).length <= 14);
});
