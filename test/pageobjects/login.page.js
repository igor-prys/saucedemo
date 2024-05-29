import Page from './page.js';

class LoginPage extends Page {
    get username() {
        return $('#user-name');
    }

    get password() {
        return $('#password');
    }

    get loginButton() {
        return $('#login-button');
    }

    get errorContainer() {
        return $('.error-message-container.error');
    }

    async login(username, password) {
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorContainer.getText();
    }

    async isErrorDisplayed() {
        return await this.errorContainer.isDisplayed();
    }

    async isUsernameMarkedInvalid() {
        const usernameErrorStyle = await $('#user-name.error');
        const isUsernameMarkedInvalid = await usernameErrorStyle.isDisplayed();

        const isErrorIconDisplayed = await this.isCrossIconDisplayed(this.username)
        return isErrorIconDisplayed && isUsernameMarkedInvalid
    }

    async isPasswordMarkedInvalid() {
        const passwordErrorStyle = await $('#password.error');
        const isPasswordMarkedInvalid = await passwordErrorStyle.isDisplayed();

        const isErrorIconDisplayed = await this.isCrossIconDisplayed(this.password)
        return isErrorIconDisplayed && isPasswordMarkedInvalid
    }

    async getCrossIconOfElement(element) {
        const container = await element.parentElement();
        return container.$('svg.error_icon');
    }

    async isCrossIconDisplayed(element) {
        const crossIcon = await this.getCrossIconOfElement(element)
        return crossIcon.isDisplayed()
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    getUrl() {
        return super.getUrl();
    }
}

export default new LoginPage();