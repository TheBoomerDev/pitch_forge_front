import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    name: "Ana García",
    company: "TechStart",
    image: "/testimonials/ana.jpg",
    quote: "Thanks to PitchAI we got our first round of investment. The pitch was perfect.",
    role: "CEO & Founder"
  },
  {
    name: "Carlos Ruiz",
    company: "InnovateLab",
    image: "/testimonials/carlos.jpg",
    quote: "The quality of the audio and presentations is exceptional. We saved days of work.",
    role: "CTO"
  },
  {
    name: "Laura Martínez",
    company: "GrowthHub",
    image: "/testimonials/laura.jpg",
    quote: "The customization is incredible. Each pitch perfectly reflects our brand.",
    role: "Marketing Director"
  }
]

export default function Testimonials() {
  return (
    <section aria-label="Success Stories" className="py-24 bg-gradient-to-br from-violet-jtc/10 to-transparent">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-violet-jtc mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Success Stories with PitchAI
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-mindaro flex items-center justify-center">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-violet-jtc">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
              <blockquote className="text-gray-600 italic">"{testimonial.quote}"</blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
