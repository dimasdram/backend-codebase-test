const sinon = require('sinon');
const ridesControllers = require('../../src/controllers/rides_controllers');
const ridesModel = require('../../src/model/rides_model');

describe('Rides Controller', () => {
  // let commandStub;
  let req = {
    params:{
      category:'dimastest',
      id:1
    },
    query:{
      page:1,
      size:5
    },
    body:{},
  };
  const res = {
    send: function(){'';},
    json: function(err){
      err;
    },
    status: function(responseStatus) {
      // This next line makes it chainable
      return this;
    }
  };
  describe('insertRides', () => {
    it('should handle test insert rides', async() => {
      await ridesControllers.insertRides(req, res);
    });
  });
  describe('getRidesById', () => {
    it('should handle test get by id rides', async() => {
      sinon.stub(ridesModel, 'getDataRides').resolves({
        err: null,
        data: {}
      });
      await ridesControllers.getRidesById(req, res);
      ridesModel.getDataRides.restore();
    });
  });
  describe('getAllRides', () => {
    it('should handle test get all rides', async() => {
      await ridesControllers.getAllRides(req, res);
    });
  });
  describe('getAllRidesPagination get rides with pagination', () => {
    it('should handle test', async() => {
      await ridesControllers.getAllRidesPagination(req, res);
    });
  });

});
