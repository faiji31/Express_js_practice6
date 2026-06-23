import express, { type Application, type Request, type Response } from "express"
 import {Pool} from "pg"
import config from "./config"
const app:Application = express()
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

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    "message":"server is running successfully",
    "author":"Faiji akbar liam"
  })
})
app.post("/api/users",async(req:Request,res:Response)=>{
  const {name,email,age,password} = req.body
 
    try {
    const result =await pool.query(`
    INSERT INTO users(name,email,age,password) VALUES($1,$2,$3,$4)
    RETURNING *
    
    `,[name,email,age,password])
    res.status(201).json({
      success:true,
      message:"user created successfully!",
      data:result.rows[0]
    })
      
    } catch (error:any) {
      res.status(500).json({
        success:false,
        message:error.message,
        error:error
      })
    }
})

app.get('/api/users',async(req:Request,res:Response)=>{
 
  try {
    const result = await pool.query(`
      SELECT * FROM users
      `)
       res.status(200).json({
      success:true,
      message:"user retrived successfully!",
      data:result.rows
    })
    
  } catch (error:any) {
     res.status(500).json({
        success:false,
        message:error.message,
        error:error
      })
  }
})

app.get('/api/users/:id',async(req:Request,res:Response)=>{
  
  try {
    const {id} = req.params
    const result = await pool.query(`
      SELECT * FROM users WHERE id = $1
      `,[id])
       if(result.rows.length ===0){
       res.status(404).json({
      success:false,
      message:"user is not found!",
      data:{}
    })
    }
       res.status(200).json({
      success:true,
      message:"user is not found ",
      data:result.rows
    })
   

    
  } catch (error:any) {
     res.status(500).json({
        success:false,
        message:error.message,
        error:error
      })
    
  }
})

app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, password, is_active } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
        age = COALESCE($2, age),
        password = COALESCE($3, password),
        is_active = COALESCE($4, is_active)
      WHERE id = $5
      RETURNING *
      `,
      [name, age, password, is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: {}
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0]
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
  }
});

app.delete("/api/users/:id",async(req:Request,res:Response)=>{
  const {id} = req.params
  try {
    const result = await pool.query(`
      DELETE FROM users WHERE id=$1
      
      `,[id])
      if(result.rowCount ===0){
         return res.status(404).json({
        success: false,
        message: "User not found!",
        data: {}
      });
      
      }
      res.status(200).json({
      success: true,
      message: "User Deleted successfully!",
      data: result.rows
    });
    
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
    
  }
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})