import NextAuth from "next-auth";
import { AuthResponse } from "./lib/user.schema";
import { UserJWT } from "./models/user";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
    };
  }
}
