const { Router } = require('express');
const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controller');
const multer = require('../middleware/multer')

router.post('', multer, postCtrl.create);
router.post('/comments', postCtrl.createComments);
router.post('/:id/like', postCtrl.like)
router.get('', postCtrl.findAll);
router.get('/:id', postCtrl.findById);
router.get('/:id/comments', postCtrl.findAllComments)



module.exports = router;