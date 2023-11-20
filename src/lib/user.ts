import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Profile,
} from "./user.schema";
import { env } from "@/env";
import ky from "ky";

export async function register(req: RegisterRequest) {
  return await ky
    .post("auth/register", {
      json: req,
      prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
      fetch,
    })
    .json<AuthResponse>();
}

export async function login(req: LoginRequest) {
  return await ky
    .post("auth/login", {
      json: req,
      prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
      fetch,
    })
    .json<AuthResponse>();
}

export async function getMe(token: string) {
  const response = await ky
    .get("auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
      fetch,
    })
    .json<{ data: Profile }>();
  return response.data;
}
