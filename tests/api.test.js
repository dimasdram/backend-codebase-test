// 'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }
      buildSchemas(db);
      done();
    });
  });
  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .set('Authorization','Basic ZW1wYXRrYWxpOjZkNDNmMWMyLWM2ZTc')
        .expect(401, done);
    });
  });
});
