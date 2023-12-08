const authRoutes = require('./authRoutes');
const marketRoutes = require('./marketRoutes');

function loadRoutes(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/market', marketRoutes);
}

module.exports = loadRoutes;
