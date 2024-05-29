class FooterComponent {
    get twitterLink() {
        return $('.social_twitter a');
    }

    get facebookLink() {
        return $('.social_facebook a');
    }

    get linkedinLink() {
        return $('.social_linkedin a');
    }

    async clickTwitter() {
        await this.openSocialMediaTab(this.twitterLink);
    }

    async clickFacebook() {
        await this.openSocialMediaTab(this.facebookLink);
    }

    async clickLinkedin() {
        await this.openSocialMediaTab(this.linkedinLink);
    }

    isTwitterOpened() {
        return this.isWebPageOpened("https://x.com/saucelabs");
    }

    isFacebookOpened() {
        return this.isWebPageOpened("https://www.facebook.com/saucelabs");
    }

    isLinkedinOpened() {
        return this.isWebPageOpened("https://www.linkedin.com/company/sauce-labs/");
    }

    async openSocialMediaTab(linkElement) {
        const originalHandles = await browser.getWindowHandles();

        await linkElement.click();

        // fetch new tab handle
        const newHandles = await browser.getWindowHandles();
        const newTabHandle = newHandles.find(handle => !originalHandles.includes(handle));
        // switch to a new tab
        await browser.switchToWindow(newTabHandle);
    }

    async isWebPageOpened(url) {
        const newTabUrl = await browser.getUrl();
        return newTabUrl.startsWith(url);
    }

}

export default new FooterComponent();