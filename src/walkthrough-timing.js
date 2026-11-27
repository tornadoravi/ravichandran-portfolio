export function narrationCues(text) {
  const segments = [...new Intl.Segmenter('en', { granularity: 'sentence' }).segment(text)]
    .flatMap(item => item.segment.match(/(?:\S+\s*){1,14}/g) || []);
  const weights = segments.map(segment => segment.trim().split(/\s+/).length);
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let position = 0;
  return segments.map((segment, index) => {
    const start = position / total;
    position += weights[index];
    return { text: segment, start, end: position / total };
  });
}

export function cueAt(cues, fraction) {
  return Math.max(0, cues.findLastIndex(cue => fraction >= cue.start));
}
