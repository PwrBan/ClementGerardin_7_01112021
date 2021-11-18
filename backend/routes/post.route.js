const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controller');
const multer = require('../middleware/multer')


router.get('/post', postCtrl.findAllPosts);
router.post('/post', multer, postCtrl.createPost);

module.exports = router;