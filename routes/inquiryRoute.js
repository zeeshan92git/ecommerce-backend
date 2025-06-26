import express from 'express';
import { sendInquiry } from '../controllers/inquiry.js';
import authUser from '../middleware/authuser.js';
const router = express.Router();

router.post('/send',authUser , sendInquiry);

export default router;
