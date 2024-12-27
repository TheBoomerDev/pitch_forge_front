import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormData, loginSchema } from "@/lib/auth/validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email.toLowerCase(),
        password: data.password,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      if (!result?.ok) {
        throw new Error("Error al iniciar sesión")
      }

      // Redirigir al dashboard después del login exitoso
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8" aria-labelledby="login-heading">
      <div className="text-center">
        <h1 id="login-heading" className="text-3xl font-bold">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>

      {router.query.registered && (
        <div className="bg-green-50 p-4 rounded-md">
          <p className="text-green-800 text-sm text-center">
            Registro exitoso. Por favor, inicia sesión.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="space-y-4">
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
              autoComplete="current-password"
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

        <div className="flex items-center justify-between">
          <Link
            href="/auth/recovery"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          className="w-full"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Loading" : "Login"}
        </Button>
      </form>
    </div>
  )
}
