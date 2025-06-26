import express from "express";
import { addToCart, getCart, setQuantity , removeFromCart , clearCart } from "../controllers/cart.js";
import authUser from "../middleware/authuser.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.get("/get", authUser, getCart);
cartRouter.post("/set-quantity", authUser, setQuantity);
cartRouter.delete("/remove/:productId", authUser, removeFromCart);
cartRouter.delete("/clear", authUser, clearCart);

export default cartRouter;
