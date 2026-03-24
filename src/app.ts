import express, { type Request, type Response } from "express"
import { authRoutes } from "./modules/auth/auth.router";
import { userRoutes } from "./modules/user/user.router";
import { ideaRoutes } from "./modules/idea/idea.router";
import { categoryRoutes } from "./modules/category/category.router";
import { authMiddleware } from './middlewares/authMiddleware';

const app=express();
app.use(express.json())

app.get("/",(req:Request,res:Response)=>{
    res.send("Server is running")

})

app.use("/api",authRoutes)
app.use("/api",authMiddleware,userRoutes)
app.use("/api",ideaRoutes)
app.use("/api/categories",authMiddleware,categoryRoutes)
export default app;