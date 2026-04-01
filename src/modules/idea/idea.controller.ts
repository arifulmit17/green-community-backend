
import type { Request, Response } from "express";
import { ideaService } from "./idea.service";

// CREATE IDEA
const createIdea = async (req: Request, res: Response) => {
  try {
    console.log("User ID:", req.user?.id);
    const result = await ideaService.createIdea(req.body,req.user?.id as string);

    res.status(201).json({
      success: true,
      message: "Idea created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Idea creation failed",
      error: error.message,
    });
  }
};

const getAllIdeas = async (req: Request, res: Response) => {
  try {
    console.log("req come");
    const result = await ideaService.getAllIdeas(req.query);

    res.status(200).json({
      success: true,
      message: "Ideas retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch ideas",
      error: error.message,
    });
  }
};

const getIdeaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // optional: from auth middleware
    const userId = (req as any).user?.id;

    const result = await ideaService.getIdeaById(id as string, userId);

    res.status(200).json({
      success: true,
      message: "Idea retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};



export const getIdeasByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      })
    }

    const ideas = await ideaService.getIdeasByUserId(userId as string)

    return res.status(200).json({
      success: true,
      data: ideas,
    })
  } catch (error) {
    console.error("Get ideas by user error:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to fetch ideas",
    })
  }
}

const updateIdea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = (req as any).user?.id;

    const result = await ideaService.updateIdea(
      id as string,
      userId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Idea updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Idea update failed",
      error: error.message,
    });
  }
};

const deleteIdea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = (req as any).user?.id;

    const result = await ideaService.deleteIdea(id as string, userId);

    res.status(200).json({
      success: true,
      message: "Idea deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Idea deletion failed",
      error: error.message,
    });
  }
};

const updateIdeaStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await ideaService.updateIdeaStatus(id as string, status);

    res.status(200).json({
      success: true,
      message: "Idea status updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

export const ideaController = {
  createIdea,
  getAllIdeas,
  getIdeaById,
  getIdeasByUserId,
  updateIdea,
  deleteIdea,
  updateIdeaStatus,
};