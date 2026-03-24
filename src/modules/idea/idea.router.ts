import express from "express";
import { ideaController } from "./idea.controller";

const router = express.Router();

router.post("/", ideaController.createIdea);

router.get("/", ideaController.getAllIdeas);

router.get("/:id", ideaController.getIdeaById);

router.patch("/:id", ideaController.updateIdea);

router.delete("/:id", ideaController.deleteIdea);

router.patch("/:id/status", ideaController.updateIdeaStatus);

export const ideaRoutes = router;
