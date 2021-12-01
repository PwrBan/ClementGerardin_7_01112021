const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controller');
const multer = require('../middleware/multer')
const auth = require('../middleware/auth')

router.post('', multer, postCtrl.create);
router.post('/comments', postCtrl.createComments);
router.post('/:id/like', postCtrl.like);
router.get('', postCtrl.findAll);
router.get('/:id', postCtrl.findById);
router.get('/:id/comments', postCtrl.findAllComments);
router.get('/:id/like', postCtrl.findAllLikes);
router.put('/:id/like', postCtrl.like);
router.delete('/:id',auth, postCtrl.delete)



module.exports = router;