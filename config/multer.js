var multer = require('multer')
    , slugify = require('slugify');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + slugify(file.originalname))
    }
});

module.exports = multer({storage: storage}).single('file');
