const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  label:    { type: String, default: 'Home' },
  street:   { type: String, required: true },
  city:     { type: String, required: true },
  state:    { type: String, required: true },
  pincode:  { type: String, required: true },
  phone:    { type: String, required: true },
})

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  phone:        { type: String, default: '' },
  role:         { type: String, enum: ['customer', 'admin', 'staff'], default: 'customer' },
  addresses:    [addressSchema],
  isActive:     { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)