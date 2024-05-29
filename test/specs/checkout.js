import LoginPage from '../pageobjects/login.page.js';
import { expect } from '@wdio/globals';
import { LOGIN_CREDENTIALS } from '../common/data.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutStepOnePage from '../pageobjects/checkout-step-one.page.js';
import CheckoutStepTwoPage from '../pageobjects/checkout-step-two.page.js';
import CheckoutCompletePage from '../pageobjects/checkout-complete.page.js';

describe('Checkout', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);
    });

    it('Valid Checkout', async () => {
        expect(await InventoryPage.isCartButtonDisplayed()).toBe(true);
        expect(await InventoryPage.isCartBadgeDisplayed()).toBe(false);

        // add items to cart
        await InventoryPage.clickAddOrRemoveItemToCartButton(1);
        await InventoryPage.clickAddOrRemoveItemToCartButton(2);

        const inventoryItemName1 = await InventoryPage.getItemTitle(1);
        const inventoryItemPrice1 = await InventoryPage.getItemPrice(1);
        const inventoryItemName2 = await InventoryPage.getItemTitle(2);
        const inventoryItemPrice2 = await InventoryPage.getItemPrice(2);

        await InventoryPage.clickCart();
        expect(await CartPage.isOpened()).toBe(true);

        // navigate to checkout page
        await CartPage.clickCheckoutButton();
        expect(await CheckoutStepOnePage.isOpened()).toBe(true);
        await expect(await CheckoutStepOnePage.isCheckoutFormdIsDisplayed()).toBe(true);
        await CheckoutStepOnePage.filoutCheckoutFormAndSend("FIRST_NAME", "LAST_NAME", "12-345");

        // verify checkout overview
        expect(await CheckoutStepTwoPage.isOpened()).toBe(true)

        const items = await CheckoutStepTwoPage.cartItems;
        const itemName1 = await CheckoutStepTwoPage.getItemNameByItemIndex(0);
        const itemPrice1 = await CheckoutStepTwoPage.getItemPriceByItemIndex(0);
        const itemName2 = await CheckoutStepTwoPage.getItemNameByItemIndex(1);
        const itemPrice2 = await CheckoutStepTwoPage.getItemPriceByItemIndex(1);
        expect(items.length).toBe(2);
        expect(itemName1).toBe(inventoryItemName1);
        expect(itemPrice1).toBe(inventoryItemPrice1);
        expect(itemName2).toBe(inventoryItemName2);
        expect(itemPrice2).toBe(inventoryItemPrice2);

        // verifying total price
        const price1 = itemPrice1.substring(1);
        const price2 = itemPrice2.substring(1);
        const expectedTotal = (parseFloat(price1) + parseFloat(price2));
        const totalPrice = await CheckoutStepTwoPage.getPriceTotalNumericValue();
        expect(totalPrice).toBe(expectedTotal);

        await CheckoutStepTwoPage.clickFinishButton();
        expect(await CheckoutCompletePage.isOpened()).toBe(true);
        const completeCheckoutMessage = await CheckoutCompletePage.getCompleteHeaderValue();
        expect(completeCheckoutMessage).toBe('Thank you for your order!');

        // back home
        await CheckoutCompletePage.clickBackHomeButton();
        expect(await InventoryPage.isOpened()).toBe(true);
        expect(await InventoryPage.isProductListDisplayed()).toBe(true);
        expect(await InventoryPage.isCartButtonDisplayed()).toBe(true);
        expect(await InventoryPage.isCartBadgeDisplayed()).toBe(false);
    })

    it('Checkout without products', async () => {
        // verify cart is present and empty
        expect(await InventoryPage.isCartButtonDisplayed()).toBe(true);
        expect(await InventoryPage.isCartBadgeDisplayed()).toBe(false);

        // navigate to cart
        await InventoryPage.clickCart();
        expect(await CartPage.isOpened()).toBe(true);

        // get list of products in cart
        const amountOfItems = await CartPage.getAmoutOfItems();
        expect(amountOfItems).toBe(0);

        // click checkout
        await CartPage.clickCheckoutButton();

        // verify user left in the cart page
        expect(await CartPage.isOpened()).toBe(true);

        // search for error message
        expect(await CartPage.isEmptyCartErrorDisplayed()).toBe(true);
    })
})

