// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";

type Role = "user" | "admin";

declare module "next-auth" {
  interface Session {
    user: {
      role?: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
  }
}
