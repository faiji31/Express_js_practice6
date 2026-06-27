import { Pool } from "pg"
import config from "../config"

export const pool =new Pool({
  connectionString:config.connection_string
})
export const initDB=async()=>{
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



