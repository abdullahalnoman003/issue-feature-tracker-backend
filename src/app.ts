import express, { type Request, type Response } from "express";
const app = express()

app.get('/', (req : Request, res: Response) => {
  res.send('Hello World!');
  console.log("This Is from App ")
})

export default  app ;