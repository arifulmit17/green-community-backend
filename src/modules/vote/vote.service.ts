import { prisma } from "../../lib/prisma";

// VOTE (UP / DOWN / TOGGLE)
const voteIdea = async (
  userId: string,
  ideaId: string,
  type: "UP" | "DOWN"
) => {
  // check existing vote
  const existing = await prisma.vote.findUnique({
    where: {
      userId_ideaId: {
        userId,
        ideaId,
      },
    },
  });

  // 🔁 If same vote → remove (toggle off)
  if (existing && existing.type === type) {
    await prisma.vote.delete({
      where: {
        userId_ideaId: { userId, ideaId },
      },
    });

    return { message: "Vote removed" };
  }

  // 🔄 If different vote → update
  if (existing) {
    return prisma.vote.update({
      where: {
        userId_ideaId: { userId, ideaId },
      },
      data: { type },
    });
  }

  // 🆕 Create new vote
  return prisma.vote.create({
    data: {
      userId,
      ideaId,
      type,
    },
  });
};

// REMOVE VOTE (explicit)
const removeVote = async (userId: string, ideaId: string) => {
  return prisma.vote.delete({
    where: {
      userId_ideaId: {
        userId,
        ideaId,
      },
    },
  });
};

// GET VOTE COUNT / SCORE
const getVoteSummary = async (ideaId: string) => {
  const votes = await prisma.vote.findMany({
    where: { ideaId },
  });

  const upVotes = votes.filter((v) => v.type === "UP").length;
  const downVotes = votes.filter((v) => v.type === "DOWN").length;

  return {
    upVotes,
    downVotes,
    score: upVotes - downVotes,
  };
};

export const voteService = {
  voteIdea,
  removeVote,
  getVoteSummary,
};