const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const deleteRoutes = require('./Routes/delete')

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }
    ,()=>{
    console.log("Connected to DB")
})
app.use(express.json({ limit: '50mb', extended: true }));
app.use(cors())
app.use(express.static('build', {}))
//routes middlewares
app.use('/api/user', authRoutes);
app.use('/api', deleteRoutes);
app.use('*',express.static('build',{}));

//start server
app.listen(3000, ()=>console.log("Server running"))