const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String
    },
    shops: [
        {
            shopId: {
                type: mongoose.Schema.Types.ObjectId,     // _id of the shop document
                ref: 'user'
            },
            shopName: {
                type: String
            }
        }
    ]
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item   