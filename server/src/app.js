const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const productRoutes  = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const authRoutes     = require('./routes/authRoutes')
const orderRoutes    = require('./routes/orderRoutes')
const adminRoutes    = require('./routes/adminRoutes')
const paymentRoutes  = require('./routes/paymentRoutes')
const couponRoutes = require('./routes/couponRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://modern-cafe-delta.vercel.app'
  ],
  credentials: true
}))

// Routes
app.use('/api/auth',       authRoutes)
app.use('/api/products',   productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders',     orderRoutes)
app.use('/api/admin',      adminRoutes)
app.use('/api/payments',   paymentRoutes)
app.use('/api/coupons', couponRoutes)
app.use('/api/reviews', reviewRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Modern Cafe API is running ✅' })
})

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Atlas connected ✅')
  } catch (error) {
    console.error('MongoDB connection failed ❌', error.message)
    process.exit(1)
  }
}

connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`)
})