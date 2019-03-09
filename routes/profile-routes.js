const router = require('express').Router()

const User = require('./../models/user-models')
const Item = require('./../models/items')

const authCheck = (req, res, next) => {
    if(!req.user) {
        // if user is not logged in
        res.redirect('/auth/login')
    } else {
        // if logged in
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    if(!req.user.shopName) {
        res.render('location_post', {user: req.user})
    } else {
        res.redirect('/profile/dashboard')
    }
})

router.get('/dashboard', (req, res) => {
    console.log(req.user)
    res.render('dashboard', {user: req.user})
})

// {
//     shopName,
//     locationString,
//     latitude,
//     longitude
// }
router.post('/postshop', authCheck, (req, res) => {
    User.findOneAndUpdate({googleId: req.user.googleId}, 
        {$set: {shopName: req.body.shopName, 
                locationString: req.body.locationString, 
                location: {
                            latitude: req.body.latitude, 
                            longitude: req.body.longitude
                        }
                }
        })
        .then(user => {
            req.user.shopName = user.shopName
            res.send(200)
            // res.redirect('')
        })
})

router.post('/postitem', (req, res) => {
    var itemId = ""
    req.body.itemName = req.body.itemName.toLowerCase()
    Item.findOne({itemName: req.body.itemName})
        .then(item => {
            if(item) {
                // Update item with shop's ID and name
                itemId = item._id
                Item.findOneAndUpdate({itemName: req.body.itemName}, {$push: {shops: {shopId: req.user._id, shopName: req.user.shopName}}})
                .then(item => res.send(item))
            } else {
                // Add new item. Tested, working
                var newitem = {
                    itemName: req.body.itemName,
                    shops: [{
                        shopName: req.user.shopName,
                        shopId: req.user._id
                    }]
                }
                newitem = new Item(newitem)
                newitem.save().then(item => {
                    itemId = item._id
                    return Promise.resolve()
                }).then(() => {
                    User.findOneAndUpdate({ googleId: req.user.googleId }, { $push: { items: { itemName: itemId } } })
                        .then(user => {
                            res.send(user)
                        })
                })
            }
        })
})

module.exports = router