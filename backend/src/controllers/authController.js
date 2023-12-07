const bcrypt = require('bcryptjs');
const User = require('@/models/user');
const { sendResponse } = require('@/utils/responseHandler')
const { generateToken } = require('@/utils/jwt')

// 注册新用户
async function registerUser(req, res) {
  const { username, password } = req.body;
  const response = {
    res,
    code: 200,
    data: null,
    msg: '',
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      response.code = 400;
      response.msg = "用户名已存在";
      return sendResponse(response)
    }

    const newUser = new User({ username, password });
    await newUser.save();
    response.data = newUser._id;
    sendResponse(response)
  } catch (error) {
    response.code = 500;
    response.msg = error.message;
    sendResponse(response)
  }
}

// 登录
async function login(req, res) {
  const { username, password } = req.body;
  const response = {
    res,
    code: 200,
    data: null,
    msg: '',
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      response.code = 400;
      response.msg = 'Invalid username or password';
      return sendResponse(response)
    }
    const result = await bcrypt.compare(password, user.password)
    if (result) {
      // 密码匹配，创建令牌
      const token = generateToken({
        userId: user._id,
        username: user.username
      });
      // 将 JWT 存储在 Cookie 中
      res.cookie('token', token, {
        httpOnly: true, // 设置 httpOnly 防止 JavaScript 访问 Cookie
        // 其他可选的设置
        // secure: true, // 仅在 HTTPS 连接中传输 Cookie
        // domain: 'yourdomain.com', // 设置 Cookie 的域
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000), // 设置过期时间
      });
      response.msg = 'Login successful';
      return sendResponse(response)
    } else {
      response.code = 401;
      response.msg = 'Invalid username or password';
      return sendResponse(response)
    }
  } catch (error) {
    response.code = 500;
    response.msg = error.message;
    return sendResponse(response)
  }
}

// 登出
async function logout(req, res) {
  res.cookie('token', '', { expires: new Date(0) });
  sendResponse({
    res,
    code: 200,
    data: null,
    msg: 'Logged out successfully'
  })
}

module.exports = { registerUser, login, logout };
