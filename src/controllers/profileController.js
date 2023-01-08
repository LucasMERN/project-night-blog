const User = require('../models/UserSchema')
const Blog = require('../models/BlogSchema')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const blogs = await Blog.find({author: req.params.id}).sort({ createdAt: -1 }).populate('author')
            const profileUser = await User.findOne({_id: req.params.id})
            const following = await User.findOne({_id: req.user.id, following: {$in: [req.params.id]}})
            const specificUser = await User.aggregate([{$sample: {size: 1}}]);
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', blogs: blogs, specificUser: specificUser, profileUser: profileUser, following: following})
        } catch (error) {
            console.log(error)
        }
    },

    getFollowers: async (req, res) => {
        try {
            const followers = await User.find({_id: req.params.id}).sort({ createdAt: -1 }).select('followers').populate('followers');
            const profileUser = await User.findOne({_id: req.params.id})
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', profileUser: profileUser, followers: followers})
        } catch (error) {
            console.log(error)
        }
    },

    getFollowing: async (req, res) => {
        try {
            const following = await User.find({_id: req.params.id}).sort({ createdAt: -1 }).select('following').populate('following');
            const profileUser = await User.findOne({_id: req.params.id})
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', profileUser: profileUser, following: following})
        } catch (error) {
            console.log(error)
        }
    },

    getProfileBookmarks: async (req, res) => {
        try {
            const bookmarks = await User.find({_id: req.params.id}).sort({ createdAt: -1 }).populate('bookmarks')
            const profileUser = await User.findOne({_id: req.params.id})
            const following = await User.findOne({_id: req.user.id, following: {$in: [req.params.id]}})
            const ObjectId = require('mongoose').Types.ObjectId;
            const userId = new ObjectId('639e48f1e551d5ac769fbe20');
            const specificUser = await User.findOne({ _id: userId });
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', bookmarks: bookmarks, specificUser: specificUser, profileUser: profileUser, following: following})
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
            
            await User.updateOne({_id: req.user.id}, {
                $push: {following: req.params.id}
            })

            await User.updateOne({_id: req.params.id},
                {
                    $push: {followers: req.user.id}
                })
                await User.updateOne({_id: req.params.id}, {
                    $push: {
                      notifications: {
                        user: req.user.id,
                        seen: false,
                        content: `${req.user.userName} followed you`,
                        type: 'follow'
                      }
                    }
                  });
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
            })
            await User.updateOne({_id: req.params.id},
                {
                    $pull: {followers: req.user.id}
                })
            res.json('Follow updated')
        } catch (error) {
            console.log(error)
        }
    },

    getNotifications: async (req, res) => {
        try {
            // Remove all unfollow notifications and unbookmark from the notifications array
            await User.updateOne({ _id: req.user.id }, { $pull: { notifications: { type: 'unfollow', type: 'unbookmark', user: req.params.id } }});
            // Grab all of the remaining notifications and populate the user field of our notifications
            const notifications = await User.find({_id: req.user.id}).select('notifications').populate('notifications.user');
            const ObjectId = require('mongoose').Types.ObjectId;
            const userId = new ObjectId('639e48f1e551d5ac769fbe20');
            const specificUser = await User.findOne({ _id: userId });
            res.render('mainLayout.ejs', {user: req.user, routeName: 'notifications', specificUser: specificUser, notifications: notifications});
        } catch (error) {
            console.log(error);
        }
    }

}