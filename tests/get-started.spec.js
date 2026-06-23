// playwright is the core browser automation library.
// @playwright/test adds the test runner, assertions, fixtures, and test tools.
const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');


test('EventHub login page loads', async ({page}) =>
{
    //Playwright actions return promises and await prevents timing issues and flaky behavior
    const email = "tejastest@gmail.com";
    const password = "BestQA@2026";
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.OpenLoginPage(email, password);
    await expect (page.getByPlaceholder("you@email.com")).toBeVisible();
    await expect (page.getByRole("button", {name: 'Sign In'})).toBeVisible();
});

test('Second Login Page test', async ({page}) =>
{
    const email = "tejastest@gmail.com";
    const password = "BestQA@2026";
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.OpenLoginPage(email, password);
    await expect (page.getByLabel("Password")).toBeVisible();
    await expect(page).toHaveURL(/.*\/login/);
    await expect (page.getByRole("heading",{name: "Sign in to EventHub"})).toBeVisible();
});


