const Comment = require('../models/Comment')

module.exports = {
    addComment: async (req, res) => {
        try {
            await Comment.create({
                userName: req.user.userName, 
                comment: req.body.comment, 
                title: req.body.title
            })
            //Redirecting 'back' takes us back to the previous page, acting as a refresh upon posting the comment
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    }
}