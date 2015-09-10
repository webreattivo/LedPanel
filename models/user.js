var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , passportLocalMongoose = require('passport-local-mongoose');

var User = Schema({
        fullname: {
            type: String,
            trim: true
        },
        role: {
            type: String,
            trim: true,
            required: true
        },
        createdDate: Date
    },
    {
        collection: 'users'
    });

User.plugin(passportLocalMongoose, {
    usernameField: 'username',
    usernameUnique: true
});
module.exports = mongoose.model('User', User);