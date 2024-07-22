import type { Product } from '@prisma/client'
import { Router } from 'express'
import db from '../db'

const router = Router()

router.get('/', async (req, res) => {
  const { category = '' } = req.query as { category: string }

  let products: Product[] = []

  if (category) {
    products = await db.product.findMany({
      where: { category }
    })
  } else {
    products = await db.product.findMany()
  }

  res.status(200).json({ products })
})

router.get('/:slug', async (req, res) => {
  const { slug } = req.params

  const product = await db.product.findFirst({ where: { slug } })

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.status(200).json({ product })
})

export { router }
