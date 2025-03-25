import cartModel from "../models/cartModel.js";
import productsModel from "../models/ProductModel.js";

export const createCart = async (req, res) => {
    try{
        const newCart = await cartModel.create({products: []});
        res.status(201).json({status: "success", cart: newCart});
    }catch (error){
        res.status(500).json({status: "error", message: error.message});
    }
};

export const getCartById = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid).populate("products.product");

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        const product = await productsModel.findById(pid);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        const productInCart = cart.products.find(item => item.product.toString() === product._id.toString());

        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.push({ product: product._id, quantity });
        }

        await cart.save();
        res.status(200).json({ status: "success", message: "Producto agregado al carrito", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const removeProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
 
        const cart = await cartModel.findById(cid);
        if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        const product = await productsModel.findOne({ cod: pid });
        if (!product) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        cart.products = cart.products.filter((p) => p.product.toString() !== product._id.toString());
  
        await cart.save();
  
        res.json({ status: 'success', message: 'Producto eliminado del carrito', cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
  };

  export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        for (let i = 0; i < products.length; i++) {
            const productCod = products[i].product; 
            const product = await productsModel.findOne({ cod: productCod });

            if (!product) {
                return res.status(404).json({ status: 'error', message: `Producto con cod ${productCod} no encontrado` });
            }

            const productInCart = cart.products.find(item => item.product.toString() === product._id.toString());

            if (productInCart) {
                productInCart.quantity = products[i].quantity;
            } else {
                cart.products.push({ product: product._id, quantity: products[i].quantity });
            }
        }

        await cart.save();

        res.status(200).json({ status: 'success', message: 'Carrito actualizado', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ status: "error", message: "La cantidad debe ser mayor a 0" });
        }


        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        const product = await productsModel.findOne({ cod: pid });
        if (!product) {
            return res.status(404).json({ status: "error", message: `Producto con cod ${pid} no encontrado` });
        }

        const productIndex = cart.products.findIndex((item) => item.product.toString() === product._id.toString());

        if (productIndex === -1) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
        }

        cart.products[productIndex].quantity = quantity;

        await cart.save();

        res.json({ status: "success", message: "Cantidad actualizada", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};



export const clearCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        res.json({ status: "success", message: "Carrito vaciado", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
