class LoginPage{

    constructor(page)
    {
        this.page= page;
        this.signInbutton= page.locator("button#login-btn");
        this.Emailbox= page.locator("input#email");
        this.Passfield= page.locator("input#password");
    }

    async goTo()
    {
        await this.page.goto("/login");
    }

   async OpenLoginPage(email,password)
    {
        await this.Emailbox.fill(email);
        await this.Passfield.fill(password);
        await this.signInbutton.click();
    }
}
module.exports = {LoginPage};