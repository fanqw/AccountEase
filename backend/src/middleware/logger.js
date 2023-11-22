const morgan = require('morgan');

function loggerMiddleware(env) {
  if (env === 'production') {
    return morgan('combined');
  } else if (env === 'development') {
    return morgan('dev');
  } else {
    return morgan('common');
  }
}

module.exports = loggerMiddleware;
