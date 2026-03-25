import express from "express";
import { feedbackController } from "./feedback.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { adminMiddleware } from './../../middlewares/adminMiddleware';


const router = express.Router();

// ADMIN ONLY → give feedback
router.post("/", authMiddleware, adminMiddleware, feedbackController.createFeedback);

// GET feedback (user can see rejection reason)
router.get("/:ideaId", feedbackController.getFeedback);

// DELETE (admin)
router.delete("/:ideaId", authMiddleware, adminMiddleware, feedbackController.deleteFeedback);

export const feedbackRoutes = router;