import cookieParser from "cookie-parser";
import express, { type Request, type Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
const app = express()

// Middlewares
app.use(express.json());
// app.use(cookieParser());


//Default route or root route
app.get('/', (req : Request, res: Response) => {
  res.status(200 ).json({
    message : "Welcome to DevIntel Server",
  })  
})


// Api Routes
app.use("/api/auth/", authRoute)
export default  app ;