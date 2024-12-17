import Head from 'next/head'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Benefits from '@/components/sections/Benefits'
import Pricing from '@/components/sections/Pricing'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import Blog from '@/components/sections/Blog'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Your Perfect Pitch with Artificial Intelligence | PitchAI</title>
        <meta 
          name="description" 
          content="Generate scripts, presentations and audios for your pitch in minutes. Try for free and customize your pitch with PitchAI." 
        />
        <meta 
          name="keywords" 
          content="pitch, artificial intelligence, presentation, startups, pitch deck, pitch scripts, pitch audio" 
        />
        <meta property="og:title" content="PitchAI | Generate the Perfect Pitch" />
        <meta 
          property="og:description" 
          content="Create scripts, presentations and audios for your pitch in minutes. Try for free with our AI SaaS." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pitchai.com/img/og-image.jpg" />
        <meta property="og:url" content="https://pitchai.com" />
        <link rel="canonical" href="https://pitchai.com" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Benefits />
          <HowItWorks />
          <Pricing />
          <Testimonials />
          <Blog />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  )
}
