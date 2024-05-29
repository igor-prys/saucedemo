import { expect } from '@wdio/globals'
import { LOGIN_CREDENTIALS } from '../common/data.js'
import MenuComponent from '../pageobjects/menu.component.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import LoginPage from '../pageobjects/login.page.js';
import AboutPage from '../pageobjects/about.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('Menu', () => {
    it('menu should contain all items', async () => {
        // Given
        await LoginPage.open()
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password)

        // When
        await MenuComponent.openMenu();

        // Then
        await expect(MenuComponent.allItemsLink).toBeExisting();
        await expect(MenuComponent.aboutLink).toBeExisting();
        await expect(MenuComponent.logoutLink).toBeExisting();
        await expect(MenuComponent.resetLink).toBeExisting();
    })

    it('should click menu-item About', async () => {
        // Given
        await LoginPage.open()
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password)

        await MenuComponent.openMenu();

        //When
        await MenuComponent.clickAboutLink();

        // Then
        expect(await AboutPage.isOpened()).toBe(true);
        const isButtonDisplayed = await AboutPage.isTestItAllButtinDisplayed();
        expect(isButtonDisplayed).toBe(true);
    })

    it('should click menu-item Reset App State', async () => {
        // Given
        await LoginPage.open()
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password)

        // add item to cart
        await InventoryPage.clickAddOrRemoveItemToCartButton(1);
        expect(await InventoryPage.isCartWithItems()).toBe(true);
        expect(await InventoryPage.getCartBadgeValue()).toBe('1');

        await MenuComponent.openMenu();

        //When
        await MenuComponent.clickResetLink();

        // Then
        expect(await InventoryPage.isCartButtonDisplayed()).toBe(true);
        expect(await InventoryPage.isCartWithItems()).toBe(false);
    })

    it('should click menu-item All Items', async () => {
        // Given
        await LoginPage.open()
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password)

        // Navigate to cart
        await InventoryPage.clickCart();

        expect(await CartPage.isOpened()).toBe(true);
        await MenuComponent.openMenu();

        //When
        await MenuComponent.clickAllItemsLink();

        // Then
        expect(await InventoryPage.isOpened()).toBe(true);
        expect(await InventoryPage.isDisplayed()).toBe(true);
    })
})

