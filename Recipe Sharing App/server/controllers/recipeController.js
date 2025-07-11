const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
};

exports.createRecipe = async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.status(201).json(newRecipe);
};

exports.approveRecipe = async (req, res) => {
  await Recipe.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.send('Approved');
};