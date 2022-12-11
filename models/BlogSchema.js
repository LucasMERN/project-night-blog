// model for blog posts
const mongoose = require('mongoose');
//marked allows us to use markdown
const { marked } = require('marked');
//slugify allows us to convert our id into a url friendly slug, looks way better 
const slugify = require('slugify');
// This returns a function that sanitizes our HTML so malicious code cannot be added into our markdown
const createDOMPurify = require('dompurify');
// We destructure because we only want the JSDOM portion of what this returns
const { JSDOM } = require('jsdom')
const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)
// We use schemas to structure our data
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: true, trim: true },
    intro: { type: String, required: true, trim: true },
    markdown: { type: String, required: true, trime: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: Boolean,
    totalLikes: { type: Number },
    likedBy: [],
    slug: { type: String, required: true, unique: true },
    sanitizedHtml: { type: String, required: true },
    email: { type: String, required: true }
}, { timestamps: true });

//Set validations and before attributes (pre validate)
BlogSchema.pre('validate', function(next){
    if(this.title){
        //lower:true sets our slug to lowercase, string will remove weird chars like colons
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if(this.markdown){
        this.sanitizedHtml = DOMPurify.sanitize(marked.parse(this.markdown))
    }
    next()
})

module.exports = mongoose.model('Blog', BlogSchema);