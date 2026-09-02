const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash,
      phone: phone || ''
    })

    // Generate token
    const token = generateToken(user._id)

    // Set cookie
    res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        _id:   user._id,
        name:  user.name,
        email: user.email,
        phone: user.phone,
        role:  user.role
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' })
    }

    // Check if active
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is disabled' })
    }

    // Generate token
    const token = generateToken(user._id)

    // Set cookie
    res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        _id:   user._id,
        name:  user.name,
        email: user.email,
        phone: user.phone,
        role:  user.role
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/auth/logout
const logout = async (req, res) => {
  res.clearCookie('token')
  res.json({ success: true, message: 'Logged out successfully' })
}

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { register, login, logout, getMe }