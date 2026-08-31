const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')
const Category = require('../models/Category')

// GET /api/admin/dashboard
const getDashboard = async (req, res) => {
  try {
    const totalOrders    = await Order.countDocuments()
    const totalProducts  = await Product.countDocuments()
    const totalUsers     = await User.countDocuments({ role: 'customer' })
    const totalRevenue   = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ])
    const activeOrders   = await Order.countDocuments({
      orderStatus: { $in: ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery'] }
    })
    const lowStockProducts = await Product.find({
      $expr: { $lte: ['$stock', '$lowStockThreshold'] }
    }).select('name stock lowStockThreshold emoji')

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')

    res.json({
      success: true,
      dashboard: {
        totalOrders,
        totalProducts,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        activeOrders,
        lowStockProducts,
        recentOrders
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/admin/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
    res.json({ success: true, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// PUT /api/admin/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    ).populate('user', 'name email')

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }
    res.json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/admin/products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
    res.json({ success: true, products })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/admin/products
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// PUT /api/admin/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE /api/admin/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.json({ success: true, message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// PUT /api/admin/products/:id/stock
const updateStock = async (req, res) => {
  try {
    const { stock } = req.body
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    )
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/admin/customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' })
      .select('-passwordHash')
      .sort({ createdAt: -1 })
    res.json({ success: true, customers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getDashboard,
  getAllOrders,
  updateOrderStatus,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getAllCustomers
}