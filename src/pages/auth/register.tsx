import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { RegisterForm } from "@/components/auth/register-form"
import { AuthLayout } from "@/components/layout/AuthLayout"

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
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
