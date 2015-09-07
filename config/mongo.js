var config = require('./database');
var debug = require('debug')('LedPanel:server');

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.db+'', function(err) {
    debug('Server mongo started!');
    if (err) throw err;
});
