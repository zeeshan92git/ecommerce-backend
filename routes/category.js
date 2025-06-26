import express from "express";
import {addCategory, getAllCategories} from "../controllers/category.js";


const categoryRouter = express.Router();

categoryRouter.post('/add-category', addCategory);
categoryRouter.get('/all-category', getAllCategories);


export default categoryRouter;