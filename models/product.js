import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
    summary: String,
    details: String
  },
  image: String,
  price: { type: Number, required: true },
  oldPrice: Number,
  rating: Number,
  starsCount: Number,
  brand: String,
  condition: String,
  tag: String, // Hot offers, Gift boxes, Projects, Menu Items
  stock: [Number], // [50-100 pcs price, 100-700 pcs price, 700+ pcs price]
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  attributes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  supplierName: String,
  shipping: {
    deliveryTime: String,
    cost: Number,
    trackingAvailable: Boolean
  },
  sellerName: String,
  sellerDetails: {
    name: String,
    location: String,
    experience: String,
    responseTime: String
  },
  reviews: [
    {
      name: String,
      review: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});
const productModel = mongoose.models.Product ||  mongoose.model("Product", productSchema);
export default productModel;

