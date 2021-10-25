const Comment = require('../models/comment-model')

createComment = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a comment',
        })
    }

    const comment = new Comment(body)

    if (!comment) {
        return res.status(400).json({ success: false, error: err })
    }

    comment
        .save()
        .then(async () => {
            await Comment.find({},(err, comments) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                return res.status(200).json({ success: true, data: comments })
            }).catch(err => console.log(err))
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Comment not created!',
            })
        })
}

updateComment = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Comment.findOne({ _id: req.params.id }, (err, comment) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Comment not found!',
            })
        }
        // comment.replies = body.replies
        Comment
            .findOneAndUpdate({ _id: req.params.id }, {$push: {replies:body}})
            .then(async () => {
                await Comment.find({},(err, comments) => {
                    if (err) {
                        return res.status(400).json({ success: false, error: err })
                    }
                    return res.status(200).json({ success: true, data: comments })
                }).catch(err => console.log(err))
            })
            .catch(error => {
                console.log(error)
                return res.status(404).json({
                    error,
                    message: 'Comment not updated!',
                })
            })
    })
}

getComment = async (req, res) => {
    await Comment.find({}, (err, comments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: comments })
    }).catch(err => console.log(err))
}

module.exports = {
    createComment,
    updateComment,
    getComment
}
