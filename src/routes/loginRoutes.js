const express = require('express')
const router = express.Router()
const passport = require('passport')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const loginController = require('../controllers/loginController')
const User = require("../models/UserSchema");

//Get login page
router.get('/', ensureGuest, loginController.loadLoginPage)

//Login our user, if successful redirect them back to the main index
router.post('/loginLocal', (req, res, next ) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
});

//Get login page
router.get('/google', passport.authenticate('google'));
router.get('/github', passport.authenticate('github'));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//Logout user and destroy sessions
router.get('/logout', (req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        console.log('User has logged out')
        res.redirect('/')
    })
})

module.exports = router