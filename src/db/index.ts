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
    password TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    create_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    
    `
   )

   await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles(
    id SERIAL PRIMARY KEY ,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    address TEXT ,
    phone VARCHAR(15),
    gender VARCHAR(15),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

    
    )
    
    `)
    console.log("database connect successfully!!")
  } catch (error) {
    console.log(error)
    
  }

}



