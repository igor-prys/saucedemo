import loginPage from '../pageobjects/login.page.js';
import menuComponent from '../pageobjects/menu.component.js';
import { LOGIN_CREDENTIALS } from '../common/data.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Cart', () => {
    it('Saving the card after logout ', async () => {
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        await inventoryPage.clickAddOrRemoveItemToCartButton(1);

        await menuComponent.logout();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);

        expect(await inventoryPage.isCartBadgeDisplayed()).toBe(true);
        expect(await inventoryPage.getCartBadgeValue()).toBe('1');
    })
})

