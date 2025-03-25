import { Router } from "express";
import { createCart, getCartById, addProductToCart, removeProductFromCart, updateCart, updateProductQuantity, clearCart } from "../controllers/cartsController.js";
import { checkout } from "../controllers/checkoutController.js";
import cartModel from "../models/cartModel.js";
const router = Router();


const checkCartId = (req, res, next) => {
    if (!req.session.cartId) {
        // Si no existe cartId, redirige al carrito o crea uno nuevo
        return res.status(400).json({ status: "error", message: "Carrito no encontrado, crea uno nuevo" });
    }
    next();
};

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
router.get("/carts/:cid", getCartById);

router.post("/:cartId/products/:productId", checkCartId, async (req, res) => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body; // Cantidad enviada desde el formulario

    try {
        // Busca el carrito por el cartId
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        // Busca el producto por productId
        const product = await productsModel.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        // Verificar si el producto ya está en el carrito
        const productInCart = cart.products.find(item => item.product.toString() === product._id.toString());
        
        if (productInCart) {
            // Si ya existe, solo actualizar la cantidad
            productInCart.quantity += quantity;
        } else {
            // Si no existe, agregar el producto al carrito
            cart.products.push({ product: product._id, quantity });
        }

        // Guardar el carrito actualizado
        await cart.save();

        // Responder con éxito
        res.status(200).json({ status: "success", message: "Producto agregado al carrito", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.delete("/carts/:cid/products/:pid", removeProductFromCart);
router.put("/carts/:cid", updateCart);
router.put("/carts/:cid/products/:pid", updateProductQuantity);
router.delete("/carts/:cid", clearCart);
router.post("/carts/:cid/checkout", checkout);


export default router;