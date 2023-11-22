const User = require('../models/user');
const { sendResponse } = require('../utils/responseHandler')

// 注册新用户
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return sendResponse(res, 400, "用户名已存在")
    }

    const newUser = new User({ username, password });
    await newUser.save();

    sendResponse(res, 201, "注册成功")
  } catch (error) {
    sendResponse(res, 500, error.message)
  }
}

module.exports = { registerUser };
