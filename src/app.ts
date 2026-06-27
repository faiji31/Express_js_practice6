import express, { type Application, type Request, type Response } from "express"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"
const app:Application = express()


// middleware
app.use(express.json())



app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    "message":"server is running successfully",
    "author":"Faiji akbar liam"
  })
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

app.use("/api/users",userRoute)


export default app

