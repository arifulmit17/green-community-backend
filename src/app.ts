import express, { type Request, type Response } from "express"
import { authRoutes } from "./modules/auth/auth.router";
import { userRoutes } from "./modules/user/user.router";
import { ideaRoutes } from "./modules/idea/idea.router";

const app=express();
app.use(express.json())

app.get("/",(req:Request,res:Response)=>{
    res.send("Server is running")

})

app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",ideaRoutes)
export default app;