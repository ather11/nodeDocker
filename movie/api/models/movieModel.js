const mongoose = require('mongoose');

const GeneresSchema = mongoose.Schema({
    name: String,
    description: String,
    release_date:Date,
    genres:[
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    duration:{ type: Number, min: 0, max: 400 },
    rating:{ type: Number, min: 0, max: 5 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', GeneresSchema);