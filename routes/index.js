var express = require('express')
    , router = express.Router()
    , passport = require('passport')
    , Users = require('./../models/users');

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

/* GET add user
 router
 .get('/new-user', function (req, res, next) {
 res.render('user/index', {title: 'Add new user'});
 })

 .post('/new-user', function (req, res) {

 Users.register(new Users({
 username: req.body.username,
 fullname: req.body.fullname,
 createdDate: Date.now()
 }), req.body.password, function (err, user) {

 if (err) {
 throw err;
 }

 res.redirect('/video');
 });
 });*/


module.exports = router;