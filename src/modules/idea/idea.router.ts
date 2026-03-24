import express from "express";
import { ideaController } from "./idea.controller";

const router = express.Router();

// CREATE
router.post("/", ideaController.createIdea);

// GET ALL
router.get("/", ideaController.getAllIdeas);

// GET SINGLE
router.get("/:id", ideaController.getIdeaById);

// UPDATE
router.patch("/:id", ideaController.updateIdea);

// DELETE
router.delete("/:id", ideaController.deleteIdea);

// ADMIN: UPDATE STATUS
router.patch("/:id/status", ideaController.updateIdeaStatus);

export const ideaRoutes = router;