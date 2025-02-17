import { $ } from '@wdio/globals';
import logger from '../../../tests/utils/logger.js';
class PasswordPage {

  /** Locators **/
  get passwordField() { return $('input[name="password"]'); }
  get repeatPasswordField() { return $('input[name="password2"]'); }
  get continueBtn() { return $('button=Continue'); }

  /** Method generates random password **/
  async generatePassword() {
    return Math.random().toString(36).slice(-8);
  }

  /** Method to enter the same password in both fields **/
  async enterPassword(password: string) {
    await this.passwordField.setValue(password);
    logger.info('Fill password field');
    await this.repeatPasswordField.setValue(password);
    logger.info('Fill repeat password field');
  }

  /** Method for click on continue button leads to Success page **/
  async continueAfterPaste() {
    await this.continueBtn.click();
    logger.info('Click Continue button on Password page');
  }
}

export default new PasswordPage();