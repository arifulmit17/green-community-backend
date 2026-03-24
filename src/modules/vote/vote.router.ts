import express from "express";
import { voteController } from "./vote.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";


const router = express.Router();

// VOTE (UP / DOWN)
router.post("/", authMiddleware, voteController.voteIdea);

// REMOVE VOTE
router.delete("/:ideaId", authMiddleware, voteController.removeVote);

// GET SUMMARY
router.get("/:ideaId", voteController.getVoteSummary);

export const voteRoutes = router;