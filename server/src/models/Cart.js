const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  product:      { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:         { type: String, required: true },
  price:        { type: Number, required: true },
  emoji:        { type: String, default: '☕' },
  quantity:     { type: Number, required: true, min: 1 },
  variant:      { type: String, default: '' },
})

const cartSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestId:      { type: String },
  items:        [cartItemSchema],
  totalItems:   { type: Number, default: 0 },
  totalPrice:   { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)