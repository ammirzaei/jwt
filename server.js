const express = require('express');
const dotEnv = require('dotenv');

const app = new express();
const mongoConnect = require('./config/db');
const { setRoutes } = require('./middlewares/routes');
const errorHandler = require('./middlewares/errorHandler');


// config bodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// config dotenv 
dotEnv.config({ path: './config/config.env' });

// connected to mongodb
mongoConnect();

// set routes
setRoutes(app);


// error Handler
app.use(errorHandler);

// running project
app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
});