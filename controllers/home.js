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
    }
}