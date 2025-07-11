const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
  ingredients: [String],
  steps: [String],
  isApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
