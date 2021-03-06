var mongoose = require('mongoose');

var WikiFileSchema = mongoose.Schema ({
    title: {
        type: String,
        index: true
    },
    date_created: {
        type: Date
    },
    date_modified: {
        type: Date
    },
    authors: {
        type: Array
    },
    contents: {
        type: String
    },
    citationObjects: {
        type: mongoose.Schema.Types.Mixed
    },
    type: {         // (e.g. article or template)
        type: String
    }
})

var WikiFile = module.exports = mongoose.model('WikiFile', WikiFileSchema);