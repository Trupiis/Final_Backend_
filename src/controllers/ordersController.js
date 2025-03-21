import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/ProductModel.js";


export const createOrder = async (req, res) => {
    try {
        const { cartId, user } = req.body;

        if (!cartId) {
            return res.status(400).json({ status: "error", message: "El carrito ID es obligatorio" });
        }

        if (!user) {
            return res.status(400).json({ status: "error", message: "El usuario es obligatorio" });
        }

        const cart = await cartModel.findById(cartId).populate("products.product");
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        const newOrder = await orderModel.create({
            user,  
            products: cart.products,
            totalPrice: cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
            status: "Pendiente",  
            createdAt: new Date(),
        });

        res.status(201).json({ status: "success", order: newOrder });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate("products.product");
        res.json({ status: "success", orders });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.oid).populate("products.product");

        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }

        res.json({ status: "success", order });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { oid } = req.params;
        const { status } = req.body;

        const order = await orderModel.findById(oid);

        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }

        order.status = status;

        await order.save();

        res.json({ status: "success", message: "Estado de la orden actualizado", order });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { oid } = req.params;

        const order = await orderModel.findByIdAndDelete(oid);

        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }

        res.json({ status: "success", message: "Orden eliminada", order });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
