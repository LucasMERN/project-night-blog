const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')

module.exports = {
    bookmarkPost: async (req, res) => {
        try {
            //Grab current blog
            const blog = await Blog.findOne({_id: req.params.id}).populate('author')
            //Check if already bookmarked
            const bookmarked = await User.findOne({_id: req.user.id, bookmarks: {$in: [blog._id]}})
            if(bookmarked){
                await User.updateOne({_id: req.user.id}, {
                    $pull: {bookmarks: blog._id}
                })
            }else{
                await User.updateOne({_id: req.user.id}, {
                    $push: {
                        bookmarks: blog._id,
                    }
                })
                // Grab the author ID off the blog, we need this to update the user object, specifically the bookmarks
                let content;
                    if (req.user.userName === blog.author.userName) {
                        content = `You bookmarked your blog - "${blog.title}"`;
                    } else {
                        content = `${req.user.userName} bookmarked your blog - "${blog.title}"`;
                    }
                await User.updateOne({_id: blog.author._id}, {
                    $push: {
                      notifications: {
                        user: req.user.id,
                        seen: false,
                        content: content,
                        type: 'bookmark',
                      }
                    }
                  });
            }
            res.json('Updated bookmark')
        } catch (error) {
            console.log(error)
        }
    }
}