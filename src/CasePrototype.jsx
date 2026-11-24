import React, { useEffect, useRef, useState } from 'react';

export default function CasePrototype({ id, title, children }) {
  const [opened, setOpened] = useState(false);
  const [ready, setReady] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    setReady(true);
    const followBookmark = () => {
      if (window.location.hash === `#${id}`) setOpened(true);
    };
    followBookmark();
    window.addEventListener('hashchange', followBookmark);
    return () => window.removeEventListener('hashchange', followBookmark);
  }, [id]);
  useEffect(() => {
    if (!opened) return;
    dialog.current.showModal();
    document.body.classList.add('preview-open');
    return () => {
      document.body.classList.remove('preview-open');
      trigger.current?.focus({ preventScroll: true });
    };
  }, [opened]);
  return <>
    <button id={id} ref={trigger} className="case-prototype-trigger" type="button" disabled={!ready}
      onClick={() => setOpened(true)}>Try prototype <span aria-hidden="true">↗</span></button>
    {opened && <dialog ref={dialog} className="case-player case-prototype" aria-labelledby={`${id}-title`}
      onClose={() => setOpened(false)}>
      <header className="case-player-header">
        <h2 id={`${id}-title`}>{title}</h2>
        <button type="button" autoFocus onClick={() => dialog.current.close()}>Close prototype</button>
        <p>Simulated data. Nothing is sent and no real service is activated.</p>
      </header>
      <div className="case-prototype-body">{children}</div>
    </dialog>}
  </>;
}
