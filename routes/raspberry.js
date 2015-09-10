var express = require('express')
    , mongoose = require('mongoose')
    , Media = mongoose.model('Media')
    , router = express.Router()
    , path = require('path')
    , omx = require('omxdirector');


/* GET view media */
router.get('/view/:id', function (req, res, next) {

    Media.findById(req.params.id).exec(function (err, media) {

        if (err) {
            res.status(500).send('Error Getting Media');
            return
        }

        if (!media) {
            res.status(404).render('404', {title: 'Media Not Found', message: 'Media Not Found'});
            return
        }

        res.render('raspberry/index', {
            title: 'Raspberry View',
            username: req.session.passport.user,
            media: media
        });
    });
});

/* play media */
router.get('/play/:id', function (req, res, next) {

    if (omx.isLoaded || omx.isPlaying) {
        omx.stop();
    }

    Media.findById(req.params.id).exec(function (err, media) {

        if (err) {
            res.status(500).json({message: 'Error Getting Media'});
            return
        }

        if (!media || !media.file || !path.existsSync('public/uploads/' + media.file)) {
            res.status(404).json({message: 'Media Not Found'});
            return
        }

        omx.play('public/uploads/' + media.file);
        res.json({message: 'sucecss'});

    });
});

/* pause media */
router.get('/pause', function (req, res, next) {

    omx.pause();
    res.json({message: 'sucecss'});
});

/* resume media */
router.get('/resume/:id', function (req, res, next) {

    Media.findById(req.params.id).exec(function (err, media) {

        if (err) {
            res.status(500).json({message: 'Error Getting Media'});
            return
        }

        if (!media) {
            res.status(404).json({message: 'Media Not Found'});
            return
        }

        omx.play();
        res.json({message: 'sucecss'});
    });

});

/* quit media */
router.get('/quit', function (req, res, next) {

    omx.stop();
    res.json({message: 'sucecss'});
});

module.exports = router;