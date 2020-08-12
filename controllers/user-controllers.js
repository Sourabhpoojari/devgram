const User = require('../models/user'),
    gravatar = require('gravatar'),
    bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const { findOne } = require('../models/user');
const user = require('../models/user');

const createUser = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password} = req.body;
    let user
    try {
         user= await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[{msg : "User with this email'id already exists"}]});
        }
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            name,
            email,
            password,
            avatar
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
    } catch (err) {
        console.log(err);
       return res.status(500).send('Server error');
    }
    res.status(200).json({user:user});
}




exports.createUser = createUser;