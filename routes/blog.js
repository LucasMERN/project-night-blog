const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog')
const blogController = require('../controllers/blog');

//Loads main blog route, we can prob remove this bc we want to load the specific blog post when we click read more, which we can do by using the code that begins on line 16
router.get('/', blogController.getIndex);

//Load page that has form to enter a new blog
router.get('/new', blogController.newBlogPage);

//Post form and add to our db
router.post('/create', blogController.newBlogPost);

// The 'slug' is generated in our model. Basically, each blog will have an id (1234213452), instead of presenting that ugly string of numbers in our URL, we change the string of numbers into what is called a slug. I set the slug to be whatever the title of our blog is. This makes a more user-friendly URL.
router.get('/:slug', async (req, res)=>{
    const blog = await Blog.findOne({slug: req.params.slug});
    if(blog == null) res.redirect('/')
    res.render('article', {blog: blog})
})

module.exports = router;
