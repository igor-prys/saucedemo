import { expect, browser, $ } from '@wdio/globals'

export const BASE_URL = "https://www.saucedemo.com"
export const LOGIN_CREDENTIALS = {
    login: "standard_user",
    password: "secret_sauce"
}

export async function logout() {
    const menuElement = await $('#react-burger-menu-btn');
    const isMenuVisible = await menuElement.isDisplayed();
    expect(isMenuVisible).toBe(true);
    await menuElement.click();

    const logoutButton = await $("#logout_sidebar_link");

    const errorContainer = await $('.error-message-container.error');
    const isLogoutButtonDisplayed = await errorContainer.isDisplayed();
    expect(isLogoutButtonDisplayed).toBe(false);
    await logoutButton.click();
}

export async function login(username, password) {
    await browser.url(BASE_URL);
    const errorContainer = await $('.error-message-container.error');
    const isErrorDisplayedBeforeLogin = await errorContainer.isDisplayed();
    expect(isErrorDisplayedBeforeLogin).toBe(false);
    await expect($('#user-name.error')).not.toBeExisting();
    await expect($('#password.error')).not.toBeExisting();

    await $('#user-name').setValue(username);
    await $('#password').setValue(password);
    await $('input[type="submit"]').click();
}

