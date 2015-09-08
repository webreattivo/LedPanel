var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var Media = Schema({
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        visibility: {
            type: Number,
            trim: true
        },
        file: {
            type: String,
            trim: true
        },
        status: {
            type: Number,
            required: true
        },
        createdDate: Date
    },
    {
        collection: 'media'
    });

module.exports = mongoose.model('Media', Media);