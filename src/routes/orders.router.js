import Router from "express"

import { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } from "../controllers/ordersController.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:oid", getOrderById);
router.put("/:oid", updateOrderStatus);
router.delete("/:oid", deleteOrder);

export default router;