
const express = require('express');
const ejs = require('ejs');
const expressSession = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
const app = express();
const BlogPost = require('./models/blogPost');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');

app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload());
app.use(flash());
const validateMiddleWare = require("./middleware/validateMiddleware");
app.use('/posts/store', validateMiddleWare);

app.listen(8080, () => {
    console.log('port listening on 8080');
});



const newUserController = require('./controllers/newUser')
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const loginController = require('./controllers/login');
const storeUserController = require('./controllers/userStore');
const authMiddleware = require('./middleware/authMiddleware');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/register', newUserController)
app.get('/posts/new', newPostController);
app.get('/', homeController);
app.get('/post/:id', getPostController);
app.post('/posts/store', storePostController);
app.post('/users/register', storeUserController);
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/logout', logoutController);

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});


app.get('/', async (req, res) => {
    const blogPosts = await BlogPost.find({});
    res.render('index', {
        blogPosts
    });
});

app.get('/search', async (req, res) => {
    let search = req.query.search;
    const blogPosts = await BlogPost.find({ title: new RegExp(search, 'i') });
    res.render('index', { blogPosts: blogPosts });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});
app.use((req, res) => res.render('notfound'));