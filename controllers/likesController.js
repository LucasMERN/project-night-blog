const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')

module.exports = {
    updateLike: async (req, res) => {
        try {
            //Find the blog we are currently viewing and populate its author field
            const blog = await Blog.findOne({_id: req.params.id}).populate('author');
            //Check if the logged in user has liked the current blog
            const liked = await User.findOne({_id: req.user.id, likes: {$in: [blog._id]}});
            if(liked){
                await User.updateOne({_id: req.user.id}, {
                    $pull: {likes: req.params.id}
                })
                await Blog.updateOne({id: req.params.id}, {
                    $pull: {likedBy: req.user.id}
                })
            }else{
                await User.updateOne({_id: req.user.id}, {
                    $push: {likes: req.params.id}
                })
                await Blog.updateOne({id: req.params.id}, {
                    $push: {likedBy: req.user.id}
                })
            }
            res.json('Updated like')
        } catch (error) {
         console.log(error)   
        }
    }
}