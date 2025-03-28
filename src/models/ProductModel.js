import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    cod: {
        type: Number,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
})


productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel