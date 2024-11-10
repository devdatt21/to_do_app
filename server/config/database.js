const mongoose = require('mongoose');


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("mongo DB is connected");
    }
    catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;