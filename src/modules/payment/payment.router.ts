import { createPaymentIntent } from "./payment.controller";
import express from "express";


const router = express.Router();
router.post("/create-payment-intent", createPaymentIntent)

export const paymentRoutes = router;