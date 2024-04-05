import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AuthTokensType from "../types/authTokens.type";

dotenv.config();

export const releaseTokens = (payload: { login: string }): AuthTokensType => {
  const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '1m' });
  const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '2m' });
  return { accessToken, refreshToken };
};
