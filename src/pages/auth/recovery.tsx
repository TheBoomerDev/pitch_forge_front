import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { RecoveryForm } from "@/components/auth/recovery-form"
import { AuthLayout } from "@/components/layout/AuthLayout"

export default function RecoveryPage() {
  return (
    <AuthLayout>
      <RecoveryForm />
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
