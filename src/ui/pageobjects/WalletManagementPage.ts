import { $, $$ } from '@wdio/globals';
import logger from '../../../tests/utils/logger';

class WalletManagementPage {

    /** Locators **/
    get addWalletPlusBtn() { return $('//div[@data-id="page-title"]/following-sibling::button[1]'); }
    get manageRecoveryPhraseBtn() { return $("//span[text()='Manage recovery phrase']"); }
    get toggleButtons() { return $$('button[role="switch"]'); }
    get saveBtn() { return $('//button[contains(@class, "btn-primary")]//span[text()="Save"]'); }
    get myWalletText() { return $('span=My Wallet'); }
    get allWallets () {return $$('div.wctcrs1');};

    /** Method to Get a specific toggle button by index
     * 
     *  @index - index starting from 0 for toggle buttons
     * 
     * **/
    toggleButtonByIndex(index: number) {
        return this.toggleButtons[index];
    }

    /** Method for Click a specific toggle button
     * 
     * @index - index starting from 0 for toggle buttons
     * 
     * **/
    async clickToggleButton(index: number) {
        const button = await this.toggleButtonByIndex(index);
        await button.waitForClickable();
        await button.click();
        logger.info(`Toggled button ${index}`);
    }

    /** Method to Get the state of a toggle button (checked or unchecked)
     * 
     * @index - index starting from 0 for toggle buttons
     * 
     * **/
    async getToggleState(index: number) {
        const button = await this.toggleButtonByIndex(index);
        return await button.getAttribute('data-state');
    }
} export default new WalletManagementPage()