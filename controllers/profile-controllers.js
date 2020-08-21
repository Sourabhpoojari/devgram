const Profile = require('../models/profile'),
    User = require('../models/user');
    const {check, validationResult} = require('express-validator');


// @route profile/me
// @desc get user profile
// @access Private
const getProfile = async (req,res,next)=>{
    try {
        const foundProfile = await Profile.findOne({user:req.user.id}).populate('user', ['name', 'avatar']);
        if(!foundProfile){
            return res.status(400).json({msg: "There is no Profile found for this user!"});
        }
        res.status(200).json(foundProfile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
};

// @route profile/
// @desc create and update profile
// @access Private
const createAndUpdateProfile = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return  res.status(400).json({errors:errors.array()});
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user =  req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(company) profileFields.company = company;
   
    if(skills){
        profileFields.skills = skills.split(',').map(skill=>skill.trim());
    }

    // Build social object
     profileFields.social = {};
     if(youtube) profileFields.youtube = youtube;
     if(twitter) profileFields.twitter = twitter;
     if(facebook) profileFields.facebook = facebook;
     if(linkedin) profileFields.linkedin = linkedin;
     if(instagram) profileFields.instagram = instagram;

     try {
         let profile = await Profile.findOne({user:req.user.id});
         if(profile){
             profile = await Profile.findOneAndUpdate(
                 { user : req.user.id },
                 { $set: profileFields},
                 { new : true}
                );
            return res.json(profile);
         }
         profile = new Profile(profileFields);
         await profile.save();
         return res.json(profile);
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server error');
     }
};


// @route profile/
// @desc get all profiles
// @access Public
const getProfiles = async (req,res,next)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avator']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

//  @route profile/user/:user_id
// @desc get user profiles
// @access Public
const getUserProfile = async (req,res,next)=>{
    try {
        const profile = await Profile.find({user : req.params.user_id}).populate('user',['name','avator']);
        if (!profile) {
           return res.status(400).json({msg:"Profile not found!"});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:"Profile not found!"});
        }
        res.status(500).send("Server error");
    }
};

// @route profile/
// @desc delete user, profiles & posts
// @access Private
const deleteProfile = async (req,res,next)=>{
    try {
        // @todo - remove user posts

        // remove profile
        await Profile.findOneAndRemove({user :req.user.id});
        // remove user
        await User.findByIdAndRemove(req.user.id);
        res.json({msg : 'User removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// @route PUT profile/experience
// @desc add experience to profile
// @access Private
const putExperience = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    const exp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description   
    }
    try {
       const profile = await Profile.findOne({user:req.user.id});
       profile.experience.unshift(exp);
       await profile.save();
       res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}; 

// @route DELETE profile/experience/:exp_id
// @desc delete experience from profile
// @access Private
const deleteExperience = async (req,res,next)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});
        const removeIndex = profile.experience.map(index => index.id).indexOf(req.params.exp_id);
         profile.experience.splice(removeIndex,1);
         await profile.save();
         res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// @route PUT profile/education
// @desc add Education to profile
// @access Private
const putEducation = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    const edu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description  
    }
    try {
       const profile = await Profile.findOne({user:req.user.id});
       profile.education.unshift(edu);
       await profile.save();
       res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}; 

// @route DELETE profile/education/:edu_id
// @desc delete education from profile
// @access Private
const deleteEducation = async (req,res,next)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});
        const removeIndex = profile.education.map(index => index.id).indexOf(req.params.edu_id);
         profile.education.splice(removeIndex,1);
         await profile.save();
         res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};



exports.getProfile = getProfile;
exports.createAndUpdateProfile = createAndUpdateProfile;
exports.getProfiles = getProfiles;
exports.getUserProfile = getUserProfile;
exports.deleteProfile = deleteProfile;
exports.putExperience = putExperience;
exports.deleteExperience = deleteExperience;
exports.putEducation = putEducation;
exports.deleteEducation = deleteEducation;