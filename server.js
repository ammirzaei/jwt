const express = require('express');
const dotEnv = require('dotenv');

const app = new express();
const mongoConnect = require('./config/db');

// config dotenv 
dotEnv.config({ path: './config/config.env' });

// connected to mongodb
mongoConnect();


// running project
app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
});