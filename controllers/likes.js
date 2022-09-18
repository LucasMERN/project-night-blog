const Blog = require('../models/Blog')

module.exports = {
    updateLike: async (req, res) => {
        try {
            await Blog.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $inc: {totalLikes: 1}
                }
            );
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    }
}