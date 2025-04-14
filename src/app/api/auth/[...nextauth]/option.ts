// /lib/authOptions.ts (or wherever you're defining this)
import { db } from "@/lib/db";
import User from "@/models/User.model";
import type { NextAuthOptions} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await db();
        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.username },
            ],
          });

          if (!user) {
            throw new Error("No user found");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            _id: user._id.toString(),
            email: user.email,
            username: user.username,
            role: user.role ?? undefined,
          };
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new Error(error.message || "Login failed");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt", 
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.email = user.email ?? undefined;
        token.role = user.role ?? undefined;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role ?? undefined;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
