import { login } from "@/lib/user";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials === undefined) {
          return null;
        }
        const { email, password } = credentials;
        try {
          const user = await login({ email, password });
          const { _id: id, ...rest } = user;
          console.log({ id, ...rest });
          console.log("authorize");
          return { id, ...rest };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt");
      console.log({ token, user });
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token as any;
      console.log("session");
      console.log({ session, token, user });
      return session;
    },
  },
};
