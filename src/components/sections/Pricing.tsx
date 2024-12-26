import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'

const plans = [
  {
    name: "Elevator Pitch",
    price: "0$",
    mission:"Capture initial attention in a very short time.",
    features: [
      "1 single pitch per Account",
      "Basic presentation",
      "AI-generated audio",
      "Languages: (En, Es, Fr, De)",
      "Pitch Duration: 1 minute"
    ],
    highlight: true
  },
  {
    name: "Speed Pitch",
    price: "49$",
    mission:" It is often used in startup competitions where time is tighter.",
    period: "/ud",
    features: [
      "Everything in the Elevator Pitch",
      "Custom script", 
      "High quality audio",
      "Pitch Duration: 3 minutes",
      "Email support"
    ]
  },
  {
    name: "Showcase Pitch",
    price: "89$",
    mission:"Balance between detail and conciseness, enough to present the problem, the solution and a business breakthrough.",
    period: "/ud",
    features: [
      "Everything in the Speed Pitch",
      "More customizations",
      "Multiple styles",
      "Pitch Duration: 5 minutes",
      "Priority support (less than 24h)"
    ]
  },
  {
    name: "Full Pitch",
    price: "99$",
    mission:"In formal meetings with investors or final rounds of pitch competitions.",
    period: "/ud",
    features: [
      "Everything in the Showcase plan",
      "Advanced customization",
      "Multiple styles",
      "Pitch Duration: 10 minutes",
      "Premium support (less than 12h)"
    ]
  },
  {
    name: "Business",
    price: "300$",
    mission:"For Agencies that do mentoring and Coaching for Startups.",
    period: "/month",
    features: [
      "Everything in the Professional plan",
      "Custom branding",
      "API access",
      "Pitch Duration: [1, 3, 5, 10 min]",
      "24/7 support"
    ]
  }
]

export default function Pricing() {
  return (
    <section aria-label="Plans and Pricing" className="py-24" itemScope itemType="https://schema.org/ItemList">
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Pricing Plans",
            "description": "Choose your ideal plan",
            "itemListElement": [
              ${plans.map((plan, index) => `
                {
                  "@type": "ListItem",
                  "position": ${index + 1},
                  "item": {
                    "@type": "Product",
                    "name": "${plan.name}",
                    "description": "${plan.mission}",
                    "offers": {
                      "@type": "Offer",
                      "price": "${plan.price.replace('$', '')}",
                      "priceCurrency": "USD"
                    }
                  }
                }
              `).join(',')}
            ]
          }
        `}
      </script>
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
              itemScope itemType="https://schema.org/Product"
            >
              <h3 className="text-xl font-semibold text-violet-jtc mb-2" itemProp="name">{plan.name}</h3>
              <div className="mb-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <span className="text-4xl font-bold" itemProp="price">{plan.price}</span>
                {plan.period && <span className="text-gray-600" itemProp="priceCurrency">USD</span>}
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
                className="w-full bg-tea-green text-violet-jtc hover:bg-tea-green/90" aria-label={`Start with ${plan.name} plan`}
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
