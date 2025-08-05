import { DefaultSession, DefaultUser } from "next-auth";

type Role = "user" | "admin";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // <-- Add this
      role?: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string; // <-- Add this if you use User object anywhere
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // <-- Add this to JWT as well
    role?: Role;
  }
}
