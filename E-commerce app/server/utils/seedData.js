// server/utils/seedData.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');
const connectDB = require('../config/database');

dotenv.config();

const seedProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality sound with noise cancellation.',
    price: 199.99,
    image: 'https://via.placeholder.com/300',
    category: 'electronics',
    brand: 'Sony',
    countInStock: 10,
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable and durable running shoes.',
    price: 89.99,
    image: 'https://via.placeholder.com/300',
    category: 'sports',
    brand: 'Nike',
    countInStock: 25,
  },
  {
    name: 'Coffee Maker',
    description: 'Brew perfect coffee every time.',
    price: 59.99,
    image: 'https://via.placeholder.com/300',
    category: 'home',
    brand: 'Philips',
    countInStock: 8,
  }
];

const seed = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });
    await createdUser.save();

    const sampleProducts = seedProducts.map(product => ({
      ...product,
    }));
    await Product.insertMany(sampleProducts);

    console.log('✅ Database seeded!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
