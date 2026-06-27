import type { Request, Response } from "express"
import { pool } from "../../db"
import { userService } from "./user.service"

const createUser = async(req:Request,res:Response)=>{
//   const {name,email,age,password} = req.body
 
    try {
        const result = await userService.createUserintoDB(req.body)
    
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
}

const getUser = async(req:Request,res:Response)=>{
 
  try {
    const result = await userService.getuserintoDB(req.body)
   
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
}

const getsingleUser = async(req:Request,res:Response)=>{
  
  try {
    const {id} = req.params
    const result = await userService.getsingleuserintoDB(id as string)
    
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
}


const updateUser =  async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, password, is_active } = req.body;

  try {
   const result = await userService.updateUserintoDB(req.body,id as string)

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
}

const deleteUser = async(req:Request,res:Response)=>{
  const {id} = req.params
  try {
    const result = await userService.deleteUserintoDB(id as string)
    
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
}


export const userController ={
    createUser,
    getUser,
    getsingleUser,
    updateUser,
    deleteUser
}