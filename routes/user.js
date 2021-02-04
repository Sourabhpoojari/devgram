const router = require('express').Router(),
auth = require('../middleware/auth'),
userController = require('../controllers/user-controllers');
const {check, validationResult} = require('express-validator');

router.post('/',
    check('name','name is required!').not().isEmpty(),
    check('email','Please enter a valid email address').isEmail(),
    check('password','password must contain atleast 6 characters').isLength({min:6}),
    userController.createUser
);

router.get('/',auth,userController.getUser);

router.post('/login',
check('email','Please enter a valid email address').isEmail(),
check('password','password is required').exists(),
userController.logIn
);





module.exports = router;