const ridesModel = require('../../src/model/rides_model');

describe('Rides Model', () => {
  // let commandStub;
  const values = [10,10,10,10,'rider_name','driver_name','driver_vehicle'];
  const payload = {
    id:1,
    size:5,
    page:1
  };
  const res = {
    send: function(){'dimastest';},
    json: function(err){
      err;
    },
    status: function(responseStatus) {
      // This next line makes it chainable
      return this;
    }
  };

  describe('insertRides', () => {
    it('should handle test insert rides success', async() => {
      await ridesModel.insertDataRidesQuery(values,res);
    });
    it('should handle test insert rides error', async() => {
      await ridesModel.insertDataRidesQuery([],res);
    });
  });

  describe('getDataRides', () => {
    it('should handle test insert rides', async() => {
      await ridesModel.getDataRides(payload,res);
    });
  });

  describe('getAllDataRides', () => {
    it('should handle test insert rides', async() => {
      await ridesModel.getAllDataRides(res);
    });
  });

  describe('paginationData', () => {
    it('should handle test insert rides', async() => {
      await ridesModel.paginationData(payload,res);
    });
    it('should handle test insert rides', async() => {
      await ridesModel.paginationData({payload},res);
    });
  });
});
