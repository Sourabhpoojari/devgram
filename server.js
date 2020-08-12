const express = require('express'),
app = express();
const connectDB = require('./config/db');

// DB connection
connectDB();

// middleware
app.use(express.json({extended:false}));

// Define routes
app.use('/user',require('./routes/user'));
app.use('/profile',require('./routes/profile'));
app.use('/posts',require('./routes/posts'));




const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`)); 