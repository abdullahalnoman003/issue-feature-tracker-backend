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

const loginUser = async (req: Request, res: Response) =>{
    const result = await authService.loginIntoDB(req.body);
    delete result.user.password;
    responseSender(res,{
        statusCode : 200,
        success: true,
        message : "Login Successful",
        data : result,
    });
}

export const authController = {
    signUpUser,
    loginUser
}