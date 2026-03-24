import express from "express";
import { ideaController } from "./idea.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = express.Router();

router.get("/", ideaController.getAllIdeas);
router.post("/",authMiddleware, ideaController.createIdea);



router.get("/:id",authMiddleware, ideaController.getIdeaById);

router.patch("/:id",authMiddleware, ideaController.updateIdea);

router.delete("/:id",authMiddleware, ideaController.deleteIdea);

router.patch("/:id/status",authMiddleware, ideaController.updateIdeaStatus);

export const ideaRoutes = router;
