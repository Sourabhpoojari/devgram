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
router.put('/like/:pid',auth,postControllers.likePost);
router.put('/unlike/:pid',auth,postControllers.unlikePost);
router.post('/comment/:pid',[
    auth,
    [
        check('text','text is required').not().isEmpty()
    ]
],postControllers.addComments);
router.delete('/comment/:pid/:cid',auth,postControllers.deleteComment);



module.exports = router;