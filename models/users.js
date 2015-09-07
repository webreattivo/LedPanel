var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , passportLocalMongoose = require('passport-local-mongoose');

var Users = Schema({
        fullname: {
            type: String,
            trim: true
        },
        createdDate: Date
    },
    {
        collection: 'users'
    });

Users.plugin(passportLocalMongoose, {
    usernameField: 'username',
    usernameUnique: true
});
module.exports = mongoose.model('Users', Users);