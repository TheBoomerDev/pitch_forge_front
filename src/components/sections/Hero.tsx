import { motion } from 'framer-motion'
import { Button } from '../ui/button'

export default function Hero() {
  return (
    <section 
      aria-label="Hero" 
      className="min-h-screen pt-20 flex items-center relative overflow-hidden"
      itemScope itemType="https://schema.org/WebPageElement"
    >
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebPageElement",
            "name": "Hero Section",
            "description": "Hero section of the PitchAI website",
            "url": "https://pitchai.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://pitchai.com/generate",
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </script>
      <motion.div 
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, #c8ffbe 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, #623b5a 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <div id="above_the_fold" className="container mx-auto px-4">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-violet-jtc mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            itemProp="headline"
          >
            Create the Perfect Pitch in Minutes with Artificial Intelligence
          </motion.h1>
          
          <motion.h2
            className="text-xl md:text-2xl mb-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            itemProp="description"
          >
            From scripts to professional audios. Simplify your process with PitchForge.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button href="#wait_list" className="bg-gradient-to-r from-tea-green to-violet-jtc text-white text-lg px-8 py-6" aria-label="Generate your Free Pitch">
              Generate your Free Pitch
            </Button>
          </motion.div>

          <p className="text-[red]">Special Offer for WaitListers</p>
        </div>
      </div>
    </section>
  )
}
