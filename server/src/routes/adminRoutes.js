const express = require('express')
const router = express.Router()
const {
  getDashboard,
  getAllOrders,
  updateOrderStatus,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getAllCustomers
} = require('../controllers/adminController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

// All admin routes are protected
router.use(protect, adminOnly)

// Dashboard
router.get('/dashboard', getDashboard)

// Orders
router.get('/orders', getAllOrders)
router.put('/orders/:id/status', updateOrderStatus)

// Products
router.get('/products', getAllProducts)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)
router.put('/products/:id/stock', updateStock)

// Customers
router.get('/customers', getAllCustomers)

module.exports = router