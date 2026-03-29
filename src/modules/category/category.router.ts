import express from "express";
import { categoryController } from "./category.controller";
import { adminMiddleware } from "../../middlewares/adminMiddleware";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = express.Router();

// CREATE
router.post("/",adminMiddleware, categoryController.createCategory);

// GET ALL
router.get("/", categoryController.getAllCategories);

// GET SINGLE
router.get("/:id",authMiddleware, categoryController.getCategoryById);

// UPDATE
router.patch("/:id",adminMiddleware, categoryController.updateCategory);

// DELETE
router.delete("/:id",adminMiddleware, categoryController.deleteCategory);

export const categoryRoutes = router;