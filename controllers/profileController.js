const User = require('../models/UserSchema')

module.exports = {
    getProfile: async (req, res) => {
        try {
            res.render('mainLayout.ejs', {routeName: 'profile', user: req.user})
        } catch (error) {
            console.log(error)
        }
    },
    postBio: async (req, res) => {
        try {
            await User.findOneAndUpdate(
                {_id: req.body.user},
                {
                    $set: {bio: req.body.bio}
                }
            );
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    }
}