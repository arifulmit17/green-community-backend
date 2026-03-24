import express from "express";
import { ideaController } from "./idea.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/idea",authMiddleware, ideaController.createIdea);

router.get("/idea", ideaController.getAllIdeas);

router.get("/idea/:id",authMiddleware, ideaController.getIdeaById);

router.patch("/idea/:id",authMiddleware, ideaController.updateIdea);

router.delete("/idea/:id",authMiddleware, ideaController.deleteIdea);

router.patch("/idea/:id/status",authMiddleware, ideaController.updateIdeaStatus);

export const ideaRoutes = router;
