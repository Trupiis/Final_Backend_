import { Router } from "express";
import { createCart, getCartById, addProductToCart, removeProductFromCart, updateCart, updateProductQuantity, clearCart } from "../controllers/cartsController.js";

const router = Router();

router.post("/carts", createCart);
router.get("/carts/:cid", getCartById);
router.post("/carts/:cid/products/:pid", addProductToCart);
router.delete("/:cid/products/:pid", removeProductFromCart);
router.put("/:cid", updateCart);
router.put("/:cid/products/:pid", updateProductQuantity);
router.delete("/:cid", clearCart);

export default router;