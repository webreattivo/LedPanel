var express = require('express')
    , mongoose = require('mongoose')
    , Media = mongoose.model('Media')
    , router = express.Router()
    , upload = require('./../config/multer');

/* GET list media. */
router.get('/', function (req, res, next) {

    Media.find({
        status: 2
    }).sort({
        createdDate: 'desc'
    }).exec(function (err, medias) {

        if (err) return next(err);

        res.render('media/index', {
            medias: medias,
            title: 'List Media',
            username: req.session.passport.user,
            message: req.flash('success_messages')
        });
    });
});

/* GET add media. */
router
    .get('/add', function (req, res, next) {

        var _id = mongoose.Types.ObjectId();

        Media({
            _id: _id,
            status: 1,
            createdDate: Date.now()

        }).save(function (err) {
            if (!err) {
                req.flash('success_messages');
                res.redirect('/media/edit/' + _id);
            } else {
                res.status(500).send(err);
            }
        });
    });

/* GET edit media */
router
    .get('/edit/:id', function (req, res, next) {

        res.render('media/edit', {
            title: 'Edit Media',
            username: req.session.passport.user,
            id: req.params.id
        });
    })

    .post('/edit/:id', function (req, res, next) {

        Media.findById(req.body.id).exec(function (err, media) {

            media.title = req.body.title;
            media.description = req.body.description;
            media.visibility = req.body.visibility;
            media.save(function (err) {
                if (!err) {
                    req.flash('success_messages');
                    res.redirect('/media');
                } else {
                    res.status(500).send(err);
                }
            });
        });

    });


router.post('/upload', function (req, res, next) {

    upload(req, res, function (err) {

        if (err) {
            res.status(500).send(err);
            return
        }

        Media.findById(req.body.id).exec(function (err, media) {

            media.file = req.file.filename;
            media.status = 2;
            media.save(function (err) {
                if (!err) {
                    res.status(200).send('Success');
                } else {
                    res.status(500).send(err);
                }
            });
        });
    });
});

module.exports = router;