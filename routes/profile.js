const router = require('express').Router(),
    auth = require('../middleware/auth'),
    profileControllers = require('../controllers/profile-controllers');
    const {check, validationResult} = require('express-validator');


router.get('/me',auth,profileControllers.getProfile);
router.post('/',[
    auth,
    [
        check('status','status is required').not().isEmpty(),
        check('skills','skill is required').not().isEmpty()
    ]
],
profileControllers.createAndUpdateProfile);
router.get('/',profileControllers.getProfiles);
router.get('/user/:user_id',profileControllers.getUserProfile);


module.exports = router;