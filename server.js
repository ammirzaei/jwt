const express = require('express');
const dotEnv = require('dotenv');

const app = new express();

// config dotenv 
dotEnv.config({ path : './config/config.env'});


app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on port ${process.env.PORT}`);
});