import cartModel from "../models/cart.js";

// Add product to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        if (!productId || isNaN(quantity)) {
            return res.status(400).json({ success: false, message: "Invalid product or quantity" });
        }

        let cart = await cartModel.findOne({ userId });

        if (cart) {
            const itemIndex = cart.products.findIndex(p => p.productId == productId);
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        } else {
            cart = new cartModel({
                userId,
                products: [{ productId, quantity }],
            });
        }

        await cart.save();
        return res.json({ success: true, message: "Product added to cart" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// Get cart items

export const getCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        const cart = await cartModel.findOne({ userId }).populate("products.productId");

        if (!cart) return res.json({ success: true, products: [] });
        //console.log("cart.products\n",cart.products);
        return res.json({ success: true, products: cart.products });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export const setQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.userId;

        if (!productId || quantity == null) {
            return res.status(400).json({ success: false, message: "Missing productId or quantity" });
        }

        const cart = await cartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        const product = cart.products.find(p => p.productId.toString() === productId);
        if (product) {
            product.quantity = quantity;
            await cart.save();
            return res.json({ success: true, message: "Quantity updated" });
        }

        return res.status(404).json({ success: false, message: "Product not found in cart" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        //console.log("userId",userId);
        const { productId } = req.params;
        if(!productId)
        {
            return res.json({success : false , message : "Product ID mismatch"});
        }
        //console.log("productId",productId);
        await cartModel.updateOne(
            { userId },
            { $pull: { products: { productId } } }
        );

        return res.json({ success: true, message: "Product removed from cart" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// Delete all products from cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.json({ success: false, message: "Cart not found" });
        }
    
        cart.products = []; // remove all items
        await cart.save();

        return res.json({ success: true, message: "All products removed from cart" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};
