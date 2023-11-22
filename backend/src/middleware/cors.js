const cors = require('cors');

const corsOptions = {
  // 添加 CORS 选项
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
