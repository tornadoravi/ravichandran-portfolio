export function initializePortfolioEffects() {
  const events = new AbortController();
  const cleanups = [];
  function listen(target, name, handler, options = {}) {
    target.addEventListener(name, handler, { ...options, signal: events.signal });
  }
  document.documentElement.classList.add('js');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (location.hash) document.documentElement.classList.add('bookmark-entry');

  const movedSections = { '#templates': '#templates', '#storytelling': '#overview' };
  if (location.pathname === '/analytics.html' && movedSections[location.hash]) {
    location.replace(`/storyboard.html${movedSections[location.hash]}`);
  }

  function openLinkedDetails(hash) {
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    let opened = false;
    for (let element = target; element; element = element.parentElement) {
      if (element instanceof HTMLDetailsElement && !element.open) {
        element.open = true;
        opened = true;
      }
    }
    // Let disclosure layout and native scroll restoration settle before aligning.
    if (opened) requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!events.signal.aborted && location.hash === hash) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }));
  }
  openLinkedDetails(location.hash);
  const entryHash = location.hash;
  const entryTarget = document.getElementById(entryHash.slice(1));
  if (entryTarget?.closest('details')) {
    const pageReady = document.readyState === 'complete' ? Promise.resolve() :
      new Promise(resolve => listen(window, 'load', resolve, { once: true }));
    Promise.all([pageReady, document.fonts.ready]).then(() => requestAnimationFrame(() => {
      if (!events.signal.aborted && location.hash === entryHash) entryTarget.scrollIntoView({ behavior: 'instant', block: 'start' });
    }));
  }
  listen(document, 'click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) return;
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    const destination = new URL(link.href);
    if (destination.origin === location.origin && destination.pathname === location.pathname &&
        destination.search === location.search && destination.hash) openLinkedDetails(destination.hash);
  });
  listen(window, 'hashchange', () => openLinkedDetails(location.hash));
  listen(window, 'pageshow', () => openLinkedDetails(location.hash));

  const text = (x, y, content, size = 12, color = '#5d7065', weight = 400) =>
    `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${content}</text>`;
  const rect = (x, y, width, height, fill, radius = 0, stroke = 'none') =>
    `<rect${fill === '#fff' ? ' class="workspace-paper"' : ''} x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`;
  const line = (x1, y1, x2, y2, color = '#d7e1da') =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}"/>`;
  const shell = (content, label, height = 460) =>
    `<svg xmlns="http://www.w3.org/2000/svg" class="portfolio-illustration" viewBox="0 0 1000 ${height}" role="img" aria-label="${label}" font-family="Arial, Helvetica, sans-serif">${content}</svg>`;

  function topbar(name, subtitle) {
    return `${rect(0, 0, 1000, 49, '#fff', 10)}${rect(0, 30, 1000, 19, '#fff')}${rect(20, 17, 17, 17, '#253f36', 4)}${text(25, 30, '+', 16, '#fff')}${text(48, 31, name, 14, '#292d29', 600)}${text(228, 31, subtitle, 10)}${text(843, 31, 'Illustrative workspace', 10)}${line(0, 49, 1000, 49)}`;
  }

  function bullet(x, y, width, actual, label) {
    return `${text(x, y - 9, label, 11, '#55594f')}${rect(x, y, width, 27, '#e9ece2', 3)}${rect(x, y, width * .76, 27, '#d4deca', 3)}${rect(x, y, width * .5, 27, '#bacbae', 3)}${rect(x, y + 9, width * actual, 9, '#3c5844', 2)}${line(x + width * .8, y - 3, x + width * .8, y + 30, '#283f30')}`;
  }

  function analytics() {
    const bars = [56, 78, 65, 103, 88, 123, 116, 148];
    const chartBars = bars.map((height, i) => `${rect(53 + i * 34, 397 - height, 19, height, i === 7 ? '#c98456' : '#b7c9ac', 3)}${text(55 + i * 34, 417, ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'][i], 9)}`).join('');
    return shell(`${topbar('Analytics+', 'Sample report / Performance overview')}
      ${rect(17, 65, 966, 35, '#f0f1ea', 5)}${text(30, 87, 'Chart Type  ▾', 11, '#2a332c', 600)}${text(151, 87, 'Data', 11)}${text(211, 87, 'Design', 11)}${text(290, 87, 'Format', 11)}${text(861, 87, 'Presentation  →', 11, '#3c5844')}
      ${text(28, 129, 'Performance at a glance', 17, '#2e352e', 600)}${text(28, 147, 'Sample data • Actual vs target already mapped', 10)}
      ${rect(26, 162, 312, 57, '#fff', 6, '#e8e9e3')}${text(42, 181, 'ILLUSTRATIVE ACTUAL', 8)}${text(42, 207, '84.2', 25, '#303b30', 600)}${text(112, 204, 'Sample KPI', 10)}
      ${rect(26, 232, 312, 203, '#fff', 6, '#e8e9e3')}${text(42, 255, 'A view of the trend', 12, '#333b33', 600)}${line(45, 397, 322, 397)}${chartBars}
      ${rect(353, 162, 347, 273, '#fff', 6, '#e8e9e3')}${text(371, 187, 'Actual against target', 12, '#333b33', 600)}${text(371, 206, 'A bullet chart brings comparison into focus.', 10)}
      ${bullet(376, 243, 293, .73, 'Category A')}${bullet(376, 304, 293, .88, 'Category B')}${bullet(376, 365, 293, .61, 'Category C')}
      ${rect(722, 114, 261, 321, '#fff', 7, '#e0e3d8')}${text(741, 140, 'Chart Wizard', 16, '#333b33', 600)}${text(741, 160, 'Find a visual for your question', 10)}
      ${rect(738, 177, 111, 27, '#edf0e8', 5)}${text(753, 194, 'Chart family', 10, '#657360')}${rect(853, 177, 111, 27, '#304c3a', 5)}${text(879, 194, 'Function', 10, '#fff')}
      ${text(741, 228, 'What would you like to show?', 11, '#4a5148', 600)}${rect(738, 243, 226, 32, '#f2f4ed', 4, '#d7dfcd')}${text(751, 263, 'Comparison', 11, '#384933')}${text(941, 263, '✓', 11, '#384933')}
      ${text(741, 301, 'A suggested direction', 10)}${rect(738, 315, 226, 65, '#f8f9f5', 4, '#dce3d4')}${rect(751, 335, 55, 13, '#d6dfcc', 2)}${rect(751, 339, 40, 5, '#466044', 1)}${line(798, 331, 798, 352, '#243a28')}${text(821, 343, 'Bullet chart', 12, '#333b33', 600)}${text(821, 360, 'Actual vs target', 9)}
      ${text(741, 407, 'Explore, choose, then configure  →', 10, '#42603e')}`,
    'Conceptual analytics dashboard with sample bullet charts and a Chart Wizard comparison path. Not a product screenshot.');
  }

  function wizard() {
    const tiles = [
      { x: 349, y: 132, name: 'Bullet', selected: true },
      { x: 650, y: 132, name: 'Clustered bar', selected: false },
      { x: 349, y: 272, name: 'Variance', selected: false },
      { x: 650, y: 272, name: 'Line comparison', selected: false }
    ].map(({ x, y, name, selected }, i) => {
      let icon;
      if (i === 0) {
        icon = bullet(x + 19, y + 45, 145, .7, '');
      } else if (i === 3) {
        icon = `<path d="M${x + 20} ${y + 78}l35-24 35 11 35-35 35 12" stroke="#456445" fill="none" stroke-width="3"/><path d="M${x + 20} ${y + 84}l35-11 35-17 35 5 35-25" stroke="#c79671" fill="none" stroke-width="3"/>`;
      } else {
        icon = [0, 1, 2].map((n) => `${rect(x + 20 + n * 45, y + 30 + n * 8, 14, 50 - n * 8, '#76956c', 2)}${rect(x + 37 + n * 45, y + 43 + n * 3, 14, 37 - n * 3, '#c6d4bd', 2)}`).join('');
      }
      return `${rect(x, y, 278, 122, selected ? '#f2f6ec' : '#fff', 6, selected ? '#779367' : '#e2e5dc')}${icon}${text(x + 20, y + 104, name, 12, '#344031', 600)}${selected ? text(x + 247, y + 23, '✓', 14, '#44613d') : ''}`;
    }).join('');
    return shell(`${topbar('Chart Wizard', 'Concept / Find a visualization')}
      ${rect(0, 49, 314, 411, '#f1f2eb')}${text(25, 85, 'Start with your analytical goal', 14, '#31382f', 600)}${text(25, 109, 'Actual and target are already mapped.', 10)}
      ${text(25, 148, 'AXIS', 9)}${rect(22, 161, 125, 30, '#fff', 4, '#d9ddd1')}${text(43, 181, 'Categorical', 11, '#354431')}${rect(155, 161, 125, 30, '#e4e9dc', 4)}${text(193, 181, 'Time', 11)}
      ${text(25, 224, 'USE CASE', 9)}${rect(22, 237, 258, 32, '#344e36', 4)}${text(38, 258, 'Comparison', 11, '#fff')}${text(257, 258, '✓', 11, '#fff')}
      ${text(38, 297, 'Deviation', 11)}${text(38, 329, 'Multivariate', 11)}
      ${text(25, 370, 'CHART STYLE', 9)}${rect(22, 382, 78, 28, '#e4e9dc', 4)}${text(47, 400, 'Bars', 10, '#354431')}${text(127, 400, 'Points', 10)}${text(218, 400, 'Lines', 10)}
      ${text(349, 91, 'A direction, not a maze.', 19, '#323a2e', 600)}${text(349, 111, 'Discover charts that fit the comparison.', 11)}${tiles}
      ${text(349, 432, 'Detailed bands, labels, and layout remain in configuration panels.', 10)}`,
    'Conceptual Chart Wizard: categorical axis, comparison intent, bars style, and a selected bullet chart. Not an interactive tool.');
  }

  function planning() {
    const rows = [
      ['Project workspace', 'Summary', 0, 8, '#668577'],
      ['Discover the requirements', 'Planning', 0, 2, '#b7c8bc'],
      ['Map the connected flow', 'Design', 1.5, 2.5, '#91a89b'],
      ['Shape the experience', 'Design', 3, 3, '#a4b9ab'],
      ['Review the implementation', 'Review', 5.5, 2, '#d3c7b1'],
      ['Bring the details together', 'Review', 7, 1.5, '#c4d2c7']
    ];
    const rowMarkup = rows.map(([name, category, start, duration, color], i) => {
      const y = 177 + i * 41;
      return `${i % 2 === 0 ? rect(21, y - 20, 958, 41, '#e9f0eb') : ''}${line(21, y + 21, 979, y + 21)}${text(34, y + 5, i === 0 ? '▾' : '·', 12)}${text(57, y + 5, name, 11, '#526960', i === 0 ? 600 : 400)}${text(299, y + 5, category, 10)}${rect(431 + start * 56, y - 8, duration * 56, i === 0 ? 9 : 18, color, 3)}${i > 0 ? rect(431 + start * 56, y - 8, duration * 30, 18, '#668577', 3) : ''}`;
    }).join('');
    const grid = Array.from({ length: 10 }, (_, i) => `${line(423 + i * 56, 138, 423 + i * 56, 424, '#e4e8dd')}${text(440 + i * 56, 142, String(i * 3 + 1).padStart(2, '0'), 10)}`).join('');
    return shell(`${topbar('PowerTable', 'Sample workspace / Connected planning')}
      ${rect(17, 65, 966, 35, '#f0f1ea', 5)}${text(31, 87, 'Gantt view  ▾', 11, '#354431', 600)}${text(171, 87, '+ Task', 11)}${text(262, 87, 'Columns', 11)}${text(356, 87, 'Timescale', 11)}${text(473, 87, 'Baseline', 11)}${text(860, 87, 'Sample plan', 10)}
      ${text(30, 130, 'TASK / FICTIONAL EXAMPLE', 9)}${text(299, 130, 'WORKSTREAM', 9)}${text(439, 120, 'NOVEMBER / ILLUSTRATIVE TIMELINE', 9)}${line(21, 153, 979, 153)}
      ${rowMarkup}${grid}${line(682, 145, 682, 424, '#b78357')}${rect(678, 139, 8, 8, '#b78357', 4)}
      ${rect(22, 424, 956, 23, '#f0f1ea', 4)}${text(35, 440, '6 sample rows', 9)}${text(824, 440, 'Tasks + timeline context', 9)}`,
    'Conceptual Gantt planning canvas: fictional tasks beside a timeline, summary bars, and a date marker. Not a product screenshot.');
  }

  function storyboard() {
    const slides = [0, 1, 2].map((i) => {
      const x = 39 + i * 93;
      return `${rect(x, 384, 82, 48, i === 0 ? '#eee9f3' : '#fff', 4, i === 0 ? '#93849f' : '#e6e2e9')}${text(x + 8, 398, `0${i + 1}`, 8)}${rect(x + 10, 410, 49, 3, '#b4a8c0', 1)}${rect(x + 10, 417, 37, 3, '#d3ccd9', 1)}`;
    }).join('');
    return shell(`${topbar('Storyboard', 'Concept / A sequence of insights')}
      ${rect(20, 69, 960, 37, '#f0edf3', 5)}${text(35, 92, 'A clearer narrative', 12, '#494152', 600)}${text(760, 92, 'Annotations', 10)}${text(864, 92, 'Presentation  →', 10, '#494152')}
      ${rect(33, 125, 631, 240, '#eeeaf2', 7)}${text(56, 157, '01 / SET THE CONTEXT', 9, '#786687')}${text(56, 195, 'The trend is only', 29, '#44394e', 600)}${text(56, 230, 'the beginning.', 29, '#44394e', 600)}${text(56, 269, 'Add a point of view. Connect the next insight.', 11, '#786c80')}
      ${[70, 108, 88, 130, 150].map((height, i) => rect(380 + i * 45, 324 - height, 29, height, i === 4 ? '#897296' : '#c2b5ca', 3)).join('')}
      ${rect(687, 125, 282, 240, '#fff', 7, '#e6e2e9')}${text(707, 151, 'A narrative structure', 14, '#494152', 600)}${text(707, 177, 'Intended communication sequence', 10)}
      ${text(711, 216, '01', 11, '#8d789c')}${text(747, 216, 'Set the context', 12, '#494152')}${line(712, 232, 946, 232)}${text(711, 263, '02', 11, '#8d789c')}${text(747, 263, 'Highlight the comparison', 12, '#494152')}${line(712, 279, 946, 279)}${text(711, 310, '03', 11, '#8d789c')}${text(747, 310, 'Connect the story', 12, '#494152')}
      ${slides}${text(689, 414, 'Conceptual narrative • Not a customer example', 10)}`,
    'Conceptual storyboard with a fictional insight slide and a three-part narrative sequence. Not a product screenshot.');
  }

  function resources() {
    const teams = [
      ['Design team', 'Sample capacity', 70, '#91a89b'],
      ['Planning team', 'Sample capacity', 88, '#b5a88b'],
      ['Review team', 'Sample capacity', 55, '#91a89b']
    ].map(([name, caption, width, fill], i) => {
      const y = 184 + i * 69;
      return `${rect(29, y - 28, 624, 60, '#fff', 5, '#e4e8dc')}${text(45, y - 3, name, 12, '#354431', 600)}${text(45, y + 16, caption, 9)}${rect(206, y - 8, 276, 16, '#e8eddf', 4)}${rect(206, y - 8, width * 2.76, 16, fill, 4)}${text(502, y + 4, `${width}%`, 12, '#354431', 600)}${text(555, y + 4, 'Illustrative', 9)}`;
    }).join('');
    return shell(`${topbar('Resource planning', 'Concept / Workload in context')}
      ${text(30, 91, 'See the plan through a resource lens.', 20, '#354431', 600)}${text(30, 114, 'Fictional teams and values to illustrate the design intent.', 11)}
      ${text(30, 141, 'WORKSPACE / SAMPLE CAPACITY', 9)}${teams}
      ${rect(679, 127, 293, 263, '#eef1e7', 6)}${text(698, 156, 'Backlog', 15, '#354431', 600)}${text(698, 177, 'Work awaiting assignment', 10)}
      ${['Define the task details', 'Connect the timeline', 'Review the handoff'].map((name, i) => `${rect(695, 194 + i * 57, 260, 45, '#fff', 5)}${text(708, 214 + i * 57, name, 11, '#354431')}${text(708, 230 + i * 57, 'Sample task • Unassigned', 9)}`).join('')}
      ${text(30, 417, 'Design intent: keep outstanding work and resource availability in a connected context.', 11)}`,
    'Conceptual resource-planning workspace showing fictional team capacity bars and a backlog. Values are illustrative, not measured outcomes.');
  }

  const illustrations = { analytics, planning, wizard, storyboard, resources };
  document.querySelectorAll('[data-illustration]').forEach((element) => {
    const render = illustrations[element.dataset.illustration];
    if (!render) throw new Error(`Unknown portfolio illustration: ${element.dataset.illustration}`);
    element.innerHTML = render();
  });

  const introAnimations = [];
  if (!motionPreference.matches && !location.hash && typeof Element.prototype.animate === 'function') {
    const introElements = document.querySelectorAll('.hero-role, .portrait-title, .hero > .eyebrow, .hero h1, .hero h2, .hero-note, .hero-bottom, .hero-domains, .case-hero > .eyebrow, .case-hero h1, .case-summary, .metadata, .about-nav');
    [...introElements].filter((element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 0;
    }).forEach((element, index) => {
      const cinematic = Boolean(element.closest('.portrait-hero'));
      const frames = cinematic ? [
        { opacity: 0, transform: 'translateY(32px)', clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0% 0)' }
      ] : [
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'none' }
      ];
      introAnimations.push(element.animate(frames, {
        duration: cinematic ? 1000 : 700,
        delay: index * (cinematic ? 110 : 65),
        easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards'
      }));
    });
  }
  listen(motionPreference, 'change', () => {
    if (motionPreference.matches) introAnimations.forEach((animation) => animation.cancel());
  });

  const portraitHero = document.querySelector('.portrait-hero');
  if (portraitHero) {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let portraitFrame;
    let portraitX = 0;
    let portraitY = 0;
    function applyPortraitPosition() {
      portraitFrame = undefined;
      portraitHero.style.setProperty('--portrait-x', `${portraitX}px`);
      portraitHero.style.setProperty('--portrait-y', `${portraitY}px`);
    }
    function resetPortraitPosition() {
      cancelAnimationFrame(portraitFrame);
      portraitX = portraitY = 0;
      applyPortraitPosition();
    }
    listen(portraitHero, 'pointermove', (event) => {
      if (motionPreference.matches || !finePointer.matches || event.pointerType === 'touch') return;
      const bounds = portraitHero.getBoundingClientRect();
      portraitX = Math.max(-8, Math.min(8, ((event.clientX - bounds.left) / bounds.width - .5) * 16));
      portraitY = Math.max(-5, Math.min(5, ((event.clientY - bounds.top) / bounds.height - .5) * 10));
      if (portraitFrame === undefined) portraitFrame = requestAnimationFrame(applyPortraitPosition);
    });
    listen(portraitHero, 'pointerleave', resetPortraitPosition);
    listen(motionPreference, 'change', resetPortraitPosition);
    listen(finePointer, 'change', resetPortraitPosition);
    listen(document, 'visibilitychange', resetPortraitPosition);
    cleanups.push(resetPortraitPosition);
  }

  const cursorPreference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const portfolioCursor = document.createElement('div');
  portfolioCursor.className = 'portfolio-cursor';
  portfolioCursor.setAttribute('aria-hidden', 'true');
  const cursorDot = document.createElement('span');
  cursorDot.className = 'cursor-dot';
  const cursorRing = document.createElement('span');
  cursorRing.className = 'cursor-ring';
  portfolioCursor.append(cursorRing, cursorDot);
  document.body.append(portfolioCursor);

  let cursorFrame;
  let cursorTime;
  let cursorVisible = false;
  let cursorInteractive = false;
  let cursorX = 0;
  let cursorY = 0;
  let ringX = 0;
  let ringY = 0;

  function hidePortfolioCursor() {
    cancelAnimationFrame(cursorFrame);
    cursorFrame = cursorTime = undefined;
    cursorVisible = false;
    document.documentElement.classList.remove('has-custom-cursor');
  }

  function renderPortfolioCursor(time) {
    cursorFrame = undefined;
    const elapsed = cursorTime === undefined ? 16.7 : Math.min(time - cursorTime, 32);
    const easing = 1 - Math.exp(-elapsed / 65);
    ringX += (cursorX - ringX) * easing;
    ringY += (cursorY - ringY) * easing;
    const settled = Math.hypot(cursorX - ringX, cursorY - ringY) < .2;
    if (settled) {
      ringX = cursorX;
      ringY = cursorY;
    }
    cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    portfolioCursor.classList.toggle('is-interactive', cursorInteractive);
    document.documentElement.classList.add('has-custom-cursor');
    cursorTime = settled ? undefined : time;
    if (!settled) cursorFrame = requestAnimationFrame(renderPortfolioCursor);
  }

  function movePortfolioCursor(event) {
    if (!cursorPreference.matches || event.pointerType !== 'mouse' ||
        !(event.target instanceof Element) ||
        event.target.closest('input, textarea, select, iframe, video, audio, [contenteditable]:not([contenteditable="false"]), [data-native-cursor]') ||
        document.querySelector('dialog[open]')) {
      hidePortfolioCursor();
      return;
    }
    cursorX = event.clientX;
    cursorY = event.clientY;
    if (!cursorVisible) {
      ringX = cursorX;
      ringY = cursorY;
      cursorVisible = true;
    }
    cursorInteractive = Boolean(event.target.closest('a, button:not(:disabled), summary, [role="button"]'));
    if (cursorFrame === undefined) cursorFrame = requestAnimationFrame(renderPortfolioCursor);
  }

  listen(document, 'pointermove', movePortfolioCursor, { passive: true });
  listen(document, 'pointerover', (event) => {
    if (cursorVisible) movePortfolioCursor(event);
  }, { passive: true });
  listen(document.documentElement, 'pointerleave', hidePortfolioCursor);
  listen(document, 'visibilitychange', hidePortfolioCursor);
  listen(document, 'keydown', (event) => {
    if (event.key === 'Tab') hidePortfolioCursor();
  });
  listen(window, 'blur', hidePortfolioCursor);
  listen(window, 'pagehide', hidePortfolioCursor);
  listen(cursorPreference, 'change', (event) => {
    if (!event.matches) hidePortfolioCursor();
  });

  const mainContent = document.querySelector('#main');
  mainContent.tabIndex = -1;
  const backToTop = document.createElement('a');
  backToTop.className = 'back-to-top';
  backToTop.href = '#main';
  backToTop.textContent = '\u2191';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.title = 'Back to top';
  listen(backToTop, 'click', () => mainContent.focus({ preventScroll: true }));
  document.body.append(backToTop);

  const sectionIndexes = [...document.querySelectorAll('.case-nav, .about-nav, .project-index, .feature-index, [data-section-tabs]')].map((nav) => ({
    nav,
    sections: [...nav.querySelectorAll('a')].map((link) => {
      const target = document.querySelector(link.hash);
      if (!target) throw new Error(`Missing portfolio section: ${link.hash}`);
      return { link, target };
    })
  }));

  let readingProgress;
  if (document.querySelector('.case-nav')) {
    readingProgress = document.createElement('progress');
    readingProgress.className = 'reading-progress';
    readingProgress.max = 100;
    readingProgress.value = 0;
    readingProgress.setAttribute('aria-label', 'Case study reading progress');
    document.body.append(readingProgress);
  }

  let readingFrame;
  function updateReadingPosition() {
    readingFrame = undefined;
    const showBackToTop = window.scrollY > 600;
    if (!showBackToTop && document.activeElement === backToTop) mainContent.focus({ preventScroll: true });
    backToTop.classList.toggle('is-visible', showBackToTop);
    sectionIndexes.forEach(({ nav, sections }) => {
      if (!nav.getClientRects().length) return;
      const visibleSections = sections.filter(({ target }) => target.getClientRects().length);
      if (!visibleSections.length) return;
      let current = visibleSections[0];
      if (nav.hasAttribute('data-section-tabs')) {
        current = visibleSections.find(({ link }) => link.hash === location.hash) || current;
      } else {
        const readingLine = nav.matches('.case-nav') ? Math.max(128, Math.min(240, window.innerHeight / 3)) : 128;
        let currentTop = -Infinity;
        visibleSections.forEach((section) => {
          const top = section.target.getBoundingClientRect().top;
          if (top <= readingLine && (Math.abs(top - currentTop) > 1 || section.link.hash === location.hash)) {
            current = section;
            currentTop = top;
          }
        });
      }
      const changed = current.link.getAttribute('aria-current') !== 'location';
      sections.forEach(({ link }) => {
        if (link === current.link) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      if (changed && nav.matches('.case-nav') && nav.scrollWidth > nav.clientWidth && nav.getBoundingClientRect().top <= 1) {
        const bounds = nav.getBoundingClientRect();
        const linkBounds = current.link.getBoundingClientRect();
        if (linkBounds.left < bounds.left || linkBounds.right > bounds.right) {
          nav.scrollLeft += linkBounds.left - bounds.left - 12;
        }
      }
    });
    if (readingProgress) {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      readingProgress.value = scrollableHeight > 0 ? window.scrollY / scrollableHeight * 100 : 100;
    }
  }
  function scheduleReadingPosition() {
    if (readingFrame === undefined) readingFrame = requestAnimationFrame(updateReadingPosition);
  }
  listen(window, 'scroll', scheduleReadingPosition, { passive: true });
  listen(window, 'resize', scheduleReadingPosition);
  listen(window, 'load', scheduleReadingPosition);
  listen(window, 'hashchange', scheduleReadingPosition);
  listen(window, 'pageshow', scheduleReadingPosition);
  listen(document, 'toggle', scheduleReadingPosition, true);
  document.querySelectorAll('img').forEach((image) => listen(image, 'load', scheduleReadingPosition));
  scheduleReadingPosition();

  if ('IntersectionObserver' in window && !motionPreference.matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('is-revealed');
          revealObserver.unobserve(target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
    cleanups.push(() => revealObserver.disconnect());
    const revealElements = [...document.querySelectorAll('.project, .home-about, .editorial-section, .detail-figure, .next-project, .closing, .principles > div, .experience-timeline > li, .recommendation-card, .solution-grid > li, .concept-node')]
      .filter((element) => !element.matches('.editorial-section') || !element.querySelector('.principles, .experience-timeline, .recommendation-card'));
    revealElements.forEach((element) => {
      if (!element.closest('.case-evidence') && element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('reveal-target');
        revealObserver.observe(element);
      }
    });
    listen(motionPreference, 'change', () => {
      if (!motionPreference.matches) return;
      revealObserver.disconnect();
      revealElements.forEach(element => element.classList.add('is-revealed'));
    });
  }

  function inspectImage(image, opener, kind) {
    const dialog = document.createElement('dialog');
    dialog.className = 'screenshot-preview';
    dialog.setAttribute('aria-labelledby', 'screenshot-preview-title');
    const header = document.createElement('div');
    header.className = 'preview-header';
    const title = document.createElement('h2');
    title.id = 'screenshot-preview-title';
    title.textContent = `Inspect ${kind}`;
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Close';
    close.setAttribute('aria-label', `Close ${kind} preview`);
    close.autofocus = true;
    const sizeToggle = document.createElement('button');
    sizeToggle.type = 'button';
    sizeToggle.textContent = 'Actual size';
    sizeToggle.setAttribute('aria-pressed', 'false');
    const controls = document.createElement('div');
    controls.className = 'preview-controls';
    controls.append(sizeToggle, close);
    header.append(title, controls);
    const viewport = document.createElement('div');
    viewport.className = 'preview-viewport';
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', `${kind === 'illustration' ? 'Illustration' : 'Screenshot'} image`);
    const previewImage = document.createElement('img');
    previewImage.src = image.src;
    previewImage.alt = image.alt;
    const caption = document.createElement('p');
    caption.className = 'preview-caption';
    caption.id = 'screenshot-preview-hint';
    viewport.setAttribute('aria-describedby', caption.id);
    viewport.append(previewImage);
    dialog.append(header, viewport, caption);
    document.body.append(dialog);
    function updateSizeAvailability() {
      const actualSize = dialog.classList.contains('is-actual-size');
      sizeToggle.disabled = !actualSize &&
        previewImage.naturalWidth <= viewport.clientWidth && previewImage.naturalHeight <= viewport.clientHeight;
      const sourceLabel = kind === 'illustration' ? 'Conceptual illustration, not a product screenshot. ' : '';
      caption.textContent = sourceLabel + (actualSize ? `Scroll within the image to inspect the original ${kind}. No upscaling is applied.` :
        sizeToggle.disabled ? 'Shown at its original resolution.' : `Choose Actual size to inspect details, or keep the full ${kind} in view.`);
    }
    listen(previewImage, 'load', updateSizeAvailability);
    listen(window, 'resize', updateSizeAvailability);
    listen(sizeToggle, 'click', () => {
      const actualSize = dialog.classList.toggle('is-actual-size');
      sizeToggle.textContent = actualSize ? 'Fit to screen' : 'Actual size';
      sizeToggle.setAttribute('aria-pressed', String(actualSize));
      viewport.tabIndex = actualSize ? 0 : -1;
      viewport.scrollTo(0, 0);
      updateSizeAvailability();
    });
    listen(close, 'click', () => dialog.close());
    listen(dialog, 'close', () => {
      document.body.classList.remove('preview-open');
      window.removeEventListener('resize', updateSizeAvailability);
      dialog.remove();
      opener.focus({ preventScroll: true });
    });
    listen(dialog, 'click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
        dialog.close();
      }
    });
    dialog.showModal();
    if (previewImage.complete) updateSizeAvailability();
    document.body.classList.add('preview-open');
  }

  if ('HTMLDialogElement' in window && typeof HTMLDialogElement.prototype.showModal === 'function') {
    document.querySelectorAll('.detail-figure a.product-screenshot').forEach((link) => {
      const image = link.querySelector('img');
      const kind = image.dataset.visualKind === 'illustration' ? 'illustration' : 'screenshot';
      const caption = link.closest('figure').querySelector('figcaption');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'inspect-button';
      button.textContent = `Inspect ${kind}`;
      button.setAttribute('aria-haspopup', 'dialog');
      listen(button, 'click', () => inspectImage(image, button, kind));
      caption.append(button);
    });
  }

  return () => {
    events.abort();
    cleanups.forEach(cleanup => cleanup());
    introAnimations.forEach(animation => animation.cancel());
    cancelAnimationFrame(readingFrame);
    hidePortfolioCursor();
    portfolioCursor.remove();
    backToTop.remove();
    readingProgress?.remove();
    document.querySelectorAll('.inspect-button, .screenshot-preview').forEach(element => element.remove());
    document.body.classList.remove('preview-open');
  };
}
