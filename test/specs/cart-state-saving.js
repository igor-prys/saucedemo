import { LOGIN_CREDENTIALS, login, logout } from '../common/login.js'
import { addOrRemoveItemToCart } from '../common/inventory-items.js'

describe('Cart', () => {
    it('Saving the card after logout ', async () => {
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        // add item to cart
        await addOrRemoveItemToCart(1);

        await logout();
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        const cartAmountElement = await $('.shopping_cart_container .shopping_cart_badge');
        await expect(cartAmountElement).toBeDisplayed();
        const cartValue = await cartAmountElement.getText();
        expect(cartValue).toBe('1');
    })
})

