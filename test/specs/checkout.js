import loginPage from '../pageobjects/login.page.js';
import { expect } from '@wdio/globals';
import { LOGIN_CREDENTIALS } from '../common/data.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutStepOnePage from '../pageobjects/checkout-step-one.page.js';
import checkoutStepTwoPage from '../pageobjects/checkout-step-two.page.js';
import checkoutCompletePage from '../pageobjects/checkout-complete.page.js';

describe('Checkout', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);
    });

    it('Valid Checkout', async () => {
        expect(await inventoryPage.isCartButtonDisplayed()).toBe(true);
        expect(await inventoryPage.isCartBadgeDisplayed()).toBe(false);

        // add items to cart
        await inventoryPage.clickAddOrRemoveItemToCartButton(1);
        await inventoryPage.clickAddOrRemoveItemToCartButton(2);

        const inventoryItemName1 = await inventoryPage.getItemTitle(1);
        const inventoryItemPrice1 = await inventoryPage.getItemPrice(1);
        const inventoryItemName2 = await inventoryPage.getItemTitle(2);
        const inventoryItemPrice2 = await inventoryPage.getItemPrice(2);

        await inventoryPage.clickCart();
        expect(await cartPage.isOpened()).toBe(true);

        // navigate to checkout page
        await cartPage.clickCheckoutButton();
        expect(await checkoutStepOnePage.isOpened()).toBe(true);
        await expect(await checkoutStepOnePage.isCheckoutFormdIsDisplayed()).toBe(true);
        await checkoutStepOnePage.filoutCheckoutFormAndSend("FIRST_NAME", "LAST_NAME", "12-345");

        // verify checkout overview
        expect(await checkoutStepTwoPage.isOpened()).toBe(true)

        const items = await checkoutStepTwoPage.cartItems;
        const itemName1 = await checkoutStepTwoPage.getItemNameByItemIndex(0);
        const itemPrice1 = await checkoutStepTwoPage.getItemPriceByItemIndex(0);
        const itemName2 = await checkoutStepTwoPage.getItemNameByItemIndex(1);
        const itemPrice2 = await checkoutStepTwoPage.getItemPriceByItemIndex(1);
        expect(items.length).toBe(2);
        expect(itemName1).toBe(inventoryItemName1);
        expect(itemPrice1).toBe(inventoryItemPrice1);
        expect(itemName2).toBe(inventoryItemName2);
        expect(itemPrice2).toBe(inventoryItemPrice2);

        // verifying total price
        const price1 = itemPrice1.substring(1);
        const price2 = itemPrice2.substring(1);
        const expectedTotal = (parseFloat(price1) + parseFloat(price2));
        const totalPrice = await checkoutStepTwoPage.getPriceTotalNumericValue();
        expect(totalPrice).toBe(expectedTotal);

        await checkoutStepTwoPage.clickFinishButton();
        expect(await checkoutCompletePage.isOpened()).toBe(true);
        const completeCheckoutMessage = await checkoutCompletePage.getCompleteHeaderValue();
        expect(completeCheckoutMessage).toBe('Thank you for your order!');

        // back home
        await checkoutCompletePage.clickBackHomeButton();
        expect(await inventoryPage.isOpened()).toBe(true);
        expect(await inventoryPage.isProductListDisplayed()).toBe(true);
        expect(await inventoryPage.isCartButtonDisplayed()).toBe(true);
        expect(await inventoryPage.isCartBadgeDisplayed()).toBe(false);
    })

    it('Checkout without products', async () => {
        // verify cart is present and empty
        expect(await inventoryPage.isCartButtonDisplayed()).toBe(true);
        expect(await inventoryPage.isCartBadgeDisplayed()).toBe(false);

        // navigate to cart
        await inventoryPage.clickCart();
        expect(await cartPage.isOpened()).toBe(true);

        // get list of products in cart
        const amountOfItems = await cartPage.getAmoutOfItems();
        expect(amountOfItems).toBe(0);

        // click checkout
        await cartPage.clickCheckoutButton();

        // verify user left in the cart page
        expect(await cartPage.isOpened()).toBe(true);

        // search for error message
        expect(await cartPage.isEmptyCartErrorDisplayed()).toBe(true);
    })
})

