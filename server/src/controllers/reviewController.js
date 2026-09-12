const Review = require('../models/Review')
const Product = require('../models/Product')

// GET /api/reviews/product/:productId
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true
    })
      .populate('user', 'name')
      .sort({ createdAt: -1 })

    const avgRating = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0

    res.json({
      success: true,
      reviews,
      avgRating: Number(avgRating),
      totalReviews: reviews.length
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body

    if (!productId || !rating) {
      return res.status(400).json({ success: false, message: 'Product and rating are required' })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    // Check if user already reviewed
    const existing = await Review.findOne({ product: productId, user: req.userId })
    if (existing) {
      return res.status(400).json({ success: false, message: 'You already reviewed this product' })
    }

    const review = await Review.create({
      product: productId,
      user: req.userId,
      rating,
      comment: comment || ''
    })

    await review.populate('user', 'name')

    res.status(201).json({ success: true, review })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You already reviewed this product' })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE /api/reviews/:id (own review or admin)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' })
    }

    // Only owner or admin
    if (review.user.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }

    await review.deleteOne()
    res.json({ success: true, message: 'Review deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Admin: get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('product', 'name emoji')
      .sort({ createdAt: -1 })
    res.json({ success: true, reviews })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getProductReviews,
  createReview,
  deleteReview,
  getAllReviews
}