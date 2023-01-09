const User = require('../models/UserSchema');
const Blog = require('../models/BlogSchema');
const mongoose = require('mongoose')
const cloudinary = require("../middleware/cloudinary");

module.exports = {
     // Render view to create a new blog
     newBlogPage: async (req, res)=>{
        let following
        let specificUser
          if(typeof req.user !== 'undefined'){
            following = await User.findOne({_id: req.user.id, following: {$in: [req.params.id]}})
            specificUser = await User.aggregate([
              {
                $match: {
                  following: { $ne: mongoose.Types.ObjectId(req.user.id) },  // Exclude users that the specific user is already following
                  _id: { $ne: mongoose.Types.ObjectId(req.user.id) }  // Exclude the current logged in user
                }
              },
              { $sample: { size: 1 } }  // Select a random user
            ])
          }else{
            following = false
            specificUser = await User.aggregate([{$sample: {size: 1}}]);
          }
        res.render('mainLayout.ejs', {user: req.user, routeName: 'newPost', specificUser: specificUser[0]})
    },
    // Create new blog 
    newBlogPost: async(req, res)=>{
        try {
            let image = [];
            image.push('/images/default.png');
            image.push('/images/default2.jpg');
            image.push('/images/default3.jpg');
            let randomIndex = Math.floor(Math.random() * image.length);
            image = image[randomIndex];
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
        } catch (error) {
            console.log(error)
        }
    },
    // Delete blog
    deleteBlog: async (req, res) => {
        try {
            await Blog.findByIdAndDelete(req.params.id);
            await User.updateOne({ _id: req.user.id }, { $pull: { posts: req.params.id, bookmarks: req.params.id, likes: req.params.id }});
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    },
    // Open and read the blog that was clicked
    readBlog: async (req, res)=>{
        try {
            const blog = await Blog.findOne({slug: req.params.slug}).populate('author');
            const liked = await User.findOne({_id: req.user.id, likes: {$in: [blog._id]}});
            const bookmarked = await User.findOne({_id: req.user.id, bookmarks: {$in: [blog._id]}});
            const totalLikes = blog.likedBy.length
            const following = await User.findOne({_id: req.user.id, following: {$in: [blog.author._id]}})
            if(blog == null) res.redirect('/')
            res.render('mainLayout.ejs', {blog: blog, liked: liked != null, bookmarked: bookmarked != null, totalLikes: totalLikes, user: req.user, routeName: 'slug', following: following})  
        } catch (error) {
            console.log(error)   
        }
    },
}