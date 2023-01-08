const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')
const mongoose = require('mongoose')

module.exports = {
    getIndex: async (req,res)=>{
        try {
            
            // find all of our blogs, sort them in descending order so the newest ones are on top
            const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author').exec()
            // filter the users to exclude users that the specific user is already following, and the current logged in user
            const specificUser = await User.aggregate([
                {
                  $match: {
                    following: { $ne: mongoose.Types.ObjectId(req.user.id) },  // Exclude users that the specific user is already following
                    _id: { $ne: mongoose.Types.ObjectId(req.user.id) }  // Exclude the current logged in user
                  }
                },
                { $sample: { size: 1 } }  // Select a random user
              ]);

            res.render('mainLayout.ejs', {blogs: blogs, user: req.user, specificUser: specificUser[0], routeName: 'home'})
        } catch (error) {
            console.log(error)
        }
    },
}