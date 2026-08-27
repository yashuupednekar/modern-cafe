const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  price: { type: Number, required: true },
})

const productSchema = new mongoose.Schema({
  name:              { type: String, required: true, trim: true },
  slug:              { type: String, required: true, unique: true, lowercase: true },
  description:       { type: String, required: true },
  category:          { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price:             { type: Number, required: true },
  variants:          [variantSchema],
  images:            [{ type: String }],
  emoji:             { type: String, default: '☕' },
  ingredients:       [{ type: String }],
  dietary:           {
    isVeg:      { type: Boolean, default: true },
    isVegan:    { type: Boolean, default: false },
    isGlutenFree: { type: Boolean, default: false },
  },
  stock:             { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 5 },
  isAvailable:       { type: Boolean, default: true },
  isFeatured:        { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)