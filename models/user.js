
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    }
});
userSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})
userSchema.plugin(uniqueValidator);
// export model
const user = mongoose.model('user', userSchema);
module.exports = user