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
    res.render('profile', {user: req.user})
})

router.post('/postshop', authCheck, (req, res) => {
    console.log(req.body)
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
            res.redirect('/profile')
        })
})

router.post('/postitem', (req, res) => {
    Item.findOne({itemName: req.body.itemName})
        .then(item => {
            if(item) {
                // Update item with shop's ID and name
                Item.findOneAndUpdate({itemName: req.body.itemName}, {$push: {shops: {shopId: req.body.shopId, shopName: req.body.shopName}}})
                .then(item => res.send(item))
            } else {
                // Add new item. Tested, working
                var newitem = {
                    itemName: req.body.itemName,
                    shops: [{
                        shopName: req.body.shopName
                    }]
                }
                newitem = new Item(newitem)
                newitem.save().then(item => res.send(item))
            }
        })
})

module.exports = router