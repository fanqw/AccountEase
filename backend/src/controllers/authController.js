const bcrypt = require('bcryptjs');
const User = require('@/models/user');
const { generateToken } = require('@/utils/jwt')

// 注册新用户
async function registerUser(req, res) {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(200).json({
        code: -1,
        data: null,
        msg: '用户名已存在'
      })
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).json({
      code: 0,
      data: newUser._id,
      msg: ''
    })
  } catch (error) {
    res.status(500).json({
      code: -1,
      data: null,
      msg: error.message
    })
  }
}

// 登录
async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(200).json({
        code: -1,
        data: null,
        msg: 'Invalid username or password'
      })
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
      return res.status(200).json({
        code: 0,
        data: token,
        msg: 'Login successful'
      })
    } else {
      return res.status(200).json({
        code: -1,
        data: null,
        msg: 'Invalid username or password'
      })
    }
  } catch (error) {
    return res.status(500).json({
      code: -1,
      data: null,
      msg: error.message
    })
  }
}

// 登出
async function logout(req, res) {
  res.cookie('token', '', { expires: new Date(0) });
  res.status(200).json({
    code: 0,
    data: null,
    msg: 'Logged out successfully'
  })
}

module.exports = { registerUser, login, logout };
