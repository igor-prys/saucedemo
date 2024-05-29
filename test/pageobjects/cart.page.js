import Page from "./page.js";

class CartPage extends Page {
    get itemList() {
        return $$('.cart_list .cart_item')
    }

    get checkoutButton() {
        return $('#checkout');
    }

    get emptyCartError() {
        return $('//*[contains(text(), "Cart is empty")]');
    }

    isEmptyCartErrorDisplayed() {
        return this.emptyCartError.isDisplayed();
    }

    async getAmoutOfItems() {
        return await this.itemList.length
    }

    async clickCheckoutButton() {
        const checkoutBtn = await this.checkoutButton;
        await checkoutBtn.click()
    }

    getUrl() {
        return super.getUrl() + '/cart.html';
    }

}

export default new CartPage();