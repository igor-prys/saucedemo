import { LOGIN_CREDENTIALS, login, logout } from '../common/login.js'
import { addOrRemoveItemToCart } from '../common/inventory-items.js'

describe('Cart', () => {
    it('should update cart badge after adding or removing item in cart', async () => {
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // verify the cart without badege
        const cartAmountElement = await $('.shopping_cart_container .shopping_cart_badge');
        await expect(cartAmountElement).not.toBeDisplayed();

        // add first item to cart
        await addOrRemoveItemToCart(1);
        await expect(cartAmountElement).toBeDisplayed();
        const cartWithProductValue1 = await cartAmountElement.getText();
        expect(cartWithProductValue1).toBe('1');

        // add new item to cart
        await addOrRemoveItemToCart(2);
        const cartAfterAddingSecondItemValue = await cartAmountElement.getText();
        expect(+cartAfterAddingSecondItemValue).toBe(+cartWithProductValue1 + 1);

        // remove item
        await addOrRemoveItemToCart(2);
        const cartAfterRemovingItemValue = await cartAmountElement.getText();
        expect(+cartAfterRemovingItemValue).toBe(+cartAfterAddingSecondItemValue - 1);

        // remove second item
        await addOrRemoveItemToCart(1);
        await expect(cartAmountElement).not.toBeDisplayed();
    })
})

