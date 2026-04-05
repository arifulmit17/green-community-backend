import { stripe } from "../../utils/stripe"
import express from "express"

export const stripeWebhook = express.raw({ type: "application/json" })

export const handleWebhook = async (req: express.Request, res: express.Response) => {
  const sig = req.headers["stripe-signature"]
  if (!sig || Array.isArray(sig)) {
  return res.status(400).send("Invalid Stripe signature")
}

  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.log("Webhook error:", err.message)
    return res.status(400).send(`Webhook Error`)
  }

  // ✅ Handle events
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object

    const ideaId = paymentIntent.metadata.ideaId
    const userId = paymentIntent.metadata.userId

    console.log("✅ Payment success:", ideaId, userId)

    // 🔥 Save purchase in DB
    // await prisma.purchase.create({ ... })
  }

  res.json({ received: true })
}