import express from "express";
import productsModel from "../models/ProductModel.js";

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const products = await productsModel.find().lean();
        res.render("productsList", { products });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default router;
