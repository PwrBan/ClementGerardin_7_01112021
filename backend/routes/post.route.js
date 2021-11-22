const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controller');
const multer = require('../middleware/multer')

router.post('', multer, postCtrl.create);
router.post('/comments', postCtrl.createComments)
router.get('', postCtrl.findAll);
router.get('/:id', postCtrl.findById);



module.exports = router;