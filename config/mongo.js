var config = require('./database')
    , debug = require('debug')('LedPanel:server')
    , mongoose = require('mongoose');

if(config.db.username.length > 0 && config.db.password.length > 0) {
    var mongo = 'mongodb://'+config.db.username+':'+config.db.password+'@'+config.db.host+':'+config.db.port+'/'+config.db.db+'';
} else {
    var mongo = 'mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.db+'';
}

mongoose.connect(mongo, function(err) {
    debug('Server mongo started!');
    if (err) throw err;
});