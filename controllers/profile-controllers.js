const Profile = require('../models/profile'),
    User = require('../models/user');


const getProfile = async (req,res,next)=>{
    try {
        const foundProfile = await Profile.findOne({user:req.user.id}).populate('user', ['name', 'avatar']);
        if(!foundProfile){
            return res.status(400).json({msg: "There is no Profile found for this user!"});
        }
        res.status(200).json(foundProfile);
    } catch (err) {
        console.error(err);
        res.status(500).send('server error');
    }
};

exports.getProfile = getProfile;