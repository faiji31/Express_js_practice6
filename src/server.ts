import express from "express"
 import {Pool} from "pg"
import config from "./config"
const app = express()
const port = config.port

// middleware
app.use(express.json())

const pool =new Pool({
  connectionString:config.connection_string
})
const initDB=async()=>{
  try {
   await pool.query(
    `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40)  NOT NULL,
    email VARCHAR(20) UNIQUE  NOT NULL,
    age INT NOT NULL,
    password VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    create_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    
    `
   )
    console.log("database connect successfully!!")
  } catch (error) {
    console.log(error)
    
  }

}
initDB()

app.get('/', (req, res) => {
  res.send('server running successfully!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})