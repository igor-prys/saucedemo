import LoginPage from '../pageobjects/login.page.js';
import FooterComponent from '../pageobjects/footer.component.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import { expect } from '@wdio/globals'
import { LOGIN_CREDENTIALS } from '../common/data.js'
import assert from 'assert';

describe('Footer', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);
    });

    it('twitter of the company should be opened on the new tab', async () => {
        // Given
        await InventoryPage.open();
        const originAmountOfTabs = await InventoryPage.getAmountOfOpenedTabs();

        // When 
        await FooterComponent.clickTwitter();

        // Then
        const actualAmountOfTabs = await InventoryPage.getAmountOfOpenedTabs();
        assert.equal(originAmountOfTabs + 1, actualAmountOfTabs, "Twitter is not opened in a new tab");
        expect(await FooterComponent.isTwitterOpened()).toBe(true);

    })

    it('facebook of the company should be opened on the new tab', async () => {
        // Given
        await InventoryPage.open();
        const originAmountOfTabs = await InventoryPage.getAmountOfOpenedTabs();

        // When 
        await FooterComponent.clickFacebook();

        // Then
        const actualAmountOfTabs = await InventoryPage.getAmountOfOpenedTabs();
        assert.equal(originAmountOfTabs + 1, actualAmountOfTabs, "Facebook is not opened in a new tab");
        expect(await FooterComponent.isFacebookOpened()).toBe(true);
    })

    it('linkedin of the company should be opened on the new tab', async () => {
        // Given
        await InventoryPage.open();
        const originAmountOfTabs = await InventoryPage.getAmountOfOpenedTabs();

        // When 
        await FooterComponent.clickLinkedin();

        // Then
        const actualAmountOfTabs = await InventoryPage.getAmountOfOpenedTabs();
        assert.equal(originAmountOfTabs + 1, actualAmountOfTabs, "LinkedIn is not opened in a new tab");
        expect(await FooterComponent.isLinkedinOpened()).toBe(true);
    })
})

