const User = require('../models/UserSchema')

module.exports = {
    getSettings: async (req, res) => {
        try {
            res.render('settings.ejs', {user: req.user, routeName: 'settings'})
        } catch (error) {
            console.log(error)
        }
    },

    getAccountInfo: async (req, res) => {
        try {
            res.render('settings.ejs', {routeName: 'accountInfo', user: req.user})
        } catch (error) {
            console.log(error)
        }
    },

    getDisplay: async (req, res) => {
        try {
            res.render('settings.ejs', {routeName: 'display', user: req.user})
        } catch (error) {
            console.log(error)
        }
    },

    getGone: async (req, res) => {
        try {
            res.render('settings.ejs', {routeName: 'deactivate', user: req.user})
        } catch (error) {
            console.log(error)
        }
    }
}