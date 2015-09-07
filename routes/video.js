var express = require('express')
    , passport = require('passport')
    , router = express.Router();

/* GET list video. */
router.get('/', function (req, res, next) {

    res.render('video/index', {
        title: 'List Video',
        username: req.session.passport.user
    });
});

module.exports = router;