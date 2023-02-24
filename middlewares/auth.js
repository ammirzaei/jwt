const jwt = require('jsonwebtoken');

const UserModel = require('./../models/userModel');

module.exports.authentication = async (req,res,next) =>{
    try {
        // access to token from header
        const auth = req.get('Authorization');
        if(!auth){
            const error = new Error('شما دسترسی ندارید');
            error.status = 401;
            return next(error);
        }

        // get token
        const token = auth.split(' ')[1]; // Bearer
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decodedToken.user.userId);
        if(!user){
            const error = new Error('در اعتبارسنجی توکن مشکلی رخ داد');
            error.status = 401;
            return next(error);
        }

        req.userId = user.id;
        next();
    } catch (err) {
        const error = new Error('مشکلی رخ داد');

        next(error);
    }
}
