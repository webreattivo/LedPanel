var express = require('express')
    , path = require('path')
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , engine = require('ejs-locals')
    , flash = require('connect-flash')
    , omx = require('omxcontrol')
    , passport = require('passport')
    , auth = require('./auth');

// Connect Mongo DB
require('./config/mongo');

// Model
require('./models/media');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(omx());

// Passport
require('./config/passport');

// routes
var index = require('./routes/index');
var media = require('./routes/media');
var raspberry = require('./routes/raspberry');
var user = require('./routes/user');

app.use('/', index);
app.use('/media', auth, media);
app.use('/raspberry', auth, raspberry);
app.use('/user', auth, user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;