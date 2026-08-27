const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const Category = require('../models/Category')
const Product = require('../models/Product')

const categories = [
  { name: 'Coffee',    slug: 'coffee',    sortOrder: 1 },
  { name: 'Bakery',    slug: 'bakery',    sortOrder: 2 },
  { name: 'Dessert',   slug: 'dessert',   sortOrder: 3 },
  { name: 'Specialty', slug: 'specialty', sortOrder: 4 },
]

const products = [
  { name: 'Espresso',         slug: 'espresso',         description: 'Rich and bold single shot espresso made from premium arabica beans.',           category: 'coffee',    price: 120, emoji: '☕', stock: 50, isFeatured: true  },
  { name: 'Cappuccino',       slug: 'cappuccino',       description: 'Perfectly balanced espresso with steamed milk and thick foam.',                  category: 'coffee',    price: 180, emoji: '🍵', stock: 50, isFeatured: true  },
  { name: 'Cold Brew',        slug: 'cold-brew',        description: 'Slow steeped cold brew coffee served over ice. Smooth and refreshing.',          category: 'coffee',    price: 220, emoji: '🧊', stock: 30, isFeatured: true  },
  { name: 'Latte',            slug: 'latte',            description: 'Smooth espresso with lots of steamed milk and a light layer of foam.',           category: 'coffee',    price: 190, emoji: '☕', stock: 50, isFeatured: false },
  { name: 'Croissant',        slug: 'croissant',        description: 'Freshly baked buttery croissant with a golden flaky crust.',                     category: 'bakery',    price: 150, emoji: '🥐', stock: 20, isFeatured: true  },
  { name: 'Blueberry Muffin', slug: 'blueberry-muffin', description: 'Soft muffin loaded with fresh blueberries and a sugar crust top.',              category: 'bakery',    price: 130, emoji: '🧁', stock: 20, isFeatured: false },
  { name: 'Banana Bread',     slug: 'banana-bread',     description: 'Moist homestyle banana bread baked fresh every morning.',                        category: 'bakery',    price: 160, emoji: '🍞', stock: 15, isFeatured: false },
  { name: 'Cheesecake',       slug: 'cheesecake',       description: 'Creamy New York style cheesecake with a buttery graham cracker crust.',          category: 'dessert',   price: 280, emoji: '🍰', stock: 10, isFeatured: true  },
  { name: 'Chocolate Brownie',slug: 'chocolate-brownie',description: 'Fudgy dark chocolate brownie with a crispy top and gooey centre.',               category: 'dessert',   price: 180, emoji: '🍫', stock: 15, isFeatured: false },
  { name: 'Tiramisu',         slug: 'tiramisu',         description: 'Classic Italian tiramisu with mascarpone and espresso soaked ladyfingers.',       category: 'dessert',   price: 260, emoji: '🍮', stock: 10, isFeatured: false },
  { name: 'Matcha Latte',     slug: 'matcha-latte',     description: 'Premium Japanese matcha blended with steamed oat milk.',                         category: 'specialty', price: 200, emoji: '🍃', stock: 30, isFeatured: true  },
  { name: 'Turmeric Latte',   slug: 'turmeric-latte',   description: 'Golden milk latte with turmeric, ginger and a hint of black pepper.',            category: 'specialty', price: 190, emoji: '🌿', stock: 30, isFeatured: false },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected ✅')

    // Clear existing data
    await Category.deleteMany()
    await Product.deleteMany()
    console.log('Cleared existing data ✅')

    // Insert categories
    const insertedCategories = await Category.insertMany(categories)
    console.log(`Inserted ${insertedCategories.length} categories ✅`)

    // Map category slug to _id
    const categoryMap = {}
    insertedCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id
    })

    // Insert products with correct category _id
    const productsWithCategory = products.map(p => ({
      ...p,
      category: categoryMap[p.category]
    }))

    const insertedProducts = await Product.insertMany(productsWithCategory)
    console.log(`Inserted ${insertedProducts.length} products ✅`)

    console.log('Database seeded successfully! 🎉')
    process.exit(0)
  } catch (error) {
    console.error('Seed failed ❌', error.message)
    process.exit(1)
  }
}

seed()