
import type { Request, Response } from "express";
import { voteService } from "./vote.service";

// VOTE
const voteIdea = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { ideaId, type } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await voteService.voteIdea(userId, ideaId, type);

    res.status(200).json({
      success: true,
      message: "Vote processed",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Voting failed",
      error: error.message,
    });
  }
};

const removeVote = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { ideaId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await voteService.removeVote(userId, ideaId as string);

    res.status(200).json({
      success: true,
      message: "Vote removed",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to remove vote",
      error: error.message,
    });
  }
};

const getVoteSummary = async (req: Request, res: Response) => {
  try {
    const { ideaId } = req.params;

    const result = await voteService.getVoteSummary(ideaId as string);

    res.status(200).json({
      success: true,
      message: "Vote summary fetched",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch votes",
      error: error.message,
    });
  }
};

export const voteController = {
  voteIdea,
  removeVote,
  getVoteSummary,
};