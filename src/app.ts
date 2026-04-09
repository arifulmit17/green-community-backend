import express, { type Request, type Response } from "express"
import cors from "cors"
import { authRoutes } from "./modules/auth/auth.router";
import { userRoutes } from "./modules/user/user.router";
import { ideaRoutes } from "./modules/idea/idea.router";
import { categoryRoutes } from "./modules/category/category.router";
import { authMiddleware } from './middlewares/authMiddleware';
import { voteRoutes } from "./modules/vote/vote.router";
import { feedbackRoutes } from "./modules/feedback/feedback.router";
import cookieParser from "cookie-parser"
import { paymentRoutes } from "./modules/payment/payment.router";
import { handleWebhook, stripeWebhook } from "./modules/payment/stripe.webhook";
import { purchaseRoutes } from "./modules/purchase/purchase.router";


const app=express();
app.use(cookieParser())
app.post(
  "/api/webhook",
  stripeWebhook,
  handleWebhook
)
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:4000",
    // origin: "https://green-community-frontend.vercel.app",
    credentials: true,
  })
)
app.use((req, res, next) => {
  console.log("Raw Cookie Header:", req.headers.cookie)
  next()
})




app.post("/webhook",(req:Request,res:Response)=>{
  console.log("Received webhook:", req.body)
  res.status(200).send("Webhook received")
})


app.get("/",(req:Request,res:Response)=>{
    res.send("Server is running")

})


app.use("/api/auth",authRoutes)
app.use("/api/users",authMiddleware,userRoutes)
app.use("/api/idea",ideaRoutes)
app.use("/api/categories",categoryRoutes)
app.use("/api/votes",voteRoutes)
app.use("/api/feedback", feedbackRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/purchase", purchaseRoutes)
export default app;