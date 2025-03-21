import Router from "express"

import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js"

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:cod", getProductById);
router.put("/products/:cod", updateProduct);
router.delete("/products/:cod", deleteProduct);

export default router