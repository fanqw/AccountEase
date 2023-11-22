// 自动加载 .env 文件
require('dotenv').config();

const mongoose = require('mongoose');

let prefix = 'DEV';
if (process.env.NODE_ENV === 'prod') {
  prefix = 'PROD';
}

// 从环境变量中获取数据库用户名和密码
const dbHost = process.env[`${prefix}_DB_HOST`];
const dbPort = process.env[`${prefix}_DB_PORT`];
const dbName = process.env[`${prefix}_DB_NAME`];
const dbUser = process.env[`${prefix}_DB_USER`];
const dbPwd = encodeURIComponent(process.env[`${prefix}_DB_PWD`]);

// MongoDB 连接字符串
const dbUrl = `mongodb://${dbUser}:${dbPwd}@${dbHost}:${dbPort}/${dbName}`;

// 连接 MongoDB 数据库
mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

module.exports = mongoose.connection; // 导出连接实例
