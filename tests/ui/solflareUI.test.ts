import { expect } from '@wdio/globals';
import HomePage from '../../src/ui/pageobjects/HomePage';
import OnboardPage from '../../src/ui/pageobjects/OnboardPage';
import PasswordPage from '../../src/ui/pageobjects/PasswordPage';
import RecoveryPhrasePage from '../../src/ui/pageobjects/RecoveryPhrasePage';
import WalletCreationSuccessPage from '../../src/ui/pageobjects/WalletCreationSuccessPage';
import WalletManagementPage from '../../src/ui/pageobjects/WalletManagementPage';
import WelcomePage from '../../src/ui/pageobjects/WelcomePage';


describe('Solflare Wallet Tests', () => {
  it('should complete end-to-end wallet creation and management', async () => {
      await WelcomePage.open();
      await WelcomePage.navigateToAccessWallet();

      // Start wallet creation
      await OnboardPage.createNewWallet();

      // Recovery phrase memorize and repetition
      const recoveryPhrase = await RecoveryPhrasePage.getRecoveryPhrase();
      await RecoveryPhrasePage.proceedAfterSaving();
      await RecoveryPhrasePage.writeRecoveryPhrase(recoveryPhrase)
      await RecoveryPhrasePage.continueAfterPaste();

      // Password setup
      const password = await PasswordPage.generatePassword();
      await PasswordPage.enterPassword(password);
      await PasswordPage.continueAfterPaste();
      await WalletCreationSuccessPage.clickEnterSolanaButton();

      // Navigation to Wallet management
      await HomePage.openWalletManagement();
      expect(await WalletManagementPage.myWalletText).toBeDisplayed();
      await WalletManagementPage.addWalletPlusBtn.waitForClickable() 
      await WalletManagementPage.addWalletPlusBtn.click();

      // Adding a new wallets
      await WalletManagementPage.manageRecoveryPhraseBtn.click();
      expect(await WalletManagementPage.toggleButtonByIndex(0)).toBeDisabled();
      expect((await WalletManagementPage.getToggleState(0)).toString() === 'checked');
      await WalletManagementPage.clickToggleButton(2);
      await WalletManagementPage.clickToggleButton(3);
      await WalletManagementPage.saveBtn.click();
      
      //Validate new wallets added
      expect(await WalletManagementPage.allWallets.length == 3)
  })
});