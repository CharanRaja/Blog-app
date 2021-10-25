const express = require('express')

const CommentCtrl = require('../controllers/comment-ctrl')

const router = express.Router()

router.post('/comments', CommentCtrl.createComment)
router.put('/comments/:id', CommentCtrl.updateComment)
router.get('/comments', CommentCtrl.getComment)

module.exports = router
