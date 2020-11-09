const User = require('../models/user'),
    gravatar = require('gravatar'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    config = require('config');
const {check, validationResult} = require('express-validator');

const createUser = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password} = req.body;
    let user;
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

        // bcrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        // save to db
        await user.save();

        // setting jwt
        const payload = {
            user : {
                id : user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn : 3600},
            (err,token)=>{
                if(err) throw err;
                 res.status(200).json({token});
            }
        );
    } catch (err) {
        console.log(err);
       return res.status(500).send('Server error');
    }
    // res.status(200).json({user:{user , token}});
};

const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(201).json({user});
    } catch (err) {
        console.log(err);
        res.status(500).send("cannot get user!");
    }
};
// logIn - handler
const logIn = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    let user
    try {
         user= await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg : "invalid credentials"}]});
        }
        // check password
        const match =await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({errors:[{msg : "invalid credentials"}]});
        }
        // setting jwt
        const payload = {
            user : {
                id : user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn : 3600},
            (err,token)=>{
                if(err) throw err;
                 res.status(200).json({token});
            }
        );
    } catch (err) {
        console.log(err);
       return res.status(500).send('Server error');
    }
};

exports.createUser = createUser;
exports.getUser = getUser;
exports.logIn = logIn;