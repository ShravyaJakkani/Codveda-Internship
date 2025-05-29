const express = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blog');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  const { title, content, author,pin } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const blog = new Blog({ title, content, author, image,pin });
  await blog.save();
  res.status(201).json(blog);
});

router.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});


router.delete('/:id', async (req, res) => {
  const { pin } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: "Blog not found" });

  if (blog.pin !== pin) {
    return res.status(403).json({ message: "Invalid PIN" });
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Blog deleted successfully" });
});


module.exports = router;
