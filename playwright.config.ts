import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  fullyParallel: false,
  reporter: [['html', { open: 'never' }]],
  use: {
    // Basic Authentication credentials handled via Environment Variables
    httpCredentials: {
      username: process.env.MALL_HTTP_USER || '',
      password: process.env.MALL_HTTP_PASSWORD || '',
    },
    screenshot: { mode: 'on', fullPage: true },
    trace: 'on',
    video: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});