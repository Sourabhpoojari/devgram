const express = require('express'),
app = express();
const connectDB = require('./config/db'),
path = require('path');

// DB connection
connectDB();

// middleware
app.use(express.json({extended:false}));

// Define routes
app.use('/user',require('./routes/user'));
app.use('/profile',require('./routes/profile'));
app.use('/posts',require('./routes/posts'));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`)); 