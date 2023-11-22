// 自动加载 .env 文件
require('dotenv').config();

const express = require('express');
const applyMiddle = require('./src/middleware')
const loadRoutes = require('./src/routes');
const dbConnection = require('./db'); // 引入数据库连接模块

const app = new express()

// 在应用启动时建立数据库连接
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
});

// 使用中间件
applyMiddle(app);

// 加载所有路由
loadRoutes(app);

