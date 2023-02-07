const User = require("../models/User");

exports.registeration = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: `Email Already Exist. Please Enter New One`
            })
        }
        user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id: "This is an sample id",
                url: "this is an sample url"
            }
        })
        res.status(201).json({
            success: true,
            message:'Sucessfully Register',
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

/**login */
exports.login = async (req, res) => {
    try {
        const {email , password} = req.body;
        let user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Does Not Exist"
            })
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
        res.status(200).cookie("token", token , options).json({
            success: true,
            message: "Successfully Login",
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

/**logout */

exports.logout = async (req, res) => {
    try {
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true
        }
        res.status(200).cookie("token", null , options).json({
            success: true,
            message: 'Logout Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**get user Details */

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            user
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**Get Single User user (admin) */
exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success: false,
                message: `User does not exit with this Id:${req.params.id}`
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**get all users (admin) */

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**update profile user */

exports.updateProfileUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const {name, email, avatar} = req.body;
        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        // if (avatar) {
        //     await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      
        //     const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        //       folder: "avatars",
        //     });
        //     user.avatar.public_id = myCloud.public_id;
        //     user.avatar.url = myCloud.secure_url;
        //   }
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated sucessfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**admin update user profile or role */

exports.updateUserProfileAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {name, email, avatar, role} = req.body;
        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        if(role){
            user.role = role;
        }
        // if (avatar) {
        //     await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      
        //     const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        //       folder: "avatars",
        //     });
        //     user.avatar.public_id = myCloud.public_id;
        //     user.avatar.url = myCloud.secure_url;
        //   }
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated sucessfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**admin delete user profile */

exports.deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success: false,
                message: `User does Not exits with this id:${req.params.id}`
            })
        }
        await user.remove();
        res.status(200).json({
            success: true, 
            message: "User Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}