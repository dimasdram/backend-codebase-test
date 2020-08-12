const sinon = require('sinon');
const winston = require('winston');
const logger = require('../../src/helpers/logger');

describe('Logger', () => {

  beforeEach(() => {
    sinon.stub(winston, 'createLogger').resolves(
      {
        info: sinon.stub()
      }
    );
  });

  afterEach(() => {
    winston.createLogger.restore();
  });

  describe('log', () => {
    it('should send log', () => {
      logger.log('', { err: 'test'}, '');
    });
  });
});
