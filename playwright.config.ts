import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Folder results
  outputDir: 'test-results/', 
  
  // Max time per test
  timeout: 60000,

  // HTML Report for reports
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  // Browsers configuration
  use: {
    // For CI we run headless
    headless: true,

    // Evidence collection
    screenshot: 'on',
    video: 'on-first-retry',
    trace: 'on', // Black box for debugging
  },

  // Paralelism configuration for CI 
  workers: process.env.CI ? 2 : undefined,

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});