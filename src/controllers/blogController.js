const User = require('../models/UserSchema');
const Blog = require('../models/BlogSchema');
const cloudinary = require("../middleware/cloudinary");

module.exports = {
     // Render view to create a new blog
     newBlogPage: (req, res)=>{
        res.render('mainLayout.ejs', {user: req.user, routeName: 'newPost'})
    },
    // Create new blog 
    newBlogPost: async(req, res)=>{
        try {
            let image = null;
            if (req.file) {
              const result = await cloudinary.uploader.upload(req.file.path);
              image = result.secure_url;
            }
            let markdownArray = req.body.markdown.split(' ')
            let intro = markdownArray.slice(0, 20).join(' ')
            if(req.body.intro){
            intro = req.body.intro   
            }
            const blog = new Blog({
                title: req.body.title,
                intro: intro,
                author: req.user.id,
                markdown: req.body.markdown,
                email: req.user.email,
                thumbnailImage: image
            })
            const savedBlog = await blog.save()
            await User.updateOne({_id: savedBlog.author},
                { 
                    $push: {posts: savedBlog._id}
                })
                res.redirect('/')
            console.log(req.body.intro)
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
            const following = await User.findOne({_id: req.user.id, following: {$in: [req.params.id]}})
            if(blog == null) res.redirect('/')
            res.render('mainLayout.ejs', {blog: blog, liked: liked != null, bookmarked: bookmarked != null, totalLikes: totalLikes, user: req.user, routeName: 'slug', following: following})  
        } catch (error) {
            console.log(error)   
        }
    },
}