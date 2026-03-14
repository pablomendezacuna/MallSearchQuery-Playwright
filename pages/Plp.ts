import { Page } from '@playwright/test';

export class PlpPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async scrollToBottom() {
        // Smooth scroll to the bottom to trigger lazy-loaded images
        await this.page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                let distance = 100;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve(null);
                    }
                }, 100);
            });
        });
        // Wait for network to settle after scrolling
        await this.page.waitForLoadState('networkidle').catch(() => {});
    }
}