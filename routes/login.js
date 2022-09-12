const express = require('express')
const router = express.Router()
const passport = require('passport')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const loginController = require('../controllers/login')

//Get login page
router.get('/', ensureGuest, loginController.loadLoginPage)

//Login our user, if successful redirect them back to the main index
router.post('/loginLocal', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})

//Get facebook login page
router.get('/facebook', passport.authenticate('facebook'));

//Facebook auth callback, determines what to do if login is successful/fails
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
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