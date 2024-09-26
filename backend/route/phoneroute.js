
import express from "express";
import {getPhoneById,createPhone,updatePhone,deletePhone} from "../controller/phone_controller.js";


import { getPhone } from "../controller/phone_controller.js";

const router = express.Router();


router.get("/", getPhone);
router.get("/:id", getPhoneById);

router.post("/", createPhone);
router.put("/:id", updatePhone);
router.delete("/:id", deletePhone);

export default router;
