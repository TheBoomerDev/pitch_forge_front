import { motion } from 'framer-motion'
import { Button } from '../ui/button'

export default function Hero() {
  return (
    <section 
      aria-label="Hero" 
      className="min-h-screen pt-20 flex items-center relative overflow-hidden"
    >
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
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-violet-jtc mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Create the Perfect Pitch in Minutes with Artificial Intelligence
          </motion.h1>
          
          <motion.h2
            className="text-xl md:text-2xl mb-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            From scripts to professional audios. Simplify your process with PitchAI.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button className="bg-gradient-to-r from-tea-green to-violet-jtc text-white text-lg px-8 py-6">
              Generate your Free Pitch
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
