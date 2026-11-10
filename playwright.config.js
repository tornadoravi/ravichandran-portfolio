import { defineConfig } from '@playwright/test';

const baseURL = `http://127.0.0.1:${process.env.PORT || 4173}`;
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL },
  webServer: {
    command: 'npm start',
    url: baseURL,
    reuseExistingServer: !process.env.CI
  }
});
