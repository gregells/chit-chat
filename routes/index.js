var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chit Chat' });
});

router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    scope: ['profile', 'email'],
    // Optional:
    prompt: 'select_account'
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/posts',
    // Change to what's best for your app:
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout(function() {
      // Change path for you 'landing' page:
    res.redirect('/posts');
  });
});

module.exports = router;
