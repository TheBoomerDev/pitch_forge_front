import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RecoveryFormData, recoverySchema } from "@/lib/auth/validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RecoveryForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
  })

  const onSubmit = async (data: RecoveryFormData) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/auth/recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error al enviar el correo de recuperación")
      }

      setSuccess(true)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div 
        className="w-full max-w-md space-y-8" 
        aria-labelledby="recovery-success-heading"
      >
        <div className="text-center">
          <h2 id="recovery-success-heading" className="text-3xl font-bold">
            Correo enviado
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hemos enviado un correo con instrucciones para restablecer tu contraseña.
          </p>
          <Link 
            href="/auth/login" 
            className="mt-4 text-blue-600 hover:underline block"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-8" aria-labelledby="recovery-heading">
      <div className="text-center">
        <h1 id="recovery-heading" className="text-3xl font-bold">
          Recuperar contraseña
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            autoComplete="email"
            required
            placeholder="Email"
            aria-describedby={errors.email ? "email-error" : undefined}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {error && (
          <div
            className="text-sm text-red-500 text-center"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar instrucciones"}
          </Button>

          <Link
            href="/auth/login"
            className="text-center text-sm text-blue-600 hover:underline"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </div>
  )
}
