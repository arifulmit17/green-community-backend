import { prisma } from "../../lib/prisma";

// CREATE / UPDATE feedback (since 1 idea = 1 feedback)
const createOrUpdateFeedback = async (ideaId: string, message: string) => {
  const existing = await prisma.feedback.findUnique({
    where: { ideaId },
  });

  if (existing) {
    return prisma.feedback.update({
      where: { ideaId },
      data: { message },
    });
  }

  return prisma.feedback.create({
    data: {
      ideaId,
      message,
    },
  });
};

// GET feedback by ideaId
const getFeedbackByIdeaId = async (ideaId: string) => {
  const feedback = await prisma.feedback.findUnique({
    where: { ideaId },
  });

  if (!feedback) {
    throw new Error("Feedback not found");
  }

  return feedback;
};

// DELETE feedback
const deleteFeedback = async (ideaId: string) => {
  return prisma.feedback.delete({
    where: { ideaId },
  });
};

export const feedbackService = {
  createOrUpdateFeedback,
  getFeedbackByIdeaId,
  deleteFeedback,
};