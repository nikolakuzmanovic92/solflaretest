import { $ } from '@wdio/globals';
import logger from '../../../tests/utils/logger.js';

class OnboardPage {

    /** Locators **/
    get newWalletBtn() { return $('button[data-id="i_need_a_wallet_button"]'); }

    /** Method for click on 'I need a Wallet button' opens Recovery phrase page **/
    async createNewWallet() {
        await this.newWalletBtn.click();
        logger.info('Click on I need a Wallet button');
    }
}
export default new OnboardPage();