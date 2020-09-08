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

// @route PUT /posts/like/:pid
// @desc like a  post by id
// @access Private
const likePost = async (req,res,next)=>{
    try {
         const post = await Post.findById(req.params.pid);
         if (!post) {
            return res.status(404).json({msg : 'Post not Found'});
        }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg : 'Post already liked'});
        }
        post.likes.unshift({user : req.user.id});
        post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg : 'Post not Found'});
        }
        res.status(500).send('Server error');
    }
};

// @route PUT /posts/unlike/:pid
// @desc unlike a  post by pid
// @access Private
const unlikePost = async (req,res,next)=>{
    try {
         const post = await Post.findById(req.params.pid);
         if (!post) {
            return res.status(404).json({msg : 'Post not Found'});
        }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg : 'Post not liked yet'});
        }
        const removeIndex  = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg : 'Post not Found'});
        }
        res.status(500).send('Server error');
    }
};

// @route POST /posts/comment/:pid
// @desc add comment to post
// @access Private
const addComments = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }
    try {
        const user  = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.pid);
        if (!post) {
            return res.status(404).json({msg : 'Post not Found'});
        }
        const newComment = {
          user : req.user.id,
          text : req.body.text,
          name : user.name,
          avatar : user.name
        };
      post.comments.unshift(newComment);
      post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg : 'Post not Found'});
        }
        res.status(500).send('Server error');
    }
};
// @route DELETE /posts/comment/:pid/:cid
// @desc remove comment from post
// @access Private
const deleteComment = async (req,res,next)=>{
    try {
        const post = await Post.findById(req.params.pid);
        // pull out the comment
        const comment = post.comments.find(
            comment => comment.id === req.params.cid
        )
        if (!comment) {
            return res.status(404).json({msg : 'Comment does not exist'});
        }
        // check user
        if (comment.user.toString() != req.user.id) {
            return res.status(401).json({msg : 'User not authorized'});
        }
        const removeIndex  = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex,1);
        post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.addPost = addPost;
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.deletePost = deletePost;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.addComments = addComments;
exports.deleteComment = deleteComment;