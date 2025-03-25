import productsModel from "../models/ProductModel.js";

import path from 'path';

export const getProductViewById = async (req, res) => {
    const { cod } = req.params;

    try {
        const product = await productsModel.findOne({ cod: Number(cod) });

        if (!product) {
            console.log("No se encontró el producto en MongoDB");
            return res.status(404).send("Producto no encontrado en detalle");
        }

        console.log("Producto encontrado:", product);
        res.render("productDetail")

    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).send({ status: "error", message: error.message });
    }
};


