const express = require('express');
const { nextTick } = require('process');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const posts = require('../controllers/posts')
const comments = require('../controllers/comments')

const catchAsync = require('../utils/catchAsync')
const {validateSubmission, getSummary, validateComments, postDate, 
    getReadTime, isLoggedIn, isAuthor, isCommentAuthor} = require('../middleware');

//================Create Comment post Request & Delete =========
router.post('/:id/comment', isLoggedIn, validateComments, postDate, catchAsync (comments.createComment));

router.delete('/:id/comment/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment));


module.exports = router;