import type { NextFunction, Request, Response } from "express";
import type { Roles } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../database";
const auth = (...role: Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not Authorized!",
        });
      }
      const decodedUser = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;
      const userData = await pool.query(
        `
     SELECT * FROM users WHERE id=$1   
        `,
        [decodedUser.id],
      );
      const user = userData.rows[0];
      if (userData.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }
      if (role.length && !role.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You are not Authorized to view this.",
        });
      }
      req.user = decodedUser;
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default auth;
