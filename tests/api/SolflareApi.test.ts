import { expect } from 'chai';
import ApiHelper from '../../src/api/helpers/apiHelper';

describe('Devnet Token Validation', () => {
  it('should return multiple tokens with valid properties for devnet', async () => {
    const response = await ApiHelper.getTokens('devnet');
    const { tokens } = response.data;
    expect(response.status).to.equal(200);

    // Step 2: Validate that the response includes multiple tokens, not just SOL.
    expect(tokens.length).to.be.greaterThan(1);

    // Step 3: Confirm that the response contains tokens with a mint address.
    tokens.forEach((token) => {
      expect(token.mint).to.be.a('string').and.to.have.lengthOf.at.least(1);
    });

    // Step 4: Ensure totalUiAmount for each token has valid values.
    tokens.forEach((token) => {
      expect(token.totalUiAmount).to.be.a('number').and.to.be.at.least(0);
    });

    // Step 5: Validate the type of fields such as price, coingeckoId, and verify if they exist for each token.
    tokens.forEach((token) => {
      if (token.price) {
        expect(token.price).to.be.an('object');
      }
      if (token.coingeckoId) {
        expect(token.coingeckoId).to.be.a('string');
      }
    });
  });

  it('should return only the SOL token when no network is specified', async () => {
    const response = await ApiHelper.getTokens();
    const { tokens } = response.data;
    expect(response.status).to.equal(200);

    // Step 2: Validate that the response contains only SOL.
    expect(tokens.length).to.equal(1);

    const solToken = tokens[0];

    // Step 3: Verify the essential properties of the SOL token.
    expect(solToken.name).to.equal('Solana');
    expect(solToken.symbol).to.equal('SOL');
    expect(solToken.mint).to.equal('11111111111111111111111111111111');
    expect(solToken.totalUiAmount).to.be.a('number').and.to.be.at.least(0);

    // Step 4: Ensure the price object contains key values.
    if (solToken.price) {
      expect(solToken.price).to.be.an('object');
      expect(solToken.price).to.have.property('currency');
      expect(solToken.price.usdPrice).to.be.a('number').and.to.be.at.least(0);
    }
  });

  it('should return a 400 or 404 error for an invalid address', function (done) {

    ApiHelper.getTokensWithInvalidAddress()
      .then(() => {
        done(new Error('Expected the API to return an error but it succeeded.'));
      })
      .catch((error: any) => {
        try {
          // Step 2: Validate that the API returns status 400 or 404.
          expect(error.response.status).to.be.oneOf([400, 404]);

          // Step 3: Validate that the error message is displayed.
          expect(error.response.data).to.have.property('message');
          expect(error.response.data.message).to.be.a('string').and.to.have.lengthOf.at.least(1);
          done();
        } catch (err) {
          done(err);
        }
      });
  });
});