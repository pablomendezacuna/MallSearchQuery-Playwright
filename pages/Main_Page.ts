import { Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    }

    async closePopup(lang: string) {
        const selectors = [
            'button[aria-label*="close" i]', 
            'button[aria-label*="cerrar" i]', 
            '.modal-close', 
            'text=/close|cerrar/i'
        ];
        for (const s of selectors) {
            try {
                const b = this.page.locator(s).first();
                if (await b.isVisible()) await b.click({ force: true });
            } catch (e) {}
        }
    }

    async searchFor(query: string, lang: string) {
        await this.closePopup(lang);
        
        // Buscamos cualquier input que parezca un buscador por tipo o placeholder
        const inputSelectors = 'input[type="search"], input[placeholder*="Search" i], input[placeholder*="Buscar" i], .search-input';
        let input = this.page.locator(inputSelectors).first();

        if (!await input.isVisible()) {
            const btn = this.page.locator('button[data-id="search"], .search-icon, [aria-label*="search" i]').first();
            if (await btn.isVisible()) {
                await btn.click();
            } else {
                await this.page.keyboard.press('/');
            }
        }
        
        await input.waitFor({ state: 'visible', timeout: 15000 });
        await input.fill(query);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
    }
}