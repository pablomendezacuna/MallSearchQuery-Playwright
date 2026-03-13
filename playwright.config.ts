import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  fullyParallel: false, // Ejecución secuencial para mayor estabilidad
  reporter: [['html', { open: 'never' }]],
  use: {
    // Configuración de capturas de pantalla completa
    screenshot: {
      mode: 'on',
      fullPage: true, // Captura todo el largo del sitio
    },
    trace: 'on',             // Rastro técnico para depuración profunda
    video: 'on-first-retry', // Graba video si el test falla al primer intento
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});