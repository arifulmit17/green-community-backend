import express from "express";
import { categoryController } from "./category.controller";
import { adminMiddleware } from "../../middlewares/adminMiddleware";

const router = express.Router();

// CREATE
router.post("/",adminMiddleware, categoryController.createCategory);

// GET ALL
router.get("/", categoryController.getAllCategories);

// GET SINGLE
router.get("/:id", categoryController.getCategoryById);

// UPDATE
router.patch("/:id", categoryController.updateCategory);

// DELETE
router.delete("/:id", categoryController.deleteCategory);

export const categoryRoutes = router;