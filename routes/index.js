var express = require('express')
    , router = express.Router()
    , passport = require('passport')
    , User = require('./../models/user');

var options = {
    failureRedirect: '/',
    failureFlash: true
};

/* GET Login page. */
router
    .get('/', function (req, res, next) {
        res.render('login', {title: 'Login Led Panel'});
    })

    .post('/', passport.authenticate('local', options), function (req, res) {
        res.redirect('/media');
    });

router
    .get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

module.exports = router;