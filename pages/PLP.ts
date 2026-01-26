import {type Locator, type Page} from '@playwright/test';

export class PLP {
    page : Page;
    searchBox : Locator;
    sortByDropdown : Locator;
    sortByHighToLowButton : Locator;
    sortByLowToHighButton : Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByRole('textbox', { name: 'Search Village Green Shopping' })
        this.sortByDropdown = page.getByRole('combobox', { name: 'Sort By' });
        this.sortByHighToLowButton = page.getByRole('button', { name: 'Price (High to Low)' });
        this.sortByLowToHighButton = page.getByRole('button', { name: 'Price (Low to High)' });

    }

    async SortLowToHigh() {
        await this.sortByDropdown.click();
        await this.sortByLowToHighButton.click();
    }

    async SortHighToLow() {
        await this.sortByDropdown.click();
        await this.sortByHighToLowButton.click();
    }

    async ScrollToBottom () {
        for (let i =0 ; i<10 ; i++) {
            await this.page.mouse.wheel(0,500);
            await this.page.waitForTimeout(1000);
        }  
    }

    async ClosePopup() {
        if (await this.page.locator('.GiftCardModal_container__nshU_').isVisible()) {
            await this.page.getByRole('button', { name: 'close', exact: true }).click();
        }
    }

    async TakeScreenshot() {
        await this.page.screenshot({
            path: `screenshots/Village Green/QueryQa-${Date.now()}.png`,
            fullPage: true
        });
    }
        
    
}