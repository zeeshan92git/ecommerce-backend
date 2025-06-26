import express from  'express';
import { getProfile, registerUser,  userLogin , updateuserProfile} from '../controllers/user.js';
import authUser from '../middleware/authuser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',userLogin);
userRouter.get('/get-profile',authUser, getProfile);
userRouter.post('/update-profile',upload.single('image'),authUser,updateuserProfile);

export default userRouter;