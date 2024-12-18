import mongoose, { Document } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}

export interface IUserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Por favor ingrese su nombre'],
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'Por favor ingrese su email'],
      unique: true, // Esto ya crea un índice único
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor ingrese un email válido',
      ],
    },
    password: {
      type: String,
      required: [true, 'Por favor ingrese una contraseña'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      select: false, // No incluir password en las consultas por defecto
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
)

// No necesitamos crear el índice manualmente ya que unique: true ya lo hace
// userSchema.index({ email: 1 }, { unique: true })

const User = (mongoose.models.User as mongoose.Model<IUserDocument>) || 
  mongoose.model<IUserDocument>('User', userSchema)

export default User
