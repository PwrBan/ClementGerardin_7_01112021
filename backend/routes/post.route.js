const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controller');
const multer = require('../middleware/multer')

router.post('/post', multer, postCtrl.createPost);
router.get('/post', postCtrl.findAllPosts);


module.exports = router;