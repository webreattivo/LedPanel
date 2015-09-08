/**
 * Created by vikey_89 on 08/09/15.

var express = require('express');
var bodyParser = require('body-parser');
var engine  = require('ejs-locals');
var path = require('path');
omx = require('omxcontrol');
var app = express();
app.use(omx());

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/play/:video', function (req, res) {
    omx.start(req.param('video'));
    res.json({});
});

app.get('/pausa', function (req, res) {
    omx.pause();
    res.json({});
});

app.get('/riprendi', function (req, res) {
    omx.pause();
    res.json({});
});

app.get('/chiudi', function (req, res) {
    omx.quit();
    res.json({});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});**/