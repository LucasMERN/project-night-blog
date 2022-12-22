const User = require('../models/UserSchema')
const Blog = require('../models/BlogSchema')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const blogs = await Blog.find({author: req.params.id})
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', user: req.user, blogs: blogs})
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