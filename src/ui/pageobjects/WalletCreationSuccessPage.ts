import { $ } from '@wdio/globals';
import logger from '../../../tests/utils/logger.js';
class WalletCreationSuccessPage {

  /** Locators **/
  get enterSolanaButton() { return $('button=Enter Solana'); }

  /** Method to click the "Enter Solana" button **/
  async clickEnterSolanaButton() {
    await this.enterSolanaButton.click();
    logger.info('Click on enter Solana Wallet on Wallet creation success page');
  }
}
export default new WalletCreationSuccessPage()