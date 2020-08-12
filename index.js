// 'use strict';
const config = require('./src/global-config/config');
const serverName = 'backend-test';
const logger = require('./src/helpers/logger');
const db = require('./src/helpers/database');

db.serialize(() => {
  const app = require('./src/app')(db);
  app.listen(config.get('/port'), () =>{
    const ctx ='app-listen';
    logger.log(ctx, `${serverName} started, listening at ${config.get('/port')}`);
  });
});
