import express from "express";
import productsModel from "../models/ProductModel.js";  
import cartModel from "../models/cartModel.js";

const router = express.Router();

/* router.get("/products/:cod", async (req, res) => {
    const {cod} = req.params
     try {
        const products = await productsModel.find({cod:Number(cod)}).lean();
        res.render("productDetail", { products });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}); */

router.get("/products/:cod", async (req, res) => {
    const { cod } = req.params;

    if (!req.session.cartId) {
        const newCart = await cartModel.create({ products: [] });
        req.session.cartId = newCart._id.toString();
    }

    try {
        const product = await productsModel.findOne({ cod: Number(cod) }).lean();
        if (!product) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.render("productDetail", { product, cartId: req.session.cartId });  
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});




export default router;
