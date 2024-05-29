import Page from "./page.js";

class CheckoutCompletePage extends Page {
    get backHomeButton() {
        return $('#back-to-products');
    }

    get completeHeader() {
        return $('.complete-header');
    }

    getCompleteHeaderValue() {
        return this.completeHeader.getText();
    }

    async clickBackHomeButton() {
        await this.backHomeButton.click();
    }

    getUrl() {
        return super.getUrl() + "/checkout-complete.html";
    }
}

export default new CheckoutCompletePage();