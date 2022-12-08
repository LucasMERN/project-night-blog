const Blog = require('../models/BlogSchema')

module.exports = {
    updateLike: async (req, res) => {
        try {
            // Check if this blog was liked by our logged in user
            const liked = await Blog.find({likedBy: req.user.email})

            // If user has already liked this post, remove them from the array and remove the like from the post
            if(liked.length > 0){
                await Blog.findOneAndUpdate(
                    {_id: req.params.id},
                
                    {
                        $inc: {totalLikes: -1},
                        $pull: {likedBy: req.user.email}
                    }
                );
                res.redirect('back') 
            // If user has NOT liked this post, push them to the array and add a like
            }else{
                await Blog.findOneAndUpdate(
                    {_id: req.params.id},
                
                    {
                        $inc: {totalLikes: 1},
                        $push: {likedBy: req.user.email}
                    }
                );
                res.redirect('back') 
            }
        } catch (error) {
            console.log(error)
        }
    }
}

