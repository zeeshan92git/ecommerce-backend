import Order from '../models/order.js';
import cartModel from '../models/cart.js'; // assuming cart is stored in DB

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await cartModel.findOne({ userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const total = cart.products.reduce((acc, item) => {
      const price = item.productId.price || 0;
      return acc + price * item.quantity;
    }, 0);

    const newOrder = new Order({
      userId,
      products: cart.products.map(p => ({
        productId: p.productId._id,
        quantity: p.quantity
      })),
      total,
      paymentStatus: 'Paid', // set dynamically if Stripe is used
      orderStatus: 'Processing'
    });

    await newOrder.save();

    // Clear cart after placing order
    cart.products = [];
    await cart.save();

    return res.status(200).json({ success: true, message: "Order placed successfully! Cart is empty now", order: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to place order" });
  }
};


export const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId })
      .populate('products.productId')
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};