const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-models')

passport.serializeUser((user, done) => {
    console.log('In serialize')
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user))
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    // options for strategy
}, (accessToken, refreshToken, profile, done) => {
    // check if user exists
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser) {
            // already have the user
            console.log(profile)
            done(null, currentUser)
        } else {
            console.log(profile)
            // if not, create user in our db
            new User({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.image.url
            }).save()
                .then((newUser) => {
                    done(null, newUser)
                })
        }
    })
})
)