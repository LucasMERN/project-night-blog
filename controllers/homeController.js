const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema');

module.exports = {
    getIndex: async (req,res)=>{
        try {
            // find all of our blogs, sort them in descending order so the newest ones are on top
            const blogs = await Blog.find().populate('author').exec()
            res.render('mainLayout.ejs', {articles: blogs, user: req.session.user, routeName: 'home'})
        } catch (error) {
            console.log(error)
        }
    },
    // Render our newPost page Refactor name to newPostPage
    newBlogPage: (req, res)=>{
        res.render('mainLayout.ejs', {routeName: 'newPost'})
    },
    // Create new blog 
    // TODO: Refactor name to newPost
    newBlogPost: async(req, res)=>{
        try {
            await Blog.create({
                title: req.body.title,
                intro: req.body.intro,
                author: req.user.id,
                markdown: req.body.markdown,
                email: req.user.email,
                totalLikes: 0,
                totalComments: 0,
            })

        } catch (error) {
            console.log(error)
        }
    }
}