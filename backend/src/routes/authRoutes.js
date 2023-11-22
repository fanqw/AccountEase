const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// 用户注册
router.post('/register', authController.registerUser);

module.exports = router;
