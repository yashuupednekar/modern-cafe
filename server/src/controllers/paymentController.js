const Razorpay = require('razorpay')
const crypto = require('crypto')
const Order = require('../models/Order')

const getRazorpay = () => new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// POST /api/payments/create-order
const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    const options = {
      amount:   Math.round(order.total * 100), // in paise
      currency: 'INR',
      receipt:  `receipt_${orderId}`,
    }

    const razorpayOrder = await getRazorpay().orders.create(options)

    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount:          razorpayOrder.amount,
      currency:        razorpayOrder.currency,
      keyId:           process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/payments/verify
const verifyPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    } = req.body

    // Verify signature
    const body      = razorpayOrderId + '|' + razorpayPaymentId
    const expected  = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')

    if (expected !== razorpaySignature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' })
    }

    // Update order
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'paid',
        orderStatus:   'confirmed',
        paymentId:     razorpayPaymentId,
      },
      { new: true }
    )

    res.json({ success: true, message: 'Payment verified successfully', order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { createPaymentOrder, verifyPayment }