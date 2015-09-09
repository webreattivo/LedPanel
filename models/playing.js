var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var Playing = Schema({
        status: {
            type: Number,
            required: true
        },
        media: {
            type: Schema.Types.ObjectId,
            ref: 'media',
            required: true
        },
        createdDate: Date
    },
    {
        collection: 'playing'
    });

module.exports = mongoose.model('Playing', Playing);