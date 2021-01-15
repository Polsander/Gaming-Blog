const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Comment = require('./comment')

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    readTime: String,
    body: {
        type: String,
        required: true
    },
    date: String,
    url: String,
    filename: String,
    summary: String,

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

PostSchema.post('findOneAndDelete', async function (doc) {
if(doc){
    await Comment.deleteMany({
        _id: {
            $in: doc.comments
        }
    })
    }
})

module.exports = mongoose.model('Post', PostSchema)