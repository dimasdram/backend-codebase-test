
const ridesMiddlewares = require('../../src/middlewares/rides_middlewares');

describe('Rides validator', () => {
  describe('insertRides validator', () => {
    it('should handle test validate insert rides', async() => {
      let payload = {
        'rider_name':'Dimas',
        'driver_name':'Ramadhan',
        'driver_vehicle':'mercy',
        'start_lat':-6.9215178,
        'start_long':107.6071852,
        'end_lat':-6.9220823,
        'end_long':107.6152694
      };
      ridesMiddlewares.insertValidate(payload);
    });
  });
  describe('validateRidesById', () => {
    it('should handle test get rides by id', async() => {
      let payload={};
      payload.id = null;
      ridesMiddlewares.validateRidesById(payload);
    });
  });
  describe('validatePaginationRides', () => {
    it('should handle test get rides by pagination', async() => {
      let payload={};
      ridesMiddlewares.validatePaginationRides(payload);
    });
  });


});
