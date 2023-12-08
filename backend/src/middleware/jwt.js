const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

// 中间件：验证 JWT
const authenticateToken = (req, res, next) => {
  // 注册，登录，登出 不需要 Token
  const excludePath = [
    '/api/auth/register',
    '/api/auth/login',
    '/api/auth/logout',
  ]
  if (excludePath.some(path => req.path === path)) {
    return next();
  }

  // 获取名为 Cookie 中存储的 token 
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      code: -1,
      data: null,
      msg: 'Authentication failed'
    })
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        code: -1,
        data: null,
        msg: 'Token verification failed'
      })
    }
    req.user = decoded; // 将解码后的用户信息存储到 req 对象中
    next();
  });
};

module.exports = authenticateToken;
