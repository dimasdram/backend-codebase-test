// 'use strict';
const express = require('express');
const app = express();
const basicAuth = require('./auth/basic_auth');
const bodyParser = require('body-parser');
const ridesControllers = require('./controllers/rides_controllers');
const healthControllers = require('./controllers/health_controllers');

module.exports = (db) => {
  app.use(bodyParser.json());
  app.get('/health', basicAuth.isAuthenticated ,healthControllers.helloHealth);
  app.post('/rides', basicAuth.isAuthenticated ,ridesControllers.insertRides);
  app.get('/rides/:id',basicAuth.isAuthenticated ,ridesControllers.getRidesById);
  app.get('/rides', basicAuth.isAuthenticated ,ridesControllers.getAllRides);
  app.get('/rides-page', basicAuth.isAuthenticated ,ridesControllers.getAllRidesPagination);

  return app;
};
