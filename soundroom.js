const soundroom = document.querySelector('[data-soundroom]');
if (soundroom) {
  const audio = document.querySelector('#portfolio-ambience');
  const modes = [...soundroom.querySelectorAll('[data-mode]')];
  const panel = soundroom.querySelector('#soundroom-panel');
  const play = soundroom.querySelector('.ambience-play');
  const playLabel = play.querySelector('.play-label');
  const volume = soundroom.querySelector('input[type="range"]');
  const output = soundroom.querySelector('output');
  const status = soundroom.querySelector('.soundroom-status');
  let mode = document.documentElement.dataset.listeningMode || 'focus';
  let playRequest = 0;
  audio.volume = Number(volume.value) / 100;

  function showPlayback(playing) {
    document.body.classList.toggle('is-listening', playing);
    playLabel.textContent = playing ? 'Pause ambience' : 'Play ambience';
    play.title = playLabel.textContent;
    play.setAttribute('aria-pressed', String(playing));
  }

  function pausePlayback() {
    playRequest++;
    audio.pause();
    play.disabled = false;
    showPlayback(false);
    status.textContent = mode === 'focus' ? 'Quiet browsing.' : 'Paused. Press Play to listen.';
  }

  function selectMode(nextMode, userInitiated = false) {
    mode = nextMode;
    document.body.dataset.listeningMode = mode;
    document.documentElement.dataset.listeningMode = mode;
    document.querySelector('meta[name="theme-color"]').content = mode === 'soundroom' ? '#432720' : '#faf9f6';
    if (userInitiated) {
      try {
        sessionStorage.setItem('portfolio-listening-mode', mode);
      } catch (error) {
        console.warn('Unable to save the portfolio theme:', error);
      }
    }
    modes.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
    panel.hidden = mode !== 'soundroom';
    status.classList.toggle('sr-only', mode === 'focus');
    if (mode === 'focus') pausePlayback();
    else if (userInitiated && audio.paused && !play.disabled) startPlayback();
    else if (!play.disabled) status.textContent = audio.paused ? 'Press Play to listen.' : 'Music is playing.';
  }

  async function startPlayback() {
    const request = ++playRequest;
    let timeout;
    play.disabled = true;
    playLabel.textContent = 'Starting...';
    play.title = playLabel.textContent;
    status.textContent = 'Loading music...';
    try {
      if (audio.error) audio.load();
      await Promise.race([
        audio.play(),
        new Promise((_, reject) => {
          timeout = setTimeout(() => reject(new Error('Music playback timed out')), 12000);
        })
      ]);
      if (request !== playRequest) return;
      if (mode !== 'soundroom' || document.hidden) {
        pausePlayback();
        return;
      }
      showPlayback(true);
      status.textContent = 'Music is playing.';
    } catch (error) {
      if (request !== playRequest) return;
      audio.pause();
      console.error('Unable to play portfolio music:', error);
      showPlayback(false);
      status.textContent = 'Music could not start. Press Play to retry.';
    } finally {
      clearTimeout(timeout);
      if (request === playRequest) play.disabled = false;
    }
  }
  modes.forEach(button => button.addEventListener('click', () => selectMode(button.dataset.mode, true)));
  play.addEventListener('click', () => {
    if (audio.paused) startPlayback();
    else pausePlayback();
  });
  volume.addEventListener('input', () => {
    audio.volume = Number(volume.value) / 100;
    output.value = `${volume.value}%`;
  });
  audio.addEventListener('pause', () => {
    if (!audio.paused) return;
    showPlayback(false);
    if (!audio.error && !play.disabled) {
      status.textContent = mode === 'focus' ? 'Quiet browsing.' : 'Paused. Press Play to listen.';
    }
  });
  audio.addEventListener('error', () => {
    pausePlayback();
    console.error('Portfolio music failed to load:', audio.error);
    status.textContent = 'Music could not load. Press Play to retry.';
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pausePlayback();
  });
  window.addEventListener('pagehide', pausePlayback);
  selectMode(mode);
  soundroom.hidden = false;
}
