const mongoose = require('mongoose');

exports.connectDatabase = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URL)
    .then((con) => {
        console.log(`Database Connected Successfully : ${con.connection.host}`);
    })
    .catch((err)=>{
        console.log(err);
    })
}