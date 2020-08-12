const insertValidate = (payload) => {
  let {start_lat,start_long,end_lat,end_long,rider_name,driver_name,driver_vehicle}=payload;
  let response = {};
  let resultValidate = [];
  if (!start_lat ||!start_long ||start_lat < -90 || start_lat > 90 || start_long < -180 || start_long > 180) {
    resultValidate.push('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
  }
  if (!end_lat || !end_long ||end_lat < -90 || end_lat > 90 || end_long < -180 || end_long > 180) {
    resultValidate.push('End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
  }
  if (typeof rider_name !== 'string' || rider_name.length < 1) {
    resultValidate.push('Rider name must be a non empty string');
  }
  if (typeof driver_name !== 'string' || driver_name.length < 1) {
    resultValidate.push('Driver name must be a non empty string');
  }
  if (typeof driver_vehicle !== 'string' || driver_vehicle.length < 1) {
    resultValidate.push('driver vehicle must be a non empty string');
  }
  response.message = { error: resultValidate };
  return response;
};

const validateRidesById = (payload) => {
  let response = {};
  let resultValidate = [];
  if (payload.id === null){
    resultValidate.push('id cant null');
  }
  response.message = { error: resultValidate };
  return response;
};
const validatePaginationRides = (payload) => {
  let response = {};
  let resultValidate = [];
  if (!payload.page){
    resultValidate.push('query page cant null');
  }
  if (!payload.size){
    resultValidate.push('query size cant null');
  }
  response.message = { error: resultValidate };
  return response;
};


module.exports = {
  insertValidate,
  validateRidesById,
  validatePaginationRides
};
