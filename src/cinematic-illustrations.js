export function initializeCinematicIllustrations(root) {
  if (!('IntersectionObserver' in window)) return () => {};
  const events = new AbortController();
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const illustrations = new Map();
  let keyboard = document.activeElement?.matches(':focus-visible') || false;

  function settle(art) {
    art.dataset.cinematicState = 'static';
    observer.unobserve(art);
  }
  function update(art, state) {
    if (keyboard || preference.matches) {
      settle(art);
    } else if (state.visible && !document.hidden) {
      art.dataset.cinematicState = 'playing';
      state.started = true;
    } else if (state.started) {
      art.dataset.cinematicState = 'paused';
    }
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const state = illustrations.get(entry.target);
      if (!state || entry.target.dataset.cinematicState === 'static') continue;
      state.visible = entry.isIntersecting;
      update(entry.target, state);
    }
  }, { threshold: .2 });

  function register(marker) {
    const art = marker.closest('[data-cinematic-root], svg');
    if (!art || illustrations.has(art) || art.closest('.case-film, .cod-film, .case-player-visual')) return;
    const state = { visible: false, started: false };
    illustrations.set(art, state);
    if (keyboard || preference.matches) settle(art);
    else observer.observe(art);
  }
  function discover(node) {
    if (!(node instanceof Element) && node !== root) return;
    if (node instanceof Element && node.matches('[data-cinematic-art]')) register(node);
    node.querySelectorAll('[data-cinematic-art]').forEach(register);
  }
  discover(root);
  const mutations = new MutationObserver(records => {
    for (const [art] of illustrations) {
      if (!art.isConnected) {
        observer.unobserve(art);
        illustrations.delete(art);
      }
    }
    for (const record of records) record.addedNodes.forEach(discover);
  });
  mutations.observe(root, { childList: true, subtree: true });
  root.addEventListener('animationend', event => {
    const art = event.target.closest('[data-cinematic-state]');
    if (!illustrations.has(art)) return;
    const unfinished = art.getAnimations({ subtree: true }).some(animation =>
      animation.pending || ['running', 'paused'].includes(animation.playState));
    if (!unfinished) settle(art);
  }, { signal: events.signal });
  document.addEventListener('keydown', () => {
    keyboard = true;
    illustrations.forEach((_, art) => settle(art));
  }, { signal: events.signal });
  document.addEventListener('visibilitychange', () => {
    illustrations.forEach((state, art) => {
      if (art.dataset.cinematicState !== 'static') update(art, state);
    });
  }, { signal: events.signal });
  preference.addEventListener('change', () => {
    if (preference.matches) illustrations.forEach((_, art) => settle(art));
  }, { signal: events.signal });
  return () => {
    events.abort();
    observer.disconnect();
    mutations.disconnect();
    illustrations.forEach((_, art) => delete art.dataset.cinematicState);
  };
}
