const User = require('../models/UserSchema')
const Blog = require('../models/BlogSchema')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const blogs = await Blog.find({author: req.params.id}).populate('author')
            const profileUser = await User.findOne({_id: req.params.id})
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', blogs: blogs, profileUser: profileUser})
        } catch (error) {
            console.log(error)
        }
    },
    updateBio: async (req, res) => {
        try {
            await User.findOneAndUpdate({_id: req.user.id},
                {
                bio: req.body.bio
                }
            );
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    }
}