const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.createComment = async(req, res) => {
    const post = await Post.findById(req.params.id);
    console.log(post)
    const comment = await new Comment(req.body.comment);
    comment.author = req.user._id;
    post.comments.push(comment);
    comment.date = req.body.date;
    await comment.save();
    await post.save();
    req.flash('success', 'Nice comment!')
    res.redirect(`/posts/${post._id}`)
};

module.exports.deleteComment = async(req, res) => {
    const {id, commentId} = req.params;
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Awww, you deleted your comment...');
    res.redirect(`/posts/${id}`)
};


