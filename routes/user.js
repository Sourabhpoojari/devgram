const router = require('express').Router(),
userController = require('../controllers/user-controllers');
const {check, validationResult} = require('express-validator');

router.post('/',
    check('name','name is required!').not().isEmpty(),
    check('email','Please enter a valid email address').isEmail(),
    check('password','password must contain atleast 6 characters').isLength({min:6}),
    userController.createUser
);



module.exports = router;