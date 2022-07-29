
const BlogPost = require('../models/blogPost');
module.exports = async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id).populate('userid');
    console.log(blogPost)
    res.render('post', {
        blogPost
    });
}