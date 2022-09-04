const Blog = require('../models/Blog')

module.exports = {
    getIndex: (req,res)=>{
        res.render('article')
    },
    newBlogPage: (req, res)=>{
        res.render('newPost.ejs')
    },
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