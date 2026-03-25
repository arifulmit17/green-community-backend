import express, { type Request, type Response } from "express"
import cors from "cors"
import { authRoutes } from "./modules/auth/auth.router";
import { userRoutes } from "./modules/user/user.router";
import { ideaRoutes } from "./modules/idea/idea.router";
import { categoryRoutes } from "./modules/category/category.router";
import { authMiddleware } from './middlewares/authMiddleware';
import { voteRoutes } from "./modules/vote/vote.router";
import { feedbackRoutes } from "./modules/feedback/feedback.router";

const app=express();

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true, // important if using cookies
  })
)
app.use(express.json())

app.get("/",(req:Request,res:Response)=>{
    res.send("Server is running")

})

app.use("/api/auth",authRoutes)
app.use("/api/users",authMiddleware,userRoutes)
app.use("/api/idea",ideaRoutes)
app.use("/api/categories",authMiddleware,categoryRoutes)
app.use("/api/votes",voteRoutes)
app.use("/api/feedback", feedbackRoutes);
export default app;