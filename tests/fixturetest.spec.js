const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');


//page fixture gives you one ready-to-use page for the test
test('Fixture test and isolated context', async ({page, browser}) =>
{
    //Playwright actions return promises and await prevents timing issues and flaky behavior
    const email = "tejastest@gmail.com";
    const password = "BestQA@2026";
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.Emailbox.fill('beginner@sample.com');
    await expect(loginPage.Emailbox).toHaveValue('beginner@sample.com');

    //browser context is a separate browser session container that can create its own pages
    //a fresh browser context starts with isolated state
    const isolatedContext = await browser.newContext();
    const isolatedPage = await isolatedContext.newPage();
    const emails = "beginner@sample.com";
    await isolatedPage.goto('https://eventhub.rahulshettyacademy.com/login');
    await expect (isolatedPage.getByRole('heading', {name: 'Sign in to EventHub'})).toBeVisible();
    await expect(isolatedPage.locator('input#email')).toHaveValue('');
    await isolatedContext.close();
});