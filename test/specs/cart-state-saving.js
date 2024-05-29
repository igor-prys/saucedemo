import LoginPage from '../pageobjects/login.page.js';
import MenuComponent from '../pageobjects/menu.component.js';
import { LOGIN_CREDENTIALS } from '../common/data.js'
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Cart', () => {
    it('Saving the card after logout ', async () => {
        await LoginPage.open();
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        await InventoryPage.clickAddOrRemoveItemToCartButton(1);

        await MenuComponent.logout();
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        expect(await InventoryPage.isCartBadgeDisplayed()).toBe(true);
        expect(await InventoryPage.getCartBadgeValue()).toBe('1');
    })
})

