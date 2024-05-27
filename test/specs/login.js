import { expect, browser, $ } from '@wdio/globals'
import { BASE_URL, LOGIN_CREDENTIALS, login, logout } from '../common/login.js'


const ERROR_MESSAGES = {
    loginError: "Epic sadface: Username and password do not match any user in this service",
    usernameRequires: "Epic sadface: Username is required",
    passwordRequires: "Epic sadface: Password is required"
}


describe('Login in', () => {
    it('should login with valid credentials', async () => {
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // await browser.pause(3000)

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(BASE_URL + '/inventory.html');

        const cartElement = await $('#shopping_cart_container');
        const isCartElemetDisplayed = await cartElement.isDisplayed();
        expect(isCartElemetDisplayed).toBe(true);

        const isInventoryDisplayed = await $('#inventory_container').isDisplayed();
        expect(isInventoryDisplayed).toBe(true);

        const isProductsHeaderDisplayed = await $('.header_secondary_container').isDisplayed();
        expect(isProductsHeaderDisplayed).toBe(true);
    })

    it('login with invalid password', async () => {
        await login(LOGIN_CREDENTIALS.login, "invalidPassword");

        // When
        await $('input[type="submit"]').click();

        // Then
        await verifyLoginValidationErrors(ERROR_MESSAGES.loginError);
    })

    it('login with invalid username', async () => {
        // When
        await login('invalid_user', LOGIN_CREDENTIALS.password);

        // Then
        await verifyLoginValidationErrors(ERROR_MESSAGES.loginError);
    })

    it('login without username', async () => {
        // When
        await login('', LOGIN_CREDENTIALS.password);

        // Then
        await verifyLoginValidationErrors(ERROR_MESSAGES.usernameRequires);
    })

    it('login without password', async () => {
        // When
        await login(LOGIN_CREDENTIALS.login, '');

        // When
        await $('input[type="submit"]').click();

        // Then
        await verifyLoginValidationErrors(ERROR_MESSAGES.passwordRequires);
    })


    it('should logout successfully', async () => {
        // Given
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // When
        await logout();

        // Then
        let currentUrl = await browser.getUrl();
        if (currentUrl.endsWith("/")) {
            currentUrl = currentUrl.slice(0, -1);
        }
        expect(currentUrl).toBe(BASE_URL);
    })

    async function verifyLoginValidationErrors(errorMessage) {
        const errorContainer = await $('.error-message-container.error');
        const isErrorDisplayedAfterLogin = await errorContainer.isDisplayed();
        expect(isErrorDisplayedAfterLogin).toBe(true);

        const errorMessageElement = await $('[data-test="error"]');
        const errorMessageText = await errorMessageElement.getText();
        expect(errorMessageText).toBe(errorMessage);

        await expect($('#user-name.error')).toBeExisting();
        await expect($('#password.error')).toBeExisting();

        const usernameElement = await $("#user-name");
        await verifyInputValidationErrors(usernameElement);

        const passwordElement = await $("#password");
        await verifyInputValidationErrors(passwordElement);
    }

    async function verifyInputValidationErrors(el) {
        const elContainer = await el.parentElement();
        const crossIcon = await elContainer.$('svg.error_icon');
        await expect(crossIcon).toBeExisting();
    }
})

