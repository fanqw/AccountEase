const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
const expiresIn = process.env.EXPIRES;

// 生成 JWT
const generateToken = (payload) => jwt.sign(payload, secretKey, { expiresIn })

// 验证 JWT
const verifyToken = (token) => {
  try {
    // 验证 JWT，使用你自己的密钥来解码
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    // 验证失败
    console.error('Token verification failed');
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
}
