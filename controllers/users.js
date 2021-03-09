const jwt = require('jsonwebtoken');
const Users = require('../model/users');
const { HttpCode } = require('../helpers/constans');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;


const register = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await Users.findByEmail(email);
        if (user) {
            return res.status(HttpCode.CONFLICT).json({
                status: "error",
                code: HttpCode.CONFLICT,
                data: "Confilct",
                message: 'Email is already use'
            })
        }
        const newUser = await Users.create(req.body);
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                email: newUser.email,
                subscription: newUser.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findByEmail(email);
        const isValidPassword = await user.validPassword(password);
        if (!user || !isValidPassword) {
            return next({
                status: HttpCode.UNAUTHORIZED,
                message: 'Email or password is wrong',
            });
        }
        const id = user._id;
        const payload = { id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
        await Users.updateToken(id, token);
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                token,
                user: {
                    email: user.email,
                    subscription: user.subscription,
                },
            },
        });
    } catch (e) {
        if (e.name === 'TypeError') {
            return next({
                status: HttpCode.BAD_REQUEST,
                message: 'Bad request',
            });
        }
        next(e);
    }
};

const logout = async (req, res, _next) => {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
};


module.exports = {
    register,
    login,
    logout
}