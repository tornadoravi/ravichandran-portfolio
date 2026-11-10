import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const { data, info } = await sharp(new URL('assets/portrait-3d-source.png', root).pathname)
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const background = new Uint8Array(width * height);
const queue = new Uint32Array(width * height);
let tail = 0;
function visit(index) {
  if (background[index]) return;
  const pixel = index * 4;
  const max = Math.max(data[pixel], data[pixel + 1], data[pixel + 2]);
  const min = Math.min(data[pixel], data[pixel + 1], data[pixel + 2]);
  if (max > 32 || max - min > 12) return;
  background[index] = 1;
  queue[tail++] = index;
}
for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
// Remove only edge-connected near-black background, leaving enclosed dark hair detail intact.
for (let head = 0; head < tail; head++) {
  const index = queue[head];
  const x = index % width;
  if (x > 0) visit(index - 1);
  if (x < width - 1) visit(index + 1);
  if (index >= width) visit(index - width);
  if (index < width * (height - 1)) visit(index + width);
}
const mask = new Uint8Array(width * height);
for (let i = 0; i < mask.length; i++) mask[i] = background[i] ? 0 : 255;
// This single bust has one continuous silhouette per row; keep dark hair inside its outline opaque.
for (let y = 0; y < height; y++) {
  const start = y * width;
  let left = 0;
  let right = width - 1;
  while (left < width && !mask[start + left]) left++;
  while (right > left && !mask[start + right]) right--;
  if (right - left > 3) mask.fill(255, start + left, start + right + 1);
}
const softened = await sharp(mask, { raw: { width, height, channels: 1 } }).blur(.6).toColourspace('b-w').raw().toBuffer();
// Finish the fade before the source illustration's curved cut edge, in image coordinates.
for (let y = 0; y < height; y++) {
  const t = Math.max(0, Math.min(1, (y / (height - 1) - .64) / .26));
  const opacity = 1 - t * t * t * (t * (t * 6 - 15) + 10);
  for (let x = 0; x < width; x++) {
    const index = y * width + x;
    data[index * 4 + 3] = Math.round(softened[index] * opacity);
  }
}
await sharp(data, { raw: { width, height, channels: 4 } }).webp({ quality: 92, alphaQuality: 100 })
  .toFile(new URL('assets/portrait-3d.webp', root).pathname);

const source = await readFile(new URL('index.html', root), 'utf8');
const section = source.match(/<section class="portrait-hero"[\s\S]*?<\/section>/)[0];
const css = await readFile(new URL('hero.css', root), 'utf8');
const photo = (await readFile(new URL('assets/portrait-3d.webp', root))).toString('base64');
const font = (await readFile(new URL('assets/anton-latin.ttf', root))).toString('base64');
const standaloneCSS = css.replaceAll('/assets/anton-latin.ttf', `data:font/ttf;base64,${font}`);
const standaloneSection = section.replaceAll('/assets/portrait-3d.webp', `data:image/webp;base64,${photo}`);
await writeFile(new URL('portrait-standalone.html', root),
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ravichandran V - Product Designer</title><style>body{margin:0;background:#080809;color:#eee;font-family:Arial,sans-serif}*{box-sizing:border-box}a{color:inherit}${standaloneCSS}.portrait-hero{--scene-height:max(620px,100svh)}</style><main>${standaloneSection.replace('href="#work"', 'href="./index.html#work"')}</main></html>`);
console.log(`Built ${width}x${height} 3D-style portrait and standalone HTML.`);
