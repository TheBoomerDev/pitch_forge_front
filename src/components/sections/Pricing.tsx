import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'

const plans = [
  {
    name: "Elevator Pitch",
    price: "Free",
    mission: "Capture initial attention in a very short time.",
    features: [
      "1 single pitch per Account",
      "Basic presentation",
      "AI-generated audio",
      "Languages: (En, Es, Fr, De)",
      "Pitch Duration: 1 minute"
    ]
  },
  {
    name: "Speed Pitch",
    price: "49",
    mission: " It is often used in startup competitions where time is tighter.",
    period: "/ud",
    features: [
      "Everything in the Elevator Pitch",
      "Custom script",
      "High quality audio",
      "Pitch Duration: 3 minutes",
      "Email support"
    ],
    highlight: true
  },
  {
    name: "Showcase Pitch",
    price: "89",
    mission: "Balance between detail and conciseness, enough to present the problem, the solution and a business breakthrough.",
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
    price: "99",
    mission: "In formal meetings with investors or final rounds of pitch competitions.",
    period: "/ud",
    features: [
      "Everything in the Showcase plan",
      "Advanced customization",
      "Multiple styles",
      "Pitch Duration: 10 minutes",
      "Premium support (less than 12h)"
    ]
  }

]

const bussinessPlan = {
  name: "Business",
  price: "300",
  mission: "For Agencies that do mentoring and Coaching for Startups.",
  period: "/month",
  features: [
    "Everything in the Professional plan",
    "Custom branding",
    "WorkSpace Organization",
    "API access",
    "Pitch Duration Selection: [1, 3, 5, 10 min]",
    "24/7 Priority Support"
  ]
}

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
      <div id="pricing" className="container mx-auto px-4">
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
              className={`p-6 rounded-xl ${plan.highlight
                ? 'border-2 border-mindaro shadow-lg'
                : 'border border-gray-200'
                }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              itemScope itemType="https://schema.org/Product"
            >
              <h3 className="text-xl font-bolder text-green-800 mb-2" itemProp="name">{plan.name}</h3>
              <div className="mb-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <span className="text-4xl font-semibold font-gray-800" itemProp="price">{plan.price}</span>
                <span className="text-gray-600" itemProp="priceCurrency">$</span>
                <span className="text-gray-400 text-sm" itemProp="priceCurrency">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-tea-green text-green-600 hover:bg-tea-green/90" aria-label={`Start with ${plan.name} plan`}
                href="#wait_list"
              >
                Please Notify me
              </Button>
            </motion.div>
          ))}

        </div>

        <motion.div

          key={bussinessPlan.name}
          className={`mt-4 p-6 rounded-xl border border-gray-200 w-full mx-auto sm:w-4/5 md:w-1/2 lg:w-1/2`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          itemScope itemType="https://schema.org/Product"
        >
          <div className="text-xl font-bolder text-green-800 mb-2" itemProp="name">
            <h3 className="title">
              {bussinessPlan.name}
            </h3>
            <div className="mb-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span className="text-4xl font-semibold font-gray-800" itemProp="price">{bussinessPlan.price}</span>
              <span className="text-gray-600" itemProp="priceCurrency">$</span>
              <span className="text-gray-400 text-sm" itemProp="priceCurrency">{bussinessPlan.period}</span>
            </div>

          </div>
          
          <ul className="space-y-3 mb-6">
            {bussinessPlan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-gray-400" />
                <span className="text-gray-500">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            className="w-full bg-tea-green text-green-600 hover:bg-tea-green/90" aria-label={`Start with ${bussinessPlan.name} plan`}
            href="#wait_list"
          >
            Please Notify me
          </Button>
        </motion.div>


      </div>
    </section>
  )
}
