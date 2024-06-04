import loginPage from '../pageobjects/login.page.js';
import { LOGIN_CREDENTIALS } from '../common/data.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Cart', () => {
    it('should update cart badge after adding or removing item in cart', async () => {
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        await expect(await inventoryPage.isCartButtonDisplayed()).toBe(true);
        await expect(await inventoryPage.isCartBadgeDisplayed()).toBe(false);

        // add first item to cart
        inventoryPage.clickAddOrRemoveItemToCartButton(1);
        await expect(await inventoryPage.isCartBadgeDisplayed()).toBe(false);
        const cartWithProductValue1 = await inventoryPage.getCartBadgeValue();
        expect(cartWithProductValue1).toBe('1');

        // add new item to cart
        await inventoryPage.clickAddOrRemoveItemToCartButton(2);
        const cartAfterAddingSecondItemValue = await inventoryPage.getCartBadgeValue();
        expect(+cartAfterAddingSecondItemValue).toBe(+cartWithProductValue1 + 1);

        // remove item
        await inventoryPage.clickAddOrRemoveItemToCartButton(2);
        const cartAfterRemovingItemValue = await inventoryPage.getCartBadgeValue();
        expect(+cartAfterRemovingItemValue).toBe(+cartAfterAddingSecondItemValue - 1);

        // remove second item
        await inventoryPage.clickAddOrRemoveItemToCartButton(1);
        await expect(await inventoryPage.isCartBadgeDisplayed()).toBe(false);
    })
})

