var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;  // Import any strategy you're using

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());
// Add any Passport strategy setup (like LocalStrategy) here if needed

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/', authRouter);

// Error handling middleware
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    return res.json({
        message: err.message,
        error: err
    });
});

app.listen(3333, () => {
    console.log('Listening on port 3333');
});

module.exports = app;
