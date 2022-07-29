
module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render('createPost');
    }
    res.redirect('/auth/login');

};

