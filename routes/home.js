const express = require('express');
const router = express.Router();
const Post = require('../models/post');


router.get('/', async(req, res) => {
    const posts = await Post.find().sort({_id: -1}).limit(3);
    const cyberpunk = 'https://res-console.cloudinary.com/brothersingaming/thumbnails/v1/image/upload/v1609978867/QnJvdGhlcnNJbkdhbWluZy9wenU3d3dyNDJhem5xcmltY3Yybw==/preview'
    res.render('home', {posts, cyberpunk});
});





router.get('/about', (req, res) => {
    res.render('aboutUs');
});



// router.route('/')
//     .get(catchAsync(campgrounds.index))
//     .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
module.exports = router;