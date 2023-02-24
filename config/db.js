const mongoose = require('mongoose');

module.exports = async ()=>{
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongodb Connected on ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}