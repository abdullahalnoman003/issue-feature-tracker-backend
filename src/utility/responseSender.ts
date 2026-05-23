import type { Response } from "express";
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
};
const responseSender = <T>( res: Response, data : TResponse<T>) =>{
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data : data.data,
        error : data.error
    })
}

export default responseSender;