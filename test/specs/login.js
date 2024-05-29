import { expect } from '@wdio/globals';
import { LOGIN_CREDENTIALS } from '../common/data.js';

import MenuComponent from '../pageobjects/menu.component.js';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

const ERROR_MESSAGES = {
    loginError: "Epic sadface: Username and password do not match any user in this service",
    usernameRequires: "Epic sadface: Username is required",
    passwordRequires: "Epic sadface: Password is required"
}

describe('Login in', () => {
    it('should login with valid credentials', async () => {
        // Given
        await LoginPage.open();

        // When
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // Then
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(InventoryPage.getUrl());

        const isInventoryPageDisplayed = await InventoryPage.isDisplayed();
        expect(isInventoryPageDisplayed).toBe(true);
    })

    it('login with invalid password', async () => {
        // Given
        await LoginPage.open();

        // When
        await LoginPage.login(LOGIN_CREDENTIALS.login, 'INVALID_PASSWORD');

        // Then
        expect(await LoginPage.isErrorDisplayed()).toBe(true);
        expect(await LoginPage.getErrorMessage()).toBe(ERROR_MESSAGES.loginError);
        expect(await LoginPage.isPasswordMarkedInvalid()).toBe(true);
        expect(await LoginPage.isUsernameMarkedInvalid()).toBe(true);
    })

    it('login with invalid username', async () => {
        // Given
        await LoginPage.open();

        // When
        await LoginPage.login('INVALID_USERNAME', LOGIN_CREDENTIALS.password);

        // Then
        await expect(await LoginPage.isErrorDisplayed()).toBe(true);
        await expect(await LoginPage.getErrorMessage()).toBe(ERROR_MESSAGES.loginError);
        await expect(await LoginPage.isPasswordMarkedInvalid()).toBe(true);
        await expect(await LoginPage.isUsernameMarkedInvalid()).toBe(true);
    })

    it('login without username', async () => {
        // Given
        await LoginPage.open();

        // When
        await LoginPage.login('', LOGIN_CREDENTIALS.password);

        // Then
        await expect(await LoginPage.isErrorDisplayed()).toBe(true);
        await expect(await LoginPage.getErrorMessage()).toBe(ERROR_MESSAGES.usernameRequires);
        await expect(await LoginPage.isPasswordMarkedInvalid()).toBe(true);
        await expect(await LoginPage.isUsernameMarkedInvalid()).toBe(true);
    })

    it('login without password', async () => {
        // Given
        await LoginPage.open();

        // When
        await LoginPage.login(LOGIN_CREDENTIALS.login, '');

        // Then
        await expect(await LoginPage.isErrorDisplayed()).toBe(true);
        await expect(await LoginPage.getErrorMessage()).toBe(ERROR_MESSAGES.passwordRequires);
        await expect(await LoginPage.isPasswordMarkedInvalid()).toBe(true);
        await expect(await LoginPage.isUsernameMarkedInvalid()).toBe(true);
    })

    it('should logout successfully', async () => {
        // Given
        await LoginPage.open();
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // When
        await MenuComponent.logout();

        // Then
        expect(await LoginPage.isOpened()).toBe(true);
    })
})

