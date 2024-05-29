import Page from "./page.js";

class CheckoutStepTwoPage extends Page {

    get finishButton() {
        return $('#finish');
    }

    get priceTotal() {
        return $('.summary_subtotal_label');
    }

    async getPriceTotalNumericValue() {
        const priceElement = await this.priceTotal
        const priceTextValue = await priceElement.getText();
        return parseFloat(priceTextValue.replace('Item total: $', ''));
    }

    get cartItems() {
        return $$('.cart_list .cart_item');
    }

    async getItemNameByItemIndex(index) {
        const items = await this.cartItems;
        return items[index].$('div.inventory_item_name').getText()
    }

    async getItemPriceByItemIndex(index) {
        const items = await this.cartItems;
        return items[index].$('div.inventory_item_price').getText();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    getUrl() {
        return super.getUrl() + "/checkout-step-two.html";
    }
}

export default new CheckoutStepTwoPage();