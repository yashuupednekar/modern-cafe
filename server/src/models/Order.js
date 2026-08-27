const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  emoji:    { type: String, default: '☕' },
  quantity: { type: Number, required: true },
  variant:  { type: String, default: '' },
})

const orderSchema = new mongoose.Schema({
  user:            { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:           [orderItemSchema],
  address: {
    label:   { type: String },
    street:  { type: String, required: true },
    city:    { type: String, required: true },
    state:   { type: String, required: true },
    pincode: { type: String, required: true },
    phone:   { type: String, required: true },
  },
  fulfillment:     { type: String, enum: ['delivery', 'pickup'], default: 'delivery' },
  orderStatus:     { type: String, enum: ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'], default: 'pending' },
  paymentStatus:   { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  paymentMethod:   { type: String, enum: ['razorpay', 'stripe', 'cod'], default: 'cod' },
  paymentId:       { type: String, default: '' },
  subtotal:        { type: Number, required: true },
  deliveryFee:     { type: Number, default: 0 },
  tax:             { type: Number, default: 0 },
  discount:        { type: Number, default: 0 },
  total:           { type: Number, required: true },
  couponCode:      { type: String, default: '' },
  notes:           { type: String, default: '' },
  estimatedTime:   { type: String, default: '30-45 mins' },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)