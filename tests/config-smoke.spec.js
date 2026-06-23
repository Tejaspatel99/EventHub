const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');


test('Config Smoke Test', async ({page}) =>
{
    //Playwright actions return promises and await prevents timing issues and flaky behavior
    const email = "tejastest@gmail.com";
    const password = "BestQA@2026";
    const loginPage = new LoginPage(page);
    await page.goto('/login')
    await loginPage.OpenLoginPage(email, password);
    await expect(page).toHaveTitle(/EventHub/i);
    await expect (page.getByPlaceholder("you@email.com")).toBeVisible();
    await expect (page.getByRole("button", {name: 'Sign In'})).toBeVisible();
});