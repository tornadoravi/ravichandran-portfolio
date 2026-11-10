import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { reactPages } from './site-files.js';

export default defineConfig({
  publicDir: false,
  esbuild: { jsx: 'automatic' },
  build: {
    manifest: true,
    rollupOptions: {
      input: Object.fromEntries(reactPages.map(file => [
        file.slice(0, -5),
        fileURLToPath(new URL(file, import.meta.url))
      ]))
    }
  }
});
