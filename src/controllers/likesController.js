const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')

module.exports = {
    updateLike: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id});
            const liked = user.likes.includes(req.params.id);
            const blog = await Blog.findOne({_id: req.params.id}).populate('author')
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

                let content;
                    if (req.user.userName === blog.author.userName) {
                        content = `You liked your blog - "${blog.title}"`;
                    } else {
                        content = `${req.user.userName} liked your blog - "${blog.title}"`;
                    }
                await User.updateOne({_id: blog.author._id}, {
                    $push: {
                      notifications: {
                        user: req.user.id,
                        seen: false,
                        content: content,
                        type: 'like',
                      }
                    }
                  });
            }
            res.json('Updated like')
        } catch (error) {
         console.log(error)   
        }
    }
}