import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5050;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!JWT_SECRET) {
  throw new Error("🚨 JWT_SECRET is missing!");
}

// Експортираме ги като един сигурен обект
export const config = {
  jwtSecret: JWT_SECRET,
  port: PORT,
  isProduction: NODE_ENV === 'production'
};