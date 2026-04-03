import type { Request, Response } from "express"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
})

export const createPaymentIntent = async (req:Request, res:Response) => {
  try {
    const { amount } = req.body // in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    })

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Payment failed",
    })
  }
}