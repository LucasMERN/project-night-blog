const Comment = require('../models/Comment')
const Blog = require('../models/Blog')

module.exports = {
    addComment: async (req, res) => {
        try {
            //Create comment
            await Comment.create({
                userName: req.user.userName, 
                comment: req.body.comment, 
                title: req.body.title
            })
            //Find this specific blog then increment the totalComments property by one every time a new comment is added
            await Blog.findOneAndUpdate(
                {title: req.body.title},
                {
                    $inc: {totalComments: 1}
                }
            );
            //Redirecting 'back' takes us back to the previous page, acting as a refresh upon posting the comment
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    },
    deleteComment: async (req, res) => {
        try {
            await Comment.findOneAndDelete({_id: req.params.id})
            await Blog.findOneAndUpdate(
                {title: req.body.title},
                {
                    $inc: {totalComments: -1}
                }
            );
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    }
}