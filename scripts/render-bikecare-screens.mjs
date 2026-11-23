import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { bikecareScreens } from '../src/bikecare-story.js';

const css = await readFile('bikecare.css', 'utf8');
const photos = await Promise.all(['honda', 'yamaha', 'hero', 'ather'].map(async name => [
  `/assets/bikecare-official-${name}.webp`, `data:image/webp;base64,${(await readFile(`assets/bikecare-official-${name}.webp`)).toString('base64')}`
]));
const renderer = await createServer({
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, watch: null, hmr: false }, appType: 'custom'
});
const browser = await chromium.launch();
const failures = [];
try {
  const { default: App } = await renderer.ssrLoadModule('/src/BikeCareApp.jsx');
  for (const { id, width, height } of bikecareScreens) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
    try {
      let markup = renderToStaticMarkup(React.createElement('div', {
        className: 'bikecare-screen', 'data-scene': id
      }, React.createElement(App, { scene: id })));
      for (const [src, embedded] of photos) markup = markup.replaceAll(`src="${src}"`, `src="${embedded}"`);
      const presentation = `
        body { margin: 0; }
        .bikecare-screen .bikecare-role-switch, .bikecare-screen .bikecare-demo-note { display: none; }
        .bikecare-screen .bikecare-phone { height: 844px; border-radius: 0; box-shadow: none; }
        .bikecare-screen .bikecare-app-body { padding: 12px; }
        .bikecare-screen .bikecare-app-body > * { margin-bottom: 8px; }
        .bikecare-screen .bikecare-app-body h3 { font-size: 24px; }
        .bikecare-screen .bikecare-app-body > p { font-size: 12px; }
        .bikecare-screen .bikecare-app-body > .bikecare-app-eyebrow { font-size: 10px; }
        .bikecare-screen .bikecare-app-header { padding: 8px 14px 4px; }
        .bikecare-screen .bikecare-app-header strong { line-height: 1.2; }
        .bikecare-screen .bikecare-app-card > * { margin-bottom: 8px; }
        .bikecare-screen .bikecare-app-card > :last-child { margin-bottom: 0; }
        .bikecare-screen .bikecare-form { gap: 10px; }
        .bikecare-screen[data-scene="product"] .bikecare-part-art { height: 80px; }
      `;
      await page.setContent(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}\n${presentation}</style></head><body>${markup}</body></html>`);
      await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
      const bounds = await page.locator('.bikecare-app-body').evaluate(body => ({
        height: body.clientHeight, contentHeight: body.scrollHeight,
        width: body.clientWidth, contentWidth: body.scrollWidth
      }));
      if (bounds.contentHeight > bounds.height || bounds.contentWidth > bounds.width) {
        failures.push(`${id}: ${JSON.stringify(bounds)}`);
        continue;
      }
      await sharp(await page.screenshot()).resize(width, height).webp({ quality: 92 })
        .toFile(`assets/bikecare-mobile-${id}.webp`);
    } finally {
      await page.close();
    }
  }
  if (failures.length) throw new Error(`Mobile concept content is clipped:\n${failures.join('\n')}`);
  console.log(`Rendered ${bikecareScreens.length} full-frame mobile designs from the clickable prototype.`);
} finally {
  await browser.close();
  await renderer.close();
}
