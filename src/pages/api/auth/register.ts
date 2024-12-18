import { NextApiHandler } from "next"
import { hash } from "bcryptjs"
import { registerSchema } from "@/lib/auth/validation"
import dbConnect from "@/lib/db/mongodb"
import User, { IUser } from "@/lib/db/models/user"
import mongoose from "mongoose"

const handler: NextApiHandler = async (req, res) => {
  // Asegurarse de que la respuesta siempre sea JSON
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false,
      message: "Method not allowed" 
    })
  }

  try {
    const result = registerSchema.safeParse(req.body)
    
    if (!result.success) {
      return res.status(400).json({ 
        success: false,
        message: "Datos inválidos",
        errors: result.error.errors 
      })
    }

    const { name, email, password } = result.data
    
    // Conectar a la base de datos
    await dbConnect()

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ 
      email: email.toLowerCase()
    }).lean().exec()
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "El email ya está registrado" 
      })
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 10)

    // Crear el usuario
    const newUser: Partial<IUser> = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    }

    const user = await User.create(newUser)

    // No devolver la contraseña en la respuesta
    const userWithoutPassword = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }

    return res.status(201).json({ 
      success: true,
      message: "Usuario registrado exitosamente",
      user: userWithoutPassword
    })
  } catch (error: any) {
    console.error("Registration error:", error)
    
    // Manejar errores específicos de MongoDB
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ 
        success: false,
        message: "Error de validación",
        errors: Object.values(error.errors).map(err => err.message)
      })
    }

    // Manejar error de duplicado (código 11000)
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: "El email ya está registrado"
      })
    }

    // Manejar otros errores de MongoDB
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      return res.status(400).json({ 
        success: false,
        message: "Error en la base de datos",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      })
    }

    return res.status(500).json({ 
      success: false,
      message: "Error al registrar usuario",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    })
  }
}

export default handler
