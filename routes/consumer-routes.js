const router = require('express').Router();

const Item = require('./../models/items')
const User = require('./../models/user-models')

const {filterShops} = require('./../middleware/distance')

router.get('/', (req, res) => {
    res.render('consumer_search')
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
                var shops = item.shops
                console.log('Inside filterSHops')
                lat2 = parseFloat(req.body.latitude);
                lon2 = parseFloat(req.body.longitude);
                var a = [], i = 0, count = 0
                while (i < shops.length) {
                    console.log(i)
                    User.findById(shops[i].shopId)
                        .then(shopInfo => {
                            lat1 = shopInfo.location.latitude;
                            lon1 = shopInfo.location.longitude;
                            var distance = Math.sqrt(Math.pow(((lat1 * lat1) - (lat2 * lat2)), 2) + Math.pow((lon1 * lon1) - (lon2 * lon2), 2))
                            a.push({ distance, id: shopInfo._id, shopName: shopInfo.shopName })
                            console.log(i)
                            count++;
                            if (count === shops.length - 1) {
                                a.sort(function (a, b) {
                                    return a.distance - b.distance;
                                })
                                console.log(a)
                                res.send(a)
                            }
                        })
                    i++;
                }
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