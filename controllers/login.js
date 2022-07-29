
module.exports = (req, res) => {
    // console.log(req.flash('validationErrors'));
    // res.render('login', {
    //     errors: req.flash('validationErrors'),
    // })
    var username = ""
    var password = ""
    const data = req.flash('data')[0];
    // console.log(req.flash('validationErrors'));
    if (typeof data != "undefined") {
        username = data.username
        password = data.password
    } res.render('login', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
};