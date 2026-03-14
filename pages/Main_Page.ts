import { Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        // Wait until network is idle to ensure the page is fully loaded
        await this.page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    }

    async closePopup(lang: string) {
        // Common selectors for closing modal popups
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
            } catch (e) {
                // Ignore errors if popup is not found
            }
        }
    }

    async searchFor(query: string, lang: string) {
        await this.closePopup(lang);
        
        const inputSelectors = 'input[type="search"], input[placeholder*="Search" i], input[placeholder*="Buscar" i], .search-input';
        let input = this.page.locator(inputSelectors).first();

        // If search input is hidden, try to click the search button first
        if (!await input.isVisible()) {
            const btn = this.page.locator('button[data-id="search"], .search-icon, [aria-label*="search" i]').first();
            if (await btn.isVisible()) {
                await btn.click();
            } else {
                // Shortcut to open search if no button is found
                await this.page.keyboard.press('/');
            }
        }
        
        // Wait for input to be ready, fill it, and press Enter
        await input.waitFor({ state: 'visible', timeout: 15000 });
        await input.fill(query);
        await this.page.keyboard.press('Enter');
        
        // Wait for the results page to load
        await this.page.waitForLoadState('domcontentloaded');
    }
}