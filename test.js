const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
BlogPost.create({
    title: 'The My the buster’s Guide to Saving Money on Energy Bills',
    description: 'If you have been here a long time, you might remember when I went on ITV Tonight to' +
        'dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money ' +
        'topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery' +
        'opens up. You know those bullet-point lists. You start spotting them everything at this time of year.' +
        'They go like this:',
    userId: 'Max Ug'
}, (error, blogpost) => {
    console.log(error, blogpost);
});