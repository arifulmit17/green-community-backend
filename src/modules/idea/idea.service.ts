import { prisma } from "../../lib/prisma";


// CREATE IDEA
const createIdea = async (payload: any,userId:string) => {
    console.log("userId:", userId);
  const idea = await prisma.idea.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return idea;
};

const getAllIdeas = async (query: any) => {
  const { search, categoryId, status } = query;

  const ideas = await prisma.idea.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },

                // 🌿 NEW: search by category name
                {
                  category: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {},

        // 🌿 Filter by selected category
        categoryId ? { categoryId } : {},

        status ? { status } : {},
      ],
    },
    include: {
      author: {
        select: { id: true, name: true },
      },
      category: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ideas;
};

const getIdeaById = async (id: string, userId?: string) => {
  const idea = await prisma.idea.findUnique({
    where: { id },
    include: {
      author: true,
      category: true,
      comments: {
        include: {
          replies: true,
        },
      },
      votes: true,
      purchases: true,
    },
  });

  if (!idea) {
    throw new Error("Idea not found");
  }

  // 🔐 Paid idea protection
  if (idea.isPaid) {
    const purchased = idea.purchases.find(
      (p) => p.userId === userId
    );

    if (!purchased) {
      return {
        id: idea.id,
        title: idea.title,
        price: idea.price,
        message: "This is a paid idea. Please purchase to view details.",
      };
    }
  }

  return idea;
};


export const getIdeasByUserId = async (userId: string) => {
  const ideas = await prisma.idea.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return ideas
}

const updateIdea = async (
  id: string,
  userId: string,
  payload: any
) => {
  const idea = await prisma.idea.findUnique({
    where: { id },
  });

  if (!idea) throw new Error("Idea not found");

  
  if (idea.authorId !== userId) {
    throw new Error("Unauthorized");
  }


  if (idea.status === "APPROVED") {
    throw new Error("Approved ideas cannot be edited");
  }

  const updated = await prisma.idea.update({
    where: { id },
    data: payload,
  });

  return updated;
};

const deleteIdea = async (id: string, userId: string) => {
  // await prisma.vote.deleteMany({
  // where: { ideaId: id },
  // })

  const idea = await prisma.idea.findUnique({
    where: { id },
  });

  if (!idea) throw new Error("Idea not found");

  if (idea.authorId !== userId) {
    throw new Error("Unauthorized");
  }

  const deleted = await prisma.idea.delete({
    where: { id },
  });

  return deleted;
};

const updateIdeaStatus = async (
  id: string,
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
) => {
  const idea = await prisma.idea.update({
    where: { id },
    data: { status },
  });

  return idea;
};


export const ideaService = {
  createIdea,
  getAllIdeas,
  getIdeaById,
  getIdeasByUserId,
  updateIdea,
  deleteIdea,
  updateIdeaStatus,
};