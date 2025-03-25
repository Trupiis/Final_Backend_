import productsModel from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, query } = req.query;

        limit = parseInt(limit) > 0 ? parseInt(limit) : 10;
        page = parseInt(page) > 0 ? parseInt(page) : 1;

        const filter = query ? { category: query } : {};

        const options = {
            limit,
            page,
            sort: sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {},
            lean: true
        };

        const products = await productsModel.paginate(filter, options);

        res.json({
            products: products.docs,
            totalPages: products.totalPages,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = await productsModel.create(req.body);
        res.status(201).json({status: "success", product: newProduct});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
};

export const getProductById = async (req, res) => {
    const { cod } = req.params;
    
    try {
        const product = await productsModel.findOne({ cod: Number(cod) });

        if (!product) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        res.json({ product });
        
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const {cod} = req.params;
    const updatedData = req.body;

    try {
        const updatedProduct = await productsModel.findOneAndUpdate({cod}, updatedData, {new: true});
        if (!updatedProduct) {
            return res.status(404).json({status: "error", message: "Producto no encontrado"});
        }
        res.json({status: "success", payload: updatedProduct});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
};

export const deleteProduct = async (req, res) => {
    const { cod } = req.params;


    try {
        const deletedProduct = await productsModel.findOneAndDelete({cod});
        if (!deletedProduct) {
            return res.status(404).json({status: "error", message: "Producto no encontrado"});
        }
        res.json({status: "success", message: "Producto eliminado"});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
};