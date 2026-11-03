import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'paradise_royal_secret_fallback_1953';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'customer' | 'admin';
}

export function signToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: '7d',
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}
