import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Tiempo máximo de cada test (90s por los scrolls largos) */
  timeout: 90000,
  /* Ejecución secuencial para no saturar los sitios web */
  fullyParallel: false, 
  /* Fallar si hay tests olvidados */
  forbidOnly: !!process.env.CI,
  /* Reintentar en CI para capturar videos de fallos */
  retries: process.env.CI ? 2 : 0,
  /* Reportero HTML: Genera la carpeta 'playwright-report' */
  reporter: [['html', { open: 'never' }]],
  
  use: {
    /* Base URL del ambiente */
    baseURL: 'https://kings-cross.ui-stg.mall.adeptmind.ai',
    
    /* CAPTURAS DE PANTALLA: Configuración completa */
    screenshot: {
      mode: 'on',       // 'on' captura tanto éxitos como fallos
      fullPage: true,   // CAPTURA TODO EL LARGO DEL SITIO
    },
    
    /* VIDEO: Graba cuando hay reintentos de fallos */
    video: 'on-first-retry',
    
    /* TRACE: El rastro técnico detallado */
    trace: 'on', 
    
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});