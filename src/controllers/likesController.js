const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')

module.exports = {
    updateLike: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id});
            const liked = user.likes.includes(req.params.id);
            if(liked){
                await User.updateOne({_id: req.user.id}, {
                    $pull: {likes: req.params.id}
                })
                await Blog.updateOne({_id: req.params.id}, {
                    $pull: {likedBy: req.user.id}
                })
            }else{
                await User.updateOne({_id: req.user.id}, {
                    $push: {likes: req.params.id}
                })
                await Blog.updateOne({_id: req.params.id}, {
                    $push: {likedBy: req.user.id}
                })
            }
            res.json('Updated like')
        } catch (error) {
         console.log(error)   
        }
    }
}