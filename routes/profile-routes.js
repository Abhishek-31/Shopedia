const router = require('express').Router()

const User = require('./../models/user-models')

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
    User.findOneAndUpdate({googleId: req.user.googleId}, {$set: {shopName: req.body.shopName}})
        .then(user => {
            res.redirect('/profile')
        })
})

module.exports = router