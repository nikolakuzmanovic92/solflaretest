import { expect } from "chai";
import ApiHelper from '../../src/api/helpers/apiHelper.js';

describe('Switching Between Mainnet and Devnet', () => {
  let mainnetResponse1;
  let devnetResponse;
  let mainnetResponse2;

  it('should return identical responses for mainnet after switching to devnet and back', async () => {
    // Step 1: First Request (Mainnet)
    mainnetResponse1 = await ApiHelper.getTokens();
    const mainnetTokens1 = mainnetResponse1.data.tokens;

    // Step 2: Second Request (Devnet)
    devnetResponse = await ApiHelper.getTokens('devnet');
    const devnetTokens = devnetResponse.data.tokens;

    // Validate that additional tokens appear in the response compared to mainnet.
    expect(devnetTokens.length).to.be.greaterThan(mainnetTokens1.length);

    // Step 3: Third Request (Back to Mainnet)
    mainnetResponse2 = await ApiHelper.getTokens();
    const mainnetTokens2 = mainnetResponse2.data.tokens;

    // Compare the response with the first and second request.
    expect(mainnetTokens2.length).to.equal(mainnetTokens1.length);

    // Ensure all token balances and details match the original mainnet response.
    mainnetTokens1.forEach((token, index) => {
      expect(token.mint).to.equal(mainnetTokens2[index].mint);
      expect(token.totalUiAmount).to.equal(mainnetTokens2[index].totalUiAmount);
    });
  });
});