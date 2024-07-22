import { Router } from 'express'
import { ENV } from '../constants/env'
import db from '../db'
import data from '../constants/data.json'

const router = Router()

const { NODE_ENV } = process.env

router.post('/', async (_, res) => {
  if (NODE_ENV === ENV.production) {
    return res.status(500).json({ message: 'This action cannot be performed in a production environment.' })
  }

  await db.product.deleteMany()

  await db.product.createMany({ data })

  res.status(200).json({ message: 'Data created' })
})

export { router }
