import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import "@/styles/globals.css"
import Header from '@/components/layout/Header'
import Footer from "@/components/layout/Footer"
import ScriptsPage from "@/components/layout/ScriptPage"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevenir el flash de contenido no hidratado
  if (!mounted) {
    return null
  }

  return (
    <SessionProvider session={session} refetchInterval={0}>
      <Header />
      <Component {...pageProps} /> 
      <Footer />
      <ScriptsPage />
    </SessionProvider>
  )
}
