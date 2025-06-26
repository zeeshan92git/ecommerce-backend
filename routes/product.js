import express from "express";
import {addProduct , getProducts , getProductbyId , updateProduct , deleteProduct} from "../controllers/product.js";


const productRouter = express.Router();

productRouter.post('/add-product', addProduct);
productRouter.get('/all-product', getProducts);
//get product by id
productRouter.get('/:prodId', getProductbyId);
productRouter.delete('/:prodId', deleteProduct);
productRouter.post('/:prodId',updateProduct);

export default productRouter;