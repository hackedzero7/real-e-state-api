const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

/**import routers */
const userRoute = require('./router/userRouter');
const property = require('./router/propertyRoutes');
const app = express();

dotenv.config({
    path: './config/config.env'
})


/**Middlewares */

app.use(express.json());
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser());

/**routers */
app.use('/api/v1', userRoute);
app.use('/api/v1', property)


module.exports = app;

