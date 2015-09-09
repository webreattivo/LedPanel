var express = require('express')
    , mongoose = require('mongoose')
    , Media = mongoose.model('Media')
    , Playing = mongoose.model('Playing')
    , router = express.Router()
    , omx = require('omxcontrol');


/* GET view media */
router.get('/view/:id', function (req, res, next) {

    Playing.find().exec(function (err, playing) {

        if (playing.length != 0) {
            res.render('raspberry/playing', {
                title: 'Raspberry View',
                username: req.session.passport.user,
                playing: true
            });
            return
        }

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
                media: media,
                playing: false
            });
        });
    });
});

/* play media */
router.get('/play/:id', function (req, res, next) {

    Playing.find().exec(function (err, playing) {

        if (playing.length != 0) {

            res.json({message: 'error playing'});
            return
        }

        Media.findById(req.params.id).exec(function (err, media) {

            if (err) {
                res.status(500).send('Error Getting Media');
                return
            }

            if (!media) {
                res.status(404).render('404', {title: 'Media Not Found', message: 'Media Not Found'});
                return
            }

            Playing({
                status: 1,
                media: media,
                createdDate: Date.now()

            }).save(function (err) {

                if (err) {
                    res.status(500).json({message: err});
                    return
                }

                omx.start('public/uploads/' + media.file);
                res.json({message: 'sucecss'});
            });
        });
    });
});

/* pause media */
router.get('/pause', function (req, res, next) {

    Playing.find().exec(function (err, playing) {

        if (playing.length != 0) {
            playing.forEach(function (play) {
                play.remove(function (err) {

                    if (err) {
                        res.status(500).send('Error In Clear');
                    }
                });
            });
        }
    });

    omx.pause();
    res.json({});
});

/* resume media */
router.get('/resume/:id', function (req, res, next) {

    Playing.find().exec(function (err, playing) {

        if (playing.length != 0) {

            res.json({message: 'error playing'});
            return
        }

        Media.findById(req.params.id).exec(function (err, media) {

            if (err) {
                res.status(500).send('Error Getting Media');
                return
            }

            if (!media) {
                res.status(404).render('404', {title: 'Media Not Found', message: 'Media Not Found'});
                return
            }

            Playing({
                status: 1,
                media: media,
                createdDate: Date.now()

            }).save(function (err) {

                if (err) {
                    res.status(500).json({message: err});
                    return
                }

                omx.pause();
                res.json({message: 'sucecss'});
            });
        });
    });
});

/* quit media */
router.get('/quit', function (req, res, next) {

    Playing.find().exec(function (err, playing) {

        if (playing.length != 0) {
            playing.forEach(function (play) {
                play.remove(function (err) {

                    if (err) {
                        res.status(500).send('Error In Clear');
                    }
                });
            });
        }
    });

    omx.quit();
    res.json({});
});

/* GET clear */
router.get('/clear', function (req, res, next) {

    Playing.find().exec(function (err, playing) {

        if (playing.length == 0) {
            res.redirect('/media');
        }

        playing.forEach(function (play) {

            play.remove(function (err) {

                if (err) {
                    res.status(500).send('Error In Clear');
                }
            });
        });

        res.redirect('/media');
    });
});

module.exports = router;