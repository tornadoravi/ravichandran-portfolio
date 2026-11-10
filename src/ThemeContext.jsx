import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('focus');
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [starting, setStarting] = useState(false);
  const [volume, setVolume] = useState(18);
  const [status, setStatus] = useState('Quiet browsing.');
  const modeRef = useRef('focus');
  const request = useRef(0);
  const pending = useRef(false);
  const audio = useRef(null);
  const timers = useRef(new Set());

  const pause = useCallback(() => {
    request.current++;
    audio.current?.pause();
    pending.current = false;
    setStarting(false);
    setPlaying(false);
    setStatus(modeRef.current === 'focus' ? 'Quiet browsing.' : 'Paused. Press Play to listen.');
  }, []);

  const start = useCallback(async () => {
    const media = audio.current;
    if (!media || pending.current) return;
    const id = ++request.current;
    let timeout;
    pending.current = true;
    setStarting(true);
    setStatus('Loading music...');
    try {
      if (media.error) media.load();
      await Promise.race([
        media.play(),
        new Promise((_, reject) => {
          timeout = setTimeout(() => reject(new Error('Music playback timed out')), 12000);
          timers.current.add(timeout);
        })
      ]);
      if (id !== request.current) return;
      if (modeRef.current !== 'soundroom' || document.hidden) {
        pause();
        return;
      }
      setPlaying(true);
      setStatus('Music is playing.');
    } catch (error) {
      if (id !== request.current) return;
      media.pause();
      console.error('Unable to play portfolio music:', error);
      setPlaying(false);
      setStatus('Music could not start. Press Play to retry.');
    } finally {
      clearTimeout(timeout);
      timers.current.delete(timeout);
      if (id === request.current) {
        pending.current = false;
        setStarting(false);
      }
    }
  }, [pause]);

  function selectMode(nextMode) {
    modeRef.current = nextMode;
    setMode(nextMode);
    try {
      sessionStorage.setItem('portfolio-listening-mode', nextMode);
    } catch (error) {
      console.warn('Unable to save the portfolio theme:', error);
    }
    if (nextMode === 'focus') pause();
    else if (audio.current?.paused && !pending.current) start();
  }

  function changeVolume(value) {
    setVolume(value);
    if (audio.current) audio.current.volume = value / 100;
  }

  useEffect(() => {
    const restored = document.documentElement.dataset.listeningMode === 'soundroom' ? 'soundroom' : 'focus';
    modeRef.current = restored;
    setMode(restored);
    setStatus(restored === 'focus' ? 'Quiet browsing.' : 'Press Play to listen.');
    const media = document.getElementById('portfolio-ambience');
    audio.current = media;
    if (media) media.volume = .18;
    const events = new AbortController();
    media?.addEventListener('pause', () => {
      setPlaying(false);
      if (!media.error && !pending.current) {
        setStatus(modeRef.current === 'focus' ? 'Quiet browsing.' : 'Paused. Press Play to listen.');
      }
    }, { signal: events.signal });
    media?.addEventListener('error', () => {
      pause();
      console.error('Portfolio music failed to load:', media.error);
      setStatus('Music could not load. Press Play to retry.');
    }, { signal: events.signal });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause();
    }, { signal: events.signal });
    window.addEventListener('pagehide', pause, { signal: events.signal });
    setReady(true);
    return () => {
      events.abort();
      request.current++;
      media?.pause();
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    };
  }, [pause]);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.listeningMode = mode;
    document.body.dataset.listeningMode = mode;
    document.querySelector('meta[name="theme-color"]').content = mode === 'soundroom' ? '#432720' : '#faf9f6';
  }, [mode, ready]);

  useEffect(() => {
    document.body.classList.toggle('is-listening', playing);
    return () => document.body.classList.remove('is-listening');
  }, [playing]);

  return <ThemeContext.Provider value={{ mode, ready, playing, starting, volume, status, selectMode, changeVolume, start, pause }}>
    {children}
  </ThemeContext.Provider>;
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('Portfolio theme controls require ThemeProvider.');
  return theme;
}
