const Order = require('../models/Order')
const Product = require('../models/Product')

// POST /api/orders — create order
const createOrder = async (req, res) => {
  try {
    const {
      items, address, fulfillment,
      paymentMethod, subtotal, deliveryFee, tax, total, notes
    } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' })
    }

    // Verify stock for each item
    for (const item of items) {
      const product = await Product.findById(item.product)
      if (!product) {
        return res.status(400).json({ success: false, message: `Product not found: ${item.name}` })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${item.name}` })
      }
    }

    // Decrement stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      })
    }

    // Create order
    const order = await Order.create({
      user:          req.userId,
      items,
      address,
      fulfillment:   fulfillment   || 'delivery',
      paymentMethod: paymentMethod || 'cod',
      subtotal,
      deliveryFee,
      tax,
      total,
      notes:         notes || ''
    })

    res.status(201).json({ success: true, message: 'Order placed successfully', order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/orders — get user orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 })
    res.json({ success: true, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/orders/:id — get single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.userId })
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }
    res.json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { createOrder, getMyOrders, getOrderById }