(() => {
  let appearance = 'system';
  try {
    const saved = localStorage.getItem('portfolio-appearance');
    if (['light', 'dark', 'system'].includes(saved)) appearance = saved;
    else if (saved !== null) console.warn('Ignoring an unsupported portfolio appearance preference.');
  } catch (error) {
    console.warn('Unable to restore the portfolio appearance:', error);
  }
  const resolved = appearance === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : appearance;
  document.documentElement.dataset.appearance = appearance;
  document.documentElement.dataset.theme = resolved;
  document.querySelector('meta[name="theme-color"]').content = resolved === 'dark' ? '#202024' : '#faf9f6';
  let mode = 'focus';
  try {
    if (sessionStorage.getItem('portfolio-listening-mode') === 'soundroom') mode = 'soundroom';
  } catch (error) {
    console.warn('Unable to restore the portfolio listening preference:', error);
  }
  document.documentElement.dataset.listeningMode = mode;
})();
