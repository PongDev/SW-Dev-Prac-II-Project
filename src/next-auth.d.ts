import NextAuth from "next-auth";
import { AuthResponse } from "./lib/user.schema";
import { UserJWT } from "./models/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      token: string;
    };
  }
}
