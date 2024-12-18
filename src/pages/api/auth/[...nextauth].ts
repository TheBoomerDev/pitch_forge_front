import { NextApiHandler } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from "@/lib/auth/validation"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/db/mongodb"
import User from "@/lib/db/models/user"

if (!process.env.JWT_SECRET) {
  throw new Error('Please add your JWT_SECRET to .env.local')
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Validar las credenciales
          const result = loginSchema.safeParse(credentials)
          
          if (!result.success) {
            throw new Error("Credenciales inválidas")
          }

          await dbConnect()

          // Buscar el usuario y incluir el password para la comparación
          const user = await User.findOne({ 
            email: credentials?.email.toLowerCase() 
          }).select('+password').lean()

          if (!user || !credentials?.password) {
            throw new Error("Credenciales inválidas")
          }

          // Verificar la contraseña
          const isValid = await compare(credentials.password, user.password)

          if (!isValid) {
            throw new Error("Credenciales inválidas")
          }

          // No devolver el password en el objeto de usuario
          const { password, ...userWithoutPassword } = user

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Agregar claims personalizados al JWT
        token.customToken = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        )
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        // Agregar el token personalizado a la sesión
        session.customToken = token.customToken
        if (session.user) {
          session.user.id = token.userId as string
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}

const authHandler: NextApiHandler = NextAuth(authOptions)
export default authHandler
