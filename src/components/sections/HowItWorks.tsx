import { motion } from 'framer-motion'
import { Upload, Settings, Download } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: "Upload your data",
    description: "Upload logo, name and description of your startup"
  },
  {
    icon: Settings,
    title: "Choose the format",
    description: "Customize your pitch according to your needs"
  },
  {
    icon: Download,
    title: "Download your pitch",
    description: "Get the result in minutes"
  }
]

export default function HowItWorks() {
  return (
    <section aria-label="How It Works" className="py-24 bg-gradient-to-br from-violet-jtc/5 to-transparent">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-violet-jtc mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Three Steps to Create Your Perfect Pitch
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 right-0 w-full h-0.5 bg-gradient-to-r from-tea-green to-violet-jtc transform translate-x-1/2" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-violet-jtc" />
                </div>
                <h3 className="text-xl font-semibold text-violet-jtc mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}