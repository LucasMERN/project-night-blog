const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')
const mongoose = require('mongoose')

module.exports = {
    getIndex: async (req,res)=>{
        try {
            // find all of our blogs, sort them in descending order so the newest ones are on top
            const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author').exec()
            // initialize variables that will be needed to render discovery tab
            let following
            let specificUser
              if(typeof req.user !== 'undefined'){
                following = await User.findOne({_id: req.user.id, following: {$in: [req.params.id]}})
                specificUser = await User.aggregate([
                  {
                    $match: {
                      following: { $ne: mongoose.Types.ObjectId(req.user.id) },  // Exclude users that the specific user is already following
                      _id: { $ne: mongoose.Types.ObjectId(req.user.id) }  // Exclude the current logged in user
                    }
                  },
                  { $sample: { size: 1 } }  // Select a random user
                ])
              }else{
                following = false
                specificUser = await User.aggregate([{$sample: {size: 1}}])
              }
              const randomBlog = (await Blog.aggregate([{$sample: {size: 1}}]).exec())[0]
              const populatedRandomBlog = await Blog.findById(randomBlog._id).populate('author')
              const newNotifications = await User.findOne({ _id: req.user.id }).select('notifications')
              const notificationsAmt = newNotifications.notifications.filter((item)=> item.seen == false).length
            res.render('mainLayout.ejs', {blogs: blogs, user: req.user, specificUser: specificUser[0], populatedRandomBlog: populatedRandomBlog, notificationsAmt: notificationsAmt, routeName: 'home'})
        } catch (error) {
            console.log(error)
        }
    },
}