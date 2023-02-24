const { authentication } = require('./auth');

module.exports.setRoutes = (app) => {
    app.use(require('./../routes/userRoute'));
    app.use(authentication, require('./../routes/homeRoute'));
}