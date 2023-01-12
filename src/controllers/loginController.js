const User = require('../models/UserSchema')

module.exports = {
    loadLoginPage: async (req, res) => {
        try {
            await User.updateOne({ $set: { active: true } });
            res.render('login.ejs')
        } catch (error) {
            console.log(error);
        }
    }
}