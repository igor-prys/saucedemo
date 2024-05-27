import { expect, $ } from '@wdio/globals'
import { BASE_URL, LOGIN_CREDENTIALS, login } from '../common/login.js'
import assert from 'assert';

const INVENTORY_URL = BASE_URL + "/inventory.html"


describe('Footer', () => {
    before(async () => {
        await login(LOGIN_CREDENTIALS.login, LOGIN_CREDENTIALS.password);
    });

    it('twitter of the company should be opened on the new tab', async () => {
        await browser.url(INVENTORY_URL);
        const twitterElement = await $('.social_twitter a');
        await openSocialMediaTab(twitterElement, "https://x.com/saucelabs");
    })

    it('facebook of the company should be opened on the new tab', async () => {
        await browser.url(INVENTORY_URL);
        const facebookElement = await $('.social_facebook a');
        await openSocialMediaTab(facebookElement, "https://www.facebook.com/saucelabs");
    })

    it('linkedin of the company should be opened on the new tab', async () => {
        await browser.url(INVENTORY_URL);
        const linkedinElement = await $('.social_linkedin a');
        await openSocialMediaTab(linkedinElement, "https://www.linkedin.com/company/sauce-labs/");
    })

    async function openSocialMediaTab(linkElement, expectedUrl) {
        // Given
        const originalHandles = await browser.getWindowHandles();

        //When
        await linkElement.click();

        // Then
        // verify the amount of open tabs
        const newHandles = await browser.getWindowHandles();
        expect(newHandles.length).toEqual(originalHandles.length + 1);

        // fetch new tab handle
        const newTabHandle = newHandles.find(handle => !originalHandles.includes(handle));
        // switch to a new tab
        await browser.switchToWindow(newTabHandle);

        // verify url of a new tab
        const newTabUrl = await browser.getUrl();
        assert.ok(newTabUrl.startsWith(expectedUrl));
    }

})

