const Product = require('../models/Product')
const Category = require('../models/Category')

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, search, featured } = req.query

    let filter = { isAvailable: true }

    // Filter by category slug
    if (category && category !== 'all') {
      const cat = await Category.findOne({ slug: category })
      if (cat) filter.category = cat._id
    }

    // Filter by search
    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }

    // Filter featured only
    if (featured === 'true') {
      filter.isFeatured = true
    }

    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })

    res.json({ success: true, products })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/products/:slug
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name slug')

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    res.json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1 })
    res.json({ success: true, categories })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getProducts, getProductBySlug, getCategories }