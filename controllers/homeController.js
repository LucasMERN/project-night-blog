const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')

module.exports = {
    getIndex: async (req,res)=>{
        try {
            // Populate author
            const blogs = await Blog.find().populate('author').exec()
            res.render('index.ejs', {articles: blogs, user: req.user, routeName: 'home'})
        } catch (error) {
            console.log(error)
        }
    },
    // Render our newPost page Refactor name to newPostPage
    newBlogPage: (req, res)=>{
        res.render('index.ejs', {routeName: 'newPost'})
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
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}