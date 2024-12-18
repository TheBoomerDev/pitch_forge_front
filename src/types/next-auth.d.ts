import "next-auth"

declare module "next-auth" {
  interface Session {
    customToken?: string
    user?: {
      id: string
      email: string
      name?: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    customToken?: string
    userId?: string
  }
}
