const Blog = require('../models/BlogSchema')

module.exports = {
    getIndex: async (req,res)=>{
        try {
            // find all of our blogs, sort them in descending order so the newest ones are on top
            const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author').exec()
            res.render('mainLayout.ejs', {blogs: blogs, user: req.user, routeName: 'home'})
        } catch (error) {
            console.log(error)
        }
    },
}