const authRoutes = require('./authRoutes');
// 还可以导入其他的路由文件

function loadRoutes(app) {
  app.use('/api/auth', authRoutes);
  // 在这里挂载其他路由
}

module.exports = loadRoutes;
