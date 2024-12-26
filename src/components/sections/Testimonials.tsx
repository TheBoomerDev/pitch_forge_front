import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    name: "Ana García",
    company: "TechStart",
    image: "/testimonials/ana.jpg",
    quote: "Thanks to PitchForge we got our first round of investment. The pitch was perfect.",
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
    <section aria-label="Success Stories" className="py-24 bg-gradient-to-br from-violet-jtc/10 to-transparent" itemScope itemType="https://schema.org/ItemList">
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Testimonials",
            "description": "Success stories with PitchForge",
            "itemListElement": [
              ${testimonials.map((testimonial, index) => `
                {
                  "@type": "ListItem",
                  "position": ${index + 1},
                  "item": {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "${testimonial.name}"
                    },
                    "reviewBody": "${testimonial.quote}",
                    "publisher": {
                      "@type": "Organization",
                      "name": "${testimonial.company}"
                    }
                  }
                }
              `).join(',')}
            ]
          }
        `}
      </script>
      <div id="testimonials" className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-violet-jtc mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Success Stories with PitchForge
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
              itemScope itemType="https://schema.org/Review"
            >
              <meta itemProp="position" content={(index + 1).toString()} />
              <div className="flex items-center gap-4 mb-4" itemScope itemType="https://schema.org/Person" itemProp="author">
                <div className="w-16 h-16 rounded-full bg-mindaro flex items-center justify-center">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-violet-jtc" itemProp="name">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600" itemProp="jobTitle">{testimonial.role}</p>
                  <p className="text-sm font-medium" itemProp="affiliation">{testimonial.company}</p>
                </div>
              </div>
              <blockquote className="text-gray-600 italic" itemProp="reviewBody">"{testimonial.quote}"</blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
