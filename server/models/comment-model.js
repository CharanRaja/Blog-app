const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const replySchema = new Schema(
    {
        message: { type: String, required: true },
        time: { type: Date, required: true },
    }
)

const Comment = new Schema(
    {
        comment: { type: String, required: true },
        replies: { type: [replySchema], required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('comments', Comment)
