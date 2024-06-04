import loginPage from '../pageobjects/login.page.js';
import footerComponent from '../pageobjects/footer.component.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { expect } from '@wdio/globals';
import { LOGIN_CREDENTIALS } from '../common/data.js';
import assert from 'assert';

describe('Footer', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);
    });

    it('twitter of the company should be opened on the new tab', async () => {
        // Given
        await inventoryPage.open();
        const originAmountOfTabs = await inventoryPage.getAmountOfOpenedTabs();

        // When 
        await footerComponent.clickTwitter();

        // Then
        const actualAmountOfTabs = await inventoryPage.getAmountOfOpenedTabs();
        assert.equal(originAmountOfTabs + 1, actualAmountOfTabs, "Twitter is not opened in a new tab");
        expect(await footerComponent.isTwitterOpened()).toBe(true);

    })

    it('facebook of the company should be opened on the new tab', async () => {
        // Given
        await inventoryPage.open();
        const originAmountOfTabs = await inventoryPage.getAmountOfOpenedTabs();

        // When 
        await footerComponent.clickFacebook();

        // Then
        const actualAmountOfTabs = await inventoryPage.getAmountOfOpenedTabs();
        assert.equal(originAmountOfTabs + 1, actualAmountOfTabs, "Facebook is not opened in a new tab");
        expect(await footerComponent.isFacebookOpened()).toBe(true);
    })

    it('linkedin of the company should be opened on the new tab', async () => {
        // Given
        await inventoryPage.open();
        const originAmountOfTabs = await inventoryPage.getAmountOfOpenedTabs();

        // When 
        await footerComponent.clickLinkedin();

        // Then
        const actualAmountOfTabs = await inventoryPage.getAmountOfOpenedTabs();
        assert.equal(originAmountOfTabs + 1, actualAmountOfTabs, "LinkedIn is not opened in a new tab");
        expect(await footerComponent.isLinkedinOpened()).toBe(true);
    })
})

