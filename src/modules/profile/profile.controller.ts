import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async(req:Request,res:Response)=>{
    const result = await profileService.createprofileintoDB(req.body)

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
