
const {postSchema} = require('./schemas.js');
const Post = require('./models/post');
const Comment = require('./models/comment')
const {commentSchema} = require('./schemas.js')
const ExpressError = require('./utils/ExpressError.js');

//========Validation Middleware=========//
module.exports.validateSubmission = (req, res, next) => {
    const {error} = postSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
    }; // This one was for validating new posts as well as edit posts


module.exports.validateComments = (req, res, next) => {
    const {error} = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
    }; // For validating Comments

//========================================================
    module.exports.postDate = (req, res, next) => {
        req.body.date = new Date(Date.now()).toLocaleDateString();
        next();
    }


// ====================== IS LOGGED IN ===========================================

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user)
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must sign in first!');
        return res.redirect('/users/login')
    }
    next();
}

//=============IS AUTHOR IN============
module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    const post = await Post.findById(id);
    if (!post.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/posts/${id}`);
    }
    next();
}

module.exports.isCommentAuthor = async(req, res, next) =>{
    const {id, commentId} = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/posts/${id}`);
    }
    next();
}

// ========================== READ TIME FUNCTION ======================

    module.exports.getReadTime = function(post) {
    char = post.length
    i = char/(190*5)
    mins = Math.floor(i);
    if(mins !== 0) {
    readTime = `${mins} min read`
    return readTime
    } else{
    readTime = `less than a min read`
    return readTime
    }
    };

// ========================= Synopsis function =========================

module.exports.getSummary = function(text) {
    summary = text.slice(0, 50) + (text.length > 50 ? "..." : "");
    return summary;
}

//=================================Admin Check==================
module.exports.isAdmin = (req,res,next)=> {
    if (req.user.username === ('Oliver')) {
        next();
    }
    
    else if (req.user.username === ('Fernando')) {
        next();
    }

    else {
    req.flash('error', 'You do not have Administrative Privledges');
        return res.redirect('/posts')
    }
};