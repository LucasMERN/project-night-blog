const User = require('../models/UserSchema')
const Blog = require('../models/BlogSchema')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const blogs = await Blog.find({author: req.params.id}).populate('author')
            const profileUser = await User.findOne({_id: req.params.id})
            const following = await User.findOne({_id: req.user.id, following: {$in: [req.params.id]}})
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', blogs: blogs, profileUser: profileUser, following: following})
        } catch (error) {
            console.log(error)
        }
    },
    getProfileBookmarks: async (req, res) => {
        try {
            const bookmarks = await User.find({_id: req.params.id}).populate('bookmarks')
            const profileUser = await User.findOne({_id: req.params.id})
            const following = await User.findOne({_id: req.user.id, following: {$in: [req.params.id]}})
            res.render('mainLayout.ejs', {user: req.user, routeName: 'profile', bookmarks: bookmarks, profileUser: profileUser, following: following})
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
                        type: 'like'
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
            // Grab all of the notifications on load, and populate the user field of our notifications
            const notifications = await User.find(req.user).select('notifications').populate('notifications.user');
            res.render('mainLayout.ejs', {user: req.user, routeName: 'notifications', notifications: notifications})
        } catch (error) {
            console.log(error)
        }
    }
}