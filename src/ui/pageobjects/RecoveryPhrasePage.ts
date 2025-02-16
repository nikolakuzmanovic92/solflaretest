import { $ } from '@wdio/globals';
import logger from '../../../tests/utils/logger';

class RecoveryPhrasePage {

    //Locators
    get savedPhraseBtn() { return $('button=I saved my recovery phrase'); }
    get continueBtn() { return $('button[data-id="continue_button"]'); }

    /** Method to read recovery phrase **/
    async getRecoveryPhrase() {

        const wordsMap: Map<number, string> = new Map();

        // Iterate through each input element using its ID
        for (let i = 1; i <= 12; i++) {
            const inputElement = await $(`#mnemonic-input-${i}`);
            const word = await inputElement.getValue();
            wordsMap.set(i, word); // Use the index as the key
        }
        logger.info('Read recovery phrase');
        return wordsMap;
    }

    /** Method to write recovery phrase in required fields
     * 
     * @wordsMap - input recovery phrase map
     * 
    **/
    async writeRecoveryPhrase(wordsMap: Map<number, string>) {

        //Iterate through each input element using its ID
        for (let i = 1; i <= 12; i++) {
            await $(`#mnemonic-input-${i}`).setValue(wordsMap.get(i) as string);
        }
        logger.info('Write recovery phrase');
    }

    /** Method to proceed after recovery phrase red **/
    async proceedAfterSaving() {
        await this.savedPhraseBtn.click();
        logger.info('Click on proceed after recovery phrase red');
    }

    /** Method to click on continue button after recovery verification leads to Password page**/
    async continueAfterPaste() {
        await this.continueBtn.click();
        logger.info('Click on continue button after recovery phrase verification');
    }
}
export default new RecoveryPhrasePage();