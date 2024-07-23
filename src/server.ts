import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import router from './router'
import docs from './constants/docs.json'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)
app.use('/', swaggerUI.serve, swaggerUI.setup(docs))

export { app }
