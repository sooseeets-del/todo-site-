import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "taskflow_token";

export type SessionUser = { id: string; email: string; name: string };

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set. Add it to .env.local.");
  return secret;
}

export function signToken(user: SessionUser): string {
  return jwt.sign(user, getSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, getSecret()) as SessionUser;
  } catch {
    return null;
  }
}

export function getSessionUser(): SessionUser | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function authCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export const SESSION_COOKIE = COOKIE_NAME;
