var express = require('express')
    , mongoose = require('mongoose')
    , Media = mongoose.model('Media')
    , router = express.Router()
    , omx = require('omxcontrol');


/* GET view media */
router.get('/view/:id', function (req, res, next) {

        Media.findById(req.params.id).exec(function (err, media) {

            res.render('raspberry/index', {
                title: 'Raspberry View',
                username: req.session.passport.user,
                media: media
            });

        });
    });

/* play media */
router.get('/play/:id', function (req, res, next) {

    Media.findById(req.params.id).exec(function (err, media) {
        omx.start('public/uploads/' + media.file);
        res.json({});
    });
});

/* pause media */
router.get('/pause', function (req, res, next) {
    omx.pause();
    res.json({});
});

/* resume media */
router.get('/resume', function (req, res, next) {
    omx.pause();
    res.json({});
});

/* quit media */
router.get('/quit', function (req, res, next) {
    omx.quit();
    res.json({});
});

module.exports = router;