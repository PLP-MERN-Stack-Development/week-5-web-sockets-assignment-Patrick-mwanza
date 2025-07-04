const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, upload.single('image'), createPost);
router.put('/:id', protect, upload.single('image'), updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
