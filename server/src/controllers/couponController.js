const Coupon = require('../models/Coupon')

// POST /api/coupons/validate  (customer)
const validateCoupon = async (req, res) => {
  try {
    const { code, orderTotal } = req.body

    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required' })
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase().trim() })

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid coupon code' })
    }

    if (!coupon.isActive) {
      return res.status(400).json({ success: false, message: 'This coupon is no longer active' })
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return res.status(400).json({ success: false, message: 'This coupon has expired' })
    }

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: 'Coupon usage limit reached' })
    }

    if (orderTotal < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order of ₹${coupon.minOrderAmount} required`
      })
    }

    let discount = 0
    if (coupon.discountType === 'percent') {
      discount = Math.round((orderTotal * coupon.discountValue) / 100)
      if (coupon.maxDiscount !== null) {
        discount = Math.min(discount, coupon.maxDiscount)
      }
    } else {
      discount = coupon.discountValue
    }

    discount = Math.min(discount, orderTotal)

    res.json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discount,
        description: coupon.description
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Admin: list all
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 })
    res.json({ success: true, coupons })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Admin: create
const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create({
      ...req.body,
      code: req.body.code?.toUpperCase().trim()
    })
    res.status(201).json({ success: true, coupon })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}

// Admin: update
const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { ...req.body, code: req.body.code?.toUpperCase().trim() },
      { new: true }
    )
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' })
    }
    res.json({ success: true, coupon })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Admin: delete
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id)
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' })
    }
    res.json({ success: true, message: 'Coupon deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Increment usedCount after successful order (called from order controller later)
const incrementCouponUsage = async (code) => {
  if (!code) return
  await Coupon.findOneAndUpdate(
    { code: code.toUpperCase() },
    { $inc: { usedCount: 1 } }
  )
}

module.exports = {
  validateCoupon,
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  incrementCouponUsage
} 














