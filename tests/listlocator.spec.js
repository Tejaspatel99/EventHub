const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const { GetEventCardsPage } = require('../pageobjects/GetEventCardsPage');


test('List locator strategies test', async ({page}) =>
{
    const email = "tejastest@gmail.com";
    const password = "BestQA@2026";

    const loginPage = new LoginPage(page);
    const eventspage = new GetEventCardsPage(page);

    await loginPage.goTo();
    await loginPage.OpenLoginPage(email, password);

    await eventspage.openeventpage();
    await expect(page).toHaveURL(/.*\/events/);
    await expect(eventspage.eventheading).toBeVisible();

    const eventcardslist = eventspage.geteventcard();
    await expect(eventcardslist.first()).toBeVisible();

    const totalcardnumber = await eventcardslist.count();
    expect(totalcardnumber).toBeGreaterThanOrEqual(1);

    const desiredcard = eventspage.Haveeventcard("World Tech Summit");

    await expect(desiredcard).toHaveCount(1);
    await expect(desiredcard).toBeVisible();

    const eventtitlename = await desiredcard.getByRole('heading', { name: 'World Tech Summit'}).textContent();
    const eventprice = await desiredcard.getByText('$1,500').textContent();
    const eventseattext = await desiredcard.getByText(/seats left/i).textContent();

    expect(eventtitlename.trim()).toBe('World Tech Summit');
    expect(eventprice).toContain('$');

    const seatCount = parseSeatCount(eventseattext);
    expect(seatCount).toBeGreaterThan(0);

    function parseSeatCount(text) {
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }

    await desiredcard.getByRole('link', { name: 'Book Now'}).click();
    await expect(page).toHaveURL(/.*\/events/);
    await expect(page.getByRole('heading', {level: 1})).toHaveText(eventtitlename.trim());
    await expect(page.getByText(eventprice.trim()).first()).toBeVisible();

    await Promise.all([
        page.waitForURL(/.*\/events/),
        page.getByTestId('nav-events').click()
    ]);
    await expect(eventcardslist.first()).toBeVisible();

    const totalcardnumberAfterReset = await eventcardslist.count();
    expect(totalcardnumberAfterReset).toBeGreaterThanOrEqual(3);

    const firstTitle = await eventcardslist.first().getByRole('heading').textContent();
    const secondTitle = await eventcardslist.nth(2).getByRole('heading').textContent();
    const thirdTitle = await eventcardslist.nth(1).getByRole('heading').textContent();
    const lastTitle = await eventcardslist.last().getByRole('heading').textContent();
    expect(firstTitle.trim()).not.toBe('');
    expect(secondTitle.trim()).not.toBe('');
    expect(thirdTitle.trim()).not.toBe('');
    expect(firstTitle.trim()).not.toBe(lastTitle.trim());
    
});