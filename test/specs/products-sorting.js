import loginPage from '../pageobjects/login.page.js';
import assert from 'assert';

import { LOGIN_CREDENTIALS } from '../common/data.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Products sorting', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);
    });

    it('sort products by price (low to hight)', async () => {
        // When
        await inventoryPage.selectSortOption('lohi');

        // Then
        const prices = await inventoryPage.getPricesListOfItems();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        assert.deepStrictEqual(prices, sortedPrices, 'Prices are not sorted from low to high');
    })

    it('sort products by price (hight to low)', async () => {
        // When
        await inventoryPage.selectSortOption('hilo');

        // Then
        const prices = await inventoryPage.getPricesListOfItems();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        assert.deepStrictEqual(prices, sortedPrices, 'Prices are not sorted from low to high');
    })

    it('sort products by name (A to Z)', async () => {
        // When
        await inventoryPage.selectSortOption('az');

        // Then
        const names = await inventoryPage.getNamesListOfItems();
        const sortedNames = [...names].sort();
        assert.deepStrictEqual(names, sortedNames, 'Names are not sorted from A to Z');
    })

    it('sort products by name (Z to A)', async () => {
        // When
        await inventoryPage.selectSortOption('za');

        // Then
        const names = await inventoryPage.getNamesListOfItems();
        const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
        assert.deepStrictEqual(names, sortedNames, 'Names are not sorted from Z to A');
    })
})
