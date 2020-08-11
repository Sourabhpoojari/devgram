const userSchema = require('../models/user');
const {check, validationResult} = require('express-validator/check');

const createUser = async (req,res,next) =>{
    const errors = validationResult('req');
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    res.send('user found');
}




exports.createUser = createUser;
