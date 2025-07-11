const express = require('express');
const router = express.Router();
const { getAllRecipes, createRecipe, approveRecipe } = require('../controllers/recipeController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', getAllRecipes);
router.post('/', createRecipe);
router.put('/:id/approve', verifyToken, approveRecipe);

module.exports = router;