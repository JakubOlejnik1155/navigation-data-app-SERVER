const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./Routes/auth');

const app = express();
app.use(express.json());
app.use(cors())
dotenv.config();


mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }
    ,()=>{
    console.log("Connected to DB")
})




//route middlewares
app.use('/api/user', authRoutes);


//start listening the server
app.listen(5000, ()=>console.log("Server running"))