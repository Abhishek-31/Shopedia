const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    shopName: {
        type: String
    },
    locationString: {
        type: String
    },
    location: {
        latitude: Number,
        longitude: Number
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'items'
            }
        }
    ]
})

const User = mongoose.model('user', userSchema)

module.exports = User 