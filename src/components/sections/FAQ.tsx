import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "What does the free plan include?",
    answer: "The free plan allows you to create a 1-minute pitch, including a basic presentation and AI-generated audio. It's perfect for trying our service."
  },
  {
    question: "Can I generate more than one free pitch?",
    answer: "The free plan is limited to a single pitch. To create more presentations, we recommend upgrading to one of our paid plans."
  },
  {
    question: "Is it safe to upload my logo and data?",
    answer: "Absolutely. We use bank-level encryption and never share your data with third parties. Your information is safe with us."
  },
  {
    question: "How long does processing take?",
    answer: "Most pitches are ready in less than 5 minutes. The exact time may vary depending on the duration and complexity of the project."
  }
]

export default function FAQ() {
  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="py-24" itemScope itemType="https://schema.org/FAQPage">
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              ${faqs.map((faq, index) => `
                {
                  "@type": "Question",
                  "name": "${faq.question}",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${faq.answer}"
                  }
                }
              `).join(',')}
            ]
          }
        `}
      </script>
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 
          className="text-4xl font-bold text-center text-violet-jtc mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} itemScope itemType="https://schema.org/Question">
                <AccordionTrigger className="text-left text-violet-jtc hover:text-violet-jtc/80" itemProp="name">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                  <span itemProp="text">{faq.answer}</span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
