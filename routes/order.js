import express from "express";
import { placeOrder , getOrders} from "../controllers/order.js";
import authUser from "../middleware/authuser.js";


const Orderrouter = express.Router();

Orderrouter.get("/get-order",authUser,getOrders);
Orderrouter.post("/place",authUser,placeOrder);
export default Orderrouter;