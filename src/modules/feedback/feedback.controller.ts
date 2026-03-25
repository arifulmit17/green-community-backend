
import type { Request, Response } from "express";
import { feedbackService } from "./feedback.service";

// CREATE / UPDATE
const createFeedback = async (req: Request, res: Response) => {
  try {
    const { ideaId, message } = req.body;

    const result = await feedbackService.createOrUpdateFeedback(
      ideaId,
      message
    );

    res.status(200).json({
      success: true,
      message: "Feedback saved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to save feedback",
      error: error.message,
    });
  }
};

const getFeedback = async (req: Request, res: Response) => {
  try {
    const { ideaId } = req.params;

    const result = await feedbackService.getFeedbackByIdeaId(ideaId as string);

    res.status(200).json({
      success: true,
      message: "Feedback retrieved",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const { ideaId } = req.params;

    await feedbackService.deleteFeedback(ideaId as string);

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to delete feedback",
      error: error.message,
    });
  }
};

export const feedbackController = {
  createFeedback,
  getFeedback,
  deleteFeedback,
};