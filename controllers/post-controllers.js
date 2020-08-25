const User = require('../models/user'),
Post = require('../models/posts');
const {check, validationResult} = require('express-validator');

// @route POST /posts
// @desc add post
// @access Private
const addPost = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }
    try {
        const user  = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
          user : req.user.id,
          text : req.body.text,
          name : user.name,
          avatar : user.name
        });
       const post =  await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route GET /posts
// @desc get all posts
// @access Private
const getPosts = async (req,res,next)=>{
    try {
        const posts = await Post.find().sort({date : -1});
        res.json(posts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route GET /posts/:pid
// @desc get  post by id
// @access Private
const getPostById = async (req,res,next)=>{
    try {
        const post = await Post.findById(req.params.pid);
        if (!post) {
            return res.status(404).json({msg : 'Post not Found'});
        }
        res.json(post);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg : 'Post not Found'});
        }
        res.status(500).send('Server error');
    }
}

// @route DELETE /posts/:pid
// @desc delete  post by id
// @access Private
const deletePost = async (req,res,next)=>{
    try {
        const post = await Post.findById(req.params.pid);
        if (!post) {
            return res.status(404).json({msg : 'Post not Found'});
        }
        if (post.user.id.toString() === req.user.id) {
            return res.status(400).send("Not authorized");
        }
        await post.remove();
        res.send('Post removed');

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg : 'Post not Found'});
        }
        res.status(500).send('Server error');
    }
}



exports.addPost = addPost;
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.deletePost = deletePost;