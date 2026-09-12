const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, please login' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-passwordHash')

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    req.userId = user._id.toString()
    req.userRole = user.role
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

const adminOnly = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' })
    }
    next()
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { protect, adminOnly }