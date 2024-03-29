const User = require('../models/UserSchema')
const Blog = require('../models/BlogSchema')
const mongoose = require('mongoose')
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getProfile: async (req, res) => {
        try {
            const blogs = await Blog.find({author: req.params.id}).sort({ createdAt: -1 }).populate('author')
            const profileUser = await User.findOne({_id: req.params.id})
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
                specificUser = await User.aggregate([{$sample: {size: 1}}]);
              }
              const randomBlog = (await Blog.aggregate([{$sample: {size: 1}}]).exec())[0]
              const populatedRandomBlog = await Blog.findById(randomBlog._id).populate('author')
              const newNotifications = await User.findOne({ _id: req.user.id }).select('notifications')
              const notificationsAmt = newNotifications.notifications.filter((item)=> item.seen == false).length
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', blogs: blogs, specificUser: specificUser[0], following: following, profileUser: profileUser, populatedRandomBlog: populatedRandomBlog, notificationsAmt: notificationsAmt})
        } catch (error) {
            console.log(error)
        }
    },

    getFollowers: async (req, res) => {
        try {
            const followers = await User.find({_id: req.params.id}).sort({ createdAt: -1 }).select('followers').populate('followers');
            const profileUser = await User.findOne({_id: req.params.id})
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
                specificUser = await User.aggregate([{$sample: {size: 1}}]);
              }
              const randomBlog = (await Blog.aggregate([{$sample: {size: 1}}]).exec())[0]
              const populatedRandomBlog = await Blog.findById(randomBlog._id).populate('author')
              const newNotifications = await User.findOne({ _id: req.user.id }).select('notifications')
              const notificationsAmt = newNotifications.notifications.filter((item)=> item.seen == false).length
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', profileUser: profileUser, followers: followers, following: following, specificUser: specificUser[0], populatedRandomBlog: populatedRandomBlog, notificationsAmt: notificationsAmt})
        } catch (error) {
            console.log(error)
        }
    },

    getFollowing: async (req, res) => {
        try {
            const following = await User.find({_id: req.params.id}).sort({ createdAt: -1 }).select('following').populate('following');
            const profileUser = await User.findOne({_id: req.params.id})
            const specificUser = await User.aggregate([
              {
                $match: {
                  following: { $ne: mongoose.Types.ObjectId(req.user.id) },  // Exclude users that the specific user is already following
                  _id: { $ne: mongoose.Types.ObjectId(req.user.id) }  // Exclude the current logged in user
                }
              },
              { $sample: { size: 1 } }  // Select a random user
            ])
            const randomBlog = (await Blog.aggregate([{$sample: {size: 1}}]).exec())[0]
            const populatedRandomBlog = await Blog.findById(randomBlog._id).populate('author')
            const newNotifications = await User.findOne({ _id: req.user.id }).select('notifications')
            const notificationsAmt = newNotifications.notifications.filter((item)=> item.seen == false).length
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', profileUser: profileUser, following: following, specificUser: specificUser[0], populatedRandomBlog: populatedRandomBlog, notificationsAmt: notificationsAmt})
        } catch (error) {
            console.log(error)
        }
    },

    getProfileBookmarks: async (req, res) => {
        try {
            const bookmarks = await User.find({_id: req.params.id}).sort({ createdAt: -1 }).populate({
                path: 'bookmarks',
                populate: {
                  path: 'author'
                }
              })
            const profileUser = await User.findOne({_id: req.params.id})
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
                specificUser = await User.aggregate([{$sample: {size: 1}}]);
              }
              const randomBlog = (await Blog.aggregate([{$sample: {size: 1}}]).exec())[0]
              const populatedRandomBlog = await Blog.findById(randomBlog._id).populate('author')
              const newNotifications = await User.findOne({ _id: req.user.id }).select('notifications')
              const notificationsAmt = newNotifications.notifications.filter((item)=> item.seen == false).length
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', bookmarks: bookmarks, specificUser: specificUser[0], profileUser: profileUser, following: following, populatedRandomBlog: populatedRandomBlog, notificationsAmt: notificationsAmt})
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
    },

    followUser: async (req, res) => {   
        try {
            const currentUser = await User.findOne({_id: req.user.id})
            
            if (currentUser.following.indexOf(req.params.id) === -1) {
                await User.updateOne({_id: req.user.id}, {
                    $push: {following: req.params.id}
                });
            }
    
            const followedUser = await User.findOne({_id: req.params.id});
            // check if the current user is already in the followers list of the user being followed
            if (followedUser.followers.indexOf(req.user.id) === -1) {
                await User.updateOne({_id: req.params.id},
                    {
                        $push: {followers: req.user.id}
                    });
                await User.updateOne({_id: req.params.id}, {
                    $push: {
                      notifications: {
                        user: req.user.id,
                        seen: false,
                        content: `${req.user.userName} followed you`,
                        type: 'follow',
                        timestamps: new Date()
                      }
                    }
                  });
            }
            res.json('Follow updated')
        } catch (error) {
            console.log(error)
        }
    },

    unfollowUser: async (req, res) => {   
        try {
            const currentUser = await User.findOne({_id: req.user.id})
            await User.updateOne({_id: req.user.id}, {
                $pull: {following: req.params.id}
            });
            await User.updateOne({_id: req.params.id},
                {
                    $pull: {followers: req.user.id}
                });
            res.json('Follow updated')
        } catch (error) {
            console.log(error)
        }
    },

    getNotifications: async (req, res) => {
        try {
            // Set notifications from seen: false to seen: true
            await User.updateMany(
              { _id: req.user.id },
              { $set: { 'notifications.$[].seen': true } }
          );
            // Grab all of the remaining notifications and populate the user field of our notifications
            const notifications = await User.find({_id: req.user.id}).select('notifications').populate('notifications.user')
            let sortedNotifications = notifications[0].notifications.reverse();
            const specificUser = await User.aggregate([
                {
                  $match: {
                    following: { $ne: mongoose.Types.ObjectId(req.user.id) },  // Exclude users that the specific user is already following
                    _id: { $ne: mongoose.Types.ObjectId(req.user.id) }  // Exclude the current logged in user
                  }
                },
                { $sample: { size: 1 } }  // Select a random user
              ]);
              const randomBlog = (await Blog.aggregate([{$sample: {size: 1}}]).exec())[0]
              const populatedRandomBlog = await Blog.findById(randomBlog._id).populate('author')
              const newNotifications = await User.findOne({ _id: req.user.id }).select('notifications')
              const notificationsAmt = newNotifications.notifications.filter((item)=> item.seen == false).length
            res.render('mainLayout.ejs', {user: req.user, routeName: 'notifications', specificUser: specificUser[0], sortedNotifications: sortedNotifications, populatedRandomBlog: populatedRandomBlog, notificationsAmt: notificationsAmt});
        } catch (error) {
            console.log(error);
        }
    },
    updateProfilePic: async (req, res)=> {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, { aspect_ratio: "1.0", crop: "lfill" });
        const image = result.secure_url
        await User.findOneAndUpdate({_id: req.params.id},{
          profilePic: image
        })
        res.redirect(`/profile/myprofile/${req.params.id}`)
      } catch (error) {
        console.log(error)
      }
    }
}