const cookieParser = require('cookie-parser');
const session = require('express-session');

const cookieParserMiddleware = cookieParser();
const sessionMiddleware = session({
  // 添加 express-session 选项
});

module.exports = { cookieParserMiddleware, sessionMiddleware };
