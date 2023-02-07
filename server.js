const app = require('./app');
const { connectDatabase } = require('./config/database');


/**Connect Database */
connectDatabase();

app.listen(process.env.PORT, ()=> {
    console.log(`Server Successfully connected on http://localhost:${process.env.PORT}`)
})