import cookieParser from "cookie-parser";
import express, { type Request, type Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
import globalErrorHandler from "./middleware/globalErrorhandler";
import { issuesRoute } from "./modules/issues/issues.route";
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
app.use("/api/auth/", authRoute);
app.use("/api/issues", issuesRoute);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use(globalErrorHandler);
export default  app ;