import Page from "./page.js";

class AboutPage extends Page {

    get testItAllButton() {
        return $('button=Test it all. Free')
    }

    async isTestItAllButtinDisplayed() {
        return await this.testItAllButton.isDisplayed();
    }

    // Override parent Page method
    getUrl() {
        return 'https://saucelabs.com';
    }

}

export default new AboutPage();