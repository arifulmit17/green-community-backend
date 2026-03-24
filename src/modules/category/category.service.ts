import { prisma } from "../../lib/prisma";

// CREATE CATEGORY
const createCategory = async (payload: { name: string }) => {
  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

// GET ALL CATEGORIES
const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { ideas: true }, // count ideas per category
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return categories;
};

// GET CATEGORY BY ID
const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      ideas: true,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

// UPDATE CATEGORY
const updateCategory = async (id: string, payload: { name: string }) => {
  const category = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return category;
};

// DELETE CATEGORY
const deleteCategory = async (id: string) => {
  const category = await prisma.category.delete({
    where: { id },
  });

  return category;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};