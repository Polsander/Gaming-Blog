const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users')
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route('/register')
    .get(users.renderRegister)
    .post(upload.single('image'), catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }), users.login)

router.get('/logout', users.logout);

module.exports = router;