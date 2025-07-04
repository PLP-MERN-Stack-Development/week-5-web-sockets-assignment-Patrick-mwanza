const Post = require('../models/Post');

const getPosts = async (req, res) => {
  const posts = await Post.find().populate('category').populate('user', 'username');
  res.json(posts);
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('category').populate('user', 'username');
  res.json(post);
};

const createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? req.file.filename : null;

  const post = await Post.create({
    title,
    content,
    category,
    image,
    user: req.user,
  });

  res.status(201).json(post);
};

const updatePost = async (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? req.file.filename : undefined;

  const updatedFields = { title, content, category };
  if (image) updatedFields.image = image;

  const post = await Post.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
  res.json(post);
};

const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
