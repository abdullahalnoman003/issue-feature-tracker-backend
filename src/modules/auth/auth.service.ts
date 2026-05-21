import bcrypt from "bcryptjs";
import { pool } from "../../database/index";
import config from "../../config";
import { AppError } from "../../middleware/globalErrorhandler";
import jwt from "jsonwebtoken";

const signUpIntoDB = async (payload: any) => {
  const { name, email, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, config.bycrypt_round);
  const user = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
        `,
    [email],
  );
  if (user.rows.length !== 0) {
    throw new AppError("User already exists", 409);
  }
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *
        `,
    [name, email, hashedPassword, role],
  );
  delete result.rows[0].password;
  return result;
};

const loginIntoDB = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1 
        `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new AppError(
      "Invalid credentials. Please check your email or password.",
      401,
    );
  }
  const user = userData.rows[0];
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    throw new AppError(
      "Invalid credentials. Please check your email or password.",
      401,
    );
  }
  const Pay = {
    id: user.id,
    name: user.name,
    role: user.role,
  };
  const accessToken = jwt.sign(Pay, config.secret as string, {
    expiresIn: "10d",
  });
  return {accessToken,user};
};

export const authService = {
  loginIntoDB,
  signUpIntoDB,
};
