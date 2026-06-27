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


export const userController ={
    createUser
}