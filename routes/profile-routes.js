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
        // var user = addItems(req.user)
        // console.log(user)
        res.redirect('/profile/dashboard')
    }
})

router.get('/dashboard', (req, res) => {
    var user = addItems(req.user)
    res.render('dashboard', {user: user})
})

router.get('/getItems', (req, res) => {
    // var user = addItems(req.user)
    res.send(req.user)
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

// {
//     itemName,
//     itemNumber
// }
router.post('/postitem', (req, res) => {
    var itemId = ""
    console.log('In POST item', req.body)
    req.body.itemName = req.body.itemName.toLowerCase()
    Item.findOne({itemName: req.body.itemName})
        .then(item => {
            if(item) {
                // Update item with shop's ID and name
                itemId = item._id
                console.log('Item exists: ', item)
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
                    return Promise.resolve(itemId)
                }).then((itemId) => {
                    console.log('In Updating User', itemId)
                    User.findOneAndUpdate({ googleId: req.user.googleId }, { $push: { items: { itemId: itemId, itemName: req.body.itemName, number: req.body.itemNumber } } })
                        .then(user => {
                            req.user = user
                            console.log(req.user)
                            res.send(200)
                        })
                })
            }
        })
})

var addItems = (user) => {
    var allItems = [];
    // Object.assign(newUser, user)
    for(var i = 0; i < user.items.length; i++) {
        Item.findById(user.items[i].itemId)
        .then(realItem => {
            allItems.push(realItem.name)
        })
    }
    user.items = allItems
    return user
}

module.exports = router