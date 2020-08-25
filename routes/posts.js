const router = require('express').Router(),
auth = require('../middleware/auth'),
postControllers = require('../controllers/post-controllers'),
{check, validationResult} = require('express-validator');

router.post('/',[
    auth,
    [
        check('text','text is required').not().isEmpty()
    ]
],postControllers.addPost);
router.get('/',auth,postControllers.getPosts);
router.get('/:pid',auth,postControllers.getPostById);
router.delete('/:pid',auth,postControllers.deletePost);



module.exports = router;