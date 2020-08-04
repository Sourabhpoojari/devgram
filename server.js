const express = require('express'),
app = express();
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>res.send('Api running'));

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));