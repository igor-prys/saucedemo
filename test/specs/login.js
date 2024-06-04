import { expect } from '@wdio/globals';
import { LOGIN_CREDENTIALS } from '../common/data.js';

import menuComponent from '../pageobjects/menu.component.js';
import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

const ERROR_MESSAGES = {
    loginError: "Epic sadface: Username and password do not match any user in this service",
    usernameRequires: "Epic sadface: Username is required",
    passwordRequires: "Epic sadface: Password is required"
}

describe('Login in', () => {
    it('should login with valid credentials', async () => {
        // Given
        await loginPage.open();

        // When
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // Then
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(inventoryPage.getUrl());

        const isinventoryPageDisplayed = await inventoryPage.isDisplayed();
        expect(isinventoryPageDisplayed).toBe(true);
    })

    it('login with invalid password', async () => {
        // Given
        await loginPage.open();

        // When
        await loginPage.login(LOGIN_CREDENTIALS.login, 'INVALID_PASSWORD');

        // Then
        expect(await loginPage.isErrorDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe(ERROR_MESSAGES.loginError);
        expect(await loginPage.isPasswordMarkedInvalid()).toBe(true);
        expect(await loginPage.isUsernameMarkedInvalid()).toBe(true);
    })

    it('login with invalid username', async () => {
        // Given
        await loginPage.open();

        // When
        await loginPage.login('INVALID_USERNAME', LOGIN_CREDENTIALS.password);

        // Then
        await expect(await loginPage.isErrorDisplayed()).toBe(true);
        await expect(await loginPage.getErrorMessage()).toBe(ERROR_MESSAGES.loginError);
        await expect(await loginPage.isPasswordMarkedInvalid()).toBe(true);
        await expect(await loginPage.isUsernameMarkedInvalid()).toBe(true);
    })

    it('login without username', async () => {
        // Given
        await loginPage.open();

        // When
        await loginPage.login('', LOGIN_CREDENTIALS.password);

        // Then
        await expect(await loginPage.isErrorDisplayed()).toBe(true);
        await expect(await loginPage.getErrorMessage()).toBe(ERROR_MESSAGES.usernameRequires);
        await expect(await loginPage.isPasswordMarkedInvalid()).toBe(true);
        await expect(await loginPage.isUsernameMarkedInvalid()).toBe(true);
    })

    it('login without password', async () => {
        // Given
        await loginPage.open();

        // When
        await loginPage.login(LOGIN_CREDENTIALS.login, '');

        // Then
        await expect(await loginPage.isErrorDisplayed()).toBe(true);
        await expect(await loginPage.getErrorMessage()).toBe(ERROR_MESSAGES.passwordRequires);
        await expect(await loginPage.isPasswordMarkedInvalid()).toBe(true);
        await expect(await loginPage.isUsernameMarkedInvalid()).toBe(true);
    })

    it('should logout successfully', async () => {
        // Given
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // When
        await menuComponent.logout();

        // Then
        expect(await loginPage.isOpened()).toBe(true);
    })
})

