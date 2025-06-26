import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config(); // Must be at the top, before using process.env

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRETKEY
})

export default cloudinary;