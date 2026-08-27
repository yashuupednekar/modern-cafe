const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductBySlug,
  getCategories
} = require('../controllers/productController')

// Product routes
router.get('/', getProducts)
router.get('/:slug', getProductBySlug)

module.exports = router