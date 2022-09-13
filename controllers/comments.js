const Comment = require('../models/Comment')
const Blog = require('../models/Blog')

module.exports = {
    addComment: async (req, res) => {
        try {
            await Comment.create({
                userName: req.user.userName,
                comment: req.body.comment,
                email: req.body.title
            })
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}