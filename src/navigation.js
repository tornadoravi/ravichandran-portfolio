const pages = import.meta.glob('./pages/*.jsx');

function pageName(url) {
  const name = url.pathname === '/' ? 'index' : url.pathname.replace(/^\//, '').replace(/\.html$/, '');
  return pages[`./pages/${name}.jsx`] ? name : null;
}

export async function loadPage(name) {
  const loader = pages[`./pages/${name}.jsx`];
  if (!loader) throw new Error(`Unknown portfolio page: ${name}`);
  return (await loader()).default;
}

export function initializePortfolioNavigation(onNavigate) {
  const events = new AbortController();
  const snapshots = new Map();
  let pending;
  let currentPath = location.pathname + location.search;
  let currentKey = crypto.randomUUID();
  const originalState = history.state;
  history.replaceState({ ...originalState, portfolioKey: currentKey }, '');

  function snapshot() {
    return {
      scroll: [scrollX, scrollY],
      details: [...document.querySelectorAll('main details')].map(detail => detail.open)
    };
  }

  function remember() {
    const saved = snapshot();
    snapshots.set(currentKey, saved);
    history.replaceState({ ...history.state, portfolioSnapshot: saved }, '');
  }

  async function navigate(url, restore) {
    pending?.abort();
    const controller = new AbortController();
    pending = controller;
    document.getElementById('main').setAttribute('aria-busy', 'true');
    try {
      const name = pageName(url);
      const [response, Page] = await Promise.all([
        fetch(url, { signal: controller.signal }),
        loadPage(name)
      ]);
      if (!response.ok) throw new Error(`Portfolio navigation failed: HTTP ${response.status}`);
      const html = new DOMParser().parseFromString(await response.text(), 'text/html');
      if (html.body.dataset.page !== name) throw new Error(`Unexpected portfolio page: ${url.pathname}`);
      if (controller.signal.aborted) return;

      if (!restore) {
        remember();
        currentKey = crypto.randomUUID();
        history.pushState({ portfolioKey: currentKey }, '', url);
      } else {
        currentKey = history.state?.portfolioKey || crypto.randomUUID();
        history.replaceState({ ...history.state, portfolioKey: currentKey }, '');
      }
      currentPath = url.pathname + url.search;
      const listening = document.body.classList.contains('is-listening');
      document.body.className = html.body.className;
      document.body.classList.toggle('is-listening', listening);
      document.body.dataset.page = name;
      document.title = html.title;
      document.querySelector('meta[name="description"]').content = html.querySelector('meta[name="description"]').content;
      onNavigate({ Page, page: name, title: html.title });

      if (restore?.details) {
        document.querySelectorAll('main details').forEach((detail, index) => {
          detail.open = restore.details[index] ?? false;
        });
      }
      const main = document.getElementById('main');
      main.focus({ preventScroll: true });
      function alignDestination() {
        if (restore?.scroll) {
          window.scrollTo({ left: restore.scroll[0], top: restore.scroll[1], behavior: 'instant' });
        } else if (url.hash) {
          document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({ behavior: 'instant', block: 'start' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }
      alignDestination();
      await document.fonts.ready;
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (!controller.signal.aborted && document.activeElement === main) alignDestination();
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error('Unable to navigate within the portfolio; opening the original page:', error);
      if (restore) location.reload();
      else location.assign(url.href);
    } finally {
      if (pending === controller) {
        pending = null;
        document.getElementById('main')?.removeAttribute('aria-busy');
      }
    }
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        !(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || !pageName(url)) return;
    if (url.pathname + url.search === currentPath) {
      pending?.abort();
      document.getElementById('main')?.removeAttribute('aria-busy');
      remember();
      if (!url.hash || url.hash === '#main') {
        event.preventDefault();
        if (url.href !== location.href) {
          currentKey = crypto.randomUUID();
          history.pushState({ portfolioKey: currentKey }, '', url);
        }
        document.getElementById('main').focus({ preventScroll: true });
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        requestAnimationFrame(() => {
          if (!events.signal.aborted && location.href === url.href && document.activeElement === document.getElementById('main')) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }
        });
      }
      return;
    }
    event.preventDefault();
    navigate(url);
  }, { signal: events.signal });

  window.addEventListener('popstate', event => {
    pending?.abort();
    snapshots.set(currentKey, snapshot());
    const url = new URL(location.href);
    const key = event.state?.portfolioKey;
    if (url.pathname + url.search === currentPath) {
      currentKey = key || currentKey;
      document.getElementById('main')?.removeAttribute('aria-busy');
      return;
    }
    navigate(url, snapshots.get(key) || event.state?.portfolioSnapshot || {});
  }, { signal: events.signal });

  return () => {
    events.abort();
    pending?.abort();
  };
}
