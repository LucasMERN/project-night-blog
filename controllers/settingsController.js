const User = require('../models/UserSchema')

module.exports = {
    getSettings: async (req, res) => {
        try {
            res.render('mainLayout.ejs', {routeName: 'settings', user: req.user})
        } catch (error) {
            console.log(error)
        }
    }
}