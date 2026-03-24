import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token:", token);

    if (!token) {
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
    req.user = decoded;
    console.log("user:", req.user);

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};