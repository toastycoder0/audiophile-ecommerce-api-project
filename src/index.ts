import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './router'

const { PORT = 4000 } = process.env

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`🟢 Server running on PORT: ${PORT}`)
})
