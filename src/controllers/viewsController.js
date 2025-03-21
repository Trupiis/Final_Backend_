import productsModel from "../models/ProductModel.js";

export const getProductViewById = async (req, res) => {
    const { cod } = req.params;

    try {
        const product = await productsModel.findOne({ cod });

        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }

        res.render("productDetail", { product });

    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};
