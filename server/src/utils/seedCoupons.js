require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })
const mongoose = require('mongoose')
const Coupon = require('../models/Coupon')

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected ✅')

    await Coupon.deleteMany()

    await Coupon.insertMany([
      {
        code: 'WELCOME10',
        description: '10% off on orders above ₹200',
        discountType: 'percent',
        discountValue: 10,
        minOrderAmount: 200,
        maxDiscount: 100,
        usageLimit: 100,
        isActive: true
      },
      {
        code: 'FLAT50',
        description: 'Flat ₹50 off on orders above ₹300',
        discountType: 'fixed',
        discountValue: 50,
        minOrderAmount: 300,
        isActive: true
      },
      {
        code: 'CAFE20',
        description: '20% off — max ₹150',
        discountType: 'percent',
        discountValue: 20,
        minOrderAmount: 250,
        maxDiscount: 150,
        isActive: true
      }
    ])

    console.log('Coupons seeded ✅')
    console.log('Try: WELCOME10, FLAT50, CAFE20')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seed()