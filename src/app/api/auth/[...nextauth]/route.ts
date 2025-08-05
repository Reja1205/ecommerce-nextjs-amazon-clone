// app/api/auth/[...nextauth]/route.ts

import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connectToDatabase from "@/lib/mongo";
import User from "@/models/User";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User as NextAuthUser } from "next-auth";

// Define accepted roles
type Role = "user" | "admin";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role as Role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: NextAuthUser & { role?: Role };
    }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.role) {
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export API route handlers for Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
