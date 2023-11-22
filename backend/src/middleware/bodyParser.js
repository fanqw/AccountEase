const bodyParser = require('body-parser');

// JSON 解析中间件
const jsonParser = bodyParser.json();

// URL 编码解析中间件
const urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = { jsonParser, urlencodedParser };
