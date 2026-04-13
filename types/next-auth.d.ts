import NextAuth, { User } from "next-auth"
import { JWT } from "next-auth/jwt"

interface ApplicationUser {
  name: string,
  email: string,
  id: string,
  token: string
}

declare module "next-auth" {

  interface User {
    name: string,
    email: string,
    id: string,
    token: string
  }

  interface Session {
    user: ApplicationUser,
    token: string
  }
}

declare module "next-auth/jwt"{
    interface JWT extends ApplicationUser{
        
    }
}