const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')

module.exports = {
    getIndex: async (req,res)=>{
        try {
            // find all of our blogs, sort them in descending order so the newest ones are on top
            const blogs = await Blog.find().sort({createdAt: 'desc'})
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
        // Grab the current email of our logged in user
        let currentEmail = await req.user.email
        // Search for the user object we want to assign to the property value
        let currentUser = await User.find({email: currentEmail})
        try {
            await Blog.create({
                title: req.body.title,
                intro: req.body.intro,
                author: currentUser[0],
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