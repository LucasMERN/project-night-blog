const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const Blog = require('../models/BlogSchema');
const User = require('../models/UserSchema');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const blogController = require('../controllers/blogController')


// Open view to create new blog
router.get('/new', ensureAuth, blogController.newBlogPage);

// Post new blog to the DB
router.post('/create', upload.single("image"), blogController.newBlogPost);

//Delete the blog and remove from database
router.delete('/:id', blogController.deleteBlog);

// The 'slug' is generated in our model. Basically, each blog will have an id (1234213452), instead of presenting that ugly string of numbers in our URL, we change the string of numbers into what is called a slug. I set the slug to be whatever the title of our blog is. This makes a more user-friendly URL.
router.get('/:slug/article', ensureAuth, blogController.readBlog);

// Open the view that allows us to edit page
router.get('/edit/:id', blogController.editBlog);

// Grab our specific article and update based upon saveArticleAndRedirect function
router.put('/:id', async (req, res, next)=>{
    req.blog = await Blog.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

// Change our blog and save it to the db
function saveArticleAndRedirect(path){
    return async (req, res) => {
        let blog = req.blog
            blog.title = req.body.title
            blog.intro = req.body.intro,
            author = req.session.author,
            blog.markdown = req.body.markdown,
            blog.totalLikes = req.body.totalLikes
        try {
            blog = await blog.save()
            res.redirect(`/blog/${blog.slug}/article`)
        } catch (error) {
            console.log(error)
            res.render(`/${path}`, { blog: blog })
        }
    }
}

module.exports = router