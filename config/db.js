import mongoose from "mongoose";

const connectdb = async ()=> {
    await mongoose.connect(`${process.env.MONGODB_URI}/Ecommerce`);
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

export default connectdb;