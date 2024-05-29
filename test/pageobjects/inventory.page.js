import Page from "./page.js";

class InventoryPage extends Page {
    get cartElement() {
        return $('#shopping_cart_container');
    }
    get cartButton() {
        return $('.shopping_cart_link');
    }
    get cartBadge() {
        return $('.shopping_cart_container .shopping_cart_badge');
    }
    get inventoryContainer() {
        return $('#inventory_container');
    }
    get productsHeader() {
        return $('.header_secondary_container');
    }

    get productList() {
        return $('.inventory_container .inventory_list');
    }

    get pricesOfItems() {
        return $$('.inventory_item_price');
    }

    get namesOfItems() {
        return $$('.inventory_item_name');
    }

    get sortingElement() {
        return $('.product_sort_container')
    }

    isProductListDisplayed() {
        return this.productList.isDisplayed();
    }

    isCartButtonDisplayed() {
        return this.cartButton.isDisplayed();
    }

    async isCartBadgeDisplayed() {
        const badge = await this.cartBadge;
        return badge.isDisplayed();
    }

    isCartWithItems() {
        return this.isCartBadgeDisplayed();
    }

    getCartBadgeValue() {
        return this.cartBadge.getText();
    }

    async clickCart() {
        await this.cartButton.click();
    }

    async isDisplayed() {
        const cartDisplayed = await this.cartElement.isDisplayed();
        const inventoryDisplayed = await this.inventoryContainer.isDisplayed();
        const productsHeaderDisplayed = await this.productsHeader.isDisplayed();

        return cartDisplayed && inventoryDisplayed && productsHeaderDisplayed;
    }

    /**
    * overwrite specific options to adapt it to page object
    */
    getUrl() {
        return super.getUrl() + '/inventory.html';
    }

    /**
     *  
     * @param {number=} itemIndex min value is 1. If item already added it will be removed.
     */
    async clickAddOrRemoveItemToCartButton(itemIndex) {
        const inventoryItem = await this.getProductItemById(itemIndex);
        const addToCartBtn = await inventoryItem.$('.btn_inventory');
        await addToCartBtn.click();
    }

    getProductItemById(itemIndex) {
        return $('div.inventory_list div.inventory_item:nth-child(' + itemIndex + ')');
    }


    /**
     * 
     * @param {number=} itemIndex min value is 1.
     */
    async getItemTitle(itemIndex) {
        const inventoryItem = await this.getProductItemById(itemIndex);
        const itemTitle = await inventoryItem.$('div.inventory_item_name').getText();
        return itemTitle;
    }

    /**
     * 
     * @param {number=} itemIndex min value is 1.
     */
    async getItemPrice(itemIndex) {
        const inventoryItem = await this.getProductItemById(itemIndex);
        const itemPrice = await inventoryItem.$('div.inventory_item_price').getText();
        return itemPrice;
    }

    async getPricesListOfItems() {
        const priceElements = await this.pricesOfItems;
        const prices = [];
        for (let priceElement of priceElements) {
            const priceText = await priceElement.getText();
            const priceNumber = parseFloat(priceText.replace('$', ''));
            prices.push(priceNumber);
        }
        return prices;
    }

    async getNamesListOfItems() {
        const elements = await this.namesOfItems;
        const names = [];
        for (let el of elements) {
            const elementText = await el.getText();
            names.push(elementText);
        }
        return names;
    }

    async selectSortOption(optionValue) {
        const sortElement = await this.sortingElement;
        await sortElement.click();

        const optionElement = await sortElement.$('option[value="' + optionValue + '"]');
        optionElement.click();
    }
}

export default new InventoryPage();
