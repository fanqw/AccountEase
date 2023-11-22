const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// 在保存用户之前，对密码进行加密处理
userSchema.pre('save', async function (next) {
  const user = this;
  // 如果密码没有被修改，直接进入下一个中间件
  if (!user.isModified('password')) return next();

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
