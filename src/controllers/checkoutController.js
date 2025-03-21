import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";


export const checkout = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid).populate("products.product");

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        const totalPrice = cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0);

        const newOrder = await orderModel.create({
            user: req.body.user,  
            products: cart.products,
            totalPrice,
            status: "Pendiente"
        });

    
        cart.products = [];
        await cart.save();

        res.status(201).json({ status: "success", message: "Orden creada", order: newOrder });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};