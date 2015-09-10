var express = require('express')
    , mongoose = require('mongoose')
    , User = mongoose.model('User')
    , router = express.Router();

/* GET list users */
router
    .get('/', function (req, res, next) {

        User.find().sort({
            createdDate: 'desc'
        }).exec(function (err, users) {

            if (err) return next(err);

            res.render('user/index', {
                users: users,
                username: req.session.passport.user,
                title: 'List Users'
            });
        });
    });

/* POST add user*/
router
    .get('/add', function (req, res, next) {

        res.render('user/add', {
            username: req.session.passport.user,
            title: 'Add User'
        });
    })

    .post('/add', function (req, res, next) {

        User.register(new User({
            username: req.body.username,
            fullname: req.body.fullname,
            role: req.body.role,
            createdDate: Date.now()
        }), req.body.password, function (err, user) {

            if (err) {
                res.status(500).send(err);
            }

            res.redirect('/user');
        });
    });

/* GET edit user */
router
    .get('/edit/:id', function (req, res, next) {

        User.findById(req.params.id).exec(function (err, user) {

            if (err) {
                res.status(500).send('Error Getting User');
                return
            }

            if (!user) {
                res.status(404).render('404', {title: 'User Not Found', message: 'User Not Found'});
                return
            }

            res.render('user/edit', {
                title: 'Edit User',
                username: req.session.passport.user,
                user: user
            });
        });
    })

    .post('/edit/:id', function (req, res, next) {

        User.findById(req.params.id).exec(function (err, user) {

            if (err) {
                res.status(500).send('Error Getting User');
                return
            }

            if (!user) {
                res.status(404).render('404', {title: 'User Not Found', message: 'User Not Found'});
                return
            }

            user.fullname = req.body.fullname;
            user.username = req.body.username;
            user.role = req.body.role;
            user.setPassword(req.body.password, function(err) {

                if (err) {
                    res.status(500).send(err);
                    return
                }

                user.save(function (err) {

                    if (err) {
                        res.status(500).send(err);
                        return
                    }

                    res.redirect('/user');
                });
            });
        });
    });

/* GET remove user */
router
    .get('/remove/:id', function (req, res, next) {

        User.findById(req.params.id).exec(function (err, user) {

            if (err) {
                res.status(500).send('Error Getting User');
                return
            }

            if (!user) {
                res.status(404).render('404', {title: 'User Not Found', message: 'User Not Found'});
                return
            }

            user.remove(function (err) {

                if (err) {
                    res.status(500).send('Error Remove User');
                    return
                }

                res.redirect('/user');
            });
        });
    });

module.exports = router;