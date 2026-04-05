import { prisma } from "../../lib/prisma"


const createPurchase = async (userId: string, ideaId: string) => {
  // prevent duplicate purchase
  console.log(userId,ideaId);
  const existing = await prisma.purchase.findUnique({
    where: {
      userId_ideaId: {
        userId,
        ideaId,
      },
    },
  })

  if (existing) {
    throw new Error("Already purchased")
  }

  const purchase = await prisma.purchase.create({
    data: {
      userId,
      ideaId,
    },
  })

  return purchase
}

const getUserPurchases = async (userId: string) => {
  return prisma.purchase.findMany({
    where: { userId },
    include: {
      idea: true,
    },
  })
}

const hasPurchased = async (userId: string, ideaId: string) => {
  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_ideaId: {
        userId,
        ideaId,
      },
    },
  })

  return !!purchase
}

export const purchaseService = {
  createPurchase,
  getUserPurchases,
  hasPurchased,
}