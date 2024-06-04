import { expect } from '@wdio/globals';
import { LOGIN_CREDENTIALS } from '../common/data.js';
import menuComponent from '../pageobjects/menu.component.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import loginPage from '../pageobjects/login.page.js';
import aboutPage from '../pageobjects/about.page.js';
import cartPage from '../pageobjects/cart.page.js';

describe('Menu', () => {
    it('menu should contain all items', async () => {
        // Given
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // When
        await menuComponent.openMenu();

        // Then
        await expect(menuComponent.allItemsLink).toBeExisting();
        await expect(menuComponent.aboutLink).toBeExisting();
        await expect(menuComponent.logoutLink).toBeExisting();
        await expect(menuComponent.resetLink).toBeExisting();
    })

    it('should click menu-item About', async () => {
        // Given
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        await menuComponent.openMenu();

        //When
        await menuComponent.clickAboutLink();

        // Then
        expect(await aboutPage.isOpened()).toBe(true);
        const isButtonDisplayed = await aboutPage.isTestItAllButtinDisplayed();
        expect(isButtonDisplayed).toBe(true);
    })

    it('should click menu-item Reset App State', async () => {
        // Given
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // add item to cart
        await inventoryPage.clickAddOrRemoveItemToCartButton(1);
        expect(await inventoryPage.isCartWithItems()).toBe(true);
        expect(await inventoryPage.getCartBadgeValue()).toBe('1');

        await menuComponent.openMenu();

        //When
        await menuComponent.clickResetLink();

        // Then
        expect(await inventoryPage.isCartButtonDisplayed()).toBe(true);
        expect(await inventoryPage.isCartWithItems()).toBe(false);
    })

    it('should click menu-item All Items', async () => {
        // Given
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // Navigate to cart
        await inventoryPage.clickCart();

        expect(await cartPage.isOpened()).toBe(true);
        await menuComponent.openMenu();

        //When
        await menuComponent.clickAllItemsLink();

        // Then
        expect(await inventoryPage.isOpened()).toBe(true);
        expect(await inventoryPage.isDisplayed()).toBe(true);
    })
})

