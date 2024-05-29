
const WAIT_TIMEOUT = 3000;

class MenuComponent {
    get menuButton() {
        return $('#react-burger-menu-btn');
    }

    get logoutLink() {
        return $('#logout_sidebar_link');
    }

    get aboutLink() {
        return $('#about_sidebar_link');
    }

    get resetLink() {
        return $('#reset_sidebar_link');
    }

    get allItemsLink() {
        return $('#inventory_sidebar_link');
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async clickLogoutLink() {
        await this.logoutLink.waitForDisplayed({ timeout: WAIT_TIMEOUT });
        await this.logoutLink.waitForClickable({ timeout: WAIT_TIMEOUT });
        await this.logoutLink.click();
    }

    async clickAllItemsLink() {
        await this.allItemsLink.waitForDisplayed({ timeout: WAIT_TIMEOUT });
        await this.allItemsLink.waitForClickable({ timeout: WAIT_TIMEOUT });
        await this.allItemsLink.click();
    }

    async clickAboutLink() {
        await this.aboutLink.waitForDisplayed({ timeout: WAIT_TIMEOUT });
        await this.aboutLink.waitForClickable({ timeout: WAIT_TIMEOUT });
        await this.aboutLink.click();
    }

    async clickResetLink() {
        await this.resetLink.waitForDisplayed({ timeout: WAIT_TIMEOUT });
        await this.resetLink.waitForClickable({ timeout: WAIT_TIMEOUT });
        await this.resetLink.click();
    }

    async logout() {
        await this.openMenu();
        await this.clickLogoutLink();
    }

}

export default new MenuComponent();