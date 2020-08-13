const wrapper = require('../helpers/wrapper');
const { ERROR: httpError, SUCCESS: http} = require('../helpers/wrapper-status-code');
const db = require('../helpers/database');
const logger = require('../helpers/logger');
const { ConflictError, NotFoundError } = require('../helpers/error');

const insertDataRidesQuery = (values,res) => {
  let ctx = 'insertDataRidesQuery';
  db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
    values, function (err) {
      if (err) {
        logger.log(ctx,'fail to get rides lastID');
        let result = wrapper.error(new ConflictError('Server Error'));
        return wrapper.response(res, 'fail', result, 'fail connect to server', httpError.NOT_FOUND);
      }
      db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (err, rows) => {
        if (err){
          logger.log(ctx,'fail to get rides lastID');
          let result = wrapper.error(new NotFoundError('data not found'));
          return wrapper.response(res, 'fail', result, 'fail connect to server', httpError.NOT_FOUND);
        }
        let result = {data:rows};
        return wrapper.response(res,'success',result,'Success Insert Data Rides', http.OK);
      });
    });
};

const getDataRides = (payload,res) => {
  db.all('SELECT * FROM Rides WHERE rideID=?',[payload.id], (err, rows)=> {
    if (rows.length === 0 ||err ) {
      let result = wrapper.error(new NotFoundError('Server Error data not found'));
      return wrapper.response(res, 'fail', result,'fail connect to server', httpError.NOT_FOUND);
    }
    let result = {data:rows};
    return wrapper.response(res,'success',result,'Get rides data by id');
  });
};

const getAllDataRides = (res) => {
  db.all('SELECT * FROM Rides ', (err, rows)=> {
    if (err||rows.length === 0) {
      let result = wrapper.error(new NotFoundError('Server Error Data not found'));
      return wrapper.response(res, 'fail', result, 'fail connect to server', httpError.NOT_FOUND);
    }
    let result = ({data:rows});
    return wrapper.paginationResponse(res, 'success', result, 'Succsess Get Data Rides', http.OK);
  });
};

const paginationData = (payload,res) => {
  let {size,page} = payload;
  let ctx = 'insertDataRidesQuery';
  db.all('SELECT count(*) as total FROM Rides', (err,data) => {
    if (err) {
      logger.log(ctx,'fail to get rides lastID');
      let result = wrapper.error(new ConflictError('Server Error'));
      return wrapper.response(res, 'fail', result, 'fail connect to server', httpError.NOT_FOUND);
    }
    db.all('SELECT * FROM Rides LIMIT ?,?',[((page*size)-size),size], (err, rows) => {
      if (err){
        logger.log(ctx,'fail to get rides lastID');
        let result = wrapper.error(new NotFoundError('data not found'));
        return wrapper.response(res, 'fail', result, 'fail connect to server', httpError.NOT_FOUND);
      }
      let result = {
        data:rows,
        meta:{
          page: Number(page),
          size: Number(size),
          totalPage: Math.ceil(data[0].total/Number(size)),
          totalData: data[0].total
        }
      };
      return wrapper.paginationResponse(res,'success',result,'Success get pagination Data Rides', http.OK);
    });
  });
};

module.exports = {
  insertDataRidesQuery,
  getAllDataRides,
  getDataRides,
  paginationData
};
