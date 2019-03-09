const router = require('express').Router();
const passport = require('passport');

const Item = require('./../models/items') 
const User = require('./../models/user-models')

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {
    // handle with passport
    req.logout()
    res.redirect('/')
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user)
    res.redirect('/profile/')
})

router.get('/consumer', (req, res) => {
    res.render('consumer')
})

// {
//     itemName: "itemName"
// }
router.post('/consumer/search', (req, res) => {
    req.body.itemName = req.body.itemName.toLowerCase()
    Item.findOne({itemName})
        .then(item => {
            if(item) {
                res.send('No item found')
            } else {
                res.send(item.shops)
            }
        })
})

// {
//     shopId
// }
router.post('/consumer/shop', (req, res) => {
    User.findById(req.body.shopId)
        .then(user => {
            res.send(user)
        })
})

module.exports = router