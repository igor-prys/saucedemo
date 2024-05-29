import LoginPage from '../pageobjects/login.page.js';
import assert from 'assert';

import { LOGIN_CREDENTIALS } from '../common/data.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Products sorting', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);
    });

    it('sort products by price (low to hight)', async () => {
        // When
        await InventoryPage.selectSortOption('lohi');

        // Then
        const prices = await InventoryPage.getPricesListOfItems();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        assert.deepStrictEqual(prices, sortedPrices, 'Prices are not sorted from low to high');
    })

    it('sort products by price (hight to low)', async () => {
        // When
        await InventoryPage.selectSortOption('hilo');

        // Then
        const prices = await InventoryPage.getPricesListOfItems();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        assert.deepStrictEqual(prices, sortedPrices, 'Prices are not sorted from low to high');
    })

    it('sort products by name (A to Z)', async () => {
        // When
        await InventoryPage.selectSortOption('az');

        // Then
        const names = await InventoryPage.getNamesListOfItems();
        const sortedNames = [...names].sort();
        assert.deepStrictEqual(names, sortedNames, 'Names are not sorted from A to Z');
    })

    it('sort products by name (Z to A)', async () => {
        // When
        await InventoryPage.selectSortOption('za');

        // Then
        const names = await InventoryPage.getNamesListOfItems();
        const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
        assert.deepStrictEqual(names, sortedNames, 'Names are not sorted from Z to A');
    })
})
