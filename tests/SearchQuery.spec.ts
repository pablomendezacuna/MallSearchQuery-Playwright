    import {test} from '@playwright/test';
    import {MainPage} from '../pages/Main_Page.ts';
    import {PLP} from '../pages/PLP.ts';

    test('Search a seasonal query', async ({page}) => {
        const mainpage = new MainPage(page);
        const plp = new PLP(page);

        await page.goto('https://www.villagegreencentre.com/shop');
        await mainpage.SearchProduct('dress');

        await plp.ClosePopup();
        await plp.ScrollToBottom();
        await plp.ClosePopup();
        await plp.TakeScreenshot();
        
        await plp.ClosePopup();
        await plp.SortHighToLow();
        await plp.sortByHighToLowButton.isVisible();
        await plp.ScrollToBottom();
        await plp.ClosePopup();
        await plp.TakeScreenshot();
        
        await plp.ClosePopup();
        await plp.SortLowToHigh();
        await plp.sortByLowToHighButton.isVisible();
        await plp.ScrollToBottom();
        await plp.ClosePopup();
        await plp.TakeScreenshot();

    })