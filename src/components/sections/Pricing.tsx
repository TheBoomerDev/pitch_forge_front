import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'

const plans = [
  {
    name: "Free",
    price: "€0",
    features: [
      "1 single pitch",
      "Basic presentation",
      "AI-generated audio",
      "Duration: 1 minute"
    ],
    highlight: true
  },
  {
    name: "Starter",
    price: "€29",
    period: "/month",
    features: [
      "Custom script",
      "Professional presentation",
      "High quality audio",
      "Duration: 3 minutes",
      "Email support"
    ]
  },
  {
    name: "Professional",
    price: "€49",
    period: "/month",
    features: [
      "Everything in the Starter plan",
      "Advanced customization",
      "Multiple styles",
      "Duration: 5 minutes",
      "Priority support"
    ]
  },
  {
    name: "Business",
    price: "€99",
    period: "/month",
    features: [
      "Everything in the Professional plan",
      "Custom branding",
      "API access",
      "Duration: 10 minutes",
      "24/7 support"
    ]
  }
]

export default function Pricing() {
  return (
    <section aria-label="Plans and Pricing" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-violet-jtc mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Choose Your Ideal Plan
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`p-6 rounded-xl ${
                plan.highlight 
                  ? 'border-2 border-mindaro shadow-lg' 
                  : 'border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-violet-jtc mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-600">{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-tea-green" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-tea-green text-violet-jtc hover:bg-tea-green/90"
              >
                Start now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
