import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  fullyParallel: false, 
  reporter: [['html', { open: 'never' }]],
  use: {
    screenshot: {
      mode: 'on',
      fullPage: true, 
    },
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