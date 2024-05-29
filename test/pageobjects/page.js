/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    getUrl() {
        return `https://www.saucedemo.com`;
    }

    open() {
        return browser.url(this.getUrl());
    }

    async isOpened() {
        let currentUrl = await browser.getUrl();
        if (currentUrl.endsWith("/")) {
            currentUrl = currentUrl.slice(0, -1);
        }
        return currentUrl === this.getUrl();
    }

    async getAmountOfOpenedTabs() {
        const newHandles = await browser.getWindowHandles();
        return newHandles.length;
    }
}
