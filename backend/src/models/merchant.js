const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  mobile: String,
  address: String,
  creditRating: {
    type: Number,
    default: 0
  },
  market: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Market',
    required: true
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

const Merchant = mongoose.model('Merchant', MerchantSchema);

module.exports = Merchant;
