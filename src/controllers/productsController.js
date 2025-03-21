import productsModel from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
  try {
    const {limit = 10, page = 1, sort, query} = req.query;
    const filter = query ? {category: query} : {};

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort : sort ? {price :sort === "asc" ? 1 : -1} : {},
    };

    const products = await productsModel.paginate(filter, options);

    res.json({
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}` : null,
        nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}` : null,
    });
    }catch (error){
        res.status(500).json({status: "error", message: error.message});
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
    const {cod} = req.params;
    
    try {
        const product = await productsModel.findOne({cod});

        if (!product) {
            return res.status(404).json({status: "error", message: "Producto no encontrado"});
        }
        res.json({status: "success", payload: product});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
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