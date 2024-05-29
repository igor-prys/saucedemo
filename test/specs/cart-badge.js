import LoginPage from '../pageobjects/login.page.js';
import { LOGIN_CREDENTIALS } from '../common/data.js'
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Cart', () => {
    it('should update cart badge after adding or removing item in cart', async () => {
        await LoginPage.open();
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        await expect(await InventoryPage.isCartButtonDisplayed()).toBe(true);
        await expect(await InventoryPage.isCartBadgeDisplayed()).toBe(false);

        // add first item to cart
        InventoryPage.clickAddOrRemoveItemToCartButton(1);
        await expect(await InventoryPage.isCartBadgeDisplayed()).toBe(false);
        const cartWithProductValue1 = await InventoryPage.getCartBadgeValue();
        expect(cartWithProductValue1).toBe('1');

        // add new item to cart
        await InventoryPage.clickAddOrRemoveItemToCartButton(2);
        const cartAfterAddingSecondItemValue = await InventoryPage.getCartBadgeValue();
        expect(+cartAfterAddingSecondItemValue).toBe(+cartWithProductValue1 + 1);

        // remove item
        await InventoryPage.clickAddOrRemoveItemToCartButton(2);
        const cartAfterRemovingItemValue = await InventoryPage.getCartBadgeValue();
        expect(+cartAfterRemovingItemValue).toBe(+cartAfterAddingSecondItemValue - 1);

        // remove second item
        await InventoryPage.clickAddOrRemoveItemToCartButton(1);
        await expect(await InventoryPage.isCartBadgeDisplayed()).toBe(false);
    })
})

