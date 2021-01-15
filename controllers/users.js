const User = require('../models/user');


module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

module.exports.register = async(req, res) => {
    try {
        // console.log(req.file)
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        if(req.file) {
        user.url = req.file.path;
        }
        // console.log(user.url);
        const registeredUser = await User.register(user, password);
        // console.log(registeredUser)
        req.login(registeredUser, err => {
        if(err) return next(err);
        req.flash('success', `Thanks for joining us ${registeredUser.username}!`);
        res.redirect('/posts');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLogin = (req,res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back, we missed you!`);
    const redirectUrl = req.session.returnTo || '/posts';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Adios hermano!')
    res.redirect('/')
};