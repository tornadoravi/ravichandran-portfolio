import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { writeFile } from 'node:fs/promises';
import { codScreens } from '../src/cod-shield-story.js';

const renderer = await createServer({
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, watch: null, hmr: false }, appType: 'custom'
});
try {
  const { default: Screen } = await renderer.ssrLoadModule('/src/CodShieldScreen.jsx');
  for (const { id: state } of codScreens) {
    await writeFile(`assets/cod-shield-${state}.svg`, renderToStaticMarkup(React.createElement(Screen, { state })) + '\n');
  }
  console.log(`Rendered ${codScreens.length} explicitly labelled mobile-app concept screens.`);
} finally {
  await renderer.close();
}
