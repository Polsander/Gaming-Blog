const Post = require('../models/post');
const {validateSubmission, getSummary, validateComments, postDate, 
    getReadTime, isLoggedIn, isAuthor, isCommentAuthor} = require('../middleware');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const posts = await Post.find({}).populate('author');
    res.render('posts/index', {posts})
};

module.exports.renderNewForm = (req, res) => {
    res.render('posts/new');
    console.log(req.user)
};

module.exports.createPost = async (req, res) => {
    const post  = new Post(req.body.post);
    post.url = req.file.path;
    post.filename = req.file.filename;
    console.log(post.filename);
    post.author = req.user._id;
    getReadTime(req.body.post.body);
    getSummary(req.body.post.body);
    post.summary = summary;
    post.readTime = readTime;
    post.date = req.body.date;
    await post.save();
    req.flash('success', 'Nice post!')
    res.redirect(`posts/${post._id}`)
};

module.exports.showPost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate({
        path:'comments',
        populate: {
            path:'author'
        }
    }).populate('author');
    if(!post) {
        req.flash('error', "We couldn't find that page...")
        res.redirect('/posts')
    }
    res.render(`posts/show`, { post })
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id)
    if(!post) {
        req.flash('error', "We couldn't find that page...")
        return res.redirect('/posts')
    }
    res.render('posts/edit', { post })
};

module.exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const old = await Post.findById(id);
    if(req.file){
        const newUrl = req.file.path
        req.body.post.url = newUrl;
        await cloudinary.uploader.destroy(old.filename);
    };
    const post = await Post.findByIdAndUpdate(id, { ...req.body.post });
    // const postImg = await Post.findByIdAndUpdate({id}, {post.image: req.file.path})
    await post.save();
    req.flash('success', 'Nice touch!')
    res.redirect(`/posts/${id}`);
};

module.exports.deletePost = async (req,res) => {
    const {id} = req.params;
    const post = await Post.findById(id);
    await Post.findByIdAndDelete(id);
    req.flash('success', 'Awwwww, you deleted your post....');
    res.redirect('/posts');
};