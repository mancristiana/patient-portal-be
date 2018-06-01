require('./../../src/utils/globals');
const { hasFields } = require('./../../src/utils/requestValidator');

describe('Request Validator', () => {
  describe('hasFields', () => {
    let req;
    beforeEach(() => {
      // Arrange
      req = {
        body: {
          email: 'value',
          password: 'value'
        }
      };
    });

    it('should return true when request is valid', () => {
      // Act & Assess
      expect(hasFields(req, [])).toEqual(true);
      expect(hasFields(req, ['email'])).toEqual(true);
      expect(hasFields(req, ['email', 'password'])).toEqual(true);
    });

    it('should return false when request is invalid', () => {
      expect(hasFields(req, ['username', 'password'])).toEqual(false);
    });
  });
});
