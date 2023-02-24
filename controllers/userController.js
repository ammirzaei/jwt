const UserModel = require('./../models/userModel');

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
}

module.exports = UserController;