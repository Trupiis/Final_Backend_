import express from "express";
import productsModel from "../models/ProductModel.js";  

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
    const cartId = req.session.cartId; // Obtenemos el cartId de la sesión o de la base de datos si es necesario
    try {
        const product = await productsModel.findOne({ cod: Number(cod) }).lean();
        res.render("productDetail", { product, cartId });  // Pasamos cartId a la vista
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});



export default router;
