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
    },

    updateUsername: async (req, res) => {
        try {
            await User.findOneAndUpdate({_id: req.user.id},
                {
                userName: req.body.userName
                },
                console.log(req.body.userName)
            );
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    },

    updateEmail: async (req, res) => {
        try {
            await User.findOneAndUpdate({_id: req.user.id},
                {
                email: req.body.email
                }
            );
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    },

    updatePassword: async (req, res) => {
        try {
            await User.findOneAndUpdate({_id: req.user.id},
                {
                password: req.body.password
                }
            );
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    }
}