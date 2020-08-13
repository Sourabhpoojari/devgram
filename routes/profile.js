const router = require('express').Router(),
    auth = require('../middleware/auth'),
    profileControllers = require('../controllers/profile-controllers');

router.get('/me',auth,profileControllers.getProfile);



module.exports = router;