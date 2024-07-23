import { app } from './server'

const { PORT = 4000 } = process.env

app.listen(PORT, () => {
  console.log(`🟢 Server running on PORT: ${PORT}`)
})
