import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterFormData, registerSchema } from "src/lib/auth/validation"
import { Button } from "src/components/ui/button"
import { Input } from "src/components/ui/input"

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Error al registrar usuario")
      }

      // Redirigir al login con mensaje de éxito
      router.push("/auth/login?registered=true")
    } catch (error: any) {
      console.error("Registration error:", error)
      setError(error.message || "Error al registrar usuario")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8" aria-labelledby="register-heading">
      <div className="text-center">
        <h1 id="register-heading" className="text-3xl font-bold">
          Crear cuenta
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Nombre completo
            </label>
            <Input
              id="name"
              {...register("name")}
              type="text"
              autoComplete="name"
              required
              placeholder="Nombre completo"
              aria-describedby={errors.name ? "name-error" : undefined}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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

          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <Input
              id="password"
              {...register("password")}
              type="password"
              autoComplete="new-password"
              required
              placeholder="Contraseña"
              aria-describedby={errors.password ? "password-error" : undefined}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirmar contraseña
            </label>
            <Input
              id="confirmPassword"
              {...register("confirmPassword")}
              type="password"
              autoComplete="new-password"
              required
              placeholder="Confirmar contraseña"
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
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

        <Button
          className="w-full"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </Button>
      </form>
    </div>
  )
}
