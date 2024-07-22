import { Router } from 'express'
import { ENV } from '../constants/env'

const { NODE_ENV = ENV.development } = process.env

const router = Router()

router.get('/', (_, res) => {
  res.status(200).json({ message: `🟢 Server online on ${NODE_ENV} mode` })
})

export { router }
