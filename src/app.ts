import express, { type Request, type Response } from "express"
import { authRoutes } from "./modules/auth/auth.router";

const app=express();
app.use(express.json())

app.get("/",(req:Request,res:Response)=>{
    res.send("Server is running")

})
app.use("/api",authRoutes)

export default app;