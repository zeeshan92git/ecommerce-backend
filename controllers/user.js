import dotenv from "dotenv";
dotenv.config({ path: './.env' });

console.log("JWT SECRET: at user.js\n", process.env.JWT_SECRET);
console.log("CLOUDINARY_APIKEY: at user.js\n", process.env.CLOUDINARY_APIKEY);

import userModel from "../models/user.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cloudinary from "../config/cloudinary.js";


//user registration
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        console.log({ name, email, password });
        if (!name, !email, !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        //validating email & password format
        if (!validator.isEmail(email))
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        if (password.length < 8)
            return res.json({ success: false, message: "Enter a strong (8-character)password" });

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedpswrd = await bcrypt.hash(password, salt);

        const userData = { name, email, password: hashedpswrd };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        //creating token for auth...
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);// Include user id in the token payload
        return res.json({ success: true, token });

    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

//user login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        console.log(user);
        const isMatchedPW = await bcrypt.compare(password, user.password);
        if (isMatchedPW) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        }
        else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

//user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("userId at getprofile\n",userId);
        const data = await userModel.findById(userId).select('-password');
        if (!data) {
            return res.json({ success: false, message: "User data not found" });
        }
        console.log("User profile data fetched\n",data);
        return res.status(200).json({ success: true, data });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

//update profile
const updateuserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {name, phone, address, dob, gender } = req.body;
        const imgFile = req.file;
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Missing Data" });
        }
        console.log("userId at updateprofile\n",userId);
        console.log("Received:", { name, phone, address, dob, gender });
        console.log("Image file:", imgFile);


        await userModel.findByIdAndUpdate(userId, { name, phone, address, dob, gender });


        if (imgFile) {
            console.log("Cloud name:", process.env.CLOUDINARY_NAME);
            console.log("API Key:", process.env.CLOUDINARY_APIKEY);
            console.log("API Secret:", process.env.CLOUDINARY_SECRETKEY);

            const imgUpload = await cloudinary.uploader.upload(imgFile.path, { resource_type: "image" });
            const imgURL = imgUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imgURL });
        }
        console.log("User profile updated data\n");
        return res.status(200).json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
export { registerUser, getProfile, userLogin, updateuserProfile };