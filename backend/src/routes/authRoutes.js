const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// 用户注册
router.post('/register', authController.registerUser);

// 用户登录
router.post('/login', authController.login);

// 用户登出
router.post('/logout', authController.logout);

module.exports = router;
