var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req)
    // Check if there's a user in the request
    if (!req.user) {
        return res.json({ message: 'home' });
    }

    // If there's a user, proceed to the next middleware
    next();
}, function (req, res) {
    // Return user information if available
    return res.json({ user: req.user });
});

module.exports = router;
