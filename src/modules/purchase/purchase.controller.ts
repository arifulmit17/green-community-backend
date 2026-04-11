
import type { Request, Response } from "express"
import { purchaseService } from "./purchase.service"

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { ideaId } = req.body

    if (!userId) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  })
}

    const result = await purchaseService.createPurchase(userId, ideaId)

    res.status(201).json({
      success: true,
      message: "Purchase successful 🌿",
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getMyPurchases = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  })
}

    const result = await purchaseService.getUserPurchases(userId)

    res.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const checkPurchase = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { ideaId } = req.params

    if (!userId) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  })
}

    const purchased = await purchaseService.hasPurchased(userId, ideaId as string)

    res.json({
      success: true,
      purchased,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}