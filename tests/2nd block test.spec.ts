import {test , expect} from '@playwright/test';

test('learning locators', async ({page}) => {

    await page.goto('https://the-internet.herokuapp.com/login');

    //locators
    const username = await page.getByRole('textbox', {name: /username/i});
    const password = await page.locator('#password');
    const loginButton = await page.getByRole('button', {name: /login/i});
    const message = await page.getByText('You logged into a secure area');

    //actions
    await username.fill('tomsmith');
    await password.fill('SuperSecretPassword!');
    await loginButton.click()

    //assertions
    await expect(message).toBeVisible();
})