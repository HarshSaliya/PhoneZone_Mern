import express from "express";
import { addToCart, getCart, removeFromCart , updateCart } from "../controller/cart_controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCart);

router.delete("/remove", removeFromCart);
router.put('/update', updateCart); 

export default router;
