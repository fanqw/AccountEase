// const morgan = require('morgan');

// function loggerMiddleware(env) {
//   if (env === 'production') {
//     return morgan('combined');
//   } else if (env === 'development') {
//     return morgan('dev');
//   } else {
//     return morgan('common');
//   }
// }

// module.exports = loggerMiddleware;
const winston = require('winston');

// 创建一个新的 logger 实例
const logger = winston.createLogger({
  level: 'info', // 设置日志级别
  format: winston.format.json(), // 日志格式为 JSON
  transports: [
    // 在控制台输出日志
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});


const loggerMiddleware = (env) => {
  // 如果是生产环境，则将日志写入文件
  if (env === 'prod') {
    logger.add(new winston.transports.File({ filename: 'error.log', level: 'error' }));
    logger.add(new winston.transports.File({ filename: 'combined.log' }));
  }
  return (req, res, next) => {
    logger.log({
      level: 'info',
      message: `${req.method} ${req.url}`,
    });
    next();
  };
}

module.exports = loggerMiddleware;
