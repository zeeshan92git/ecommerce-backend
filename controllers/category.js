import categoryModel from '../models/category.js';

// total 0f 8 categories of products
const addCategory = async (req, res) => {
  try {
    // console.log("REQ BODY:", req.body); 
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await categoryModel.findOne({ name });
    if (existing) {
      console.log("Already exists:", existing);
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new categoryModel({ name, description });
    await newCategory.save();
    console.log("New Category Saved:", newCategory);

    return res.status(201).json({ success: true, data: newCategory });
  } catch (err) {
    console.error("Error adding category:", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if(!categories) 
            return res.json({message : "Categories not found." , error : error.message});
        return res.status(200).json({success : true , message : "All categories found." ,data : categories});
    } 
    catch (error) {
        res.status(500).json({success : false , message : "Internal Server Error.", error: error.message });
    }
};

export { addCategory, getAllCategories };
