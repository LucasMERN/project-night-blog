const User = require('../models/UserSchema')

module.exports = {
    getSettings: async (req, res) => {
        try {
            res.render('settings.ejs', {user: req.user, routeName: 'settings'})
        } catch (error) {
            console.log(error)
        }
    }
}