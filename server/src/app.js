const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const productRoutes  = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const authRoutes     = require('./routes/authRoutes')

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))

// Routes
app.use('/api/auth',       authRoutes)
app.use('/api/products',   productRoutes)
app.use('/api/categories', categoryRoutes)

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