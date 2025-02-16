import { $$ } from '@wdio/globals';
import logger from '../../../tests/utils/logger';

class HomePage {

  /** Locators **/
  get walletManagementBtn() { return $$('button.MuiButtonBase-root.MuiIconButton-root')[1]; }

  /** Method for Click on Avatar button opens Wallet management page **/
  async openWalletManagement() {
    await this.walletManagementBtn.waitForClickable();
    await this.walletManagementBtn.click();
    logger.info('Open Wallet management popup');
  }
}
export default new HomePage()