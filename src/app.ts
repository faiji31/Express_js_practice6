import express, { type Application, type Request, type Response } from "express"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/profile/profile.route"
const app:Application = express()


// middleware
app.use(express.json())



app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    "message":"server is running successfully",
    "author":"Faiji akbar liam"
  })
})









app.use("/api/users",userRoute)

app.use("api/profiles",profileRoute)


export default app

