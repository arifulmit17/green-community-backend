import express from "express"
import {
  createPurchase,
  getMyPurchases,
  checkPurchase,
} from "./purchase.controller"
import { authMiddleware } from "../../middlewares/authMiddleware"

const router = express.Router()

// 💳 Create purchase
router.post("/", authMiddleware, createPurchase)

// 📦 Get my purchases
router.get("/my", authMiddleware, getMyPurchases)

// 🔍 Check if purchased
router.get("/check/:ideaId", authMiddleware, checkPurchase)

export const purchaseRoutes = router