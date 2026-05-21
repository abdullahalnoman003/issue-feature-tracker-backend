import type { Request, Response } from "express";
import { authService } from "./auth.service";
import responseSender from "../../utility/responseSender";

const signUpUser = async (req:Request, res: Response) =>{
    const result = await authService.signUpIntoDB(req.body);
    responseSender(res,{
        statusCode : 201,
        success: true,
        message : "User registered successfully",
        data : result.rows[0],
    });
}

export const authController = {
    signUpUser,

}