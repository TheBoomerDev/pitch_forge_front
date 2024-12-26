import { motion } from 'framer-motion'
import { Clock, Award, Download, Palette } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: "Time saving",
    description: "Create presentations in minutes, not days"
  },
  {
    icon: Award,
    title: "Professional quality",
    description: "Texts and audios optimized by AI"
  },
  {
    icon: Download,
    title: "Total integration",
    description: "Download in pptx and mp3 formats"
  },
  {
    icon: Palette,
    title: "Guaranteed customization",
    description: "Based on your logo, name and vision"
  }
]

export default function Benefits() {
  return (
    <section id="benefits" aria-label="Service Benefits" className="py-24 bg-gradient-to-br from-white to-tea-green/20" itemScope itemType="https://schema.org/ItemList">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-violet-jtc mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why choose PitchForge?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              itemScope itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={(index + 1).toString()} />
              <div className="w-12 h-12 bg-mindaro rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-violet-jtc" />
              </div>
              <h3 className="text-xl font-semibold text-violet-jtc mb-2" itemProp="name">{benefit.title}</h3>
              <p className="text-gray-600" itemProp="description">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
