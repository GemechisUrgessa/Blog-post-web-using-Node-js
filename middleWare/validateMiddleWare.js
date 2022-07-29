
module.exports = validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.description == null) {
        return res.redirect('/posts/new');
    } next();
}