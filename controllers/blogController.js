const User = require('../models/UserSchema');
const Blog = require('../models/BlogSchema');
const cloudinary = require("../middleware/cloudinary");

module.exports = {
     // Render our newPost page Refactor name to newPostPage
     newBlogPage: (req, res)=>{
        res.render('mainLayout.ejs', {user: req.user, routeName: 'newPost'})
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
    },
    // Delete blog
    deleteBlog: async (req, res) => {
        await Blog.findByIdAndDelete(req.params.id)
        res.redirect('/')
    },
    // Open and read the blog that was clicked
    readBlog: async (req, res)=>{
        try {
            const blog = await Blog.findOne({slug: req.params.slug}).populate('author');
            const liked = await User.findOne({_id: req.user.id, likes: {$in: [blog._id]}});
            const bookmarked = await User.findOne({_id: req.user.id, bookmarks: {$in: [blog._id]}});
            const totalLikes = blog.likedBy.length
            if(blog == null) res.redirect('/')
            res.render('mainLayout.ejs', {blog: blog, liked: liked != null, bookmarked: bookmarked != null, totalLikes: totalLikes, user: req.user, routeName: 'slug'})  
        } catch (error) {
            console.log(error)   
        }
    },
    editBlog: async (req, res)=>{
        const blog = await Blog.findById(req.params.id)
        res.render('mainLayout.ejs', {user: req.user, blog: blog, routeName: 'edit'})
    }
}