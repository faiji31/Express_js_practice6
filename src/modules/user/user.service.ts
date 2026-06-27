import { pool } from "../../db"
import type { IUser } from "./user.interface"


const createUserintoDB=async(payload:IUser)=>{
    const{name,email,age,password}=payload
const result =await pool.query(`
    INSERT INTO users(name,email,age,password) VALUES($1,$2,$3,$4)
    RETURNING *
    
    `,[name,email,age,password])
    return result
}

const getuserintoDB=async(payload:any)=>{
     const result = await pool.query(`
      SELECT * FROM users
      `)
      return result
}


const getsingleuserintoDB=async(id:string)=>{
    const result = await pool.query(`
      SELECT * FROM users WHERE id = $1
      `,[id])
      return result
}


const updateUserintoDB=async(payload:IUser,id:string)=>{
    const {name,age,password,is_active}=payload
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
    return result
}

const deleteUserintoDB=async(id:string)=>{
    const result = await pool.query(`
      DELETE FROM users WHERE id=$1
      
      `,[id])
      return result
}
export const userService ={
    createUserintoDB,
    getuserintoDB,
    getsingleuserintoDB,
    updateUserintoDB,
    deleteUserintoDB
}