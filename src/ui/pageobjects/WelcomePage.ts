import { $, browser } from '@wdio/globals';
import logger from '../../../tests/utils/logger.js';
import config from '../../../tests/config/config.js';
import { takeScreenshot } from '../../../tests/utils/screenshot.js';

class WelcomePage {

    /** Locators **/
    get accessWalletBtn() { return $('a[href="/access"]'); }

    /** Method for Opening of Welcome page of Solflare **/
    public async open() {
        await browser.url(config.HOME_PAGE_URL);
        logger.info('Opened Solflare homepage');
    }

    /** Method to open Access wallet test page **/
    async navigateToAccessWallet() {
        await this.accessWalletBtn.click();
        logger.info('Click on Access wallet');
    }
}
export default new WelcomePage();