import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import categoryRouter from './routes/category.js';
import productRouter from './routes/product.js';
import connectdb from './config/db.js';
import userRouter from './routes/user.js';
import cartRouter from "./routes/cart.js";
import router from './routes/inquiryRoute.js';
import Orderrouter from './routes/order.js';
const app = express();
connectdb();

const port = process.env.PORT  || 5000;
const host = process.env.HOST  || "localhost";
app.use(express.json());

// CORS POLICY
app.use(cors({
  origin: "http://localhost:5173",   
  credentials: true,                
}));

//Routes
app.use("/api/category" , categoryRouter);
app.use("/api/product" , productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/inquiry",router);
app.use("/api/order",Orderrouter);

//Example Route
app.get('/',(req,res)=>{
    res.send("API working greatly");
});
//Start Server
app.listen(port,()=>{
    console.log(`Server running on ${host}:${port}`);
});

