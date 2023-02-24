module.exports = (error, req, res, next) => {
    const statusCode = error.status || 500;
    const message = error.message;
    const data = error.data;

    res.status(statusCode).json({ message, data });
}