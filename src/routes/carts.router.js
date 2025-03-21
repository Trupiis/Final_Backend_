import { Router } from "express";
import { createCart, getCartById, addProductToCart, removeProductFromCart, updateCart, updateProductQuantity, clearCart } from "../controllers/cartsController.js";

const router = Router();

router.post("/carts", createCart);
router.get("/carts/:cid", getCartById);
router.post("/carts/:cid/products/:pid", addProductToCart);
router.delete("/carts/:cid/products/:pid", removeProductFromCart);
router.put("/carts/:cid", updateCart);
router.put("/carts/:cid/products/:pid", updateProductQuantity);
router.delete("/carts/:cid", clearCart);

export default router;