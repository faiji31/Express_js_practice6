import type { Request, Response } from "express"
import { truncate } from "node:fs"
import { authService } from "./auth.service";

const createAuth = async(req:Request,res:Response)=>{
    try {

        const result = await authService.loginuserintoDB(req.body)



        res.status(201).json({
      success:true,
      message:"profile created successfully!!!",
      data:result
    })

        
    } catch (error:any) {
        res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
    
  }
        
    }



export const authController ={
    createAuth
}