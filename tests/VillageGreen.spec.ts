import {test, expect} from '@playwright/test';

test('Village Green landing page', async ({page}) => {

    //await page.goto(process.env.url!);
    await page.goto('https://www.villagegreencentre.com/shop');
    await page.getByLabel('Search Village Green Shopping Centre').fill('dress');
    await page.getByLabel('Search Village Green Shopping Centre').press('Enter');

    await page.getByRole('combobox', { name: 'Sort By' }).click();
    await page.getByRole('button', { name: 'Price (High to Low)' }).click();

    for (let i =0 ; i < 10; i++) {
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
    }
    await page.getByRole('button', { name: 'close', exact: true }).click();

    await page.screenshot({
    path: 'screenshots/Village Green/mainpage.png',
    fullPage: true
    });
    
    await page.waitForTimeout(12000);

});
