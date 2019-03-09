const router = require('express').Router();
const passport = require('passport');

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

module.exports = router