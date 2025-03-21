import Router from "express"
import { getProductViewById } from "../controllers/viewsController.js";

const router = Router();

router.get("/products/:cod", getProductViewById);  




/* router.get("/", async (req, res) => {
    try{
        const orders = await orderModel.find().populate("products.product")
        res.render("orders", {orders})
    }catch(error){
        res.status(500).send({status: "error", error: "Error al cargar las ordenes"});
    }
})

router.get("/:oid", async (req, res) => {
    try{
        const order = await orderModel.findById(req.params.oid).populate("products.product")
        if(!order){
    return res.status(404).send({status: "error", error: "Orden no encontrada"});
}

    }catch(error){
        res.status(500).send({status: "error", error: "Error al cargar la orden detallada"});
    }
}) */

export default router;