class GetEventCardsPage
{
    constructor(page)
    {
        this.page = page;
        this.browsereventlink = page.getByRole('link', { name: 'Browse Events', exact: true }).first();
        this.eventheading = page.getByRole('heading', { name: 'Upcoming Events'});
        this.alleventcard = page.getByTestId('event-card');
    }

    async openeventpage(){
        await Promise.all([
            this.page.waitForURL(/.*\/events/),
            this.browsereventlink.click()
        ]);
    }

    geteventcard()
    {
        return this.alleventcard;
    }

    Haveeventcard(eventname)
    {
        return this.alleventcard.filter({ hasText: eventname });
    }

}
module.exports = { GetEventCardsPage };