const express = require('express');
const connectDB = require('./config/database.js')
const dotenv = require('dotenv');
dotenv.config();

connectDB();

const PORT = process.env.PORT || 4000;

const app = express();

app.get('/test', (req,res)=> {
    res.json({message:"hii this is to do app"});
})

app.listen(PORT, () => {
    console.log(`listing on server ${PORT}`)
})