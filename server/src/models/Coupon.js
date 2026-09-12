const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: { type: String, default: '' },
  discountType: {
    type: String,
    enum: ['percent', 'fixed'],
    required: true
  },
  discountValue: { type: Number, required: true }, // 10 = 10% or ₹10
  minOrderAmount: { type: Number, default: 0 },
  maxDiscount: { type: Number, default: null }, // for percent coupons
  usageLimit: { type: Number, default: null }, // null = unlimited
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date, default: null },
}, { timestamps: true })

module.exports = mongoose.model('Coupon', couponSchema)