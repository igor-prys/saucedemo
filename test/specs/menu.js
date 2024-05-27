import { expect, $ } from '@wdio/globals'
import { BASE_URL, LOGIN_CREDENTIALS, login } from '../common/login.js'
import { addOrRemoveItemToCart } from '../common/inventory-items.js'

describe('Menu', () => {
    it('menu should contain all items', async () => {
        // Given
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // When
        await openMenu();

        // Then
        await expect($('#inventory_sidebar_link')).toBeExisting();
        await expect($('#about_sidebar_link')).toBeExisting();
        await expect($('#logout_sidebar_link')).toBeExisting();
        await expect($('#reset_sidebar_link')).toBeExisting();
    })

    it('should click menu-item About', async () => {
        // Given
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        await openMenu();
        const aboutLinkElement = await $('#about_sidebar_link');

        //When
        await aboutLinkElement.click();

        // Then
        let currentUrl = await browser.getUrl();
        expect(currentUrl).toBe('https://saucelabs.com/');
        const button = await $('button=Test it all. Free');
        const isButtonDisplayed = await button.isDisplayed();
        expect(isButtonDisplayed).toBe(true);
    })

    it('should click menu-item Reset App State', async () => {
        // Given
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // add item to cart
        const cartAmountElement = await $('.shopping_cart_container .shopping_cart_badge');
        await addOrRemoveItemToCart(1);
        await expect(cartAmountElement).toBeDisplayed();
        const cartWithProductValue1 = await cartAmountElement.getText();
        expect(cartWithProductValue1).toBe('1');

        await openMenu();

        const resetLinkElement = await $('#reset_sidebar_link');

        //When
        await resetLinkElement.click();

        // Then
        await expect($('.shopping_cart_link')).toBeExisting();
        await expect(cartAmountElement).not.toBeDisplayed();
    })

    it('should click menu-item All Items', async () => {
        // Given
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // Navigate to cart
        const cartBtn = await $('.shopping_cart_link');
        await cartBtn.click();
        let currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(BASE_URL + '/cart.html');

        await openMenu();

        const allItemsLinkElement = await $('#inventory_sidebar_link');

        //When
        await allItemsLinkElement.click();

        // Then
        currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(BASE_URL + '/inventory.html');
        await expect($('#inventory_container')).toBeExisting();
    })


    async function openMenu() {
        const menuElement = await $('#react-burger-menu-btn');
        const isMenuVisible = await menuElement.isDisplayed();
        expect(isMenuVisible).toBe(true);
        await menuElement.click();
    }
})

