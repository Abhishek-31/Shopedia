const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String
    },
    shops: [
        {
            shopId: {
                type: mongoose.Schema.Types.ObjectId,
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