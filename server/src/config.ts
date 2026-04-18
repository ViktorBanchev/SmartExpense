import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URI = process.env.CLIENT_URI;
const PORT = process.env.PORT || 5050;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!MONGO_URI) {
  throw new Error("🚨 MONGO_URI is missing!");
}

if (!JWT_SECRET) {
  throw new Error("🚨 JWT_SECRET is missing!");
}

export const config = {
  MONGO_URI,
  jwtSecret: JWT_SECRET,
  port: PORT,
  isProduction: NODE_ENV === 'production',
  CLIENT_URI
};