const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')

module.exports = {
    getIndex: async (req,res)=>{
        try {
            // find all of our blogs, sort them in descending order so the newest ones are on top
            const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author').exec()
            const ObjectId = require('mongoose').Types.ObjectId;
            const userId = new ObjectId('639e48f1e551d5ac769fbe20');
            const specificUser = await User.findOne({ _id: userId });
            res.render('mainLayout.ejs', {blogs: blogs, user: req.user, specificUser: specificUser, routeName: 'home'})
        } catch (error) {
            console.log(error)
        }
    },
}