import { NextApiHandler } from "next"
import { recoverySchema } from "@/lib/auth/validation"
import dbConnect from "@/lib/db/mongodb"
import User from "@/lib/db/models/user"
import crypto from "crypto"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const result = recoverySchema.safeParse(req.body)
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Email inválido",
        errors: result.error.errors 
      })
    }

    const { email } = result.data

    await dbConnect()

    // Buscar el usuario
    const user = await User.findOne({ email: email.toLowerCase() }).exec()

    // Por seguridad, no revelamos si el email existe o no
    if (!user) {
      return res.status(200).json({ 
        message: "Si el email existe, recibirás instrucciones para restablecer tu contraseña"
      })
    }

    // Generar token de recuperación
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas

    // Guardar el token en la base de datos
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = resetTokenExpiry
    await user.save()

    // En un caso real, aquí enviarías el email
    // const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`
    // await sendRecoveryEmail(email, resetUrl)

    // Por ahora, solo simulamos el envío
    console.log('Recovery token:', resetToken)

    return res.status(200).json({ 
      message: "Si el email existe, recibirás instrucciones para restablecer tu contraseña"
    })
  } catch (error) {
    console.error("Recovery error:", error)
    return res.status(500).json({ 
      message: "Error al procesar la solicitud",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    })
  }
}

export default handler
