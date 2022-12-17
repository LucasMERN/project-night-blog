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
                    $push: {bookmarks: blog._id}
                })
            }
            res.json('Updated bookmark')
        } catch (error) {
            console.log(error)
        }
    }
}