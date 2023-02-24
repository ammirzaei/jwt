const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        maxlength: 150
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        maxlength: 150
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// hash password when saved data
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();

    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;
    return next();
})

module.exports = mongoose.model('user', userSchema);