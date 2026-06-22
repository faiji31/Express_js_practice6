import express from "express"
import config from "./config"
const app = express()
const port = config.port

app.get('/', (req, res) => {
  res.send('server running successfully!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})