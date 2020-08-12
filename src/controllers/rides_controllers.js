const middleware = require('../middlewares/rides_middlewares');
const wrapper = require('../helpers/wrapper');
const { ERROR: httpError} = require('../helpers/wrapper-status-code');
const ridesModel = require('../model/rides_model');

const insertRides = async (req, res) => {
  const payload = req.body;
  let {start_lat,start_long,end_lat,end_long,rider_name,driver_name,driver_vehicle}=payload;
  const validatePayload = middleware.insertValidate(payload);
  if (validatePayload.message.error.length > 0){
    const result = wrapper.error(validatePayload);
    return wrapper.response(res, 'fail', result, httpError.CONFLICT);
  }
  let values = [start_lat,start_long,end_lat,end_long,rider_name,driver_name,driver_vehicle];
  // eslint-disable-next-line max-len
  let resultInsertModel = ridesModel.insertDataRidesQuery(values,res);
  return resultInsertModel;
};

const getRidesById = async (req, res) => {
  const payload = req.params;
  const validatePayload = await middleware.validateRidesById(payload);
  if (validatePayload.message.error.length > 0){
    const result = wrapper.error(validatePayload);
    return wrapper.response(res, 'fail', result, httpError.CONFLICT);
  }
  let resultGetAllData = ridesModel.getDataRides(payload,res);
  return resultGetAllData;
};

const getAllRides = async (req, res) => {
  let getAllRidesData = await ridesModel.getAllDataRides(res);
  return getAllRidesData;
};

const getAllRidesPagination = async (req, res) => {
  let payload = req.query;
  const validatePayload = await middleware.validatePaginationRides(payload);
  if (validatePayload.message.error.length > 0){
    const result = wrapper.error(validatePayload);
    return wrapper.response(res, 'fail', result, httpError.CONFLICT);
  }
  let getAllRidesData = ridesModel.paginationData(payload,res);
  return getAllRidesData;
};


module.exports = {
  insertRides,
  getRidesById,
  getAllRides,
  getAllRidesPagination
};
