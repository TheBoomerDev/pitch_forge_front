import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { LoginForm } from "@/components/auth/login-form"
import { AuthLayout } from "@/components/layout/AuthLayout"

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
