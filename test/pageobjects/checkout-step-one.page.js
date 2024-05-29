import Page from "./page.js";

class CheckoutStepOnePage extends Page {
    get checkoutForm() {
        return $('.checkout_info_wrapper form')
    }

    get firtstName() {
        return $('#first-name');
    }

    get lastName() {
        return $('#last-name');
    }

    get postalCode() {
        return $('#postal-code');
    }

    get continueButton() {
        return $('#continue')
    }

    async filoutCheckoutFormAndSend(firstName, lastName, postalCode) {
        await this.firtstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.postalCode.setValue(postalCode);
        await this.continueButton.click();
    }

    async isCheckoutFormdIsDisplayed() {
        const checkoutForm = await this.checkoutForm;
        return checkoutForm.isDisplayed();
    }

    getUrl() {
        return super.getUrl() + "/checkout-step-one.html";
    }
}

export default new CheckoutStepOnePage();