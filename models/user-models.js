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
            itemId: {
                type: String
            },
            itemName: String,
            number: {
                type: Number,
                default: 2
            }
        }
    ]
})

const User = mongoose.model('user', userSchema)

module.exports = User 