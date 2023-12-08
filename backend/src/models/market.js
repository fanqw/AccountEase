const mongoose = require('mongoose');

// 定义市场信息的 Schema
const MarketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  manager: String,
  mobile: String,
  address: String,
  location: {
    type: { type: String },
    coordinates: []
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

// 添加地理位置的索引
MarketSchema.index({ location: '2dsphere' });

// 创建 Market model
const Market = mongoose.model('Market', MarketSchema);

module.exports = Market;
