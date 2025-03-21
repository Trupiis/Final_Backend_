import mongoose from 'mongoose';
import productsModel from './ProductModel.js'; 

const orderSchema = new mongoose.Schema({
    user: { type: String, required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, 
        quantity: { type: Number, default: 1 },
    }],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pendiente', 'Procesando', 'Completado', 'Cancelado'],
        default: 'Pendiente',
    },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
