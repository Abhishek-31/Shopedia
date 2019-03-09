const router = require('express').Router();

const Item = require('./../models/items')
const User = require('./../models/user-models')

const filterShops = require('./../middleware/distance')

router.get('/', (req, res) => {
    res.render('consumer')
})

// {
//     itemName: "itemName",
//     latitude: "lat",
//     longitude: "long"
// }
router.post('/search', (req, res) => {
    req.body.itemName = req.body.itemName.toLowerCase()
    Item.findOne({ itemName: req.body.itemName })
        .then(item => {
            if (!item) {
                res.send('No item found')
            } else {
                item.shops.forEach(shop => {
                    
                })

            }
        })
})

// {
//     shopId
// }
router.post('/shop', (req, res) => {
    User.findById(req.body.shopId)
        .then(user => {
            res.send(user)
        })
})

module.exports = router