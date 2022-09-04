const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog')
const homeController = require('../controllers/home');

router.get('/', homeController.getIndex);

router.get('/edit/:id', async (req, res)=>{
    const blog = await Blog.findById(req.params.id)
    res.render('edit.ejs', {blog: blog})
})

router.post('/', async (req, res, next)=>{
    req.blog = new Blog()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next)=>{
    req.blog = await Blog.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path){
    return async (req, res) => {
        let blog = req.blog
            blog.title = req.body.title
            blog.intro = req.body.intro,
            blog.author = req.body.author,
            blog.markdown = req.body.markdown,
            blog.totalLikes = req.body.totalLikes
            blog.totalComments = req.body.totalLikes
        try {
            blog = await blog.save()
            res.redirect(`/blog/${blog.slug}`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = router;