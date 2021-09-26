const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    name: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Genre', GenreSchema);