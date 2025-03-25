import { Router } from "express";
import { createCart, getCartById, addProductToCart, removeProductFromCart, updateCart, updateProductQuantity, clearCart } from "../controllers/cartsController.js";
import { checkout } from "../controllers/checkoutController.js";
import cartModel from "../models/cartModel.js";
import productsModel from "../models/ProductModel.js";

const router = Router();



router.post("/cart", async (req, res) => {
    try {
        const newCart = new Cart({
            products: [] // Carrito vacío
        });
        await newCart.save();
        res.redirect(`/cart/${newCart._id}`);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.post("/:cartId/products/:productId", async (req, res) => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        const product = await productsModel.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        // Agregar producto al carrito
        const productInCart = cart.products.find(item => item.product.toString() === product._id.toString());

        if (productInCart) {
            productInCart.quantity += Number(quantity);
        } else {
            cart.products.push({ product: product._id, quantity: Number(quantity) });
        }

        await cart.save();
        res.json({ status: "success", message: "Producto agregado al carrito", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.get("/carts/:cid", getCartById);
router.delete("/carts/:cid/products/:pid", removeProductFromCart);
router.put("/carts/:cid", updateCart);
router.put("/carts/:cid/products/:pid", updateProductQuantity);
router.delete("/carts/:cid", clearCart);
router.post("/carts/:cid/checkout", checkout);


export default router;