const User = require('../models/User')

module.exports = {
    getProfile: async (req, res) => {
        try {
            res.render('index.ejs', {routeName: 'profile', user: req.user})
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
            res.send('works')
        } catch (error) {
            console.log(error)
        }
    }
}