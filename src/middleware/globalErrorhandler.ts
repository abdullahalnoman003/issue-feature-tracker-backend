import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

const globalErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode =
    error instanceof AppError
      ? error.statusCode
      : typeof error === "object" &&
          error !== null &&
          "statusCode" in error &&
          typeof (error as { statusCode?: unknown }).statusCode === "number"
        ? (error as { statusCode: number }).statusCode
        : 500;

  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
