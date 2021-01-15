const express = require('express');
const { nextTick } = require('process');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const posts = require('../controllers/posts')
const comments = require('../controllers/comments')
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const catchAsync = require('../utils/catchAsync')
const { validateSubmission, getSummary, validateComments, postDate,
    getReadTime, isLoggedIn, isAuthor, isCommentAuthor, isAdmin } = require('../middleware');

router.route('/')
    .get(catchAsync(posts.index))
    .post(isLoggedIn, upload.single('image'), validateSubmission, postDate, catchAsync(posts.createPost))


//========================================
router.get('/new', isLoggedIn, posts.renderNewForm);
//=========================================

router.route('/:id')
    .get(catchAsync(posts.showPost))
    .put(isLoggedIn, isAuthor, upload.single('image'), catchAsync(posts.updatePost))
    .delete(isLoggedIn, isAuthor, catchAsync(posts.deletePost))

router.get('/:id/edit', isLoggedIn, catchAsync(posts.renderEditForm));


module.exports = router;
