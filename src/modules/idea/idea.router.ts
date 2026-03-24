import express from "express";
import { ideaController } from "./idea.controller";

const router = express.Router();

router.post("/idea", ideaController.createIdea);

router.get("/idea", ideaController.getAllIdeas);

router.get("/idea/:id", ideaController.getIdeaById);

router.patch("/idea/:id", ideaController.updateIdea);

router.delete("/idea/:id", ideaController.deleteIdea);

router.patch("/idea/:id/status", ideaController.updateIdeaStatus);

export const ideaRoutes = router;
