
const BlogPost = require('../models/blogPost');
module.exports = async (req, res) => {
    const blogPosts = await BlogPost.find({}).populate('userid');
    console.log(blogPosts);
    console.log(req.session);
    res.render('index', {
        blogPosts
    });
}

