const express = require('express'),
app = express();
const connectDB = require('./config/db');


connectDB();
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>res.send('Api running'));

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));