import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async(req:Request,res:Response)=>{
    const result = await profileService.createprofileintoDB(req.body)
    res.status(201).json({
      success:true,
      message:"profile created successfully!!!",
      data:result.rows[0]
    })

    try {
        
    } catch (error:any) {
        res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
    
  }
        
    }



export const profileController ={
createProfile
}
