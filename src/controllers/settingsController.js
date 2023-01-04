const User = require('../models/UserSchema')

module.exports = {
    getSettings: async (req, res) => {
        try {
            res.render('settings.ejs')
        } catch (error) {
            console.log(error)
        }
    }
}