var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

passport.use(new GoogleStrategy({
    clientID: '773659743519-i8ba7eurtt83bn73oeebtnv0p0jipmsq.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3333/auth/google/callback',
    scope: ['profile', 'email']
}, function (iss, sub, profile, done) {
    console.log({ GoogleProfile: profile }); // Log the entire profile object
    return done(null, profile);
}));
passport.serializeUser(function (user, cb) {
    console.log({ user })
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});



var router = express.Router();

router.get('/auth/google/callback', (req, res, next) => {
    console.log(req.session)
    console.log('Google callback route hit');

    next();
}, passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/auth/google', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', function (req, res) {
    req.logout();  // This function usually doesn't take a callback
    res.redirect('/');
});

module.exports = router;
