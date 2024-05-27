import { $ } from '@wdio/globals'
import assert from 'assert';

import { LOGIN_CREDENTIALS, login } from '../common/login.js'



describe('Products sorting', () => {
    before(async () => {
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);
    });

    it('sort products by price (low to hight)', async () => {
        // When
        await selectSortOption('lohi');

        // Then
        const prices = await getListOfPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        assert.deepStrictEqual(prices, sortedPrices, 'Prices are not sorted from low to high');
    })

    it('sort products by price (hight to low)', async () => {
        // When
        await selectSortOption('hilo');

        // Then
        const prices = await getListOfPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        assert.deepStrictEqual(prices, sortedPrices, 'Prices are not sorted from low to high');
    })

    it('sort products by name (A to Z)', async () => {
        // When
        await selectSortOption('az');

        // Then
        const names = await getListOfNames();
        const sortedNames = [...names].sort();
        assert.deepStrictEqual(names, sortedNames, 'Names are not sorted from A to Z');
    })

    it('sort products by name (Z to A)', async () => {
        // When
        await selectSortOption('za');

        // Then
        const names = await getListOfNames();
        const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
        assert.deepStrictEqual(names, sortedNames, 'Names are not sorted from Z to A');
    })

    async function selectSortOption(optionValue) {
        const sortElement = await $('.product_sort_container');
        await sortElement.click();

        const optionElement = await sortElement.$('option[value="' + optionValue + '"]');
        optionElement.click();
    }

    async function getListOfPrices() {
        const priceElements = await $$('.inventory_item_price');
        const prices = [];
        for (let priceElement of priceElements) {
            const priceText = await priceElement.getText();
            const priceNumber = parseFloat(priceText.replace('$', ''));
            prices.push(priceNumber);
        }
        return prices;
    }

    async function getListOfNames() {
        const elements = await $$('.inventory_item_name');
        const names = [];
        for (let el of elements) {
            const elementText = await el.getText();
            names.push(elementText);
        }
        return names;
    }
})
