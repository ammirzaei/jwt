const UserModel = require('./../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    async handleRegister(req, res, next) {
        try {
            // register validation with user inputs
            await UserModel.registerValidation(req.body);

            // access to fields
            const { email } = req.body;

            // find user with email
            const user = await UserModel.findOne({ email });
            if (user) {
                const error = new Error('ایمیل وارد شده تکراری است');
                error.status = 422;
                return next(error);
            }

            // created new user
            const newUser = await UserModel.create({ ...req.body });

            res.status(201).json({ message: 'کاربر جدید با موفقیت ثبت شد', userId: newUser.id });
        } catch (err) {
            const errors = [];
            if (err?.inner) {
                err.inner.forEach(error => {
                    errors.push({
                        name: error.path,
                        message: error.message
                    });
                })
            }

            const error = new Error('در اعتبارسنجی فیلد ها مشکلی وجود دارد');
            error.status = 422;
            error.data = errors;

            next(error);
        }
    }
    async handleLogin(req, res, next) {
        try {
            // login validation with user inputs
            await UserModel.loginValidation(req.body);

            // access to the fields
            const { email, password } = req.body;

            // find user with email and if exist this user
            const user = await UserModel.findOne({ email });
            if (!user) {
                const error = new Error('کاربری یافت نشد');
                error.status = 404;
                return next(error);
            }

            // if is mathed password input
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                const error = new Error('ایمیل یا رمز عبور اشتباه است');
                error.status = 401;
                return next(error);
            }

            // created jwt token
            const token = jwt.sign({
                user: {
                    userId: user.id,
                    email: user.email,
                    fullName: user.fullName
                }
            }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            });

            res.status(200).json({ message: 'ورود موفقیت آمیز بود', token });
        } catch (err) {
            if (err?.inner) {
                const errors = [];
                err.inner.forEach(error => {
                    errors.push({
                        name: error.path,
                        message: error.message
                    });
                })

                const error = new Error('در اعتبارسنجی فیلد ها مشکلی وجود دارد');
                error.status = 422;
                error.data = errors;

                return next(error);
            }

            const error = new Error('مشکلی رخ داد');

            next(error);
        }
    }
}

module.exports = UserController;