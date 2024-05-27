import { browser, $ } from '@wdio/globals'

/**
 * 
 * @param {number=} itemIndex min value is 1. If item already added it will be removed.
 */
export async function addOrRemoveItemToCart(itemIndex) {
    const inventoryItem = await getItemElement(itemIndex)
    const addToCartBtn = await inventoryItem.$('.btn_inventory')
    await addToCartBtn.click()
}

/**
 * 
 * @param {number=} itemIndex min value is 1.
 */
export async function getItemTitle(itemIndex) {
    const inventoryItem = await getItemElement(itemIndex)
    const itemTitle = await inventoryItem.$('div.inventory_item_name').getText();
    return itemTitle
}

/**
 * 
 * @param {number=} itemIndex min value is 1.
 */
export async function getItemPrice(itemIndex) {
    const inventoryItem = await getItemElement(itemIndex);
    const itemPrice = await inventoryItem.$('div.inventory_item_price').getText();
    return itemPrice;
}

async function getItemElement(itemIndex) {
    return browser.$('div.inventory_list div.inventory_item:nth-child(' + itemIndex + ')');
}