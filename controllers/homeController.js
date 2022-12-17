const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema');
const cloudinary = require("../middleware/cloudinary");

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
            let image = null;
            if (req.file) {
              const result = await cloudinary.uploader.upload(req.file.path);
              image = result.secure_url;
            }
            const blog = new Blog({
                title: req.body.title,
                intro: req.body.intro,
                author: req.user.id,
                markdown: req.body.markdown,
                email: req.user.email,
                image: image
            })
            const savedBlog = await blog.save()
            await User.updateOne({_id: savedBlog.author},
                { 
                    $push: {posts: savedBlog._id}
                })
                res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}