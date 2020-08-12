const winston = require('winston');

const logger = winston.createLogger({
  transports: [ new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true
  })
  ],
  exitOnError: false
});

const log = (context, message) => {
  const obj = {
    context,
    message: message.toString()
  };
  logger.info(obj);
};

module.exports = {
  log
};
