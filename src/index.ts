import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import router from './router'
import docs from './constants/docs.json'

const { PORT = 4000 } = process.env

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)
app.use('/', swaggerUI.serve, swaggerUI.setup(docs))

app.listen(PORT, () => {
  console.log(`🟢 Server running on PORT: ${PORT}`)
})
