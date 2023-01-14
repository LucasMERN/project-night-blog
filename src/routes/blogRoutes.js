const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const Blog = require('../models/BlogSchema');
const User = require('../models/UserSchema');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const blogController = require('../controllers/blogController')
const mongoose = require('mongoose')


// Open view to create new blog
router.get('/new', ensureAuth, blogController.newBlogPage);

// Post new blog to the DB
router.post('/create', upload.single("image"), blogController.newBlogPost);

//Delete the blog and remove from database
router.delete('/delete/:id', blogController.deleteBlog);

// The 'slug' is generated in our model. Basically, each blog will have an id (1234213452), instead of presenting that ugly string of numbers in our URL, we change the string of numbers into what is called a slug. I set the slug to be whatever the title of our blog is. This makes a more user-friendly URL.
router.get('/:slug/read', ensureAuth, blogController.readBlog);

// Grab the id of the file we would like to edit and then render our edit view
router.get('/edit/:id', async (req, res)=>{
    const blog = await Blog.findById(req.params.id)
    if(typeof req.user !== 'undefined'){
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
    const randomBlog = (await Blog.aggregate([{$sample: {size: 1}}]).exec())[0]
    const populatedRandomBlog = await Blog.findById(randomBlog._id).populate('author')
    const newNotifications = await User.findOne({ _id: req.user.id }).select('notifications')
    const notificationsAmt = newNotifications.notifications.filter((item)=> item.seen == false).length
    res.render('mainLayout.ejs', {blog: blog, routeName: 'edit', specificUser: specificUser[0], user: req.user, notificationsAmt: notificationsAmt, populatedRandomBlog: populatedRandomBlog})
})

// Grab our specific blog and update based upon saveBlogAndRedirect function
router.put('/:id', async (req, res, next)=>{
    req.blog = await Blog.findById(req.params.id)
    next()
}, saveBlogAndRedirect('edit'))

// Change our blog and save it to the db
function saveBlogAndRedirect(path){
    return async (req, res) => {
        let blog = req.blog
            blog.title = req.body.title
            blog.intro = req.body.intro,
            blog.author = req.user.id,
            blog.markdown = req.body.markdown,
            blog.totalLikes = req.body.totalLikes
        try {
            blog = await blog.save()
            res.redirect(`/blog/${blog.slug}/read`)
        } catch (error) {
            console.log(error)
            res.render(`/${path}`, { blog: blog })
        }
    }
}

module.exports = router