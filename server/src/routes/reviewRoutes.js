const express = require('express')
const router = express.Router()
const {
  getProductReviews,
  createReview,
  deleteReview,
  getAllReviews
} = require('../controllers/reviewController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.get('/product/:productId', getProductReviews)
router.post('/', protect, createReview)
router.delete('/:id', protect, deleteReview)
router.get('/', protect, adminOnly, getAllReviews)

module.exports = router