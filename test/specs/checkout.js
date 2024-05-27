import { expect, $ } from '@wdio/globals'
import { BASE_URL, LOGIN_CREDENTIALS, login } from '../common/login.js'
import { addOrRemoveItemToCart, getItemPrice, getItemTitle } from '../common/inventory-items.js'


describe('Checkout', () => {
    before(async () => {
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);
    });

    it('Valid Checkout', async () => {
        verifyChartIsEmpty();

        // add item to cart
        await addOrRemoveItemToCart(1);
        await addOrRemoveItemToCart(2);

        const inventoryItemName1 = await getItemTitle(1);
        const inventoryItemPrice1 = await getItemPrice(1);
        const inventoryItemName2 = await getItemTitle(2);
        const inventoryItemPrice2 = await getItemPrice(2);

        navigateToCartFromInventoryPage();

        // navigate to checkout page
        const checkoutBtn = await $('#checkout');
        await checkoutBtn.click();
        let currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(BASE_URL + '/checkout-step-one.html');
        const checkoutForm = await browser.$('.checkout_info_wrapper form');
        await expect(checkoutForm).toBeDisplayed();

        // fill out checkout form
        await $('#first-name').setValue("FIRST_NAME");
        await $('#last-name').setValue("LAST_NAME");
        await $('#postal-code').setValue("12-345");
        const checkoutContinueBtn = await $('#continue');
        await checkoutContinueBtn.click();

        // verify checkout overview
        currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(BASE_URL + '/checkout-step-two.html');

        const items = await browser.$$('.cart_list .cart_item');
        const itemName1 = await items[0].$('div.inventory_item_name').getText();
        const itemPrice1 = await items[0].$('div.inventory_item_price').getText();
        const itemName2 = await items[1].$('div.inventory_item_name').getText();
        const itemPrice2 = await items[1].$('div.inventory_item_price').getText();
        expect(items.length).toBe(2);
        expect(itemName1).toBe(inventoryItemName1);
        expect(itemPrice1).toBe(inventoryItemPrice1);
        expect(itemName2).toBe(inventoryItemName2);
        expect(itemPrice2).toBe(inventoryItemPrice2);

        // verifying total price
        const price1 = itemPrice1.substring(1);
        const price2 = itemPrice2.substring(1);
        const expectedTotal = (parseFloat(price1) + parseFloat(price2));
        const totalPriceElement = await browser.$('.summary_subtotal_label');
        const totalPriceText = await totalPriceElement.getText();
        const totalPriceValue = parseFloat(totalPriceText.replace('Item total: $', ''));
        expect(totalPriceValue).toBe(expectedTotal);

        // click 'finish' button
        const checkoutFinishBtn = await $('#finish');
        await checkoutFinishBtn.click();
        currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(BASE_URL + '/checkout-complete.html');
        const completeCheckoutMessage = await $('.complete-header').getText();
        expect(completeCheckoutMessage).toBe('Thank you for your order!');

        // back home
        const backHomeBtn = await $('#back-to-products');
        await backHomeBtn.click();
        currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(BASE_URL + '/inventory.html');
        verifyChartIsEmpty();
        const productListElement = $('.inventory_container .inventory_list');
        await expect(productListElement).toBeDisplayed();
    })

    it('Checkout without products', async () => {
        verifyChartIsEmpty();
        navigateToCartFromInventoryPage();

        // get list of products in cart
        const items = await browser.$$('.cart_list .cart_item');
        expect(items.length).toBe(0);

        // click checkout
        const checkoutBtn = await $('#checkout');
        await checkoutBtn.click();

        // verify user left in the cart page
        let currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(BASE_URL + '/cart.html');

        // search for error message
        const elementWithError = await $('//*[contains(text(), "Cart is empty")]');
        const isErrorElementPresent = await elementWithError.isExisting();
        expect(isErrorElementPresent).toBe(true);
    })

    async function verifyChartIsEmpty() {
        const cartAmountElement = await $('.shopping_cart_container .shopping_cart_badge');
        await expect(cartAmountElement).not.toBeDisplayed();
    }

    async function navigateToCartFromInventoryPage() {
        const cartBtn = await $('.shopping_cart_link');
        await cartBtn.click();
        let currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(BASE_URL + '/cart.html');
    }
})

