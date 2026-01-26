//Import needed libraries
import {type Locator, type Page} from '@playwright/test';

//Create class
export class MainPage {
    mainpage : Page;
    searchBox : Locator;

    constructor(page: Page) {
        this.mainpage = page;
        this.searchBox = page.getByLabel('Search Village Green Shopping Centre');
    }

    //Create actions
    async SearchProduct(product: string) {
        await this.searchBox.fill(product);
        await this.searchBox.press('Enter');
    }
}

