import bcrypt from "bcryptjs"
import { pool } from "../../db"
import jwt from "jsonwebtoken"
import config from "../../config"


const loginuserintoDB=async(payload:{email:string,password:string})=>{
    const {email,password}= payload

    // 1.Check if the user exists
    // 2. compare the password
    // 3.Generate the token

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[email])

        if(userData.rows.length===0){
            throw new Error("user is not found!!!!")
        }


        const user = userData.rows[0]


        const matchpassword = await bcrypt.compare(password,user.password)
        if(!matchpassword){
             throw new Error("user is not found!!!!")
        }


        const jwtPayload={
            id:user.id,
            name:user.name,
            email:user.email,
            password:user.password,
            is_active:user.is_active
        }
      const accessToken = jwt.sign(jwtPayload,config.secret,{expiresIn:"1d"})

      return accessToken
}

export const authService ={
    loginuserintoDB
}