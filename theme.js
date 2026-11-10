(() => {
  let mode = 'focus';
  try {
    if (sessionStorage.getItem('portfolio-listening-mode') === 'soundroom') mode = 'soundroom';
  } catch (error) {
    console.warn('Unable to restore the portfolio theme:', error);
  }
  document.documentElement.dataset.listeningMode = mode;
  document.querySelector('meta[name="theme-color"]').content = mode === 'soundroom' ? '#432720' : '#faf9f6';
})();
