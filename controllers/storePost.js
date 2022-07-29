
const BlogPost = require('../models/blogPost');
const path = require('path')
module.exports = (req, res) => {
    // const { title, description } = req.body;
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        // console.log(error.errors, req.body);
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name,
            userid: req.session.userId
        })
        res.redirect('/');
    })
}