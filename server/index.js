    const express = require('express');
    const errorMiddleware = require("./middlewares/errorMiddleware.js");
    const connectDB = require('./config/database.js')
    const dotenv = require('dotenv');
    dotenv.config();
    const cors = require("cors");
    const helmet = require("helmet");

    const PORT = process.env.PORT || 4000;

    const app = express();

    connectDB();

    app.use(cors({origin : "http://localhost:5173", credentials:true}));
    app.use(cors());
    app.use(helmet());
    app.use(express.json());



    app.get('/test', (req,res)=> {
        res.json({message:"hii this is to do app"});
    })

    app.use("/api/users", require("./routes/userRoutes"));
    app.use("/api/tasks", require("./routes/taskRoutes"));
    app.use(errorMiddleware);


    app.listen(PORT, () => {
        console.log(`listing on server ${PORT}`)
    })