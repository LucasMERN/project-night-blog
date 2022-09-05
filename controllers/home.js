const Blog = require('../models/Blog')

module.exports = {
    getIndex: async (req,res)=>{
        try {
            // find all of our blogs, sort them in descending order so the newest ones are on top
            const blogs = await Blog.find().sort({createdAt: 'desc'})
            res.render('index.ejs', {articles: blogs})
        } catch (error) {
            console.log(error)
        }
    },
    // Render our newPost page
    newBlogPage: (req, res)=>{
        res.render('newPost.ejs')
    },
    // Create new blog
    newBlogPost: async(req, res)=>{
        try {
            await Blog.create({
                title: req.body.title,
                intro: req.body.intro,
                author: req.body.author,
                markdown: req.body.markdown,
                totalLikes: 0,
                totalComments: 0,
            })
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}