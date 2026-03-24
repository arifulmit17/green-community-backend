import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.controller";

const router = express.Router();


router.get("/:id", getUserById);
router.get("/", getAllUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export const userRoutes = router;