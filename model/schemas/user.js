const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs');
const { Subscription } = require('../../helpers/constans');
const SALT_WORK_FACTOR = 8;


const userSchema = new Schema(
    {
        email: {
            type: String,
            require: [true, 'Email is required'],
            unique: true,
            validate(value) {
                const isValid = /\S+@\S+\.S+/
                return isValid.test(String(value).toLowerCase())
            },
        },
        password: {
            type: String,
            require: [true, 'Password is required'],
        },
        subscription: {
            type: String,
            enum: {
                values: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
                message: 'It isn\'t allowed',
            },
            default: Subscription.FREE
        },
        token: {
            type: String,
            default: null,
        },

    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    };
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt, null);
    next();
});

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;