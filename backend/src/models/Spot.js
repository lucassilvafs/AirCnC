const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    const thumb =  this.thumbnail.replace(' ', '%20'); 
    return (
        `http://192.168.0.10:3333/files/${thumb}`
    )
})


module.exports = mongoose.model('Spot', SpotSchema);
/*
SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnail}`
})*/