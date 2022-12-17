const express = require('express');
const router = express.Router();
const Blog = require('../models/BlogSchema');
const User = require('../models/UserSchema');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const homeController = require('../controllers/homeController');

//Load home page
router.get('/', homeController.getIndex);

//Load page that allows you to create a new blog/article
router.get('/new', ensureAuth, homeController.newBlogPage);

//Post the form and add it to our database
router.post('/create', homeController.newBlogPost);

//Delete the article and remove from database
router.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect('/')
  })

// The 'slug' is generated in our model. Basically, each blog will have an id (1234213452), instead of presenting that ugly string of numbers in our URL, we change the string of numbers into what is called a slug. I set the slug to be whatever the title of our blog is. This makes a more user-friendly URL.
router.get('/:slug/article', ensureAuth, async (req, res)=>{
    const blog = await Blog.findOne({slug: req.params.slug}).populate('author');
    const liked = await User.findOne({_id: req.user.id, likes: {$in: [blog._id]}});
    const bookmarked = await User.findOne({_id: req.user.id, bookmarks: {$in: [blog._id]}});
    const totalLikes = blog.likedBy.length
    if(blog == null) res.redirect('/')
    res.render('mainLayout.ejs', {blog: blog, liked: liked != null, bookmarked: bookmarked != null, totalLikes: totalLikes, user: req.user, routeName: 'slug'})
})

// Grab the id of the file we would like to edit and then render our edit view
router.get('/edit/:id', async (req, res)=>{
    const blog = await Blog.findById(req.params.id)
    res.render('mainLayout.ejs', {blog: blog, routeName: 'edit'})
})

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
            res.redirect(`/${blog.slug}`)
        } catch (error) {
            console.log(error)
            res.render(`/${path}`, { blog: blog })
        }
    }
}

module.exports = router;