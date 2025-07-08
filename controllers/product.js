import productModel from '../models/product.js';
import categoryModel from '../models/category.js';


const addProduct = async (req, res) => {
  try {
    const { name, description, image, price, oldPrice, rating, starsCount, category, attributes,
       brand,condition,tag,stock,shipping,sellerName,sellerDetails , supplierName , reviews
     } = req.body;
    
    const Category = await categoryModel.findById(category);
    // console.log(Category)
    if (!Category) return res.status(400).json({ message: "Invalid category" });

    const product = new productModel({ name, description, image, price, oldPrice, rating, starsCount, category: category, attributes , 
       brand,condition,tag,stock,shipping,sellerName,sellerDetails , supplierName , reviews
     });

    await product.save();
    console.log("Product Added.", "Named as ", product.name);
    return res.status(201).json({ success: true, message: "Product added", data: product });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message, message: "Internal Serve Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {prodId,brand,condition,tag,stock,attributes,shipping,sellerName,sellerDetails , supplierName , reviews} = req.body;

    if (!brand || !condition || !tag || !stock || !attributes || !shipping || !sellerName || !sellerDetails || !supplierName || !reviews) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    await productModel.findByIdAndUpdate(prodId, {
      brand,condition,tag,stock,attributes,shipping,sellerName,sellerDetails , supplierName , reviews
    });
    console.log("product updated successfully");
    return res.status(200).json({ message: "Product updated", success: true});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message, message: "Internal Server Error" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate("category");
    if (products.length === 0) {
      return res.json({ success: false, message: "Products not found", data: NULL })
    }
    //console.log("Products obtained", products);
    return res.status(200).json({ success: true, message: "Products obtained Successfullly", data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

//get product by id
const getProductbyId = async (req, res) => {
  try {
    const {prodId} = req.params;
    console.log("Product id",prodId);
    const products = await productModel.findById(prodId);
    if (!products) {
      return res.json({ success: false, message: "Product not found", data: NULL })
    }
    //console.log("Products obtained", products);
    return res.status(200).json({ success: true, message: "Product obtained Successfullly", data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { prodId } = req.params;

    const deleted = await productModel.findByIdAndDelete(prodId);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, getProducts, getProductbyId , updateProduct, deleteProduct };