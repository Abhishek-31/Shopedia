const express = require('express')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')

const profileRoutes = require('./routes/profile-routes')
const authRoutes = require('./routes/routes')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')

const app = express()

mongoose.connect(keys.mongodb.dbURI, () => console.log('Connected to mongodb'))

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// initialise passport
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'))

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res) => {
    res.render('home', {user: req.user});
})

app.listen(3000, () => {
    console.log('Port Up')
})