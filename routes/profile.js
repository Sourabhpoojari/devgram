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
router.delete('/',auth,profileControllers.deleteProfile);
router.put('/experience',[auth,[
    check('title','title is required').not().isEmpty(),
    check('company','company name is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty()
]],profileControllers.putExperience);
router.delete('/experience/:exp_id',auth,profileControllers.deleteExperience);
router.put('/education',[auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','field of study is required').not().isEmpty(),
    check('from','from is required').not().isEmpty()
]],profileControllers.putEducation);
router.delete('/education/:edu_id',auth,profileControllers.deleteEducation);
router.get('/github/:username',profileControllers.getRepos);


module.exports = router;