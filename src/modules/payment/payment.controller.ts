import type { Request, Response } from "express"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
})

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { ideaId, amount } = req.body
    console.log(ideaId,userId,amount);
    if (!userId || !ideaId) {
      return res.status(400).json({
        message: "Missing userId or ideaId",
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",

      metadata: {
        userId,
        ideaId,
      },
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    res.status(400).json({ error: "Payment failed" })
  }
}